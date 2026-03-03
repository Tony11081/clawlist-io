import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT_URL = new URL('https://clawlist.io/')
const OUTPUT_DIR = path.resolve(process.cwd(), 'reports/link-audit')
const REQUEST_TIMEOUT_MS = Number(process.env.LINK_AUDIT_TIMEOUT_MS ?? 15000)
const MAX_URLS = Number(process.env.LINK_AUDIT_MAX_URLS ?? 1000)
const USER_AGENT = 'clawlist-link-audit/1.0'
const HTML_CONTENT_TYPE = 'text/html'

function normalizeUrl(rawHref, baseUrl = ROOT_URL) {
  if (!rawHref) {
    return null
  }

  const href = rawHref.trim()

  if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:|data:)/i.test(href)) {
    return null
  }

  let url

  try {
    url = new URL(href, baseUrl)
  } catch {
    return null
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== ROOT_URL.origin) {
    return null
  }

  url.hash = ''
  url.username = ''
  url.password = ''

  if (
    (url.protocol === 'https:' && url.port === '443') ||
    (url.protocol === 'http:' && url.port === '80')
  ) {
    url.port = ''
  }

  if (url.pathname !== '/') {
    url.pathname = url.pathname.replace(/\/+$/, '') || '/'
  }

  url.searchParams.sort()

  return url.toString()
}

function extractInternalLinks(html, pageUrl) {
  const links = new Set()
  const hrefPattern = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`>]+))/gi

  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1] ?? match[2] ?? match[3]
    const normalized = normalizeUrl(href, pageUrl)

    if (normalized) {
      links.add(normalized)
    }
  }

  return [...links]
}

function createRecord(url, depth) {
  return {
    url,
    depth,
    discoveredFrom: new Set(),
    status: null,
    ok: false,
    redirected: false,
    finalUrl: null,
    finalOriginMatches: true,
    contentType: null,
    crawlable: false,
    outboundCount: 0,
    error: null,
    visited: false,
  }
}

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
    })
  } finally {
    clearTimeout(timeout)
  }
}

function serializeRecord(record) {
  return {
    url: record.url,
    depth: record.depth,
    status: record.status,
    ok: record.ok,
    redirected: record.redirected,
    finalUrl: record.finalUrl,
    finalOriginMatches: record.finalOriginMatches,
    contentType: record.contentType,
    crawlable: record.crawlable,
    outboundCount: record.outboundCount,
    error: record.error,
    discoveredFrom: [...record.discoveredFrom].sort(),
  }
}

function formatFetchError(error) {
  if (error?.name === 'AbortError') {
    return `timeout after ${REQUEST_TIMEOUT_MS}ms`
  }

  if (error instanceof Error) {
    const cause = error.cause

    if (cause && typeof cause === 'object') {
      const code = 'code' in cause ? cause.code : null
      const message = 'message' in cause ? cause.message : null

      if (code && message) {
        return `${error.message} (${code}: ${message})`
      }

      if (message) {
        return `${error.message} (${message})`
      }
    }

    return error.message
  }

  return String(error)
}

function buildSummary({ generatedAt, stats, brokenLinks }) {
  const lines = [
    '# Link Audit Summary',
    '',
    `- Generated: ${generatedAt}`,
    `- Root URL: ${ROOT_URL.toString()}`,
    `- URLs checked: ${stats.total}`,
    `- HTML pages crawled: ${stats.htmlPages}`,
    `- Broken links: ${stats.broken}`,
    `- Redirected links: ${stats.redirected}`,
    `- External redirects: ${stats.externalRedirects}`,
    `- Max depth: ${stats.maxDepth}`,
    `- Crawl limit reached: ${stats.limitReached ? 'yes' : 'no'}`,
    '',
    '## Broken Links',
    '',
  ]

  if (brokenLinks.length === 0) {
    lines.push('None.')
    return `${lines.join('\n')}\n`
  }

  lines.push('| URL | Status | Source |')
  lines.push('| --- | --- | --- |')

  for (const link of brokenLinks) {
    const source = link.discoveredFrom[0] ?? 'root'
    const status = link.error ? `error: ${link.error}` : String(link.status)
    lines.push(`| ${link.url} | ${status} | ${source} |`)
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  const queue = []
  const records = new Map()
  let limitReached = false

  function enqueue(url, sourceUrl, depth) {
    if (records.has(url)) {
      const existing = records.get(url)

      if (sourceUrl) {
        existing.discoveredFrom.add(sourceUrl)
      }

      existing.depth = Math.min(existing.depth, depth)
      return
    }

    if (records.size >= MAX_URLS) {
      limitReached = true
      return
    }

    const record = createRecord(url, depth)

    if (sourceUrl) {
      record.discoveredFrom.add(sourceUrl)
    }

    records.set(url, record)
    queue.push(url)
  }

  enqueue(ROOT_URL.toString(), null, 0)

  while (queue.length > 0) {
    const currentUrl = queue.shift()
    const record = records.get(currentUrl)

    if (!record || record.visited) {
      continue
    }

    record.visited = true

    try {
      const response = await fetchWithTimeout(currentUrl)
      const contentType = response.headers.get('content-type')
      const finalUrl = response.url || currentUrl
      const finalOriginMatches = (() => {
        try {
          return new URL(finalUrl).origin === ROOT_URL.origin
        } catch {
          return false
        }
      })()

      record.status = response.status
      record.ok = response.ok
      record.redirected = response.redirected
      record.finalUrl = finalUrl
      record.finalOriginMatches = finalOriginMatches
      record.contentType = contentType ?? null
      record.crawlable = Boolean(
        response.ok && finalOriginMatches && contentType?.includes(HTML_CONTENT_TYPE)
      )

      if (record.crawlable) {
        const html = await response.text()
        const pageBaseUrl = normalizeUrl(finalUrl) ?? currentUrl
        const discoveredLinks = extractInternalLinks(html, pageBaseUrl)

        record.outboundCount = discoveredLinks.length

        for (const discoveredUrl of discoveredLinks) {
          enqueue(discoveredUrl, currentUrl, record.depth + 1)
        }
      } else {
        await response.body?.cancel()
      }
    } catch (error) {
      record.ok = false
      record.error = formatFetchError(error)
    }
  }

  const generatedAt = new Date().toISOString()
  const serializedLinks = [...records.values()]
    .sort((a, b) => a.depth - b.depth || a.url.localeCompare(b.url))
    .map(serializeRecord)
  const brokenLinks = serializedLinks.filter((link) => link.error || (link.status !== null && link.status >= 400))
  const stats = {
    total: serializedLinks.length,
    htmlPages: serializedLinks.filter((link) => link.crawlable).length,
    broken: brokenLinks.length,
    redirected: serializedLinks.filter((link) => link.redirected).length,
    externalRedirects: serializedLinks.filter((link) => link.redirected && !link.finalOriginMatches).length,
    maxDepth: serializedLinks.reduce((max, link) => Math.max(max, link.depth), 0),
    limitReached,
  }

  await mkdir(OUTPUT_DIR, { recursive: true })

  await Promise.all([
    writeFile(
      path.join(OUTPUT_DIR, 'links.json'),
      `${JSON.stringify({ generatedAt, rootUrl: ROOT_URL.toString(), stats, links: serializedLinks }, null, 2)}\n`
    ),
    writeFile(
      path.join(OUTPUT_DIR, 'broken.json'),
      `${JSON.stringify({ generatedAt, rootUrl: ROOT_URL.toString(), count: brokenLinks.length, links: brokenLinks }, null, 2)}\n`
    ),
    writeFile(
      path.join(OUTPUT_DIR, 'summary.md'),
      buildSummary({ generatedAt, stats, brokenLinks })
    ),
  ])

  console.log(`Checked ${stats.total} same-origin URLs from ${ROOT_URL.toString()}`)
  console.log(`HTML pages: ${stats.htmlPages}`)
  console.log(`Broken links: ${stats.broken}`)
  console.log(`Redirected links: ${stats.redirected}`)
  console.log(`Reports: ${OUTPUT_DIR}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})

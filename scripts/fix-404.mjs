import { access, appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT_DIR = process.cwd()
const BROKEN_REPORT_PATH = path.resolve(ROOT_DIR, 'reports/link-audit/broken.json')
const FIX_REPORT_PATH = path.resolve(ROOT_DIR, 'reports/link-audit/fixes.json')
const SUMMARY_PATH = path.resolve(ROOT_DIR, 'reports/link-audit/summary.md')
const APP_DIR = path.resolve(ROOT_DIR, 'app')
const CATALOG_SOURCE_PATH = path.resolve(ROOT_DIR, 'lib/catalog.ts')
const CATALOG_EXTENSIONS_PATH = path.resolve(ROOT_DIR, 'data/catalog-extensions.json')
const PAGE_FILENAMES = ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
const DEFAULT_ROOT_URL = 'https://clawlist.io/'
const ACRONYM_MAP = {
  ai: 'AI',
  api: 'API',
  cli: 'CLI',
  crm: 'CRM',
  faq: 'FAQ',
  seo: 'SEO',
  ssh: 'SSH',
  ui: 'UI',
  ux: 'UX',
}

function titleCase(token) {
  return token.charAt(0).toUpperCase() + token.slice(1)
}

function humanizeSlug(slug) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((token) => ACRONYM_MAP[token.toLowerCase()] ?? titleCase(token))
    .join(' ')
}

function normalizeRoutePath(routePath) {
  if (!routePath || routePath === '/') {
    return '/'
  }

  const normalized = routePath.startsWith('/') ? routePath : `/${routePath}`
  const collapsed = normalized.replace(/\/+/g, '/').replace(/\/+$/, '')
  return collapsed || '/'
}

function isSafeRouteSegment(segment) {
  return /^[A-Za-z0-9_-]+$/.test(segment)
}

function toPathname(rawUrl, rootOrigin) {
  try {
    const url = new URL(rawUrl, `${rootOrigin}/`)

    if (url.origin !== rootOrigin) {
      return null
    }

    const pathname = normalizeRoutePath(decodeURIComponent(url.pathname))
    return pathname
  } catch {
    return null
  }
}

function toSourcePaths(discoveredFrom, rootOrigin) {
  return Array.from(
    new Set(
      (discoveredFrom ?? [])
        .map((value) => toPathname(value, rootOrigin))
        .filter(Boolean),
    ),
  ).sort()
}

function buildPageModule(routePath, sourcePaths) {
  const sourceArg =
    sourcePaths.length === 0
      ? ''
      : `,\n  [\n${sourcePaths.map((sourcePath) => `    '${sourcePath}',`).join('\n')}\n  ]`

  return `import type { Metadata } from 'next'
import { GeneratedPageShell } from '@/components/generated-page-shell'
import { buildGeneratedPageMetadata, createGeneratedPageEntry } from '@/lib/route-scaffolds'

const page = createGeneratedPageEntry(
  '${routePath}'${sourceArg}
)

export const metadata: Metadata = buildGeneratedPageMetadata(page)

export default function GeneratedRoutePage() {
  return <GeneratedPageShell page={page} />
}
`
}

function inferGuideCategory(slug) {
  if (/(deploy|docker|server|vps|cloud|host)/i.test(slug)) {
    return 'Deployment'
  }

  if (/(telegram|discord|slack|webhook|integration|api)/i.test(slug)) {
    return 'Integration'
  }

  if (/(security|privacy|permission|auth)/i.test(slug)) {
    return 'Security'
  }

  return 'Guides'
}

function inferGuideDifficulty(slug) {
  return /(security|migration|cluster|pipeline|ci|advanced)/i.test(slug)
    ? 'intermediate'
    : 'beginner'
}

function inferGuideReadTime(slug) {
  return /(migration|cluster|pipeline|ci|deploy)/i.test(slug) ? '15 min' : '10 min'
}

function inferRecipeRole(slug) {
  if (/(developer|dev|engineer|code|programmer)/i.test(slug)) {
    return 'Development'
  }

  if (/(marketing|seo|content|email)/i.test(slug)) {
    return 'Marketing'
  }

  if (/(sales|revenue|pipeline)/i.test(slug)) {
    return 'Sales'
  }

  if (/(support|success|helpdesk)/i.test(slug)) {
    return 'Support'
  }

  if (/(shop|store|ecommerce|commerce)/i.test(slug)) {
    return 'E-commerce'
  }

  return 'Operations'
}

function inferRecipeDifficulty(slug) {
  return /(engineer|pipeline|ops|automation|analysis|admin)/i.test(slug)
    ? 'intermediate'
    : 'beginner'
}

function inferRecipeRisk(slug) {
  return /(admin|security|deploy|ops|finance|automation)/i.test(slug) ? 'medium' : 'low'
}

function inferRecipeSkillsCount(slug) {
  return /(automation|pipeline|ops|engineer)/i.test(slug) ? 4 : 3
}

function inferSkillRisk(slug) {
  return /(admin|browser|deploy|github|security|automation)/i.test(slug) ? 'medium' : 'low'
}

function inferSkillPermissions(riskLevel) {
  return riskLevel === 'medium'
    ? ['Read/write local workspace', 'Network access']
    : ['Read local workspace']
}

function inferSkillTags(slug) {
  return Array.from(new Set([...slug.split(/[-_]/).filter(Boolean).slice(0, 3), 'catalog']))
}

function createGuideEntry(slug, id) {
  const title = humanizeSlug(slug)

  return {
    id,
    slug,
    title,
    description: `Fallback guide created to recover the missing ${title.toLowerCase()} route.`,
    category: inferGuideCategory(slug),
    difficulty: inferGuideDifficulty(slug),
    readTime: inferGuideReadTime(slug),
  }
}

function createRecipeEntry(slug, id) {
  const title = humanizeSlug(slug)

  return {
    id,
    slug,
    title,
    summary: `Fallback recipe created to recover the missing ${title.toLowerCase()} route.`,
    role_type: inferRecipeRole(slug),
    difficulty: inferRecipeDifficulty(slug),
    skills_count: inferRecipeSkillsCount(slug),
    risk_level: inferRecipeRisk(slug),
  }
}

function createSkillEntry(slug) {
  const name = humanizeSlug(slug)
  const riskLevel = inferSkillRisk(slug)

  return {
    id: `catalog-${slug}`,
    name,
    slug,
    summary: `Fallback skill entry created to recover the missing ${name.toLowerCase()} route.`,
    description:
      `This catalog placeholder was generated from a broken internal link so the skill route resolves while richer data is added later.`,
    risk_level: riskLevel,
    install_cmd: `npx skills add ${slug}`,
    permissions: inferSkillPermissions(riskLevel),
    tags: inferSkillTags(slug),
    upvotes: 0,
  }
}

function extractSlugs(source, startMarker, endMarker) {
  const startIndex = source.indexOf(startMarker)

  if (startIndex === -1) {
    return new Set()
  }

  const fromStart = source.slice(startIndex)
  const endIndex = fromStart.indexOf(endMarker)
  const section = endIndex === -1 ? fromStart : fromStart.slice(0, endIndex)
  return new Set(Array.from(section.matchAll(/slug:\s*'([^']+)'/g), (match) => match[1]))
}

function getBaseCatalogSlugs(source) {
  return {
    guides: extractSlugs(source, 'const baseGuides', 'const baseRecipes'),
    recipes: extractSlugs(source, 'const baseRecipes', 'const baseFallbackSkills'),
    skills: extractSlugs(source, 'const baseFallbackSkills', 'export const guides'),
  }
}

function getNextNumericId(entries) {
  const numericIds = entries
    .map((entry) => entry?.id)
    .filter((value) => Number.isInteger(value))

  return Math.max(1000, ...numericIds) + 1
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function routePageExists(routeSegments) {
  const directory = path.join(APP_DIR, ...routeSegments)

  for (const filename of PAGE_FILENAMES) {
    if (await fileExists(path.join(directory, filename))) {
      return true
    }
  }

  return false
}

async function readJson(filePath) {
  const raw = await readFile(filePath, 'utf8')
  return JSON.parse(raw)
}

function ensureCatalogExtensions(document) {
  return {
    guides: Array.isArray(document?.guides) ? [...document.guides] : [],
    recipes: Array.isArray(document?.recipes) ? [...document.recipes] : [],
    skills: Array.isArray(document?.skills) ? [...document.skills] : [],
  }
}

function getDynamicRouteMatch(routePath) {
  const segments = routePath.split('/').filter(Boolean)

  if (segments.length !== 2) {
    return null
  }

  const [collection, slug] = segments

  if (!['guides', 'recipes', 'skills'].includes(collection) || !isSafeRouteSegment(slug)) {
    return null
  }

  return { collection, slug }
}

function shouldSkipStaticRoute(routePath) {
  if (routePath === '/') {
    return 'root route already exists'
  }

  const segments = routePath.split('/').filter(Boolean)

  if (segments.length === 0) {
    return 'empty route'
  }

  if (segments[0] === 'api' || segments[0] === '_next') {
    return 'non-page route'
  }

  if (segments.some((segment) => segment.includes('.'))) {
    return 'asset route'
  }

  if (segments.some((segment) => !isSafeRouteSegment(segment))) {
    return 'unsafe route segment'
  }

  return null
}

function buildSummarySection(report) {
  const lines = [
    `## 404 Fix Run ${report.generatedAt}`,
    '',
    `- HTTP 404 links processed: ${report.totals.http404}`,
    `- Static pages created: ${report.totals.staticPagesCreated}`,
    `- Catalog entries added: ${report.totals.catalogEntriesAdded}`,
    `- Ignored links: ${report.totals.ignored}`,
  ]

  if (report.applied.length === 0) {
    lines.push('- No fixes were applied.')
    return `${lines.join('\n')}\n`
  }

  for (const fix of report.applied) {
    if (fix.type === 'static-page') {
      lines.push(`- Created \`${fix.file}\` for \`${fix.route}\``)
      continue
    }

    lines.push(`- Added \`${fix.collection}/${fix.slug}\` to \`${fix.file}\``)
  }

  return `${lines.join('\n')}\n`
}

function buildConsoleSummary(report) {
  const lines = [
    `fix:404 processed ${report.totals.http404} HTTP 404 link(s)`,
    `created ${report.totals.staticPagesCreated} static page(s), added ${report.totals.catalogEntriesAdded} catalog entr${report.totals.catalogEntriesAdded === 1 ? 'y' : 'ies'}, ignored ${report.totals.ignored} non-fixable link(s)`,
  ]

  if (report.applied.length > 0) {
    for (const fix of report.applied) {
      if (fix.type === 'static-page') {
        lines.push(`- static: ${fix.route} -> ${fix.file}`)
      } else {
        lines.push(`- catalog: /${fix.collection}/${fix.slug}`)
      }
    }
  }

  return lines.join('\n')
}

async function main() {
  const [brokenDocument, catalogSource, catalogExtensionsDocument] = await Promise.all([
    readJson(BROKEN_REPORT_PATH),
    readFile(CATALOG_SOURCE_PATH, 'utf8'),
    readJson(CATALOG_EXTENSIONS_PATH),
  ])

  const rootOrigin = new URL(brokenDocument.rootUrl ?? DEFAULT_ROOT_URL).origin
  const catalogExtensions = ensureCatalogExtensions(catalogExtensionsDocument)
  const baseSlugs = getBaseCatalogSlugs(catalogSource)
  const extensionSlugSets = {
    guides: new Set(catalogExtensions.guides.map((entry) => entry.slug)),
    recipes: new Set(catalogExtensions.recipes.map((entry) => entry.slug)),
    skills: new Set(catalogExtensions.skills.map((entry) => entry.slug)),
  }

  let nextGuideId = getNextNumericId(catalogExtensions.guides)
  let nextRecipeId = getNextNumericId(catalogExtensions.recipes)
  let catalogChanged = false

  const applied = []
  const skipped = []

  const brokenLinks = Array.isArray(brokenDocument?.links) ? brokenDocument.links : []

  for (const link of brokenLinks) {
    if (link?.status !== 404) {
      skipped.push({
        url: link?.url ?? null,
        reason: link?.error ? 'transport-or-fetch-error' : 'non-404-status',
        status: link?.status ?? null,
        error: link?.error ?? null,
      })
      continue
    }

    const routePath = toPathname(link.url, rootOrigin)

    if (!routePath) {
      skipped.push({
        url: link?.url ?? null,
        reason: 'external-or-invalid-url',
        status: link.status,
        error: link?.error ?? null,
      })
      continue
    }

    const dynamicMatch = getDynamicRouteMatch(routePath)

    if (dynamicMatch) {
      const { collection, slug } = dynamicMatch

      if (baseSlugs[collection].has(slug) || extensionSlugSets[collection].has(slug)) {
        skipped.push({
          url: link.url,
          route: routePath,
          reason: 'catalog-slug-already-present',
          status: link.status,
          error: link?.error ?? null,
        })
        continue
      }

      if (collection === 'guides') {
        catalogExtensions.guides.push(createGuideEntry(slug, nextGuideId))
        nextGuideId += 1
      } else if (collection === 'recipes') {
        catalogExtensions.recipes.push(createRecipeEntry(slug, nextRecipeId))
        nextRecipeId += 1
      } else {
        catalogExtensions.skills.push(createSkillEntry(slug))
      }

      extensionSlugSets[collection].add(slug)
      catalogChanged = true
      applied.push({
        type: 'catalog-entry',
        collection,
        slug,
        route: routePath,
        file: path.relative(ROOT_DIR, CATALOG_EXTENSIONS_PATH),
      })
      continue
    }

    const staticRouteSkipReason = shouldSkipStaticRoute(routePath)

    if (staticRouteSkipReason) {
      skipped.push({
        url: link.url,
        route: routePath,
        reason: staticRouteSkipReason,
        status: link.status,
        error: link?.error ?? null,
      })
      continue
    }

    const routeSegments = routePath.split('/').filter(Boolean)

    if (await routePageExists(routeSegments)) {
      skipped.push({
        url: link.url,
        route: routePath,
        reason: 'page-already-exists',
        status: link.status,
        error: link?.error ?? null,
      })
      continue
    }

    const relativePagePath = path.join('app', ...routeSegments, 'page.tsx')
    const pageFilePath = path.resolve(ROOT_DIR, relativePagePath)
    const sourcePaths = toSourcePaths(link.discoveredFrom, rootOrigin)

    await mkdir(path.dirname(pageFilePath), { recursive: true })
    await writeFile(pageFilePath, buildPageModule(routePath, sourcePaths), 'utf8')

    applied.push({
      type: 'static-page',
      route: routePath,
      file: relativePagePath,
      sources: sourcePaths,
    })
  }

  if (catalogChanged) {
    await writeFile(`${CATALOG_EXTENSIONS_PATH}`, `${JSON.stringify(catalogExtensions, null, 2)}\n`, 'utf8')
  }

  const report = {
    generatedAt: new Date().toISOString(),
    source: path.relative(ROOT_DIR, BROKEN_REPORT_PATH),
    totals: {
      brokenRecords: brokenLinks.length,
      http404: brokenLinks.filter((link) => link?.status === 404).length,
      staticPagesCreated: applied.filter((fix) => fix.type === 'static-page').length,
      catalogEntriesAdded: applied.filter((fix) => fix.type === 'catalog-entry').length,
      ignored: skipped.length,
    },
    applied,
    skipped,
  }

  await mkdir(path.dirname(FIX_REPORT_PATH), { recursive: true })
  await writeFile(FIX_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  await appendFile(SUMMARY_PATH, `\n${buildSummarySection(report)}`, 'utf8')

  console.log(buildConsoleSummary(report))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})

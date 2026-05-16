import { cache } from 'react'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export type BriefFrontmatter = {
  title: string
  summary: string
  published_at: string
  cover_image?: string
  tags?: string[]
}

export type BriefListItem = {
  slug: string
  title: string
  summary: string
  published_at: string
  cover_image?: string
  tags: string[]
}

export type BriefDetail = BriefListItem & {
  content: string
}

const BRIEFS_DIR = path.join(process.cwd(), 'content', 'briefs')

function parseInlineList(value: string) {
  const trimmed = value.trim()
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return null
  }

  const inner = trimmed.slice(1, -1).trim()
  if (!inner) {
    return []
  }

  return inner
    .split(',')
    .map((token) => token.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
}

function parseFrontmatterBlock(block: string): Partial<BriefFrontmatter> {
  const lines = block.split('\n')
  const result: Record<string, unknown> = {}

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index]
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const rawValue = line.slice(separatorIndex + 1).trim()

    if (!key) {
      continue
    }

    if (rawValue) {
      const inlineList = parseInlineList(rawValue)
      if (inlineList) {
        result[key] = inlineList
        continue
      }

      result[key] = rawValue.replace(/^['"]|['"]$/g, '')
      continue
    }

    const listItems: string[] = []
    for (let next = index + 1; next < lines.length; next += 1) {
      const nextLine = lines[next]
      const trimmedNext = nextLine.trim()

      if (!trimmedNext) {
        continue
      }

      if (/^[A-Za-z0-9_]+\s*:/.test(trimmedNext) && !trimmedNext.startsWith('-')) {
        break
      }

      if (trimmedNext.startsWith('- ')) {
        listItems.push(trimmedNext.slice(2).trim().replace(/^['"]|['"]$/g, ''))
      }
    }

    if (listItems.length > 0) {
      result[key] = listItems.filter(Boolean)
    }
  }

  return result
}

function splitFrontmatter(source: string): {
  frontmatter: Partial<BriefFrontmatter>
  body: string
} {
  if (!source.startsWith('---\n')) {
    return { frontmatter: {}, body: source }
  }

  const endIndex = source.indexOf('\n---\n', 4)
  if (endIndex === -1) {
    return { frontmatter: {}, body: source }
  }

  const block = source.slice(4, endIndex)
  const body = source.slice(endIndex + '\n---\n'.length)

  return {
    frontmatter: parseFrontmatterBlock(block),
    body,
  }
}

function normalizeBrief(
  slug: string,
  frontmatter: Partial<BriefFrontmatter>,
  body: string,
): BriefDetail {
  const title = String(frontmatter.title ?? '').trim() || 'Untitled brief'
  const summary =
    String(frontmatter.summary ?? '').trim() || 'No summary available yet.'
  const published_at =
    String(frontmatter.published_at ?? '').trim() || new Date(0).toISOString()
  const cover_image = frontmatter.cover_image?.trim() || undefined
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.filter(Boolean)
    : []

  return {
    slug,
    title,
    summary,
    published_at,
    cover_image,
    tags,
    content: body.trim(),
  }
}

export const getBriefBySlug = cache(async (slug: string) => {
  const filePath = path.join(BRIEFS_DIR, `${slug}.md`)

  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const { frontmatter, body } = splitFrontmatter(raw)
    return normalizeBrief(slug, frontmatter, body)
  } catch {
    return null
  }
})

export const getBriefs = cache(async (): Promise<BriefListItem[]> => {
  try {
    const entries = await fs.readdir(BRIEFS_DIR, { withFileTypes: true })
    const slugs = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name.replace(/\.md$/, ''))

    const briefs = await Promise.all(slugs.map((slug) => getBriefBySlug(slug)))

    return briefs
      .filter((brief): brief is BriefDetail => Boolean(brief))
      .sort((left, right) => right.published_at.localeCompare(left.published_at))
      .map((brief) => ({
        slug: brief.slug,
        title: brief.title,
        summary: brief.summary,
        published_at: brief.published_at,
        cover_image: brief.cover_image,
        tags: brief.tags,
      }))
  } catch {
    return []
  }
})

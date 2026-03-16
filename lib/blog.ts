import { supabase } from '@/lib/supabase'

export const BLOG_PAGE_SIZE = 18

export type BlogListItem = {
  id: string
  slug: string
  title: string
  summary: string
  category?: string
  tags: string[]
  author?: string
  published_at: string
  reading_time?: number
}

export type BlogListResult = {
  allTags: string[]
  page: number
  posts: BlogListItem[]
  selectedTag: string | null
  totalCount: number
  totalPages: number
}

const BLOG_LIST_COLUMNS =
  'id, slug, title, summary, category, tags, author, published_at, reading_time'

type RawBlogPost = {
  id?: string | number
  slug?: string | null
  title?: string | null
  summary?: string | null
  category?: string | null
  tags?: unknown
  author?: string | null
  published_at?: string | null
  reading_time?: number | null
}

type BlogTagRow = {
  tags?: unknown
}

function normalizePost(item: RawBlogPost): BlogListItem {
  return {
    id: String(item.id ?? ''),
    slug: item.slug ?? '',
    title: item.title ?? 'Untitled post',
    summary: item.summary ?? 'No summary available yet.',
    category: item.category ?? undefined,
    tags: Array.isArray(item.tags) ? item.tags.filter(Boolean) : [],
    author: item.author ?? undefined,
    published_at: item.published_at ?? new Date(0).toISOString(),
    reading_time:
      typeof item.reading_time === 'number' ? item.reading_time : undefined,
  }
}

function normalizeSelectedTag(tag?: string | null) {
  const trimmed = tag?.trim()
  return trimmed ? trimmed : null
}

export async function getBlogListData(options?: {
  page?: number
  pageSize?: number
  tag?: string | null
}): Promise<BlogListResult> {
  const pageSize = options?.pageSize ?? BLOG_PAGE_SIZE
  const requestedPage = Math.max(1, options?.page ?? 1)
  const selectedTag = normalizeSelectedTag(options?.tag)

  if (!supabase) {
    return {
      allTags: [],
      page: 1,
      posts: [],
      selectedTag,
      totalCount: 0,
      totalPages: 0,
    }
  }

  let countQuery = supabase.from('blog_posts').select('id', {
    count: 'exact',
    head: true,
  })

  if (selectedTag) {
    countQuery = countQuery.contains('tags', [selectedTag])
  }

  const [{ count, error: countError }, { data: tagRows, error: tagsError }] =
    await Promise.all([
      countQuery,
      supabase.from('blog_posts').select('tags'),
    ])

  if (countError) {
    console.error('Error counting blog posts:', countError)
  }

  if (tagsError) {
    console.error('Error fetching blog tags:', tagsError)
  }

  const allTags = Array.from(
    new Set(
      ((tagRows ?? []) as BlogTagRow[]).flatMap((row) =>
        Array.isArray(row.tags) ? row.tags.filter(Boolean) : []
      )
    )
  ).sort((left, right) => left.localeCompare(right))

  const totalCount = count ?? 0
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 0
  const page = totalPages > 0 ? Math.min(requestedPage, totalPages) : 1

  if (totalPages === 0) {
    return {
      allTags,
      page,
      posts: [],
      selectedTag,
      totalCount,
      totalPages,
    }
  }

  const rangeStart = (page - 1) * pageSize
  const rangeEnd = rangeStart + pageSize - 1

  let postsQuery = supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS)
    .order('published_at', { ascending: false })
    .range(rangeStart, rangeEnd)

  if (selectedTag) {
    postsQuery = postsQuery.contains('tags', [selectedTag])
  }

  const { data: postsData, error: postsError } = await postsQuery

  if (postsError) {
    console.error('Error fetching blog posts:', postsError)
  }

  return {
    allTags,
    page,
    posts: (postsData ?? []).map(normalizePost),
    selectedTag,
    totalCount,
    totalPages,
  }
}

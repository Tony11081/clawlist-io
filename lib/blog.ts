import { cache } from 'react'

import { getSkillsList } from '@/lib/skills'
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

export type BlogDetail = BlogListItem & {
  content: string
  updated_at?: string
  views: number
}

export type RelatedBlogItem = Pick<
  BlogListItem,
  'slug' | 'title' | 'summary' | 'category' | 'tags'
>

export type RelatedSkillItem = {
  slug: string
  name: string
  summary: string
  category?: string
  tags: string[]
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
const BLOG_DETAIL_COLUMNS =
  'id, slug, title, summary, content, category, tags, author, published_at, updated_at, views, reading_time'
const NON_GUIDE_FILTER = 'category.is.null,category.neq.guides'

type RawBlogPost = {
  id?: string | number
  slug?: string | null
  title?: string | null
  summary?: string | null
  content?: string | null
  category?: string | null
  tags?: unknown
  author?: string | null
  published_at?: string | null
  updated_at?: string | null
  views?: number | null
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

function normalizeDetail(item: RawBlogPost): BlogDetail {
  return {
    ...normalizePost(item),
    content: item.content ?? '',
    updated_at: item.updated_at ?? undefined,
    views: typeof item.views === 'number' ? item.views : 0,
  }
}

function normalizeSelectedTag(tag?: string | null) {
  const trimmed = tag?.trim()
  return trimmed ? trimmed : null
}

const STOPWORDS = new Set([
  'about',
  'agent',
  'agents',
  'also',
  'and',
  'best',
  'blog',
  'build',
  'built',
  'code',
  'content',
  'deep',
  'dive',
  'explained',
  'from',
  'guide',
  'into',
  'layer',
  'layers',
  'more',
  'openclaw',
  'practical',
  'series',
  'skill',
  'skills',
  'system',
  'that',
  'their',
  'this',
  'tutorial',
  'using',
  'with',
  'your',
])

function tokenize(values: Array<string | undefined | null>) {
  return Array.from(
    new Set(
      values
        .flatMap((value) => value?.toLowerCase().match(/[a-z0-9]+/g) ?? [])
        .filter((token) => token.length > 2 && !STOPWORDS.has(token))
    )
  )
}

function countOverlap(source: string[], target: string[]) {
  const targetSet = new Set(target)
  return source.reduce((count, token) => count + (targetSet.has(token) ? 1 : 0), 0)
}

function getPostTokens(post: Pick<BlogDetail, 'title' | 'summary' | 'category' | 'tags' | 'slug'>) {
  return tokenize([
    post.title,
    post.summary,
    post.category,
    post.slug.replace(/-/g, ' '),
    post.tags.join(' '),
  ])
}

function getSkillTokens(skill: RelatedSkillItem & { install_cmd?: string }) {
  return tokenize([
    skill.name,
    skill.summary,
    skill.category,
    skill.install_cmd,
    skill.slug.replace(/-/g, ' '),
    skill.tags.join(' '),
  ])
}

function scoreRelatedPost(
  source: BlogDetail,
  candidate: RelatedBlogItem,
) {
  const sharedTags = countOverlap(source.tags, candidate.tags)
  const sharedTokens = countOverlap(
    getPostTokens(source),
    tokenize([
      candidate.title,
      candidate.summary,
      candidate.category,
      candidate.slug.replace(/-/g, ' '),
      candidate.tags.join(' '),
    ]),
  )

  return (sharedTags * 8)
    + (candidate.category && candidate.category === source.category ? 4 : 0)
    + (sharedTokens * 2)
}

function scoreRelatedSkill(source: BlogDetail, skill: RelatedSkillItem & { install_cmd?: string }) {
  const sourceTokens = getPostTokens(source)
  const skillTokens = getSkillTokens(skill)
  const sharedTags = countOverlap(source.tags, skill.tags)
  const sharedTokens = countOverlap(sourceTokens, skillTokens)

  const installIntentBoost = sourceTokens.some((token) =>
    ['brew', 'install', 'terminal', 'cli', 'token', 'tokens'].includes(token)
  ) && skill.install_cmd
    ? 3
    : 0

  return (sharedTags * 8) + (sharedTokens * 3) + installIntentBoost
}

const readBlogPost = cache(async (slug: string) => {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_DETAIL_COLUMNS)
    .eq('slug', slug)
    .single()

  if (error || !data) {
    if (error) {
      console.error('Error fetching blog post:', error)
    }
    return null
  }

  return normalizeDetail(data)
})

const readGuidePost = cache(async (slug: string) => {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_DETAIL_COLUMNS)
    .eq('slug', slug)
    .eq('category', 'guides')
    .single()

  if (error || !data) {
    if (error) {
      console.error('Error fetching guide:', error)
    }
    return null
  }

  return normalizeDetail(data)
})

export const getBlogPost = readBlogPost
export const getGuidePost = readGuidePost

export const getRecentBlogPosts = cache(async (limit = 3): Promise<BlogListItem[]> => {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS)
    .or(NON_GUIDE_FILTER)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error || !data) {
    if (error) {
      console.error('Error fetching recent blog posts:', error)
    }

    return []
  }

  return data.map(normalizePost)
})

export const getRecentGuidePosts = cache(async (limit = 3): Promise<BlogListItem[]> => {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS)
    .eq('category', 'guides')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error || !data) {
    if (error) {
      console.error('Error fetching recent guide posts:', error)
    }

    return []
  }

  return data.map(normalizePost)
})

export const getBlogSlugs = cache(async () => {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, category')
    .or(NON_GUIDE_FILTER)

  if (error || !data) {
    if (error) {
      console.error('Error fetching blog slugs:', error)
    }
    return []
  }

  return data
    .map((post) => post.slug)
    .filter(Boolean)
})

export const getGuideSlugs = cache(async () => {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('category', 'guides')

  if (error || !data) {
    if (error) {
      console.error('Error fetching guide slugs:', error)
    }
    return []
  }

  return data
    .map((post) => post.slug)
    .filter(Boolean)
})

export async function getRelatedBlogPosts(
  post: BlogDetail,
  options?: {
    limit?: number
    category?: string
  },
): Promise<RelatedBlogItem[]> {
  const limit = options?.limit ?? 3

  if (!supabase) {
    return []
  }

  const tags = post.tags.filter(Boolean)
  const category = options?.category ?? post.category

  let tagQuery = supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS)
    .neq('slug', post.slug)
    .limit(12)

  if (tags.length > 0) {
    tagQuery = tagQuery.overlaps('tags', tags)
  }

  let categoryQuery = supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS)
    .neq('slug', post.slug)
    .limit(12)

  if (category) {
    categoryQuery = categoryQuery.eq('category', category)
  } else {
    categoryQuery = categoryQuery.or(NON_GUIDE_FILTER)
  }

  let recentQuery = supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS)
    .neq('slug', post.slug)
    .order('published_at', { ascending: false })
    .limit(12)

  if (category === 'guides') {
    recentQuery = recentQuery.eq('category', 'guides')
  } else {
    recentQuery = recentQuery.or(NON_GUIDE_FILTER)
  }

  const results = await Promise.all([
    tags.length > 0 ? tagQuery : Promise.resolve({ data: [], error: null }),
    categoryQuery,
    recentQuery,
  ])

  const candidates = new Map<string, RelatedBlogItem>()

  for (const result of results) {
    if (result.error) {
      console.error('Error fetching related blog candidates:', result.error)
      continue
    }

    for (const row of result.data ?? []) {
      const normalized = normalizePost(row)
      candidates.set(normalized.slug, normalized)
    }
  }

  return Array.from(candidates.values())
    .map((candidate) => ({
      candidate,
      score: scoreRelatedPost(post, candidate),
    }))
    .sort((left, right) => right.score - left.score)
    .map(({ candidate }) => candidate)
    .slice(0, limit)
}

export async function getRelatedSkillsForPost(
  post: BlogDetail,
  limit = 3,
): Promise<RelatedSkillItem[]> {
  const skills = await getSkillsList()

  return skills
    .map((skill) => ({
      skill,
      score: scoreRelatedSkill(post, skill),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      return right.skill.upvotes - left.skill.upvotes
    })
    .map(({ skill }) => ({
      slug: skill.slug,
      name: skill.name,
      summary: skill.summary,
      category: skill.category,
      tags: skill.tags,
    }))
    .slice(0, limit)
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
  }).or(NON_GUIDE_FILTER)

  if (selectedTag) {
    countQuery = countQuery.contains('tags', [selectedTag])
  }

  const [{ count, error: countError }, { data: tagRows, error: tagsError }] =
    await Promise.all([
      countQuery,
      supabase.from('blog_posts').select('tags').or(NON_GUIDE_FILTER),
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
    .or(NON_GUIDE_FILTER)
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

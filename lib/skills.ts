import { cache } from 'react'

import { fallbackSkills } from '@/lib/catalog'
import { supabase } from '@/lib/supabase'

export type SkillListItem = {
  id: string
  name: string
  slug: string
  summary: string
  risk_level: 'low' | 'medium' | 'high'
  tags: string[]
  upvotes: number
  stars: number
  views: number
  category?: string
  install_cmd?: string
}

export type SkillDetail = SkillListItem & {
  description?: string
  permissions: string[]
  github_url?: string
  openclaw_version_range?: string
  features: string[]
  use_cases: string[]
}

const SKILL_LIST_COLUMNS =
  'id, name, slug, summary, risk_level, tags, upvotes, stars, views, category, install_cmd'
const SKILL_DETAIL_COLUMNS = `${SKILL_LIST_COLUMNS}, description, permissions, github_url, openclaw_version_range`

type RawSkill = {
  id?: string | number
  name?: string | null
  slug?: string | null
  summary?: string | null
  description?: string | null
  risk_level?: unknown
  tags?: unknown
  upvotes?: number | null
  stars?: number | null
  views?: number | null
  category?: string | null
  install_cmd?: string | null
  permissions?: unknown
  github_url?: string | null
  openclaw_version_range?: string | null
  features?: unknown
  use_cases?: unknown
}

function normalizeRiskLevel(value: unknown): SkillListItem['risk_level'] {
  if (value === 'high' || value === 'medium') {
    return value
  }

  return 'low'
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0,
  )
}

function normalizeSkill(item: RawSkill): SkillListItem {
  return {
    id: String(item.id ?? ''),
    name: item.name ?? 'Untitled skill',
    slug: item.slug ?? '',
    summary: item.summary ?? 'No summary available yet.',
    risk_level: normalizeRiskLevel(item.risk_level),
    tags: normalizeStringArray(item.tags),
    upvotes: typeof item.upvotes === 'number' ? item.upvotes : 0,
    stars: typeof item.stars === 'number' ? item.stars : 0,
    views: typeof item.views === 'number' ? item.views : 0,
    category: item.category ?? undefined,
    install_cmd: item.install_cmd ?? undefined,
  }
}

function normalizeSkillDetail(item: RawSkill): SkillDetail {
  return {
    ...normalizeSkill(item),
    description: item.description ?? undefined,
    permissions: normalizeStringArray(item.permissions),
    github_url: item.github_url ?? undefined,
    openclaw_version_range: item.openclaw_version_range ?? undefined,
    features: normalizeStringArray(item.features),
    use_cases: normalizeStringArray(item.use_cases),
  }
}

function getFallbackSkills(limit?: number) {
  const sorted = [...fallbackSkills]
    .map(normalizeSkill)
    .sort((left, right) => right.upvotes - left.upvotes)

  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted
}

const readSkillsList = cache(async () => {
  if (!supabase) {
    return getFallbackSkills()
  }

  const { data, error } = await supabase
    .from('skills')
    .select(SKILL_LIST_COLUMNS)
    .order('upvotes', { ascending: false })

  if (error || !data || data.length === 0) {
    return getFallbackSkills()
  }

  return data.map(normalizeSkill)
})

export async function getSkillsList(limit?: number): Promise<SkillListItem[]> {
  const skills = await readSkillsList()
  return typeof limit === 'number' ? skills.slice(0, limit) : skills
}

const readSkillDetail = cache(async (slug: string) => {
  const fallback = fallbackSkills.find((item) => item.slug === slug)

  if (!supabase) {
    return fallback ? normalizeSkillDetail(fallback) : null
  }

  const { data, error } = await supabase
    .from('skills')
    .select(SKILL_DETAIL_COLUMNS)
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return fallback ? normalizeSkillDetail(fallback) : null
  }

  return normalizeSkillDetail(data)
})

export const getSkillDetail = readSkillDetail

export const getSkillSlugs = cache(async () => {
  const fallbackSlugs = fallbackSkills.map((skill) => skill.slug).filter(Boolean)

  if (!supabase) {
    return fallbackSlugs
  }

  const { data, error } = await supabase
    .from('skills')
    .select('slug')

  if (error || !data) {
    return fallbackSlugs
  }

  return Array.from(
    new Set(
      [...data.map((skill) => skill.slug).filter(Boolean), ...fallbackSlugs],
    ),
  )
})

export async function getRelatedSkills(
  skill: Pick<SkillDetail, 'slug' | 'category'>,
  limit = 3,
): Promise<SkillListItem[]> {
  if (supabase && skill.category) {
    const { data } = await supabase
      .from('skills')
      .select(SKILL_LIST_COLUMNS)
      .eq('category', skill.category)
      .neq('slug', skill.slug)
      .limit(limit)

    if (data && data.length > 0) {
      return data.map(normalizeSkill)
    }
  }

  return fallbackSkills
    .map(normalizeSkillDetail)
    .filter((item) => item.slug !== skill.slug && item.category === skill.category)
    .slice(0, limit)
}

export async function getFeaturedSkills(limit = 3): Promise<SkillListItem[]> {
  const skills = await getSkillsList(limit)
  return skills.slice(0, limit)
}

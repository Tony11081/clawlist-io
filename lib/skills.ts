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

const SKILL_LIST_COLUMNS =
  'id, name, slug, summary, risk_level, tags, upvotes, stars, views, category, install_cmd'

type RawSkill = {
  id?: string | number
  name?: string | null
  slug?: string | null
  summary?: string | null
  risk_level?: unknown
  tags?: unknown
  upvotes?: number | null
  stars?: number | null
  views?: number | null
  category?: string | null
  install_cmd?: string | null
}

function normalizeRiskLevel(value: unknown): SkillListItem['risk_level'] {
  if (value === 'high' || value === 'medium') {
    return value
  }

  return 'low'
}

function normalizeSkill(item: RawSkill): SkillListItem {
  return {
    id: String(item.id ?? ''),
    name: item.name ?? 'Untitled skill',
    slug: item.slug ?? '',
    summary: item.summary ?? 'No summary available yet.',
    risk_level: normalizeRiskLevel(item.risk_level),
    tags: Array.isArray(item.tags) ? item.tags.filter(Boolean) : [],
    upvotes: typeof item.upvotes === 'number' ? item.upvotes : 0,
    stars: typeof item.stars === 'number' ? item.stars : 0,
    views: typeof item.views === 'number' ? item.views : 0,
    category: item.category ?? undefined,
    install_cmd: item.install_cmd ?? undefined,
  }
}

function getFallbackSkills(limit?: number) {
  const sorted = [...fallbackSkills]
    .map(normalizeSkill)
    .sort((left, right) => right.upvotes - left.upvotes)

  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted
}

export async function getSkillsList(limit?: number): Promise<SkillListItem[]> {
  if (!supabase) {
    return getFallbackSkills(limit)
  }

  let query = supabase
    .from('skills')
    .select(SKILL_LIST_COLUMNS)
    .order('upvotes', { ascending: false })

  if (typeof limit === 'number') {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error || !data || data.length === 0) {
    return getFallbackSkills(limit)
  }

  return data.map(normalizeSkill)
}

export async function getFeaturedSkills(limit = 3): Promise<SkillListItem[]> {
  const skills = await getSkillsList(limit)
  return skills.slice(0, limit)
}

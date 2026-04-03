import { buildSkillEditorialModule } from '@/lib/skill-editorial'

type BlogQualityInput = {
  title?: string | null
  summary?: string | null
  content?: string | null
}

type SkillQualityInput = {
  name?: string | null
  summary?: string | null
  description?: string | null
  install_cmd?: string | null
  github_url?: string | null
  permissions?: string[] | null
  tags?: string[] | null
  category?: string | null
  risk_level?: 'low' | 'medium' | 'high' | null
  slug?: string | null
  openclaw_version_range?: string | null
}

type QualityAssessment = {
  indexable: boolean
  reasons: string[]
}

const HAN_CHARACTERS = /[\u3400-\u9FFF]/u

function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function countWords(value?: string | null) {
  const cleaned = stripMarkdown(String(value ?? ''))

  if (!cleaned) {
    return 0
  }

  return cleaned.split(/\s+/).filter(Boolean).length
}

export function containsUnsupportedLanguage(value?: string | null) {
  return HAN_CHARACTERS.test(String(value ?? ''))
}

export function assessBlogIndexability(post: BlogQualityInput): QualityAssessment {
  const reasons: string[] = []
  const combined = `${post.title ?? ''} ${post.summary ?? ''} ${post.content ?? ''}`

  if (containsUnsupportedLanguage(combined)) {
    reasons.push('unsupported_language')
  }

  if (countWords(post.summary) < 12) {
    reasons.push('thin_summary')
  }

  if (countWords(post.content) < 700) {
    reasons.push('thin_content')
  }

  return {
    indexable: reasons.length === 0,
    reasons,
  }
}

export function assessSkillIndexability(skill: SkillQualityInput): QualityAssessment {
  const reasons: string[] = []
  const combined = [
    skill.name,
    skill.summary,
    skill.description,
    ...(skill.permissions ?? []),
  ].join(' ')
  const editorialText = buildSkillEditorialModule({
    id: '',
    name: skill.name ?? '',
    slug: skill.slug ?? '',
    summary: skill.summary ?? '',
    risk_level: skill.risk_level ?? 'low',
    tags: skill.tags ?? [],
    upvotes: 0,
    stars: 0,
    views: 0,
    category: skill.category ?? undefined,
    install_cmd: skill.install_cmd ?? undefined,
    description: skill.description ?? undefined,
    permissions: skill.permissions ?? [],
    github_url: skill.github_url ?? undefined,
    openclaw_version_range: skill.openclaw_version_range ?? undefined,
    features: [],
    use_cases: [],
  }).indexableText

  if (containsUnsupportedLanguage(combined)) {
    reasons.push('unsupported_language')
  }

  if (countWords(skill.summary) < 6) {
    reasons.push('thin_summary')
  }

  if (countWords(skill.description) < 12) {
    reasons.push('thin_description')
  }

  if (countWords(`${skill.summary ?? ''} ${skill.description ?? ''} ${editorialText}`) < 220) {
    reasons.push('thin_detail_page')
  }

  if (!String(skill.install_cmd ?? '').trim()) {
    reasons.push('missing_install_command')
  }

  if (!String(skill.github_url ?? '').trim()) {
    reasons.push('missing_source_link')
  }

  return {
    indexable: reasons.length === 0,
    reasons,
  }
}

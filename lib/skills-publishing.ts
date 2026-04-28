type SkillPublishingInput = {
  category?: string | null
  github_url?: string | null
  install_cmd?: string | null
  name?: string | null
  summary?: string | null
}

const HAN_CHARACTERS = /[\u3400-\u9FFF]/u

const categoryAliases: Record<string, string> = {
  ai: 'AI',
  automation: 'Automation',
  creative: 'Creative',
  customerservice: 'Customer Service',
  'customer service': 'Customer Service',
  data: 'Data',
  development: 'Development',
  devops: 'DevOps',
  marketing: 'Marketing',
  operations: 'Operations',
  productivity: 'Productivity',
  'social media': 'Social Media',
  'social-media': 'Social Media',
  support: 'Support',
  testing: 'Testing',
  utilities: 'Utilities',
  创作: 'Creative',
  代码: 'Development',
  数据: 'Data',
  文档: 'Utilities',
  日程: 'Productivity',
  自动化: 'Automation',
  社媒: 'Social Media',
  笔记: 'Productivity',
  营销: 'Marketing',
  通讯: 'Communication',
}

export function containsHanCharacters(value?: string | null) {
  return HAN_CHARACTERS.test(String(value ?? ''))
}

export function normalizeSkillCategory(category?: string | null) {
  if (!category) {
    return undefined
  }

  const trimmed = category.trim()
  if (!trimmed) {
    return undefined
  }

  const normalized = categoryAliases[trimmed.toLowerCase()] ?? categoryAliases[trimmed]
  if (normalized) {
    return normalized
  }

  if (containsHanCharacters(trimmed)) {
    return undefined
  }

  return trimmed
}

function hasRequiredSourceLink(value?: string | null) {
  const trimmed = String(value ?? '').trim()

  return /^https?:\/\//i.test(trimmed)
}

export function assessSkillPublishability(skill: SkillPublishingInput) {
  const reasons: string[] = []

  if (containsHanCharacters(skill.name) || containsHanCharacters(skill.summary) || containsHanCharacters(skill.category)) {
    reasons.push('non_english_copy')
  }

  if (!String(skill.summary ?? '').trim()) {
    reasons.push('missing_summary')
  }

  if (!String(skill.install_cmd ?? '').trim()) {
    reasons.push('missing_install_command')
  }

  if (!hasRequiredSourceLink(skill.github_url)) {
    reasons.push('missing_source_link')
  }

  return {
    published: reasons.length === 0,
    reasons,
  }
}

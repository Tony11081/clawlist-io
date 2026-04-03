import type { SkillDetail, SkillListItem } from '@/lib/skills'

export type SkillEditorialModule = {
  assessment: {
    eyebrow: string
    heading: string
    paragraphs: string[]
    highlights: Array<{
      label: string
      value: string
    }>
  }
  workflows: string[]
  rolloutChecklist: string[]
  faq: Array<{
    question: string
    answer: string
  }>
  indexableText: string
}

export type PrioritySkillReview = {
  alternatives: string[]
  bestFor: string
  caveats: string[]
  lastReviewed: string
  sourceLinks: Array<{
    href: string
    label: string
  }>
  whyItMatters: string
}

function toWords(value?: string | null) {
  return String(value ?? '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function sentenceCase(value?: string | null) {
  const cleaned = toWords(value).replace(/[.。!?]+$/g, '')

  if (!cleaned) {
    return ''
  }

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

function humanJoin(values: string[]) {
  if (values.length === 0) {
    return ''
  }

  if (values.length === 1) {
    return values[0]
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`
  }

  return `${values.slice(0, -1).join(', ')}, and ${values.at(-1)}`
}

function uniqueNormalized(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((value) => sentenceCase(value))
        .filter(Boolean),
    ),
  )
}

function getInstallSurface(installCmd?: string) {
  const normalized = String(installCmd ?? '').trim().toLowerCase()

  if (!normalized) {
    return 'a manual install path'
  }

  if (normalized.startsWith('npx')) {
    return 'an npm-based install path'
  }

  if (normalized.startsWith('npm')) {
    return 'a Node package install path'
  }

  if (normalized.startsWith('pnpm')) {
    return 'a pnpm install path'
  }

  if (normalized.startsWith('yarn')) {
    return 'a Yarn install path'
  }

  if (normalized.startsWith('brew')) {
    return 'a Homebrew install path'
  }

  if (normalized.startsWith('pip') || normalized.startsWith('python')) {
    return 'a Python install path'
  }

  if (normalized.startsWith('cargo')) {
    return 'a Rust install path'
  }

  if (normalized.startsWith('go ')) {
    return 'a Go install path'
  }

  return 'a CLI-based install path'
}

function getRiskGuidance(riskLevel: SkillDetail['risk_level']) {
  if (riskLevel === 'high') {
    return 'requires a tighter review before production use'
  }

  if (riskLevel === 'medium') {
    return 'should be tested in a controlled environment before wider rollout'
  }

  return 'can usually be trialed quickly, as long as the source and permissions still get reviewed'
}

function getAudience(skill: SkillDetail) {
  const signal = `${skill.category ?? ''} ${skill.tags.join(' ')} ${skill.summary} ${skill.description ?? ''}`.toLowerCase()

  if (/browser|playwright|crawler|scrap|cdp/.test(signal)) {
    return 'teams automating browsers, app flows, and web data collection'
  }

  if (/github|git|pull request|repo|issue|ci|deploy/.test(signal)) {
    return 'engineering teams running repository, CI, and issue workflows'
  }

  if (/email|newsletter|subscriber|crm/.test(signal)) {
    return 'ops and marketing teams managing lifecycle and outbound communication'
  }

  if (/wechat|social|publisher|content|video|marketing/.test(signal)) {
    return 'content, growth, and distribution teams shipping repeatable publishing workflows'
  }

  if (/notes|obsidian|apple|mac|desktop/.test(signal)) {
    return 'power users who want local desktop workflows and operating-system level automation'
  }

  return 'operators looking for a reusable AI workflow building block'
}

function getSourceLinks(skill: SkillDetail) {
  const links = []

  if (skill.github_url) {
    links.push({
      href: skill.github_url,
      label: `${skill.name} source repository`,
    })

    try {
      const url = new URL(skill.github_url)

      if (url.pathname.replace(/\/+$/, '')) {
        links.push({
          href: url.origin,
          label: `${url.hostname} homepage`,
        })
      }
    } catch {
      // Ignore malformed URLs and keep the primary source link.
    }
  }

  return Array.from(
    new Map(links.map((link) => [link.href, link])).values(),
  )
}

function getPrimaryTags(skill: SkillDetail) {
  return uniqueNormalized(skill.tags.slice(0, 3).map((tag) => tag.replace(/-/g, ' ')))
}

function getPermissionSummary(skill: SkillDetail) {
  if (!skill.permissions.length) {
    return 'No explicit permission list is published in the current record, so verify the runtime surface in the source repository before rollout.'
  }

  const permissions = uniqueNormalized(skill.permissions.slice(0, 4))
  return `The current record points to ${humanJoin(permissions)} as part of the operational surface, which should be reviewed during security and workflow testing.`
}

function getWorkflowBullets(skill: SkillDetail) {
  const primaryTags = getPrimaryTags(skill)
  const category = sentenceCase(skill.category) || 'AI workflow'
  const summary = sentenceCase(skill.summary)
  const bullets = [
    `${skill.name} is best evaluated in ${category.toLowerCase()} environments where ${summary.toLowerCase()}.`,
    primaryTags.length > 0
      ? `Shortlist it when your team is actively comparing options for ${humanJoin(primaryTags).toLowerCase()} workflows.`
      : `Shortlist it when you need a public, source-linked skill that can be tested from a real install command instead of a mock integration.`,
    `Use a disposable workspace for the first pass so you can confirm the install flow, repository quality, and downstream permissions before broader adoption.`,
  ]

  return uniqueNormalized(bullets)
}

export function buildSkillEditorialModule(skill: SkillDetail): SkillEditorialModule {
  const category = sentenceCase(skill.category) || 'AI workflow'
  const summary = sentenceCase(skill.summary)
  const description = sentenceCase(skill.description)
  const installSurface = getInstallSurface(skill.install_cmd)
  const primaryTags = getPrimaryTags(skill)
  const audience = getAudience(skill)
  const sourceLabel = skill.github_url ? 'Public source link available' : 'Source link not published'
  const setupLabel = skill.install_cmd ? 'Install command documented' : 'Install command not documented'

  const paragraphs = [
    `${skill.name} is currently positioned as a ${category.toLowerCase()} skill for ${audience}. Based on the available metadata, the core job to be done is straightforward: ${summary.toLowerCase()}.`,
    description
      ? `The current description adds a practical clue about how the skill behaves in the field: ${description.toLowerCase()}. Combined with ${installSurface}, this makes ${skill.name} easier to evaluate than pages that only list a name and external link.`
      : `Even without a long-form writeup, the page now surfaces the practical signals Google and human readers both look for: ${installSurface}, a public source link, workflow tags, and explicit review notes before production use.`,
    `${skill.name} ${getRiskGuidance(skill.risk_level)}. ${getPermissionSummary(skill)}`,
  ]

  const highlights = [
    {
      label: 'Best fit',
      value: audience,
    },
    {
      label: 'Install surface',
      value: skill.install_cmd ?? 'Ask the maintainer for a verified install path before adoption.',
    },
    {
      label: 'Source signal',
      value: skill.github_url ? sourceLabel : 'No public source repository is linked on this record.',
    },
    {
      label: 'Workflow tags',
      value: primaryTags.length > 0 ? humanJoin(primaryTags) : 'No structured tags are published yet.',
    },
    {
      label: 'Adoption posture',
      value: setupLabel,
    },
    {
      label: 'Risk review',
      value: sentenceCase(getRiskGuidance(skill.risk_level)),
    },
  ]

  const rolloutChecklist = [
    skill.github_url
      ? `Review the source repository at ${skill.github_url} and confirm the README, maintenance activity, and install notes are still current.`
      : `Track down the primary source documentation before deploying ${skill.name} anywhere outside a disposable environment.`,
    skill.install_cmd
      ? `Run \`${skill.install_cmd}\` in a disposable environment first so you can confirm package resolution, dependencies, and rollback steps.`
      : `Document a reproducible install path before trying to operationalize ${skill.name} across multiple machines or contributors.`,
    skill.permissions.length > 0
      ? `Verify whether ${humanJoin(uniqueNormalized(skill.permissions.slice(0, 4))).toLowerCase()} matches your security expectations and least-privilege model.`
      : `Capture the permissions and runtime surface during the first install, because the current record does not yet publish a detailed permission map.`,
    primaryTags.length > 0
      ? `Map ${skill.name} against the rest of your stack in ${humanJoin(primaryTags).toLowerCase()} workflows so the team knows whether it is a standalone tool or a supporting utility.`
      : `Decide whether ${skill.name} belongs in a production workflow, an internal ops stack, or a one-off experiment before wider rollout.`,
  ]

  const faq = [
    {
      question: `What does ${skill.name} help with?`,
      answer: `${skill.name} is positioned as a ${category.toLowerCase()} skill. Based on the current summary and tags, it is most relevant for ${audience}, especially when the workflow requires ${summary.toLowerCase()}.`,
    },
    {
      question: `How should I evaluate ${skill.name} before using it in production?`,
      answer: skill.install_cmd
        ? `Start by running ${skill.install_cmd} in a disposable environment, then review the source repository, permission surface, and any workflow-specific dependencies before wider rollout.`
        : `Start with the source repository or original documentation, document a reproducible install path, and only move to production after you verify permissions, dependencies, and rollback steps.`,
    },
    {
      question: `Why does this page include editorial guidance instead of only the upstream docs?`,
      answer: `ClawList is trying to make each skill page more useful than a bare directory listing. That means surfacing practical signals like the install surface, source link, permissions, workflow fit, and rollout considerations in one place.`,
    },
    {
      question: `Who is the best first user for ${skill.name}?`,
      answer: `The best first evaluator is usually the operator or engineer already responsible for ${category.toLowerCase()} workflows, because they can verify whether ${skill.name} matches the current stack, risk tolerance, and maintenance expectations.`,
    },
  ]

  const indexableText = [
    ...paragraphs,
    ...highlights.map((item) => `${item.label} ${item.value}`),
    ...getWorkflowBullets(skill),
    ...rolloutChecklist,
    ...faq.flatMap((item) => [item.question, item.answer]),
  ].join(' ')

  return {
    assessment: {
      eyebrow: 'Editorial assessment',
      heading: `Where ${skill.name} fits`,
      paragraphs,
      highlights,
    },
    workflows: getWorkflowBullets(skill),
    rolloutChecklist,
    faq,
    indexableText,
  }
}

export function buildPrioritySkillReview(
  skill: SkillDetail,
  relatedSkills: SkillListItem[],
): PrioritySkillReview {
  const audience = getAudience(skill)

  return {
    whyItMatters: `${skill.name} earns extra editorial attention because it already sits near the top of the skill library by usage or voting signal. For ClawList readers, that makes it a better candidate for deeper evaluation than a one-line listing or an untested community import.`,
    bestFor: `Best for ${audience}. This is the kind of skill worth reviewing when you are standardizing a workflow, not just experimenting in a throwaway session.`,
    caveats: [
      `Even strong community signals do not replace a source review. Check the install path, maintenance history, and permission surface before wider rollout.`,
      skill.openclaw_version_range
        ? `This skill advertises compatibility with OpenClaw ${skill.openclaw_version_range}, so confirm your runtime version before you depend on it.`
        : `Compatibility details are still thin on the current record, so capture your working runtime assumptions during the first implementation pass.`,
      `Compare ${skill.name} against adjacent options before standardizing it, because the highest-voted skill is not always the best fit for your exact repo, team, or automation surface.`,
    ],
    alternatives: relatedSkills
      .map((related) => related.name)
      .filter((name) => name !== skill.name)
      .slice(0, 3),
    lastReviewed: 'April 3, 2026',
    sourceLinks: getSourceLinks(skill),
  }
}

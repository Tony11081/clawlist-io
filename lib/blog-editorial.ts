import type { RelatedSkillItem } from '@/lib/blog'
import type { TopicHub } from '@/lib/topic-hubs'

type BlogEditorialModule = {
  bestFor: string
  caveats: string[]
  highlights: Array<{
    label: string
    value: string
  }>
  whyItMatters: string
}

type BlogEditorialInput = {
  category?: string
  slug: string
  summary: string
  tags: string[]
  title: string
}

function sentenceCase(value?: string | null) {
  const cleaned = String(value ?? '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.。!?]+$/g, '')

  if (!cleaned) {
    return ''
  }

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

function inferReaderProfile(post: BlogEditorialInput) {
  const signal = `${post.title} ${post.summary} ${post.tags.join(' ')} ${post.category ?? ''}`.toLowerCase()

  if (/prompt|architecture|memory|context|skills/.test(signal)) {
    return 'operators designing agent systems, prompt layers, or reusable AI workflows'
  }

  if (/linear|planning|task|project|calendar|schedule/.test(signal)) {
    return 'teams turning AI output into repeatable execution, planning, and task management'
  }

  if (/marketing|seo|geo|video|social|growth/.test(signal)) {
    return 'growth, marketing, and distribution teams testing how AI changes campaign execution'
  }

  if (/browser|electron|cdp|automation|nodes/.test(signal)) {
    return 'builders evaluating browser, desktop, or device automation with AI agents'
  }

  return 'readers who want practical judgment on where a workflow or tool actually fits'
}

function inferCaveats(post: BlogEditorialInput) {
  const signal = `${post.title} ${post.summary} ${post.tags.join(' ')} ${post.category ?? ''}`.toLowerCase()
  const caveats = [
    'Product screenshots, pricing, and launch claims can change faster than the underlying workflow pattern, so verify current vendor details before rollout.',
  ]

  if (/tutorial|setup|configuration|install|environment/.test(signal)) {
    caveats.push('Treat setup instructions as a starting point and confirm environment variables, SDK versions, and permissions against the latest upstream docs.')
  }

  if (/marketing|seo|geo|social|video/.test(signal)) {
    caveats.push('Distribution playbooks age quickly, especially when rankings, platform limits, or feed behavior shift between product cycles.')
  }

  if (/prompt|architecture|memory|agent/.test(signal)) {
    caveats.push('Architecture patterns rarely transfer one-to-one across agent runtimes, so adapt the pattern to your own tool surface instead of copying it blindly.')
  }

  return caveats.slice(0, 3)
}

export function buildBlogEditorialModule(
  post: BlogEditorialInput,
  relatedSkills: RelatedSkillItem[],
  topicHub?: TopicHub | null,
): BlogEditorialModule {
  const readerProfile = inferReaderProfile(post)
  const bestSkill = relatedSkills[0]
  const topicSummary = topicHub?.summary
  const headline = sentenceCase(post.summary) || sentenceCase(post.title)

  return {
    whyItMatters: topicSummary
      ? `${sentenceCase(post.title)} belongs to a broader ClawList coverage cluster: ${topicSummary.toLowerCase()} This article matters because it turns that cluster into a concrete read for ${readerProfile}.`
      : `${sentenceCase(post.title)} matters because it converts a fast-moving AI topic into something readers can judge in workflow terms instead of launch-copy terms. ${headline}.`,
    bestFor: `Best for ${readerProfile}. If you are deciding whether this topic changes your current stack, this is the kind of page you read before you commit engineering time or rewrite an ops process.`,
    caveats: inferCaveats(post),
    highlights: [
      {
        label: 'Primary angle',
        value: sentenceCase(post.category) || 'AI workflow coverage',
      },
      {
        label: 'Best next move',
        value: bestSkill
          ? `Pair this article with ${bestSkill.name} if you want to turn the idea into a testable workflow.`
          : 'Use the related ClawList skills and topic hubs to move from reading into implementation.',
      },
      {
        label: 'Why now',
        value: `This piece helps readers decide what is signal versus noise in ${sentenceCase(post.title).toLowerCase()}.`,
      },
    ],
  }
}


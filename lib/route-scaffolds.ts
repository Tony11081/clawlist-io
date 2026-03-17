import type { Metadata } from 'next'
import generatedPagesData from '@/data/generated-pages.json'

export type GeneratedPageEntry = {
  path: string
  title: string
  description: string
  h1: string
  intro: string
  section: string
  highlights: string[]
  ctaHref: string
  ctaLabel: string
  sourcePaths: string[]
}

type GeneratedPagesDocument = {
  pages: GeneratedPageEntry[]
}

type SectionConfig = {
  label: string
  ctaHref: string
  ctaLabel: string
}

const generatedPages = (generatedPagesData as GeneratedPagesDocument).pages

const sectionMap: Record<string, SectionConfig> = {
  'api-marketplace': {
    label: 'API Marketplace',
    ctaHref: '/api-marketplace',
    ctaLabel: 'Compare API providers',
  },
  auth: {
    label: 'Account Access',
    ctaHref: '/auth/login',
    ctaLabel: 'Open the login page',
  },
  compare: {
    label: 'Skill Comparison',
    ctaHref: '/skills',
    ctaLabel: 'Browse the skills library',
  },
  guides: {
    label: 'Guides',
    ctaHref: '/guides',
    ctaLabel: 'Browse ClawList guides',
  },
  models: {
    label: 'Models',
    ctaHref: '/models',
    ctaLabel: 'Open the model guide',
  },
  privacy: {
    label: 'Privacy',
    ctaHref: '/privacy',
    ctaLabel: 'Review the privacy policy',
  },
  recipes: {
    label: 'Recipes',
    ctaHref: '/recipes',
    ctaLabel: 'Browse job recipes',
  },
  security: {
    label: 'Security',
    ctaHref: '/security',
    ctaLabel: 'Open the security center',
  },
  skills: {
    label: 'Skills',
    ctaHref: '/skills',
    ctaLabel: 'Browse the skills library',
  },
  submit: {
    label: 'Submission',
    ctaHref: '/contact',
    ctaLabel: 'Open the contact page',
  },
  terms: {
    label: 'Legal',
    ctaHref: '/terms',
    ctaLabel: 'Review the terms',
  },
}

const acronymMap: Record<string, string> = {
  ai: 'AI',
  api: 'API',
  cli: 'CLI',
  crm: 'CRM',
  cta: 'CTA',
  faq: 'FAQ',
  seo: 'SEO',
  ssh: 'SSH',
  ui: 'UI',
  ux: 'UX',
}

function titleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function normalizeRoutePath(path: string) {
  if (!path || path === '/') {
    return '/'
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  return normalized.replace(/\/+$/, '')
}

export function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((token) => acronymMap[token.toLowerCase()] ?? titleCase(token))
    .join(' ')
}

function inferSection(segments: string[], sourcePaths: string[]) {
  const explicitSection = sectionMap[segments[0] ?? '']

  if (explicitSection) {
    return explicitSection
  }

  for (const sourcePath of sourcePaths) {
    const sourceSegments = sourcePath.split('/').filter(Boolean)
    const sourceSection = sectionMap[sourceSegments[0] ?? '']

    if (sourceSection) {
      return sourceSection
    }
  }

  return {
    label: 'ClawList',
    ctaHref: '/guides',
    ctaLabel: 'Return to the guide index',
  }
}

function buildTopicLabel(segments: string[]) {
  if (segments.length === 0) {
    return 'ClawList Resource'
  }

  if (segments.length === 1) {
    return `${humanizeSlug(segments[0])} Guide`
  }

  return humanizeSlug(segments[segments.length - 1])
}

function buildPageTitle(topic: string, section: SectionConfig) {
  const normalizedTopic = topic.toLowerCase()
  const normalizedSection = section.label.toLowerCase()

  if (normalizedTopic.includes(normalizedSection)) {
    return topic
  }

  return section.label === 'ClawList' ? topic : `${topic} ${section.label}`
}

export function createGeneratedPageEntry(path: string, sourcePaths: string[] = []): GeneratedPageEntry {
  const normalizedPath = normalizeRoutePath(path)
  const segments = normalizedPath.split('/').filter(Boolean)
  const section = inferSection(segments, sourcePaths)
  const topic = buildTopicLabel(segments)
  const title = buildPageTitle(topic, section)
  const topicLower = topic.toLowerCase()

  return {
    path: normalizedPath,
    title,
    description: `Practical ClawList guidance for ${topicLower}, including prerequisites, guardrails, and the next internal resource to open.`,
    h1: title,
    intro: `This page covers ${topicLower} inside ClawList so visitors can recover from a dead link and continue with a clear next step instead of hitting a 404.`,
    section: section.label,
    highlights: [
      `What ${topicLower} is used for in the ClawList workflow`,
      `Which prerequisites or decisions matter before you continue`,
      `Where to go next if you need more detailed setup help`,
    ],
    ctaHref: section.ctaHref,
    ctaLabel: section.ctaLabel,
    sourcePaths: Array.from(new Set(sourcePaths)).sort(),
  }
}

export function getGeneratedPages() {
  return generatedPages
    .map((page) => ({
      ...page,
      path: normalizeRoutePath(page.path),
      sourcePaths: Array.from(new Set(page.sourcePaths ?? [])).sort(),
    }))
    .sort((left, right) => left.path.localeCompare(right.path))
}

export function getGeneratedPage(path: string) {
  const normalizedPath = normalizeRoutePath(path)
  return getGeneratedPages().find((page) => page.path === normalizedPath)
}

export function buildGeneratedPageMetadata(page: GeneratedPageEntry): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
  }
}

import rawSections from '@/data/ecosystem-directory.json'

type RawDirectoryItem = {
  id: string
  name: string
  url: string
  hostname: string
  logo?: string
}

type RawDirectorySection = {
  key: string
  category: string
  summary: string
  items: RawDirectoryItem[]
}

type SectionEditorialPreset = {
  briefLead: string
  bestFor: string
  caveat: string
}

export type EcosystemDirectorySourceLink = {
  href: string
  label: string
}

export type EcosystemDirectoryItem = {
  id: string
  name: string
  slug: string
  url: string
  hostname: string
  logo?: string
  internalHref: string
  brief: string
  whyItMatters: string
  bestFor: string
  caveats: string
  alternatives: string[]
  lastReviewed: string
  sourceLinks: EcosystemDirectorySourceLink[]
  sectionKey: string
  sectionCategory: string
}

export type EcosystemDirectorySection = {
  key: string
  category: string
  summary: string
  items: EcosystemDirectoryItem[]
  cardLabel: string
}

const DIRECTORY_LAST_REVIEWED = 'April 3, 2026'

const nameOverrides: Record<string, string> = {
  'OpenClaw official website': 'OpenClaw',
  'Official GitHub': 'OpenClaw GitHub',
  'Button Coze': 'Coze',
  'LobsterAI Youdao Lobster': 'Youdao LobsterAI',
  '360 safe lobster': '360 Secure Lobster',
  'Tabbit browser': 'Tabbit Browser',
  'Official documentation': 'Official Docs',
  'OpenClaw Chinese Learning Manual': 'OpenClaw Learning Manual',
  'OpenClaw from Beginner to Master': 'OpenClaw: Beginner to Advanced',
  'Hello Claw Tutorial': 'Hello Claw Tutorials',
  'Awesome Tutorial': 'Awesome Tutorials',
  'Mala Playbook to Play Shrimp': 'Mala Playbook',
  'Complete Collection of Chinese Use Cases': 'Chinese Use Case Library',
  'bean bag': 'Doubao',
  'Dream AI': 'Jimeng AI',
  'Coding Plan': 'Zhipu Coding Plan',
  'volcano engine': 'Volcano Engine',
  'silicon based flow': 'SiliconFlow',
  'iFlytek Spark': 'iFlytek Spark',
  GLM: 'Zhipu GLM',
  'shrimp chat': 'Xialiao',
  'Exposure observation board': 'Exposure Dashboard',
  'fish market': 'Aquatic Market',
  'OpenClaw use cases': 'OpenClaw Use Cases',
  'Reddit section': 'Reddit Community',
  'Discord official server': 'Official Discord Server',
}

const cardLabelMap: Record<string, string> = {
  'openclaw-landscape': 'OpenClaw Surface',
  'cloud-deployment': 'Deployment Option',
  'tutorial-collections': 'Guide Library',
  'popular-ai-tools': 'AI Tool',
  'coding-plans': 'Coding Plan',
  'maas-platforms': 'Model Platform',
  'ai-models': 'Model Family',
  'skills-marketplaces': 'Skill Hub',
  'broader-ecosystem': 'Ecosystem Tool',
  'agent-ecosystem': 'Agent Product',
  'agent-payments': 'Payment Layer',
  'crypto-ecosystem': 'Crypto Product',
}

const sectionEditorialMap: Record<string, SectionEditorialPreset> = {
  'openclaw-landscape': {
    briefLead: 'shows where readers can actually encounter the OpenClaw experience in the wild',
    bestFor: 'Teams comparing hosted OpenClaw surfaces, launchers, and community entry points before they pick a default interface.',
    caveat: 'Product naming, regional access, and account requirements move quickly across hosted OpenClaw surfaces, so always verify the current product state on the source page.',
  },
  'cloud-deployment': {
    briefLead: 'helps operators compare where AI agents, browsers, and remote sessions can run',
    bestFor: 'Operators deciding where to deploy agents, browser automation, or remote workspaces without locking into a single runtime too early.',
    caveat: 'Pricing, region coverage, and GPU availability can change without much notice across cloud and desktop deployment vendors.',
  },
  'tutorial-collections': {
    briefLead: 'acts as a starting point when readers need implementation guidance rather than another product page',
    bestFor: 'Readers who want tutorials, setup walkthroughs, and examples before they install tools or rewrite their workflow stack.',
    caveat: 'Tutorial libraries age fast, so validate versions, screenshots, and environment assumptions before following older walkthroughs line by line.',
  },
  'popular-ai-tools': {
    briefLead: 'keeps ClawList readers aware of adjacent products shaping day-to-day AI usage',
    bestFor: 'Teams scanning adjacent AI tools and interfaces to understand where product expectations are moving outside their current stack.',
    caveat: 'These products often optimize for different audiences and regions, so compare the intended workflow before treating them as direct substitutes.',
  },
  'coding-plans': {
    briefLead: 'captures the planning and execution layers engineers keep comparing around coding agents',
    bestFor: 'Engineering teams evaluating how coding agents handle planning, repo work, task decomposition, and autonomous execution.',
    caveat: 'Execution quality depends heavily on model choice, repo shape, and permissions, so treat any plan as a starting point rather than a promise.',
  },
  'maas-platforms': {
    briefLead: 'maps the model access layer behind many AI products and custom stacks',
    bestFor: 'Teams choosing vendor routing, model access, and API aggregation layers before they standardize procurement or build internal tooling.',
    caveat: 'Model availability, rate limits, and pricing frequently shift across MaaS platforms, so never rely on stale screenshots or copied tables.',
  },
  'ai-models': {
    briefLead: 'helps readers compare the model families sitting under new AI launches',
    bestFor: 'Buyers and operators who need to compare base models for cost, context, multimodality, and workflow fit.',
    caveat: 'Model branding can hide version drift, so confirm the exact model release, endpoint, and context limits on the source platform before rollout.',
  },
  'skills-marketplaces': {
    briefLead: 'shows where reusable skills, prompts, and workflow add-ons are already being shared',
    bestFor: 'Practitioners searching for install-ready skills, prompt bundles, or ecosystem libraries they can evaluate against ClawList coverage.',
    caveat: 'Marketplace quality varies widely, so review maintenance signals, permissions, and install steps before adopting community packages.',
  },
  'broader-ecosystem': {
    briefLead: 'connects the surrounding tools and communities shaping how teams actually use AI products',
    bestFor: 'Readers mapping the surrounding ecosystem of communities, interfaces, and utility layers that influence tool adoption.',
    caveat: 'Some ecosystem entries are communities or discovery layers rather than products, so check moderation quality and account requirements before joining.',
  },
  'agent-ecosystem': {
    briefLead: 'shows which products are competing to become the default agent surface',
    bestFor: 'Buyers comparing full agent products, orchestration surfaces, and consumer-facing AI experiences beyond one vendor stack.',
    caveat: 'Agent products move fast and often overclaim autonomy, so compare the actual workflow depth, not just launch copy or headline positioning.',
  },
  'agent-payments': {
    briefLead: 'highlights the payment and monetization rails showing up around AI agents',
    bestFor: 'Teams thinking about billing, checkout, payouts, or agent monetization layers around AI products and creator workflows.',
    caveat: 'Payment products vary by region, compliance posture, and supported merchant models, so legal and finance review is still required.',
  },
  'crypto-ecosystem': {
    briefLead: 'tracks the overlap between AI tooling, crypto-native distribution, and speculative product layers',
    bestFor: 'Readers following crypto-native AI experiments, payment layers, or communities that influence the broader tooling conversation.',
    caveat: 'Crypto-adjacent products can be volatile, region-sensitive, and heavily narrative-driven, so verify trust signals and policy fit before deeper adoption.',
  },
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function sentenceCase(value: string) {
  const cleaned = value.trim().replace(/[.]+$/g, '')

  if (!cleaned) {
    return ''
  }

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

function buildUniqueSlug(name: string, itemId: string, existingSlugs: Set<string>) {
  const base = slugify(name) || slugify(itemId)

  if (!existingSlugs.has(base)) {
    existingSlugs.add(base)
    return base
  }

  const withSuffix = `${base}-${itemId.split('-').at(-1) ?? existingSlugs.size + 1}`
  existingSlugs.add(withSuffix)
  return withSuffix
}

function getSourceLinks(item: RawDirectoryItem, name: string): EcosystemDirectorySourceLink[] {
  const links: EcosystemDirectorySourceLink[] = []

  try {
    const url = new URL(item.url)
    const path = url.pathname.replace(/\/+$/, '')

    links.push({
      href: item.url,
      label: item.hostname === 'github.com' ? `${name} source` : `${name} official page`,
    })

    if (path && path !== '/') {
      links.push({
        href: url.origin,
        label: `${url.hostname} homepage`,
      })
    }
  } catch {
    links.push({
      href: item.url,
      label: `${name} source`,
    })
  }

  return Array.from(
    new Map(links.map((link) => [link.href, link])).values(),
  )
}

function getAlternatives(items: RawDirectoryItem[], currentName: string) {
  return items
    .map((item) => nameOverrides[item.name] ?? item.name)
    .filter((name) => name !== currentName)
    .slice(0, 3)
}

function buildBrief(
  section: RawDirectorySection,
  itemName: string,
  hostname: string,
  preset: SectionEditorialPreset,
) {
  return `${itemName} sits inside ClawList's ${section.category.toLowerCase()} watchlist because it ${preset.briefLead} on ${hostname}.`
}

function buildWhyItMatters(
  section: RawDirectorySection,
  itemName: string,
  hostname: string,
) {
  return `${itemName} matters here because it gives readers a concrete reference point inside ${section.category.toLowerCase()} research. Rather than treating ${hostname} as just another link on a board, ClawList uses it as a signal for how this part of the AI stack is currently being packaged, distributed, or documented.`
}

const existingSlugs = new Set<string>()

const sections = (rawSections as RawDirectorySection[]).map((section) => {
  const preset = sectionEditorialMap[section.key] ?? {
    briefLead: 'gives readers a live reference point inside this market slice',
    bestFor: 'Readers who want a concrete source to compare against the rest of ClawList coverage.',
    caveat: 'Availability, product positioning, and pricing can change quickly, so verify the source page before making workflow decisions.',
  }

  const items = section.items.map((item) => {
    const name = nameOverrides[item.name] ?? item.name
    const slug = buildUniqueSlug(name, item.id, existingSlugs)

    return {
      id: item.id,
      name,
      slug,
      url: item.url,
      hostname: item.hostname,
      logo: item.logo,
      internalHref: `/directory/${slug}`,
      brief: buildBrief(section, name, item.hostname, preset),
      whyItMatters: buildWhyItMatters(section, name, item.hostname),
      bestFor: preset.bestFor,
      caveats: `${sentenceCase(preset.caveat)} ClawList recommends checking source freshness, pricing, and account requirements before you depend on it.`,
      alternatives: getAlternatives(section.items, name),
      lastReviewed: DIRECTORY_LAST_REVIEWED,
      sourceLinks: getSourceLinks(item, name),
      sectionKey: section.key,
      sectionCategory: section.category,
    }
  })

  return {
    key: section.key,
    category: section.category,
    summary: section.summary,
    items,
    cardLabel: cardLabelMap[section.key] ?? 'Resource',
  }
})

const ecosystemDirectoryItems = sections.flatMap((section) => section.items)
const itemMap = new Map(ecosystemDirectoryItems.map((item) => [item.slug, item]))

export const ecosystemDirectorySections: EcosystemDirectorySection[] = sections

export function getEcosystemDirectoryStats() {
  return {
    totalCategories: sections.length,
    totalResources: sections.reduce((sum, section) => sum + section.items.length, 0),
  }
}

export function getFeaturedEcosystemSections(limit = 4) {
  return [...sections]
    .sort((left, right) => right.items.length - left.items.length)
    .slice(0, limit)
}

export function getFeaturedEcosystemItems(limit = 6) {
  const primary = sections
    .map((section) => section.items[0])
    .filter(Boolean)

  if (primary.length >= limit) {
    return primary.slice(0, limit)
  }

  const seen = new Set(primary.map((item) => item.slug))
  const remainder = ecosystemDirectoryItems.filter((item) => !seen.has(item.slug))

  return [...primary, ...remainder].slice(0, limit)
}

export function getEcosystemDirectoryItem(slug: string) {
  return itemMap.get(slug) ?? null
}

export function getEcosystemDirectorySlugs() {
  return ecosystemDirectoryItems.map((item) => item.slug)
}

export function getRelatedEcosystemItems(slug: string, limit = 3) {
  const item = getEcosystemDirectoryItem(slug)

  if (!item) {
    return []
  }

  return ecosystemDirectoryItems
    .filter((candidate) =>
      candidate.slug !== slug && candidate.sectionKey === item.sectionKey
    )
    .slice(0, limit)
}

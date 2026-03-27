'use client'

import { startTransition, useDeferredValue, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ExternalLink,
  Newspaper,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'

import { TrackedExternalLink } from '@/components/tracked-external-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { BlogListItem } from '@/lib/blog'
import type { EcosystemDirectorySection } from '@/lib/ecosystem-directory'
import type { SkillListItem } from '@/lib/skills'

type FeaturedTopic = {
  eyebrow: string
  slug: string
  summary: string
  title: string
}

type HomeDirectoryClientProps = {
  featuredGuides: BlogListItem[]
  featuredSections: EcosystemDirectorySection[]
  featuredSkills: SkillListItem[]
  featuredTopics: FeaturedTopic[]
  latestPosts: BlogListItem[]
  sections: EcosystemDirectorySection[]
  totalCategories: number
  totalResources: number
}

const homepagePaths = [
  {
    title: 'News',
    description: 'Follow the latest reporting, commentary, and tactical breakdowns from across the AI stack.',
    href: '/blog',
  },
  {
    title: 'Guides',
    description: 'Turn market signals into practical execution with implementation-led walkthroughs.',
    href: '/guides',
  },
  {
    title: 'Skills',
    description: 'Jump straight into installable tools, commands, and workflow building blocks.',
    href: '/skills',
  },
]

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getResourceInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return initials || name.slice(0, 2).toUpperCase()
}

function ResourceLogo({ logo, name }: { logo?: string; name: string }) {
  const [hasError, setHasError] = useState(false)

  if (!logo || hasError) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-black uppercase tracking-[0.18em] text-slate-700 dark:border-[#303030] dark:bg-[#121212] dark:text-slate-200">
        {getResourceInitials(name)}
      </div>
    )
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 dark:border-[#303030] dark:bg-[#121212]">
      {/* These third-party logos include remote SVGs, so a plain img keeps the directory resilient. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={`${name} logo`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

export function HomeDirectoryClient({
  featuredGuides,
  featuredSections,
  featuredSkills,
  featuredTopics,
  latestPosts,
  sections,
  totalCategories,
  totalResources,
}: HomeDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const normalizedSearch = deferredSearchQuery.trim().toLowerCase()
  const categories = ['All', ...sections.map((section) => section.category)]
  const isFilteredView = normalizedSearch.length > 0 || selectedCategory !== 'All'

  const filteredSections = sections
    .filter((section) => selectedCategory === 'All' || section.category === selectedCategory)
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!normalizedSearch) {
          return true
        }

        return (
          item.name.toLowerCase().includes(normalizedSearch)
          || item.hostname.toLowerCase().includes(normalizedSearch)
        )
      }),
    }))
    .filter((section) => section.items.length > 0)

  const visibleResources = filteredSections.reduce(
    (sum, section) => sum + section.items.length,
    0,
  )

  function handleCategoryChange(category: string) {
    startTransition(() => {
      setSelectedCategory(category)
    })
  }

  function toggleSection(sectionKey: string) {
    startTransition(() => {
      setExpandedSections((current) =>
        current.includes(sectionKey)
          ? current.filter((key) => key !== sectionKey)
          : [...current, sectionKey],
      )
    })
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-20 lg:py-16">
        <section className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <Badge className="mb-5 border-0 bg-slate-200 text-slate-900 dark:bg-[#262626] dark:text-slate-100">
              Global AI directory and newsroom
            </Badge>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100 lg:text-7xl">
              TRACK THE AI
              <br />
              STACK FASTER.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              ClawList is building an editorial home for AI tools, models, agents, workflows, and news. Start with the latest coverage, then move into the full ecosystem directory when you want the broader map.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="bg-slate-900 text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
                asChild
              >
                <Link href="/blog">Read the Latest</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="#directory">Browse the Directory</a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/guides">Open Guides</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
              Editor&apos;s Snapshot
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-[#262626]/40">
                <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {totalResources}
                </p>
                <p className="mt-1 text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  Resources
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-[#262626]/40">
                <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {totalCategories}
                </p>
                <p className="mt-1 text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  Sectors
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-[#303030]">
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  What this homepage does
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Lead with timely coverage, route readers into topic clusters, then let them explore the underlying AI ecosystem without tab overload.
                </p>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-300 p-4 dark:border-[#303030]">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-4 w-4 text-slate-700 dark:text-slate-300" />
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Directory links point to third-party products and communities. Verify claims, pricing, and account requirements at the destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Browse by intent
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Start where your session actually begins.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Cold visitors rarely want the same thing. Some want fresh coverage, some want implementation help, and some want a tool to install right now.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homepagePaths.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-400 dark:border-[#262626] dark:bg-[#121212]"
              >
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  Editorial path
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {path.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {path.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                  Open {path.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Latest coverage
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                News and analysis first.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
            >
              View all coverage
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-400 dark:border-[#262626] dark:bg-[#121212]"
              >
                <div className="flex items-center gap-3">
                  <Badge className="border-0 bg-slate-200 text-slate-900 dark:bg-[#262626] dark:text-slate-200">
                    {post.category ?? 'News'}
                  </Badge>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                    {formatDate(post.published_at)}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {post.summary}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                  Read story
                  <Newspaper className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Topic hubs
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Follow the clusters shaping coverage.
                </h2>
              </div>
              <Link
                href="/topics"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
              >
                All topics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                >
                  <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                    {topic.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {topic.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    Featured skills
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Install-ready picks.
                  </h2>
                </div>
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                >
                  Open skills
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {featuredSkills.map((skill) => (
                  <Link
                    key={skill.slug}
                    href={`/skills/${skill.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                        {skill.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="rounded-full border-slate-200 text-[10px] font-mono uppercase tracking-[0.18em] dark:border-[#303030]"
                      >
                        {skill.risk_level}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {skill.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    Fresh guides
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Turn signal into execution.
                  </h2>
                </div>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                >
                  All guides
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {featuredGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                      {formatDate(guide.published_at)}
                    </p>
                    <h3 className="mt-3 text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                      {guide.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {guide.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Ecosystem sectors
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              The largest parts of the map.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredSections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => handleCategoryChange(section.category)}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-slate-400 dark:border-[#262626] dark:bg-[#121212]"
              >
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  {section.items.length} resources
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {section.category}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {section.summary}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                  Filter in directory
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          id="directory"
          className="mb-14 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]"
        >
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Directory explorer
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Browse the full board without overload.
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Showing {visibleResources} of {totalResources} resources.
            </p>
          </div>

          <div className="mb-6 space-y-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products, hosts, models, or platforms..."
                className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base dark:border-[#303030] dark:bg-[#191919]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const active = selectedCategory === category

                return (
                  <Badge
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`cursor-pointer border-0 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                      active
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-[#262626] dark:text-slate-300'
                    }`}
                  >
                    {category}
                  </Badge>
                )
              })}
            </div>
          </div>

          {filteredSections.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-[#303030]">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                No resources match that search.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Try a broader product name, platform name, or hostname.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredSections.map((section) => {
                const isExpanded = expandedSections.includes(section.key)
                const visibleItems = isFilteredView || isExpanded
                  ? section.items
                  : section.items.slice(0, 6)
                const hiddenCount = section.items.length - visibleItems.length

                return (
                  <div key={section.key}>
                    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                          {section.items.length} resources
                        </p>
                        <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                          {section.category}
                        </h3>
                      </div>
                      <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {section.summary}
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {visibleItems.map((item) => (
                        <div
                          key={item.id}
                          className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-start gap-4">
                              <ResourceLogo logo={item.logo} name={item.name} />
                              <div className="min-w-0">
                                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-slate-500">
                                  {section.cardLabel}
                                </p>
                                <h4 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                                  {item.name}
                                </h4>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="max-w-[45%] rounded-full border-slate-200 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] dark:border-[#303030]"
                            >
                              {item.hostname}
                            </Badge>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {section.summary}
                          </p>
                          <TrackedExternalLink
                            href={item.url}
                            analyticsPayload={{
                              eventType: 'cta_click',
                              pagePath: '/',
                              metadata: {
                                category: section.category,
                                resourceName: item.name,
                                surface: 'homepage-directory',
                                targetHost: item.hostname,
                              },
                            }}
                            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 hover:opacity-70 dark:text-slate-100"
                          >
                            Open resource
                            <ExternalLink className="h-4 w-4" />
                          </TrackedExternalLink>
                        </div>
                      ))}
                    </div>

                    {!isFilteredView && hiddenCount > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleSection(section.key)}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                      >
                        {isExpanded ? 'Show fewer resources' : `Show ${hiddenCount} more resources`}
                        <ArrowRight className={`h-4 w-4 transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 dark:border-[#303030] dark:bg-[#121212]/70">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Source and editorial policy
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                The ecosystem directory is built from publicly available industry resources, then reorganized through ClawList&apos;s own editorial structure, browsing logic, and design system. We use source material for research, not as a visual template.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Sparkles className="h-4 w-4" />
              English-only frontend
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

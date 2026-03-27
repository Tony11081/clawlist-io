'use client'

import { useDeferredValue, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Search, ShieldAlert } from 'lucide-react'

import { TrackedExternalLink } from '@/components/tracked-external-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Claw123DirectorySection } from '@/lib/claw123-directory'

type HomeDirectoryClientProps = {
  featuredSections: Claw123DirectorySection[]
  sections: Claw123DirectorySection[]
  totalCategories: number
  totalResources: number
}

const internalPaths = [
  {
    title: 'Skills',
    description: 'Jump from the ecosystem map into installable skills and deeper ClawList pages.',
    href: '/skills',
  },
  {
    title: 'Guides',
    description: 'Move from discovery into walkthroughs, setup patterns, and practical implementation help.',
    href: '/guides',
  },
  {
    title: 'Topics',
    description: 'Follow the clusters already driving search demand across prompts, nodes, coding, and agents.',
    href: '/topics',
  },
]

export function HomeDirectoryClient({
  featuredSections,
  sections,
  totalCategories,
  totalResources,
}: HomeDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const normalizedSearch = deferredSearchQuery.trim().toLowerCase()
  const categories = ['All', ...sections.map((section) => section.category)]

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
          || item.sourceName.toLowerCase().includes(normalizedSearch)
        )
      }),
    }))
    .filter((section) => section.items.length > 0)

  const visibleResources = filteredSections.reduce(
    (sum, section) => sum + section.items.length,
    0,
  )

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-20 lg:py-16">
        <section className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <Badge className="mb-5 border-0 bg-slate-200 text-slate-900 dark:bg-[#262626] dark:text-slate-100">
              English ecosystem landing page
            </Badge>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100 lg:text-7xl">
              THE OPENCLAW
              <br />
              ECOSYSTEM.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              An English homepage built from the public resource board at{' '}
              <a
                href="https://www.claw123.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Claw123
              </a>
              . We kept the links, translated the structure, and regrouped everything into a directory that fits ClawList&apos;s existing product style.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="bg-slate-900 text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
                asChild
              >
                <Link href="/skills">Browse Skills</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/guides">Read Guides</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.claw123.com/" target="_blank" rel="noopener noreferrer">
                  View Claw123
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
              Directory Snapshot
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
                  Categories
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-4 dark:border-[#303030]">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-4 w-4 text-slate-700 dark:text-slate-300" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Third-party links only
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    These outbound resources are operated by third parties. Use this page to discover the landscape, then verify pricing, claims, and account requirements on each destination.
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
                Start With ClawList
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Use the directory, then go deeper.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              The homepage now maps the external ecosystem, but the best next step still depends on whether you want installable skills, practical guides, or search-focused topic clusters.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {internalPaths.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-400 dark:border-[#262626] dark:bg-[#121212]"
              >
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  Internal Path
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
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Largest Clusters
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              The categories worth opening first.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredSections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => setSelectedCategory(section.category)}
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
                  Filter this category
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-14 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Directory Explorer
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Search the full board.
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
                placeholder="Search names, hosts, or original labels..."
                className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base dark:border-[#303030] dark:bg-[#191919]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const active = selectedCategory === category

                return (
                  <Badge
                    key={category}
                    onClick={() => setSelectedCategory(category)}
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
                No resources match that search yet.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Try a brand name, a hostname, or switch back to all categories.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredSections.map((section) => (
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
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-slate-500">
                              {section.cardLabel}
                            </p>
                            <h4 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                              {item.name}
                            </h4>
                          </div>
                          <Badge
                            variant="outline"
                            className="rounded-full border-slate-200 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] dark:border-[#303030]"
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
                              sourceName: item.sourceName,
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
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 dark:border-[#303030] dark:bg-[#121212]/70">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Attribution and scope
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            This homepage is an English adaptation of the public resource list on Claw123. We preserved the outbound links, translated and normalized the labels, and kept the UI in ClawList&apos;s existing visual system instead of mirroring the original site.
          </p>
        </section>
      </main>
    </div>
  )
}

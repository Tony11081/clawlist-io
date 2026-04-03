import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase, ExternalLink, Gamepad2, Sparkles, Terminal, TrendingUp } from 'lucide-react'

import { Breadcrumb } from '@/components/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { appSegments, getAppsBySegment, getFeaturedApps, getWatchlistApps, type AppSegment } from '@/lib/apps'

export const metadata: Metadata = {
  title: 'Apps & Agents',
  description:
    'A curated board of AI apps and agents ClawList readers keep comparing, organized by workflow fit instead of raw hype.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/apps',
  },
  openGraph: {
    title: 'ClawList Apps & Agents',
    description:
      'A curated board of AI apps and agents ClawList readers keep comparing, organized by workflow fit instead of raw hype.',
    url: 'https://clawlist.io/apps',
  },
}

const segmentMeta: Record<AppSegment, { description: string; icon: typeof Terminal }> = {
  'Coding Agents': {
    description: 'Terminal and IDE-first agents for debugging, refactors, and repo-scale work.',
    icon: Terminal,
  },
  Productivity: {
    description: 'Personal agents and self-hosted interfaces that help teams keep workflows moving.',
    icon: Briefcase,
  },
  Creative: {
    description: 'Tools for creators shipping video, audio, and long-form output with AI assistance.',
    icon: Sparkles,
  },
  Entertainment: {
    description: 'Consumer-facing AI apps built around roleplay, characters, and narrative experiences.',
    icon: Gamepad2,
  },
}

export default function AppsPage() {
  const featuredApps = getFeaturedApps()
  const watchlistApps = getWatchlistApps()

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Apps & Agents' },
          ]}
        />

        <section className="mb-16">
          <Badge className="mb-5 border-0 bg-slate-200 text-slate-900 dark:bg-[#262626] dark:text-slate-100">
            Editorial comparison workspace
          </Badge>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <h1 className="text-5xl font-black tracking-tighter mb-4">APPS & AGENTS.</h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                This page stays available as an editorial comparison workspace while ClawList expands
                deeper reporting and product briefs. It is not treated as a monetized or indexed
                destination yet.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#262626]/20">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                How to use this page
              </p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-5">
                Start with the featured board, then drop into the category sections to find adjacent tools worth comparing against your current stack.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-slate-900 text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900" asChild>
                  <Link href="/skills">Browse Skills</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    Read the newsroom
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Board</h2>
              <p className="text-slate-500 dark:text-slate-400">
                The products most likely to come up when teams compare agent surfaces, interfaces, and workflow depth.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredApps.map((app) => (
              <div
                key={app.slug}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-900 dark:border-[#262626] dark:bg-[#262626]/20 dark:hover:border-slate-500"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                      {app.segment}
                    </p>
                    <h3 className="text-2xl font-black tracking-tight">{app.name}</h3>
                  </div>
                  <Badge className="border-0 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                    {app.signal}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-5">
                  {app.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {app.labels.map((label) => (
                    <Badge
                      key={label}
                      variant="outline"
                      className="rounded-full border-slate-200 px-2 py-0.5 text-[10px] font-mono dark:border-[#262626]"
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <Link href={app.relatedHref}>
                    {app.relatedLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-5 w-5 text-slate-900 dark:text-slate-100" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Watchlist</h2>
              <p className="text-slate-500 dark:text-slate-400">
                Tools worth keeping on the radar when your team is rethinking the agent layer.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {watchlistApps.map((app) => (
              <div
                key={app.slug}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#262626] dark:bg-[#262626]/20"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold">{app.name}</h3>
                  <Badge variant="outline" className="rounded-full text-[10px] uppercase tracking-widest">
                    {app.signal}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-4">
                  {app.summary}
                </p>
                <Link
                  href={app.relatedHref}
                  className="text-sm font-bold underline underline-offset-4 hover:opacity-70"
                >
                  {app.relatedLabel}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">By Category</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Same landscape, but grouped by the job each product is trying to do.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {appSegments.map((segment) => {
              const meta = segmentMeta[segment]
              const Icon = meta.icon
              const apps = getAppsBySegment(segment)

              return (
                <div
                  key={segment}
                  className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-[#262626] dark:bg-[#262626]/20"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-2">{segment}</h3>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {meta.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {apps.map((app, index) => (
                      <div
                        key={app.slug}
                        className="flex items-start gap-4 border-t border-slate-200 pt-4 first:border-t-0 first:pt-0 dark:border-[#262626]"
                      >
                        <div className="w-8 shrink-0 text-sm font-mono text-slate-500">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="text-lg font-bold">{app.name}</h4>
                            <Badge variant="outline" className="rounded-full text-[10px] uppercase tracking-widest">
                              {app.signal}
                            </Badge>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-2">
                            {app.summary}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {app.labels.map((label) => (
                              <span
                                key={label}
                                className="text-[10px] font-mono uppercase tracking-widest text-slate-500"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white dark:border-slate-200 dark:bg-white dark:text-slate-900">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Need the installable layer behind these apps?</h2>
              <p className="text-sm leading-relaxed text-slate-300 dark:text-slate-600">
                Use this board to orient yourself, then move into ClawList skills, guides, and topic hubs when you are ready to pick tools, compare workflows, or install something concrete.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-white text-slate-900 hover:opacity-90 dark:bg-slate-900 dark:text-slate-100" asChild>
                <Link href="/skills">Browse Skills</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 dark:border-slate-900 dark:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-slate-100" asChild>
                <Link href="/topics">Explore Topics</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

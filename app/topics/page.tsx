import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { AnalyticsTracker } from '@/components/analytics-tracker'
import { Breadcrumb } from '@/components/breadcrumb'
import { topicHubs } from '@/lib/topic-hubs'

export const metadata: Metadata = {
  title: 'Topic Hubs',
  description:
    'Cluster pages for system prompt architecture, OpenClaw nodes, Claude Code, and AI agent workflow content.',
  alternates: {
    canonical: '/topics',
  },
  openGraph: {
    title: 'ClawList Topic Hubs',
    description:
      'Cluster pages for system prompt architecture, OpenClaw nodes, Claude Code, and AI agent workflow content.',
    url: 'https://clawlist.io/topics',
  },
}

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <AnalyticsTracker
        payload={{
          eventType: 'page_view',
          pagePath: '/topics',
          metadata: {
            pageType: 'topic_index',
          },
        }}
      />

      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Topics' },
          ]}
        />

        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
            Cluster Navigation
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
            TOPIC
            <br />
            HUBS.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            These hub pages connect the clusters already driving search traffic so readers can move from one
            high-intent page into related articles, installable skills, and clearer next steps.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {topicHubs.map((hub) => (
            <Link
              key={hub.slug}
              href={`/topics/${hub.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-400 dark:border-[#262626] dark:bg-[#121212]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                {hub.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                {hub.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
                {hub.summary}
              </p>

              <div className="mt-6 space-y-2">
                {hub.highlights.slice(0, 2).map((highlight) => (
                  <p
                    key={highlight}
                    className="text-sm leading-6 text-slate-600 dark:text-slate-400"
                  >
                    {highlight}
                  </p>
                ))}
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                Open hub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 dark:border-[#2f2f2f] dark:bg-[#121212]/60">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Internal keyword ownership lives in a noindex page.
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Use the ownership table to decide which page owns a query and which pages only support it.
          </p>
          <Link
            href="/topics/ownership"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
          >
            View keyword ownership
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  )
}

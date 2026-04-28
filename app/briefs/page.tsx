import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'

import { Breadcrumb } from '@/components/breadcrumb'
import { getHomepageEditorialPack } from '@/lib/blog'
import { topicHubs } from '@/lib/topic-hubs'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Autonomous Agent Weekly Brief',
  description:
    'A public weekly brief for OpenClaw, autonomous agents, Claude Code, Codex workflows, and installable agent skills.',
  alternates: { canonical: '/briefs' },
  openGraph: {
    title: 'Autonomous Agent Weekly Brief | ClawList',
    description:
      'A public weekly brief for OpenClaw, autonomous agents, Claude Code, Codex workflows, and installable agent skills.',
    url: 'https://clawlist.io/briefs',
  },
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BriefsPage() {
  const pack = await getHomepageEditorialPack()
  const shareWorthy =
    pack.editorsPicks.length > 0 ? pack.editorsPicks : pack.analysis

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-20">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Briefs' }]}
        />

        <section className="mb-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212] lg:p-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Public Archive
          </div>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100 lg:text-6xl">
            Autonomous Agent Weekly Brief
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            A recurring editorial brief for OpenClaw, Claude Code, Codex, agent
            orchestration, and the skills that make autonomous work operational.
          </p>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {pack.topStory && (
            <Link
              href={`/blog/${pack.topStory.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-slate-400 dark:border-[#262626] dark:bg-[#121212]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Lead Story
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                {pack.topStory.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                {pack.topStory.summary}
              </p>
              <p className="mt-6 text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                {formatDate(pack.topStory.published_at)}
              </p>
            </Link>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Most Read Signal
            </p>
            <div className="mt-5 space-y-4">
              {pack.mostRead.slice(0, 4).map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white dark:bg-slate-100 dark:text-slate-900">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold leading-6 text-slate-900 dark:text-slate-100">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500">
                      {typeof post.views === 'number'
                        ? `${post.views} reads`
                        : 'Reader signal'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Topic Digest
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {topicHubs.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                >
                  <h3 className="text-base font-bold text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {topic.editorial.whatChangedThisMonth[0]}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Share-Worthy Reads
            </p>
            <div className="mt-5 space-y-4">
              {shareWorthy.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                >
                  <h3 className="text-base font-bold text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {post.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm dark:border-[#262626] dark:bg-[#101010]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
            Next Send
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Get the brief in your inbox, then use this archive to catch up.
          </h2>
          <Link
            href="/#weekly-brief"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-opacity hover:opacity-90"
          >
            Subscribe on the homepage
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  )
}

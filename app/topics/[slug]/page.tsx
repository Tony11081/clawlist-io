import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { notFound } from 'next/navigation'

import { AnalyticsTracker } from '@/components/analytics-tracker'
import { Breadcrumb } from '@/components/breadcrumb'
import { getTopicHubBySlug, topicHubs } from '@/lib/topic-hubs'

type TopicPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return topicHubs.map((hub) => ({ slug: hub.slug }))
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params
  const hub = getTopicHubBySlug(slug)

  if (!hub) {
    return {
      title: 'Topic Not Found',
    }
  }

  return {
    title: `${hub.title} Hub`,
    description: hub.summary,
    alternates: {
      canonical: `/topics/${hub.slug}`,
    },
    openGraph: {
      title: `${hub.title} | ClawList`,
      description: hub.summary,
      url: `https://clawlist.io/topics/${hub.slug}`,
    },
  }
}

export default async function TopicHubPage({ params }: TopicPageProps) {
  const { slug } = await params
  const hub = getTopicHubBySlug(slug)

  if (!hub) {
    notFound()
  }

  const pagePath = `/topics/${hub.slug}`

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <AnalyticsTracker
        payload={{
          eventType: 'page_view',
          pagePath,
          metadata: {
            pageType: 'topic_hub',
            topicSlug: hub.slug,
          },
        }}
      />

      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Topics', href: '/topics' },
            { label: hub.title },
          ]}
        />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212] lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            {hub.eyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
            {hub.title}
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {hub.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {hub.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl bg-slate-100 p-5 dark:bg-[#191919]"
              >
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Why This Matters Now
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
              {hub.editorial.whyItMattersNow}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link
                href={hub.editorial.bestFirstRead.href}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  <BookOpen className="h-4 w-4" />
                  Best First Read
                </div>
                <h2 className="mt-3 text-xl font-bold text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                  {hub.editorial.bestFirstRead.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {hub.editorial.bestFirstRead.reason}
                </p>
              </Link>

              <Link
                href={hub.editorial.bestSkillToTry.href}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  <Wrench className="h-4 w-4" />
                  Best Skill To Try
                </div>
                <h2 className="mt-3 text-xl font-bold text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                  {hub.editorial.bestSkillToTry.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {hub.editorial.bestSkillToTry.reason}
                </p>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              <Sparkles className="h-4 w-4" />
              What Changed This Month
            </div>
            <div className="mt-6 space-y-4">
              {hub.editorial.whatChangedThisMonth.map((change) => (
                <div
                  key={change}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2d2d2d] dark:bg-[#191919]"
                >
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            <CalendarDays className="h-4 w-4" />
            Reader Path
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {hub.editorial.timeline.map((entry) => (
              <div
                key={`${entry.date}-${entry.title}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-[#2d2d2d] dark:bg-[#191919]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  {entry.date}
                </p>
                <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {entry.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Featured Articles
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Pages that should work together
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {hub.featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={article.href}
                  className="group block rounded-2xl border border-slate-200 p-5 transition-colors hover:border-slate-400 dark:border-[#262626] dark:hover:border-slate-500"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Article
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {article.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Skills
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
                Best conversion targets for this cluster
              </h2>

              <div className="mt-6 space-y-4">
                {hub.featuredSkills.map((skill) => (
                  <Link
                    key={skill.slug}
                    href={skill.href}
                    className="group block rounded-2xl border border-slate-200 p-5 transition-colors hover:border-slate-400 dark:border-[#262626] dark:hover:border-slate-500"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      Skill
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                      {skill.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {skill.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm dark:border-[#262626] dark:bg-[#101010]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
                Ownership Snapshot
              </p>
              <div className="mt-5 space-y-4">
                {hub.ownership.slice(0, 3).map((entry) => (
                  <div
                    key={entry.keyword}
                    className="rounded-2xl border border-slate-700 bg-white/5 p-4"
                  >
                    <p className="text-sm font-bold text-white">
                      {entry.keyword}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Primary page: {entry.primaryPath}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/topics/ownership"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white underline underline-offset-4"
              >
                Open the full ownership table
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

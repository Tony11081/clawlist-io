import type { Metadata } from 'next'
import Link from 'next/link'

import { AnalyticsTracker } from '@/components/analytics-tracker'
import { Breadcrumb } from '@/components/breadcrumb'
import { getAllKeywordOwnershipEntries } from '@/lib/topic-hubs'

export const metadata: Metadata = {
  title: 'Keyword Ownership',
  description: 'Internal keyword ownership table for ClawList topic hubs.',
  alternates: {
    canonical: '/topics/ownership',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function KeywordOwnershipPage() {
  const rows = getAllKeywordOwnershipEntries()

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <AnalyticsTracker
        payload={{
          eventType: 'page_view',
          pagePath: '/topics/ownership',
          metadata: {
            pageType: 'keyword_ownership',
          },
        }}
      />

      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Topics', href: '/topics' },
            { label: 'Keyword Ownership' },
          ]}
        />

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
            Internal Use
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
            KEYWORD
            <br />
            OWNERSHIP.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Every core query should have one primary landing page. Supporting pages exist to deepen the
            cluster, not compete for the same click.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-[#262626] dark:bg-[#121212]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-[#262626]">
              <thead className="bg-slate-100 dark:bg-[#191919]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Topic
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Keyword
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Primary Page
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Supporting Pages
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Intent & Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-[#262626]">
                {rows.map((row) => (
                  <tr key={`${row.topicSlug}-${row.keyword}`}>
                    <td className="px-6 py-5 align-top">
                      <Link
                        href={`/topics/${row.topicSlug}`}
                        className="text-sm font-semibold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                      >
                        {row.topicTitle}
                      </Link>
                    </td>
                    <td className="px-6 py-5 align-top text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {row.keyword}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <Link
                        href={row.primaryPath}
                        className="text-sm font-semibold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                      >
                        {row.primaryPath}
                      </Link>
                    </td>
                    <td className="px-6 py-5 align-top text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {row.supportingPaths.map((path) => (
                        <div key={path}>
                          <Link
                            href={path}
                            className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100"
                          >
                            {path}
                          </Link>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-5 align-top text-sm leading-6 text-slate-600 dark:text-slate-400">
                      <p>{row.searchIntent}</p>
                      <p className="mt-2">{row.note}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

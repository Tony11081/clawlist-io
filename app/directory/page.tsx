import type { Metadata } from 'next'
import Link from 'next/link'

import { AnalyticsTracker } from '@/components/analytics-tracker'
import { Breadcrumb } from '@/components/breadcrumb'
import { EcosystemDirectoryBrowser } from '@/components/ecosystem-directory-browser'
import {
  ecosystemDirectorySections,
  getEcosystemDirectoryStats,
} from '@/lib/ecosystem-directory'

export const metadata: Metadata = {
  title: 'AI Ecosystem Directory',
  description:
    'A full ClawList directory workspace with internal briefs first and outbound source links second.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/directory',
  },
}

export default function DirectoryPage() {
  const { totalCategories, totalResources } = getEcosystemDirectoryStats()

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <AnalyticsTracker
        payload={{
          eventType: 'page_view',
          pagePath: '/directory',
          metadata: {
            pageType: 'directory_workspace',
            totalCategories,
            totalResources,
          },
        }}
      />

      <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-20 lg:py-16">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Directory' },
          ]}
        />

        <section className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Editorial workspace
            </p>
            <h1 className="mt-3 text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100 lg:text-6xl">
              AI ecosystem briefs,
              <br />
              before the outbound click.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              This workspace stays outside the indexed and monetized inventory while ClawList upgrades
              each resource with stronger editorial notes. Use it when you want the broader market map
              without turning the homepage into a link wall.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
              Why this page exists
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <li>Read a ClawList brief before leaving the site.</li>
              <li>Compare alternatives inside the same category faster.</li>
              <li>Keep low-value aggregation pages out of the primary index pool.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
              >
                Back to the homepage
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100 dark:border-[#303030] dark:text-slate-100 dark:hover:bg-[#191919]"
              >
                Read coverage first
              </Link>
            </div>
          </div>
        </section>

        <EcosystemDirectoryBrowser
          sections={ecosystemDirectorySections}
          totalResources={totalResources}
        />
      </main>
    </div>
  )
}


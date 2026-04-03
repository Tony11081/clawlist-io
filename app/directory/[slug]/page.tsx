import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { notFound } from 'next/navigation'

import { AnalyticsTracker } from '@/components/analytics-tracker'
import { Breadcrumb } from '@/components/breadcrumb'
import { EcosystemResourceLogo } from '@/components/ecosystem-resource-logo'
import { TrackedExternalLink } from '@/components/tracked-external-link'
import { Badge } from '@/components/ui/badge'
import {
  getEcosystemDirectoryItem,
  getEcosystemDirectorySlugs,
  getRelatedEcosystemItems,
} from '@/lib/ecosystem-directory'

export const revalidate = 300

export function generateStaticParams() {
  return getEcosystemDirectorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getEcosystemDirectoryItem(slug)

  if (!item) {
    return {
      title: 'Directory Brief Not Found',
      robots: {
        index: false,
        follow: true,
      },
    }
  }

  return {
    title: `${item.name} Brief`,
    description: item.brief,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: item.internalHref,
    },
  }
}

export default async function DirectoryItemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getEcosystemDirectoryItem(slug)

  if (!item) {
    notFound()
  }

  const relatedItems = getRelatedEcosystemItems(item.slug, 3)

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <AnalyticsTracker
        payload={{
          eventType: 'page_view',
          pagePath: item.internalHref,
          metadata: {
            pageType: 'directory_brief',
            category: item.sectionCategory,
            resourceName: item.name,
          },
        }}
      />

      <main className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-20 lg:py-16">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Directory', href: '/directory' },
            { label: item.name },
          ]}
        />

        <section className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <div className="flex items-start gap-5">
              <EcosystemResourceLogo logo={item.logo} name={item.name} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  {item.sectionCategory}
                </p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
                  {item.name}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                  {item.brief}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
              Brief status
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                  Reviewed
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.lastReviewed}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                  Host
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.hostname}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                  Nearby alternatives
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.alternatives.length > 0 ? item.alternatives.join(', ') : 'No alternatives listed yet'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Why it matters
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
                {item.whyItMatters}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Best for
                </p>
                <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                  {item.bestFor}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Caveats
                </p>
                <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                  {item.caveats}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    Alternatives
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    What else to compare in this lane.
                  </h2>
                </div>
                <Badge className="border-0 bg-slate-200 text-slate-900 dark:bg-[#262626] dark:text-slate-100">
                  {item.sectionCategory}
                </Badge>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {item.alternatives.map((alternative) => (
                  <span
                    key={alternative}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-[#303030] dark:text-slate-300"
                  >
                    {alternative}
                  </span>
                ))}
              </div>
            </div>

            {relatedItems.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Related briefs
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {relatedItems.map((related) => (
                    <Link
                      key={related.slug}
                      href={related.internalHref}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-400 dark:border-[#303030] dark:bg-[#191919]"
                    >
                      <p className="text-sm font-black text-slate-900 dark:text-slate-100">
                        {related.name}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {related.brief}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Source links
              </p>
              <div className="mt-5 space-y-3">
                {item.sourceLinks.map((link) => (
                  <TrackedExternalLink
                    key={link.href}
                    href={link.href}
                    analyticsPayload={{
                      eventType: 'cta_click',
                      pagePath: item.internalHref,
                      metadata: {
                        category: item.sectionCategory,
                        cta: 'directory_source_link',
                        resourceName: item.name,
                        targetHost: item.hostname,
                      },
                    }}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-[#303030] dark:text-slate-100 dark:hover:bg-[#191919]"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" />
                  </TrackedExternalLink>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Next internal paths
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { href: '/blog', label: 'Read newsroom coverage' },
                  { href: '/topics', label: 'Open topic hubs' },
                  { href: '/skills', label: 'Browse installable skills' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-[#303030] dark:text-slate-100 dark:hover:bg-[#191919]"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}


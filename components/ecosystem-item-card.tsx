'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

import { EcosystemResourceLogo } from '@/components/ecosystem-resource-logo'
import { TrackedExternalLink } from '@/components/tracked-external-link'
import { Badge } from '@/components/ui/badge'
import type { EcosystemDirectoryItem } from '@/lib/ecosystem-directory'

interface EcosystemItemCardProps {
  item: EcosystemDirectoryItem
  pagePath: string
  showSection?: boolean
}

export function EcosystemItemCard({
  item,
  pagePath,
  showSection = false,
}: EcosystemItemCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <EcosystemResourceLogo logo={item.logo} name={item.name} />
          <div className="min-w-0">
            {showSection && (
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-slate-500">
                {item.sectionCategory}
              </p>
            )}
            <h3 className="mt-2 text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              {item.name}
            </h3>
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
        {item.brief}
      </p>

      <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#303030] dark:bg-[#121212]">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
            Why it matters
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {item.whyItMatters}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
            Best for
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {item.bestFor}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
        <span>Reviewed {item.lastReviewed}</span>
        <span>{item.alternatives.length} nearby alternatives</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={item.internalHref}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
        >
          View brief
          <ArrowRight className="h-4 w-4" />
        </Link>
        <TrackedExternalLink
          href={item.url}
          analyticsPayload={{
            eventType: 'cta_click',
            pagePath,
            metadata: {
              category: item.sectionCategory,
              resourceName: item.name,
              surface: 'ecosystem-resource-card',
              targetHost: item.hostname,
            },
          }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-100 dark:border-[#303030] dark:text-slate-100 dark:hover:bg-[#121212]"
        >
          Official site
          <ExternalLink className="h-4 w-4" />
        </TrackedExternalLink>
      </div>
    </div>
  )
}


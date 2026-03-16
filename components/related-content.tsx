'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { sendAnalyticsEvent } from '@/lib/analytics/client'

export interface RelatedItem {
  slug: string
  name?: string
  title?: string
  summary: string
  category?: string
  tags?: string[]
}

interface RelatedContentProps {
  items: RelatedItem[]
  type: 'skills' | 'blog'
  title?: string
  analyticsContext?: {
    pagePath: string
    sourceSlug: string
    sourceType: 'blog' | 'guide' | 'skill'
  }
}

export function RelatedContent({ items, type, title, analyticsContext }: RelatedContentProps) {
  if (!items || items.length === 0) return null

  const displayTitle = title || (type === 'skills' ? 'Related Skills' : 'Related Articles')
  const basePath = type === 'skills' ? '/skills' : '/blog'
  const actionLabel = type === 'skills' ? 'View skill' : 'Read article'

  return (
    <section className="mt-16 pt-12 border-t border-slate-200 dark:border-[#262626]">
      <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">
        {displayTitle}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.slice(0, 3).map((item) => (
          <Link
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="group p-6 bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-2xl hover:border-slate-400 dark:hover:border-slate-400 transition-all"
            onClick={() => {
              if (!analyticsContext) {
                return
              }

              void sendAnalyticsEvent({
                eventType: 'recommendation_click',
                pagePath: analyticsContext.pagePath,
                metadata: {
                  sourceSlug: analyticsContext.sourceSlug,
                  sourceType: analyticsContext.sourceType,
                  targetSlug: item.slug,
                  targetType: type,
                },
              })
            }}
          >
            {item.category && (
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {item.category}
              </div>
            )}
            <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100 group-hover:underline underline-offset-4">
              {item.name || item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
              {item.summary}
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              {actionLabel}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

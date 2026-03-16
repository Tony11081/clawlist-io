'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { sendAnalyticsEvent } from '@/lib/analytics/client'
import type { TopicHub } from '@/lib/topic-hubs'

interface TopicHubCtaProps {
  hub: TopicHub
  pagePath: string
  sourceSlug: string
}

export function TopicHubCta({
  hub,
  pagePath,
  sourceSlug,
}: TopicHubCtaProps) {
  return (
    <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm dark:border-[#262626] dark:bg-[#101010]">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
        Next Best Step
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight">
        Keep this session moving with the {hub.title} hub
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
        {hub.description}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {hub.nextSteps.map((step) => (
          <Link
            key={step.id}
            href={step.href}
            className="group rounded-2xl border border-slate-700 bg-white/5 p-5 transition-colors hover:border-slate-400 hover:bg-white/10"
            onClick={() => {
              void sendAnalyticsEvent({
                eventType: 'cta_click',
                pagePath,
                metadata: {
                  cta: step.id,
                  destination: step.href,
                  sourceSlug,
                  sourceType: 'blog',
                  topicHub: hub.slug,
                },
              })
            }}
          >
            <p className="text-lg font-bold text-white group-hover:underline underline-offset-4">
              {step.label}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {step.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
              Go now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

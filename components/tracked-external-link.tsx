'use client'

import type { ReactNode } from 'react'

import type { AnalyticsPayload } from '@/lib/analytics'
import { sendAnalyticsEvent } from '@/lib/analytics/client'

interface TrackedExternalLinkProps {
  href: string
  className?: string
  analyticsPayload: AnalyticsPayload
  children: ReactNode
}

export function TrackedExternalLink({
  href,
  className,
  analyticsPayload,
  children,
}: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        void sendAnalyticsEvent(analyticsPayload)
      }}
    >
      {children}
    </a>
  )
}

'use client'

import { useEffect, useRef } from 'react'

import { sendAnalyticsEvent } from '@/lib/analytics/client'
import type { AnalyticsPayload } from '@/lib/analytics'
import { useAnalyticsConsent } from '@/components/use-analytics-consent'

interface ContentViewTrackerProps {
  contentType: 'blog' | 'guide'
  slug: string
  pagePath: string
  metadata?: AnalyticsPayload['metadata']
}

export function ContentViewTracker({
  contentType,
  slug,
  pagePath,
  metadata,
}: ContentViewTrackerProps) {
  const sentRef = useRef(false)
  const analyticsEnabled = useAnalyticsConsent()

  useEffect(() => {
    if (sentRef.current || !analyticsEnabled) {
      return
    }

    const storageKey = `clawlist:view:${contentType}:${slug}`

    try {
      if (window.sessionStorage.getItem(storageKey)) {
        return
      }

      window.sessionStorage.setItem(storageKey, '1')
    } catch {
      // Session storage can fail in private browsing; tracking remains best-effort.
    }

    sentRef.current = true

    void sendAnalyticsEvent({
      eventType: contentType === 'blog' ? 'blog_view' : 'guide_view',
      pagePath,
      metadata: {
        contentType,
        slug,
        ...metadata,
      },
    })

    void fetch('/api/content-views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentType,
        slug,
      }),
      keepalive: true,
    })
  }, [analyticsEnabled, contentType, slug, pagePath, metadata])

  return null
}

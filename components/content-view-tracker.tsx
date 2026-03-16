'use client'

import { useEffect } from 'react'

import { sendAnalyticsEvent } from '@/lib/analytics/client'
import type { AnalyticsPayload } from '@/lib/analytics'

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
  useEffect(() => {
    const storageKey = `clawlist:view:${contentType}:${slug}`

    try {
      if (window.sessionStorage.getItem(storageKey)) {
        return
      }

      window.sessionStorage.setItem(storageKey, '1')
    } catch {
      // Session storage can fail in private browsing; tracking remains best-effort.
    }

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
  }, [contentType, slug, pagePath, metadata])

  return null
}

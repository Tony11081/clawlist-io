'use client'

import type { AnalyticsPayload } from '@/lib/analytics'
import { hasConsent } from '@/lib/consent'

export async function sendAnalyticsEvent(payload: AnalyticsPayload) {
  if (!hasConsent('analytics')) {
    return
  }

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch {
    // Analytics is best-effort and should never block the UI.
  }
}

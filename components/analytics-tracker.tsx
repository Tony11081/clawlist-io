'use client'

import { useEffect, useRef } from 'react'

import type { AnalyticsPayload } from '@/lib/analytics'
import { sendAnalyticsEvent } from '@/lib/analytics/client'
import { useAnalyticsConsent } from '@/components/use-analytics-consent'

interface AnalyticsTrackerProps {
  payload: AnalyticsPayload
}

export function AnalyticsTracker({ payload }: AnalyticsTrackerProps) {
  const sentRef = useRef(false)
  const analyticsEnabled = useAnalyticsConsent()

  useEffect(() => {
    if (sentRef.current || !analyticsEnabled) {
      return
    }

    sentRef.current = true
    void sendAnalyticsEvent(payload)
  }, [analyticsEnabled, payload])

  return null
}

'use client'

import { useEffect, useRef } from 'react'

import type { AnalyticsPayload } from '@/lib/analytics'
import { sendAnalyticsEvent } from '@/lib/analytics/client'

interface AnalyticsTrackerProps {
  payload: AnalyticsPayload
}

export function AnalyticsTracker({ payload }: AnalyticsTrackerProps) {
  const sentRef = useRef(false)

  useEffect(() => {
    if (sentRef.current) {
      return
    }

    sentRef.current = true
    void sendAnalyticsEvent(payload)
  }, [payload])

  return null
}

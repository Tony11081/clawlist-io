'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { useAnalyticsConsent } from '@/components/use-analytics-consent'

export function OptionalAnalytics() {
  const analyticsEnabled = useAnalyticsConsent()

  if (!analyticsEnabled) {
    return null
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

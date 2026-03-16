'use client'

import { useEffect, useState } from 'react'

import {
  CONSENT_CHANGE_EVENT,
  type ConsentPreferences,
  hasConsent,
} from '@/lib/consent'

export function useAnalyticsConsent() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setEnabled(hasConsent('analytics'))
    })

    const handleConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentPreferences>).detail
      setEnabled(Boolean(detail?.analytics))
    }

    window.addEventListener(
      CONSENT_CHANGE_EVENT,
      handleConsentChange as EventListener,
    )

    return () => {
      window.removeEventListener(
        CONSENT_CHANGE_EVENT,
        handleConsentChange as EventListener,
      )
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return enabled
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  CONSENT_OPEN_EVENT,
  type ConsentPreferences,
  applyGoogleConsent,
  defaultConsentPreferences,
  dispatchConsentChange,
  readStoredConsent,
  writeStoredConsent,
} from '@/lib/consent'
import { isAdSuppressedPath } from '@/lib/monetization'

interface TrackingNoticeProps {
  adSenseClient: string
  googleTagId: string
}

export function TrackingNotice({
  adSenseClient,
  googleTagId,
}: TrackingNoticeProps) {
  const pathname = usePathname()
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null)
  const [visible, setVisible] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const adsSuppressed = isAdSuppressedPath(pathname)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedPreferences = readStoredConsent()

      if (storedPreferences) {
        setPreferences(storedPreferences)
        applyGoogleConsent(storedPreferences)
        return
      }

      setPreferences(defaultConsentPreferences)
      applyGoogleConsent(defaultConsentPreferences)
      setVisible(true)
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const handleOpen = () => {
      setVisible(true)
      setManageOpen(true)
    }

    window.addEventListener(CONSENT_OPEN_EVENT, handleOpen)

    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, handleOpen)
    }
  }, [])

  const savePreferences = (nextPreferences: ConsentPreferences) => {
    setPreferences(nextPreferences)
    writeStoredConsent(nextPreferences)
    applyGoogleConsent(nextPreferences)
    dispatchConsentChange(nextPreferences)
    setVisible(false)
    setManageOpen(false)
  }

  return (
    <>
      {preferences?.analytics && (
        <>
          <Script
            id="google-tag-manager"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {preferences?.advertising && !adsSuppressed && (
        <Script
          id="google-adsense"
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClient}`}
          strategy="afterInteractive"
        />
      )}

      {visible && preferences && (
        <aside className="fixed inset-x-4 bottom-4 z-50 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur md:inset-x-auto md:left-6 md:max-w-md dark:border-[#262626] dark:bg-[#101010]/95">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Privacy & Cookies
          </p>
          <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-100">
            Choose how ClawList tracks analytics and ads
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            We use optional analytics and advertising tools only after consent. You can accept all, reject
            non-essential tracking, or manage each category individually in our{' '}
            <Link href="/privacy" className="font-semibold underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>

          {manageOpen && (
            <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-[#262626] dark:bg-[#181818]">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                  checked={preferences.analytics}
                  onChange={(event) => {
                    setPreferences((current) => ({
                      ...(current ?? defaultConsentPreferences),
                      analytics: event.target.checked,
                    }))
                  }}
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Analytics
                  </span>
                  <span className="block text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Enables first-party analytics and Google Analytics 4 so we can measure page usage,
                    shares, and content performance.
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                  checked={preferences.advertising}
                  onChange={(event) => {
                    setPreferences((current) => ({
                      ...(current ?? defaultConsentPreferences),
                      advertising: event.target.checked,
                    }))
                  }}
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Advertising
                  </span>
                  <span className="block text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Allows Google AdSense to load and measure ad delivery on monetizable sections of the
                    site. Ad personalization follows your browser and Google settings.
                  </span>
                </span>
              </label>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <Button size="sm" onClick={() => savePreferences({ analytics: true, advertising: true })}>
              Accept All
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => savePreferences(defaultConsentPreferences)}
            >
              Reject Non-Essential
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (manageOpen) {
                  savePreferences(preferences)
                  return
                }

                setManageOpen(true)
              }}
            >
              {manageOpen ? 'Save Preferences' : 'Manage Preferences'}
            </Button>
          </div>
        </aside>
      )}
    </>
  )
}

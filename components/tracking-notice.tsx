'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

const TRACKING_NOTICE_KEY = 'clawlist_tracking_notice_dismissed'

export function TrackingNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setVisible(!window.localStorage.getItem(TRACKING_NOTICE_KEY))
      } catch {
        setVisible(true)
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  if (!visible) {
    return null
  }

  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur md:left-auto md:right-6 md:max-w-md dark:border-[#262626] dark:bg-[#101010]/95">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        Privacy & Cookies
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
        We use first-party analytics, Google Analytics, and Google AdSense to understand usage and support the site.
        Details and controls are in our{' '}
        <Link href="/privacy" className="font-semibold underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button asChild size="sm" variant="outline">
          <Link href="/privacy">Learn More</Link>
        </Button>
        <Button
          size="sm"
          onClick={() => {
            try {
              window.localStorage.setItem(TRACKING_NOTICE_KEY, '1')
            } catch {
              // Ignore storage errors and still hide the notice for this render.
            }
            setVisible(false)
          }}
        >
          Dismiss
        </Button>
      </div>
    </aside>
  )
}

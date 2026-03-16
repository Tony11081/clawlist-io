'use client'

import { CONSENT_OPEN_EVENT } from '@/lib/consent'

interface CookiePreferencesButtonProps {
  className?: string
}

export function CookiePreferencesButton({
  className,
}: CookiePreferencesButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
      }}
    >
      Cookie Preferences
    </button>
  )
}

export const CONSENT_STORAGE_KEY = 'clawlist_consent_preferences'
export const CONSENT_COOKIE_NAME = 'clawlist_consent'
export const CONSENT_CHANGE_EVENT = 'clawlist:consent-change'
export const CONSENT_OPEN_EVENT = 'clawlist:consent-open'

export type ConsentPreferences = {
  analytics: boolean
  advertising: boolean
}

export const defaultConsentPreferences: ConsentPreferences = {
  analytics: false,
  advertising: false,
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function normalizeConsent(value: unknown): ConsentPreferences | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const record = value as Partial<ConsentPreferences>

  return {
    analytics: Boolean(record.analytics),
    advertising: Boolean(record.advertising),
  }
}

function readConsentCookie() {
  if (typeof document === 'undefined') {
    return null
  }

  const rawCookie = document.cookie
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${CONSENT_COOKIE_NAME}=`))
    ?.split('=')[1]

  if (!rawCookie) {
    return null
  }

  try {
    return normalizeConsent(JSON.parse(decodeURIComponent(rawCookie)))
  } catch {
    return null
  }
}

export function readStoredConsent() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawValue = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!rawValue) {
      return readConsentCookie()
    }

    return normalizeConsent(JSON.parse(rawValue))
  } catch {
    return readConsentCookie()
  }
}

export function hasConsent(category: keyof ConsentPreferences) {
  return Boolean(readStoredConsent()?.[category])
}

export function writeStoredConsent(preferences: ConsentPreferences) {
  if (typeof window === 'undefined') {
    return
  }

  const serialized = JSON.stringify(preferences)

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized)
  } catch {
    // Ignore local storage failures and keep the session responsive.
  }

  if (typeof document !== 'undefined') {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(serialized)}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax${secure}`
  }
}

function ensureGoogleConsentStub() {
  if (typeof window === 'undefined') {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
}

export function applyGoogleConsent(preferences: ConsentPreferences) {
  if (typeof window === 'undefined') {
    return
  }

  ensureGoogleConsentStub()

  window.gtag?.('consent', 'update', {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.advertising ? 'granted' : 'denied',
    ad_user_data: preferences.advertising ? 'granted' : 'denied',
    ad_personalization: preferences.advertising ? 'granted' : 'denied',
  })
}

export function dispatchConsentChange(preferences: ConsentPreferences) {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(
    new CustomEvent<ConsentPreferences>(CONSENT_CHANGE_EVENT, {
      detail: preferences,
    }),
  )
}

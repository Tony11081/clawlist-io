export const ANALYTICS_EVENT_TYPES = [
  'page_view',
  'blog_view',
  'guide_view',
  'skill_view',
  'search',
  'install_copy',
  'content_share',
  'newsletter_signup',
  'cta_click',
  'recommendation_click',
  'recommendation_impression',
  'affiliate_click',
  'affiliate_conversion',
] as const

export type AnalyticsEventType = (typeof ANALYTICS_EVENT_TYPES)[number]

export interface AnalyticsPayload {
  eventType: AnalyticsEventType
  skillId?: string | null
  skillSlug?: string | null
  pagePath?: string | null
  value?: number | null
  metadata?: Record<string, unknown>
  visitorId?: string | null
  sessionId?: string | null
}

export interface NormalizedAnalyticsPayload {
  eventType: AnalyticsEventType
  skillId?: string
  skillSlug?: string
  pagePath?: string
  value?: number
  metadata: Record<string, unknown>
  visitorId?: string
  sessionId?: string
}

interface TrackingIds {
  visitorId: string
  sessionId: string
  shouldSetVisitorCookie: boolean
  shouldSetSessionCookie: boolean
}

const MAX_TEXT_LENGTH = 240

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function sanitizeText(value: unknown, maxLength = MAX_TEXT_LENGTH) {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }

  return trimmed.slice(0, maxLength)
}

export function isAnalyticsEventType(value: unknown): value is AnalyticsEventType {
  return typeof value === 'string' && ANALYTICS_EVENT_TYPES.includes(value as AnalyticsEventType)
}

export function normalizeMetadata(value: unknown): Record<string, unknown> {
  if (!isPlainObject(value)) {
    return {}
  }

  const entries = Object.entries(value)
    .filter(([, entryValue]) => entryValue !== undefined)
    .slice(0, 20)
    .map(([key, entryValue]) => {
      if (typeof entryValue === 'string') {
        return [key, entryValue.slice(0, 300)]
      }

      if (
        typeof entryValue === 'number'
        || typeof entryValue === 'boolean'
        || entryValue === null
        || Array.isArray(entryValue)
        || isPlainObject(entryValue)
      ) {
        return [key, entryValue]
      }

      return [key, String(entryValue).slice(0, 300)]
    })

  return Object.fromEntries(entries)
}

export function normalizeAnalyticsPayload(value: unknown): NormalizedAnalyticsPayload {
  if (!isPlainObject(value)) {
    throw new Error('Analytics payload must be an object')
  }

  if (!isAnalyticsEventType(value.eventType)) {
    throw new Error('Unsupported analytics event type')
  }

  const normalized: NormalizedAnalyticsPayload = {
    eventType: value.eventType,
    metadata: normalizeMetadata(value.metadata),
  }

  const skillId = sanitizeText(value.skillId)
  const skillSlug = sanitizeText(value.skillSlug, 120)
  const pagePath = sanitizeText(value.pagePath, 200)
  const visitorId = sanitizeText(value.visitorId, 120)
  const sessionId = sanitizeText(value.sessionId, 120)
  const numericValue = typeof value.value === 'number' && Number.isFinite(value.value)
    ? value.value
    : undefined

  if (skillId) {
    normalized.skillId = skillId
  }

  if (skillSlug) {
    normalized.skillSlug = skillSlug
  }

  if (pagePath) {
    normalized.pagePath = pagePath
  }

  if (visitorId) {
    normalized.visitorId = visitorId
  }

  if (sessionId) {
    normalized.sessionId = sessionId
  }

  if (numericValue !== undefined) {
    normalized.value = numericValue
  }

  return normalized
}

export function resolveTrackingIds(
  existingVisitorId?: string | null,
  existingSessionId?: string | null,
  providedVisitorId?: string | null,
  providedSessionId?: string | null,
  createId: () => string = () => crypto.randomUUID(),
): TrackingIds {
  const visitorId = sanitizeText(existingVisitorId, 120)
    ?? sanitizeText(providedVisitorId, 120)
    ?? createId()
  const sessionId = sanitizeText(existingSessionId, 120)
    ?? sanitizeText(providedSessionId, 120)
    ?? createId()

  return {
    visitorId,
    sessionId,
    shouldSetVisitorCookie: !sanitizeText(existingVisitorId, 120),
    shouldSetSessionCookie: !sanitizeText(existingSessionId, 120),
  }
}

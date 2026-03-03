import assert from 'node:assert/strict'
import test from 'node:test'

import {
  normalizeAnalyticsPayload,
  resolveTrackingIds,
} from '@/lib/analytics'

test('normalizeAnalyticsPayload keeps supported fields and sanitizes metadata', () => {
  const payload = normalizeAnalyticsPayload({
    eventType: 'search',
    pagePath: '   /skills   ',
    metadata: {
      query: 'browser automation',
      total: 12,
      extra: undefined,
    },
  })

  assert.equal(payload.eventType, 'search')
  assert.equal(payload.pagePath, '/skills')
  assert.deepEqual(payload.metadata, {
    query: 'browser automation',
    total: 12,
  })
})

test('normalizeAnalyticsPayload rejects unsupported event types', () => {
  assert.throws(
    () => normalizeAnalyticsPayload({ eventType: 'unknown' }),
    /Unsupported analytics event type/,
  )
})

test('resolveTrackingIds reuses cookies before generating new identifiers', () => {
  const trackingIds = resolveTrackingIds(
    'visitor-cookie',
    undefined,
    'payload-visitor',
    'payload-session',
    () => 'generated-id',
  )

  assert.equal(trackingIds.visitorId, 'visitor-cookie')
  assert.equal(trackingIds.sessionId, 'payload-session')
  assert.equal(trackingIds.shouldSetVisitorCookie, false)
  assert.equal(trackingIds.shouldSetSessionCookie, true)
})

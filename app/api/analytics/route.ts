import { NextResponse } from 'next/server'

import {
  normalizeAnalyticsPayload,
  resolveTrackingIds,
} from '@/lib/analytics'
import { getClientIp, hashIpAddress } from '@/lib/analytics/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const VISITOR_COOKIE_NAME = 'clawlist_vid'
const SESSION_COOKIE_NAME = 'clawlist_sid'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8
const VISITOR_MAX_AGE_SECONDS = 60 * 60 * 24 * 365
const SHOULD_USE_SECURE_COOKIE = process.env.NODE_ENV === 'production'

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase service role is not configured' },
      { status: 503 },
    )
  }

  let payload

  try {
    payload = normalizeAnalyticsPayload(await request.json())
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid request payload' },
      { status: 400 },
    )
  }

  const cookiesHeader = request.headers.get('cookie') ?? ''
  const visitorCookie = cookiesHeader
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${VISITOR_COOKIE_NAME}=`))
    ?.split('=')[1]
  const sessionCookie = cookiesHeader
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${SESSION_COOKIE_NAME}=`))
    ?.split('=')[1]

  const trackingIds = resolveTrackingIds(
    visitorCookie,
    sessionCookie,
    payload.visitorId,
    payload.sessionId,
  )

  const forwardedFor = request.headers.get('x-forwarded-for')
  const ipHash = hashIpAddress(getClientIp(forwardedFor))

  const insertPayload = {
    event_type: payload.eventType,
    skill_id: payload.skillId ?? null,
    skill_slug: payload.skillSlug ?? null,
    page_path: payload.pagePath ?? null,
    visitor_id: trackingIds.visitorId,
    session_id: trackingIds.sessionId,
    value: payload.value ?? null,
    metadata: payload.metadata,
    referrer: request.headers.get('referer'),
    user_agent: request.headers.get('user-agent'),
    ip_hash: ipHash ?? null,
  }

  const { error } = await supabaseAdmin
    .from('analytics')
    .insert(insertPayload)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    )
  }

  const response = NextResponse.json({
    ok: true,
    visitorId: trackingIds.visitorId,
    sessionId: trackingIds.sessionId,
  })

  if (trackingIds.shouldSetVisitorCookie) {
    response.cookies.set(VISITOR_COOKIE_NAME, trackingIds.visitorId, {
      maxAge: VISITOR_MAX_AGE_SECONDS,
      httpOnly: false,
      sameSite: 'lax',
      secure: SHOULD_USE_SECURE_COOKIE,
      path: '/',
    })
  }

  if (trackingIds.shouldSetSessionCookie) {
    response.cookies.set(SESSION_COOKIE_NAME, trackingIds.sessionId, {
      maxAge: SESSION_MAX_AGE_SECONDS,
      httpOnly: false,
      sameSite: 'lax',
      secure: SHOULD_USE_SECURE_COOKIE,
      path: '/',
    })
  }

  return response
}

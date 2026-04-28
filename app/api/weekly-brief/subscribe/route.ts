import { NextResponse } from 'next/server'

import { getClientIp, hashIpAddress } from '@/lib/analytics/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeText(value: unknown, maxLength = 240) {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }

  return trimmed.slice(0, maxLength)
}

function sanitizeEmail(value: unknown) {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalized = value.trim().toLowerCase()

  if (!EMAIL_REGEX.test(normalized)) {
    return undefined
  }

  return normalized
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Signup storage is not configured yet.' },
      { status: 503 },
    )
  }

  let payload: {
    company?: unknown
    email?: unknown
    pagePath?: unknown
    source?: unknown
  }

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid signup payload.' },
      { status: 400 },
    )
  }

  if (sanitizeText(payload.company, 80)) {
    return NextResponse.json({ ok: true })
  }

  const email = sanitizeEmail(payload.email)

  if (!email) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 },
    )
  }

  const pagePath = sanitizeText(payload.pagePath, 200) ?? '/'
  const source = sanitizeText(payload.source, 120) ?? 'weekly_ai_brief'

  const { data: existingSignup, error: lookupError } = await supabaseAdmin
    .from('analytics')
    .select('id')
    .eq('event_type', 'newsletter_signup')
    .contains('metadata', { email })
    .limit(1)
    .maybeSingle()

  if (lookupError) {
    return NextResponse.json(
      { error: lookupError.message },
      { status: 500 },
    )
  }

  if (existingSignup) {
    return NextResponse.json({
      alreadySubscribed: true,
      ok: true,
    })
  }

  const referrer = request.headers.get('referer')
  const ipHash = hashIpAddress(getClientIp(request.headers.get('x-forwarded-for')))

  const { error } = await supabaseAdmin
    .from('analytics')
    .insert({
      event_type: 'newsletter_signup',
      visitor_id: crypto.randomUUID(),
      session_id: crypto.randomUUID(),
      page_path: pagePath,
      metadata: {
        email,
        source,
      },
      referrer,
      user_agent: request.headers.get('user-agent'),
      ip_hash: ipHash ?? null,
    })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}

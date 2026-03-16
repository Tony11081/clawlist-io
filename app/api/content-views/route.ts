import { NextResponse } from 'next/server'

import { supabase, supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

type ContentType = 'blog' | 'guide'

function isContentType(value: unknown): value is ContentType {
  return value === 'blog' || value === 'guide'
}

export async function POST(request: Request) {
  const client = supabaseAdmin ?? supabase

  if (!client) {
    return NextResponse.json(
      { error: 'Supabase is not configured' },
      { status: 503 },
    )
  }

  let payload: { contentType?: unknown; slug?: unknown }

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload' },
      { status: 400 },
    )
  }

  if (!isContentType(payload.contentType) || typeof payload.slug !== 'string' || !payload.slug.trim()) {
    return NextResponse.json(
      { error: 'Invalid content view payload' },
      { status: 400 },
    )
  }

  let lookupQuery = client
    .from('blog_posts')
    .select('id, views')
    .eq('slug', payload.slug.trim())

  if (payload.contentType === 'guide') {
    lookupQuery = lookupQuery.eq('category', 'guides')
  }

  const { data, error } = await lookupQuery.single()

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? 'Content not found' },
      { status: 404 },
    )
  }

  const { error: updateError } = await client
    .from('blog_posts')
    .update({ views: (data.views ?? 0) + 1 })
    .eq('id', data.id)

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}

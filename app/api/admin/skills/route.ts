import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// API Key 验证
function verifyApiKey(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  const validKey = process.env.CLAWLIST_ADMIN_API_KEY

  if (!validKey) {
    return { valid: false, error: 'API key not configured' }
  }

  if (!apiKey || apiKey !== validKey) {
    return { valid: false, error: 'Invalid API key' }
  }

  return { valid: true }
}

// GET - 查询 skills
export async function GET(request: NextRequest) {
  const auth = verifyApiKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const limit = parseInt(searchParams.get('limit') || '100')

  try {
    if (slug) {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error

      return NextResponse.json({ success: true, data })
    }

    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST - 创建 skill
export async function POST(request: NextRequest) {
  const auth = verifyApiKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from('skills')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT - 更新 skill
export async function PUT(request: NextRequest) {
  const auth = verifyApiKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { slug, ...updates } = body

    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('slug', slug)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - 删除 skill
export async function DELETE(request: NextRequest) {
  const auth = verifyApiKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  try {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('slug', slug)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Skill deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

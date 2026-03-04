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

// GET - 查询 blog posts
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
    let query = supabase.from('blog_posts').select('*')

    if (slug) {
      query = query.eq('slug', slug).single()
    } else {
      query = query.order('published_at', { ascending: false }).limit(limit)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST - 创建 blog post
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
      .from('blog_posts')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT - 更新 blog post
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
      .from('blog_posts')
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

// DELETE - 删除 blog post
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
      .from('blog_posts')
      .delete()
      .eq('slug', slug)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Blog post deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unexpected server error'
}

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

// GET - 获取统计信息
export async function GET(request: NextRequest) {
  const auth = verifyApiKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    // 获取 skills 数量
    const { count: skillsCount } = await supabase
      .from('skills')
      .select('*', { count: 'exact', head: true })

    // 获取 blog posts 数量
    const { count: blogCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    // 获取最近的 skills
    const { data: recentSkills } = await supabase
      .from('skills')
      .select('name, slug, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    // 获取最近的 blog posts
    const { data: recentBlogs } = await supabase
      .from('blog_posts')
      .select('title, slug, published_at')
      .order('published_at', { ascending: false })
      .limit(5)

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          skills: skillsCount || 0,
          blogs: blogCount || 0,
          total: (skillsCount || 0) + (blogCount || 0)
        },
        recent: {
          skills: recentSkills || [],
          blogs: recentBlogs || []
        }
      }
    })
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}

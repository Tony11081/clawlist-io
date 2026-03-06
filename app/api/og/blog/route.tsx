import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug || !supabase) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#191919',
              color: 'white',
            }}
          >
            <div style={{ fontSize: 80, fontWeight: 'bold' }}>ClawList Blog</div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    const { data: post } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!post) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#191919',
              color: 'white',
            }}
          >
            <div style={{ fontSize: 60 }}>Post Not Found</div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f7f7f7',
            padding: '60px 80px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#191919' }}>ClawList Blog</div>
            {post.category && (
              <div
                style={{
                  marginLeft: 'auto',
                  padding: '12px 24px',
                  backgroundColor: '#e5e5e5',
                  color: '#191919',
                  borderRadius: 999,
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}
              >
                {post.category}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: 64, fontWeight: 'bold', color: '#191919', marginBottom: 20, lineHeight: 1.2 }}>
              {post.title}
            </div>
            {post.summary && (
              <div style={{ fontSize: 28, color: '#666666', lineHeight: 1.4 }}>
                {post.summary.substring(0, 150)}...
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#666666' }}>
            {post.author && <span style={{ marginRight: 30 }}>By {post.author}</span>}
            {post.reading_time && <span>{post.reading_time} min read</span>}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}

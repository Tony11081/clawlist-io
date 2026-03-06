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
            <div style={{ fontSize: 80, fontWeight: 'bold' }}>ClawList.io</div>
            <div style={{ fontSize: 40, marginTop: 20 }}>OpenClaw Resource Hub</div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    const { data: skill } = await supabase
      .from('skills')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!skill) {
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
            <div style={{ fontSize: 60 }}>Skill Not Found</div>
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
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#191919' }}>ClawList.io</div>
            <div
              style={{
                marginLeft: 'auto',
                padding: '12px 24px',
                backgroundColor: skill.risk_level === 'low' ? '#f0f0f0' : '#262626',
                color: skill.risk_level === 'low' ? '#191919' : 'white',
                borderRadius: 999,
                fontSize: 20,
              }}
            >
              {skill.risk_level === 'low' ? 'Low Risk' : skill.risk_level === 'medium' ? 'Medium Risk' : 'High Risk'}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: 72, fontWeight: 'bold', color: '#191919', marginBottom: 20 }}>
              {skill.name}
            </div>
            <div style={{ fontSize: 32, color: '#666666', lineHeight: 1.4 }}>
              {skill.summary}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#666666' }}>
            {skill.stars && <span style={{ marginRight: 30 }}>⭐ {skill.stars}</span>}
            <span>👍 {skill.upvotes || 0} upvotes</span>
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


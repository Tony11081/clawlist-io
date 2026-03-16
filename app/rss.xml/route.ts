import { supabase } from '@/lib/supabase'

type RssPost = {
  title: string
  slug: string
  summary?: string | null
  content: string
  published_at: string
  author?: string | null
  tags?: string[] | null
}

export async function GET() {
  const baseUrl = 'https://clawlist.io'

  let posts: RssPost[] = []
  if (supabase) {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .or('category.is.null,category.neq.guides')
      .order('published_at', { ascending: false })
      .limit(50)

    posts = data || []
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ClawList Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Latest articles about OpenClaw, AI automation, and developer tools</description>
    <language>en</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.summary || post.content.substring(0, 200)}]]></description>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      ${post.author ? `<author>${post.author}</author>` : ''}
      ${post.tags?.map((tag: string) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

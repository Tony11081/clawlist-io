import { supabase } from '@/lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://clawlist.io'

  // Static pages
  const staticPages = [
    '',
    '/guides',
    '/skills',
    '/recipes',
    '/blog',
    '/api-marketplace',
    '/models',
    '/security',
    '/compare',
    '/submit',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : route === '/about' || route === '/contact' ? 0.7 : 0.8,
  }))

  // Dynamic skills
  let skillPages: any[] = []
  if (supabase) {
    const { data: skills } = await supabase
      .from('skills')
      .select('slug, created_at')
      .order('created_at', { ascending: false })

    if (skills) {
      skillPages = skills.map((skill) => ({
        url: `${baseUrl}/skills/${skill.slug}`,
        lastModified: skill.created_at,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }
  }

  // Dynamic blog posts
  let blogPages: any[] = []
  if (supabase) {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at')
      .order('published_at', { ascending: false })

    if (posts) {
      blogPages = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at || post.published_at,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  }

  return [...staticPages, ...skillPages, ...blogPages]
}

import { supabase } from '@/lib/supabase'

type SitemapEntry = {
  url: string
  lastModified: string
  changeFrequency: 'daily' | 'weekly' | 'monthly'
  priority: number
}

type SitemapSkillRow = {
  slug: string
  created_at?: string | null
}

type SitemapPostRow = {
  slug: string
  category?: string | null
  published_at?: string | null
  updated_at?: string | null
}

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
  let skillPages: SitemapEntry[] = []
  if (supabase) {
    const { data: skills } = await supabase
      .from('skills')
      .select('slug, created_at')
      .order('created_at', { ascending: false })

    if (skills) {
      skillPages = (skills as SitemapSkillRow[]).map((skill) => ({
        url: `${baseUrl}/skills/${skill.slug}`,
        lastModified: skill.created_at || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }
  }

  // Dynamic blog posts and guides
  let blogPages: SitemapEntry[] = []
  let guidePages: SitemapEntry[] = []
  if (supabase) {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, category, published_at, updated_at')
      .order('published_at', { ascending: false })

    if (posts) {
      blogPages = (posts as SitemapPostRow[])
        .filter((post) => post.category !== 'guides')
        .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at || post.published_at || new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        }))

      guidePages = (posts as SitemapPostRow[])
        .filter((post) => post.category === 'guides')
        .map((post) => ({
          url: `${baseUrl}/guides/${post.slug}`,
          lastModified: post.updated_at || post.published_at || new Date().toISOString(),
          changeFrequency: 'monthly' as const,
          priority: 0.65,
        }))
    }
  }

  return [...staticPages, ...skillPages, ...blogPages, ...guidePages]
}

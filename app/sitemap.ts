import {
  assessBlogIndexability,
  assessSkillIndexability,
} from '@/lib/content-quality'
import { resolveBlogSeo } from '@/lib/seo'
import { supabase } from '@/lib/supabase'
import { topicHubs } from '@/lib/topic-hubs'

type SitemapEntry = {
  url: string
  lastModified: string
  changeFrequency: 'daily' | 'weekly' | 'monthly'
  priority: number
}

type SitemapSkillRow = {
  slug: string
  created_at?: string | null
  name?: string | null
  summary?: string | null
  description?: string | null
  install_cmd?: string | null
  github_url?: string | null
  permissions?: string[] | null
}

type SitemapPostRow = {
  slug: string
  category?: string | null
  title?: string | null
  summary?: string | null
  content?: string | null
  published_at?: string | null
  updated_at?: string | null
}

export default async function sitemap() {
  const baseUrl = 'https://clawlist.io'
  const staticLastModified = '2026-04-28T00:00:00.000Z'

  // Static pages
  const staticPages = [
    '',
    '/guides',
    '/skills',
    '/topics',
    '/blog',
    '/briefs',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: staticLastModified,
    changeFrequency:
      route === '' || route === '/blog' || route === '/briefs'
        ? ('daily' as const)
        : ('weekly' as const),
    priority:
      route === ''
        ? 1
        : route === '/skills' ||
            route === '/guides' ||
            route === '/topics' ||
            route === '/blog' ||
            route === '/briefs'
          ? 0.8
          : route === '/about' || route === '/contact'
            ? 0.5
            : 0.3,
  }))

  // Dynamic skills
  let skillPages: SitemapEntry[] = []
  if (supabase) {
    const { data: skills } = await supabase
      .from('skills')
      .select(
        'slug, created_at, name, summary, description, install_cmd, github_url, permissions',
      )
      .order('created_at', { ascending: false })

    if (skills) {
      skillPages = (skills as SitemapSkillRow[])
        .filter((skill) => assessSkillIndexability(skill).indexable)
        .map((skill) => ({
          url: `${baseUrl}/skills/${skill.slug}`,
          lastModified: skill.created_at || staticLastModified,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
    }
  }

  // Dynamic blog posts and guides
  let blogPages: SitemapEntry[] = []
  let guidePages: SitemapEntry[] = []
  const topicPages: SitemapEntry[] = topicHubs.map((hub) => ({
    url: `${baseUrl}/topics/${hub.slug}`,
    lastModified: staticLastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))
  if (supabase) {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select(
        'slug, category, title, summary, content, published_at, updated_at',
      )
      .order('published_at', { ascending: false })

    if (posts) {
      blogPages = (posts as SitemapPostRow[])
        .filter((post) => post.category !== 'guides')
        .filter((post) => {
          const seo = resolveBlogSeo(
            post.slug,
            post.title ?? '',
            post.summary || post.content || '',
          )

          if (seo.canonicalPath && seo.canonicalPath !== `/blog/${post.slug}`) {
            return false
          }

          return assessBlogIndexability(post).indexable
        })
        .map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified:
            post.updated_at || post.published_at || staticLastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))

      guidePages = (posts as SitemapPostRow[])
        .filter((post) => post.category === 'guides')
        .filter((post) => assessBlogIndexability(post).indexable)
        .map((post) => ({
          url: `${baseUrl}/guides/${post.slug}`,
          lastModified:
            post.updated_at || post.published_at || staticLastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.65,
        }))
    }
  }

  return [
    ...staticPages,
    ...topicPages,
    ...skillPages,
    ...blogPages,
    ...guidePages,
  ]
}

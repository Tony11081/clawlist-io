import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/compare', '/submit'],
    },
    sitemap: 'https://clawlist.io/sitemap.xml',
    host: 'https://clawlist.io',
  }
}

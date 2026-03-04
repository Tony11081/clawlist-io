export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/test-db/'],
      },
    ],
    sitemap: 'https://clawlist.io/sitemap.xml',
  }
}

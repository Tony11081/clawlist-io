import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const siteUrl = 'https://clawlist.io'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ClawList.io - OpenClaw Resource Hub',
    template: '%s | ClawList.io',
  },
  description:
    'Comprehensive OpenClaw tutorials, skills library, job recipes, and model selection guide for AI automation.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ClawList.io - OpenClaw Resource Hub',
    description:
      'OpenClaw tutorials, skills library, recipes, and model guide for AI automation.',
    url: siteUrl,
    siteName: 'ClawList.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawList.io - OpenClaw Resource Hub',
    description:
      'OpenClaw tutorials, skills library, recipes, and model guide for AI automation.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ClawList.io',
    description: 'Comprehensive OpenClaw tutorials, skills library, job recipes, and model selection guide for AI automation.',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/skills?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="ClawList Blog RSS Feed" href="/rss.xml" />
      </head>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { OptionalAnalytics } from '@/components/optional-analytics'
import { TrackingNotice } from '@/components/tracking-notice'

const siteUrl = 'https://clawlist.io'
const googleTagId = 'G-20JC1B76MD'
const adSenseClient = 'ca-pub-2357915943973678'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ClawList — The Skills Marketplace for AI Agents',
    template: '%s | ClawList',
  },
  description:
    'Discover, share, and install Skills for OpenClaw and other AI agent frameworks. Browse 50+ ready-to-use skills for Claude Code, Manus, and more.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ClawList — The Skills Marketplace for AI Agents',
    description:
      'Discover, share, and install Skills for OpenClaw and other AI agent frameworks.',
    url: siteUrl,
    siteName: 'ClawList',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawList — The Skills Marketplace for AI Agents',
    description:
      'Discover, share, and install Skills for OpenClaw and other AI agent frameworks.',
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
    name: 'ClawList',
    description: 'The Skills Marketplace for AI Agents. Discover, share, and install skills for OpenClaw, Claude Code, and more.',
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
  const featuredSkillsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured OpenClaw Skills',
    description: 'Top-rated skills for OpenClaw AI agent framework',
    numberOfItems: 3,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://clawlist.io/skills/image-gen',
        name: 'Image Generator',
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: 'https://clawlist.io/skills/data-scraper',
        name: 'Data Scraper',
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: 'https://clawlist.io/skills/github-issues',
        name: 'GitHub Issues',
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredSkillsJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="ClawList Blog RSS Feed" href="/rss.xml" />
      </head>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <TrackingNotice adSenseClient={adSenseClient} googleTagId={googleTagId} />
        <OptionalAnalytics />
      </body>
    </html>
  )
}

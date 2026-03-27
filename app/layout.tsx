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
    default: 'ClawList.io - Global AI Directory & Newsroom',
    template: '%s | ClawList.io',
  },
  description:
    'Track AI tools, models, agents, guides, and industry coverage in one fast, editorially organized hub.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ClawList.io - Global AI Directory & Newsroom',
    description:
      'Track AI tools, models, agents, guides, and industry coverage in one fast, editorially organized hub.',
    url: siteUrl,
    siteName: 'ClawList.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawList.io - Global AI Directory & Newsroom',
    description:
      'Track AI tools, models, agents, guides, and industry coverage in one fast, editorially organized hub.',
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
    description: 'Track AI tools, models, agents, guides, and industry coverage in one fast, editorially organized hub.',
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

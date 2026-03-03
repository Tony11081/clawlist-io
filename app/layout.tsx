import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

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
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

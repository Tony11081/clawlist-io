import type { Metadata } from 'next'

import { AnalyticsTracker } from '@/components/analytics-tracker'
import { HomeDirectoryClient } from '@/components/home-directory-client'
import {
  claw123DirectorySections,
  getClaw123DirectoryStats,
  getFeaturedClaw123Sections,
} from '@/lib/claw123-directory'

export const metadata: Metadata = {
  title: 'OpenClaw Ecosystem Directory',
  description:
    'An English landing page for the OpenClaw ecosystem, adapted from Claw123 and organized into searchable categories.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ClawList OpenClaw Ecosystem Directory',
    description:
      'An English landing page for the OpenClaw ecosystem, adapted from Claw123 and organized into searchable categories.',
    url: 'https://clawlist.io',
  },
}

export default function Home() {
  const { totalCategories, totalResources } = getClaw123DirectoryStats()
  const featuredSections = getFeaturedClaw123Sections()

  return (
    <>
      <AnalyticsTracker
        payload={{
          eventType: 'page_view',
          pagePath: '/',
          metadata: {
            pageType: 'ecosystem_home',
            totalCategories,
            totalResources,
          },
        }}
      />
      <HomeDirectoryClient
        featuredSections={featuredSections}
        sections={claw123DirectorySections}
        totalCategories={totalCategories}
        totalResources={totalResources}
      />
    </>
  )
}

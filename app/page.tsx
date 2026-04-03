import type { Metadata } from 'next'

import { AnalyticsTracker } from '@/components/analytics-tracker'
import { HomeDirectoryClient } from '@/components/home-directory-client'
import { getHomepageEditorialPack, getRecentGuidePosts } from '@/lib/blog'
import {
  getFeaturedEcosystemItems,
  getEcosystemDirectoryStats,
  getFeaturedEcosystemSections,
} from '@/lib/ecosystem-directory'
import { getFeaturedSkills } from '@/lib/skills'
import { topicHubs } from '@/lib/topic-hubs'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Global AI Directory & Newsroom',
  description:
    'Track AI tools, models, agents, skills, and industry shifts in one editorial homepage built for faster browsing.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ClawList Global AI Directory & Newsroom',
    description:
      'Track AI tools, models, agents, skills, and industry shifts in one editorial homepage built for faster browsing.',
    url: 'https://clawlist.io',
  },
}

export default async function Home() {
  const { totalCategories, totalResources } = getEcosystemDirectoryStats()
  const featuredSections = getFeaturedEcosystemSections()
  const directorySpotlights = getFeaturedEcosystemItems(6)
  const [latestPosts, featuredGuides, featuredSkills] = await Promise.all([
    getHomepageEditorialPack(),
    getRecentGuidePosts(3),
    getFeaturedSkills(3),
  ])
  const featuredTopics = topicHubs.slice(0, 4).map((topic) => ({
    eyebrow: topic.eyebrow,
    slug: topic.slug,
    summary: topic.summary,
    title: topic.title,
  }))

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
        analysisPosts={latestPosts.analysis}
        directorySpotlights={directorySpotlights}
        editorsPicks={latestPosts.editorsPicks}
        featuredGuides={featuredGuides}
        featuredSections={featuredSections}
        featuredSkills={featuredSkills}
        featuredTopics={featuredTopics}
        mostReadPosts={latestPosts.mostRead}
        topStory={latestPosts.topStory}
        totalCategories={totalCategories}
        totalResources={totalResources}
      />
    </>
  )
}

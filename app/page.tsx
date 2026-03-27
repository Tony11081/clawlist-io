import type { Metadata } from 'next'

import { AnalyticsTracker } from '@/components/analytics-tracker'
import { HomeDirectoryClient } from '@/components/home-directory-client'
import { getRecentBlogPosts, getRecentGuidePosts } from '@/lib/blog'
import {
  claw123DirectorySections,
  getClaw123DirectoryStats,
  getFeaturedClaw123Sections,
} from '@/lib/claw123-directory'
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
  const { totalCategories, totalResources } = getClaw123DirectoryStats()
  const featuredSections = getFeaturedClaw123Sections()
  const [latestPosts, featuredGuides, featuredSkills] = await Promise.all([
    getRecentBlogPosts(3),
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
        featuredGuides={featuredGuides}
        featuredSections={featuredSections}
        featuredSkills={featuredSkills}
        featuredTopics={featuredTopics}
        latestPosts={latestPosts}
        sections={claw123DirectorySections}
        totalCategories={totalCategories}
        totalResources={totalResources}
      />
    </>
  )
}

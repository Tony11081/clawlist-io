import type { Metadata } from 'next'
import { SkillsLibraryClient } from '@/components/skills-library-client'
import { getSkillsList } from '@/lib/skills'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Skills Library',
  description:
    'Browse OpenClaw skills with working install paths, risk labels, and practical summaries.',
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    title: 'ClawList Skills Library',
    description:
      'Browse OpenClaw skills with working install paths, risk labels, and practical summaries.',
    url: 'https://clawlist.io/skills',
  },
}

export default async function SkillsPage() {
  const skills = await getSkillsList()

  return <SkillsLibraryClient skills={skills} />
}

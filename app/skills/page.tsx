import type { Metadata } from 'next'
import { SkillsLibraryClient } from '@/components/skills-library-client'
import { getSkillsList } from '@/lib/skills'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'OpenClaw Agent Capability Map',
  description:
    'Browse OpenClaw skills by outcome: research, coding, browser automation, content operations, and device control.',
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    title: 'ClawList OpenClaw Agent Capability Map',
    description:
      'Browse OpenClaw skills by outcome: research, coding, browser automation, content operations, and device control.',
    url: 'https://clawlist.io/skills',
  },
}

export default async function SkillsPage() {
  const skills = await getSkillsList()

  return <SkillsLibraryClient skills={skills} />
}

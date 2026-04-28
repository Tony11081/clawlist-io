'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, Star } from 'lucide-react'

import type { SkillListItem } from '@/lib/skills'
import { normalizeSkillCategory } from '@/lib/skills-publishing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type SkillsLibraryClientProps = {
  skills: SkillListItem[]
}

type CapabilityOutcome = {
  description: string
  label: string
  tokens: string[]
}

const capabilityOutcomes: CapabilityOutcome[] = [
  {
    label: 'Research',
    description:
      'Search, discovery, scraping, analysis, and market intelligence workflows.',
    tokens: [
      'analysis',
      'data',
      'discover',
      'research',
      'scrape',
      'search',
      'semrush',
      'similarweb',
    ],
  },
  {
    label: 'Coding',
    description:
      'CLI, repository, code review, testing, issue, and coding-agent workflows.',
    tokens: [
      'claude',
      'cli',
      'code',
      'codex',
      'devops',
      'github',
      'issue',
      'pr',
      'repo',
      'test',
    ],
  },
  {
    label: 'Browser Automation',
    description:
      'Browser, Chrome, CDP, Playwright, and Electron automation skills.',
    tokens: ['browser', 'cdp', 'chrome', 'electron', 'playwright', 'web'],
  },
  {
    label: 'Content Ops',
    description:
      'Writing, social, image, video, publishing, and marketing operations.',
    tokens: [
      'blog',
      'content',
      'creative',
      'image',
      'marketing',
      'publish',
      'social',
      'video',
      'write',
    ],
  },
  {
    label: 'Device Control',
    description:
      'Phone, camera, desktop, local device, and hardware-control workflows.',
    tokens: ['adb', 'android', 'camera', 'device', 'ios', 'phone', 'raspberry'],
  },
]

function getSkillCapability(skill: SkillListItem) {
  const haystack = [
    skill.name,
    skill.summary,
    normalizeSkillCategory(skill.category),
    skill.tags.join(' '),
  ]
    .join(' ')
    .toLowerCase()

  return (
    capabilityOutcomes.find((outcome) =>
      outcome.tokens.some((token) => haystack.includes(token)),
    ) ?? capabilityOutcomes[0]
  )
}

export function SkillsLibraryClient({ skills }: SkillsLibraryClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCapability, setSelectedCapability] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All',
    ...Array.from(
      new Set(
        skills
          .map((skill) => normalizeSkillCategory(skill.category))
          .filter((category): category is string => Boolean(category)),
      ),
    ),
  ]

  const normalizedSearch = searchQuery.trim().toLowerCase()
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      skill.name.toLowerCase().includes(normalizedSearch) ||
      skill.summary.toLowerCase().includes(normalizedSearch) ||
      getSkillCapability(skill)
        .label.toLowerCase()
        .includes(normalizedSearch) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))

    const matchesCapability =
      selectedCapability === 'All' ||
      getSkillCapability(skill).label === selectedCapability

    const matchesCategory =
      selectedCategory === 'All' ||
      normalizeSkillCategory(skill.category) === selectedCategory

    return matchesSearch && matchesCapability && matchesCategory
  })
  const sortedSkills = [...filteredSkills].sort((left, right) => {
    const installDelta =
      Number(Boolean(right.install_cmd)) - Number(Boolean(left.install_cmd))
    if (installDelta !== 0) {
      return installDelta
    }

    return right.upvotes - left.upvotes
  })

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          <Link
            href="/"
            className="hover:text-slate-900 dark:hover:text-slate-100"
          >
            Home
          </Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300">
            Capability Map
          </span>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            AGENT
            <br />
            CAPABILITIES.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Browse OpenClaw skills by the outcome they unlock: research, coding,
            browser automation, content operations, and device control.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search skills, tags, or use cases..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-12 h-14 bg-white dark:bg-[#262626]/20 border-[#262626]/10 dark:border-[#262626]/40 rounded-xl text-base focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {['All', ...capabilityOutcomes.map((outcome) => outcome.label)].map(
              (capability) => {
                const outcome = capabilityOutcomes.find(
                  (item) => item.label === capability,
                )

                return (
                  <button
                    key={capability}
                    type="button"
                    onClick={() => setSelectedCapability(capability)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      selectedCapability === capability
                        ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 dark:border-[#303030] dark:bg-[#121212] dark:text-slate-300'
                    }`}
                  >
                    <span className="text-sm font-black uppercase tracking-[0.18em]">
                      {capability}
                    </span>
                    <span className="mt-2 block text-xs leading-5 opacity-75">
                      {outcome?.description ??
                        'All install-ready and reviewed OpenClaw skills.'}
                    </span>
                  </button>
                )
              },
            )}
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Source Categories
            </p>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Badge
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 border-0 cursor-pointer rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                    selectedCategory === category
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'bg-slate-200 dark:bg-[#262626]/40 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-[#262626]/60'
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {filteredSkills.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No skills match your current search.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSkills.map((skill) => (
              <div
                key={skill.id}
                className="group bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-2xl overflow-hidden hover:border-slate-900 dark:hover:border-slate-500 transition-all hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:underline underline-offset-4">
                        {skill.name}
                      </h3>
                      {skill.category && (
                        <p className="mt-2 text-xs font-mono uppercase tracking-widest text-slate-500">
                          {normalizeSkillCategory(skill.category)}
                        </p>
                      )}
                    </div>
                    <Badge
                      className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tighter rounded ${
                        skill.risk_level === 'low'
                          ? 'bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300'
                          : skill.risk_level === 'medium'
                            ? 'bg-slate-400 text-white dark:bg-[#262626]/60 dark:text-slate-200'
                            : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      } border-0`}
                    >
                      {skill.risk_level === 'low'
                        ? 'Low Risk'
                        : skill.risk_level === 'medium'
                          ? 'Medium'
                          : 'High Risk'}
                    </Badge>
                  </div>

                  <div className="mb-4 rounded-2xl bg-slate-50 p-4 dark:bg-[#191919]">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      Capability
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {getSkillCapability(skill).label}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {getSkillCapability(skill).description}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed min-h-16">
                    {skill.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {skill.tags.slice(0, 4).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] px-2 py-0.5 border-[#262626]/20 dark:border-[#262626]/40 rounded-full font-mono"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#262626]/10 dark:border-[#262626]/30">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {skill.upvotes}
                      </span>
                      {skill.install_cmd && (
                        <span className="font-mono uppercase tracking-widest">
                          Install ready
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:opacity-90"
                      asChild
                    >
                      <Link href={`/skills/${skill.slug}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

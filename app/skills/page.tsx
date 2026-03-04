import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search, ArrowRight, Star, Download, Shield } from 'lucide-react'

export const revalidate = 0 // 实时更新，不缓存
export const dynamic = 'force-dynamic' // 强制动态渲染

export const metadata: Metadata = {
  title: 'Skills Library',
  description: 'Discover, install, and compare OpenClaw skills with risk labels and required permissions.',
  alternates: {
    canonical: '/skills',
  },
}

async function getSkills() {
  if (!supabase) {
    console.warn('Supabase not configured, returning mock data')
    return []
  }

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('upvotes', { ascending: false })

  if (error) {
    console.error('Error fetching skills:', error)
    return []
  }

  return data || []
}

export default async function SkillsPage() {
  const skills = await getSkills()

  // Mock data for demonstration
  const mockSkills = [
    {
      id: 1,
      name: 'GitHub Automation',
      slug: 'github-automation',
      summary: 'Automate issue management, PR reviews, and repository maintenance tasks',
      risk_level: 'low',
      upvotes: 234,
      downloads: '12.5K',
      tags: ['automation', 'github', 'ci/cd'],
      install: 'npx skills add github-auto'
    },
    {
      id: 2,
      name: 'Browser Agent',
      slug: 'browser-agent',
      summary: 'Headless browser automation for testing, scraping, and monitoring',
      risk_level: 'medium',
      upvotes: 189,
      downloads: '8.3K',
      tags: ['browser', 'testing', 'scraping'],
      install: 'npx skills add browser-agent'
    },
    {
      id: 3,
      name: 'Email Marketing',
      slug: 'email-marketing',
      summary: 'Automated email campaigns with templates and analytics',
      risk_level: 'low',
      upvotes: 156,
      downloads: '6.7K',
      tags: ['marketing', 'email', 'automation'],
      install: 'npx skills add email-marketing'
    },
    {
      id: 4,
      name: 'Database Sync',
      slug: 'database-sync',
      summary: 'Real-time database synchronization across multiple environments',
      risk_level: 'high',
      upvotes: 142,
      downloads: '5.2K',
      tags: ['database', 'sync', 'devops'],
      install: 'npx skills add db-sync'
    },
    {
      id: 5,
      name: 'Slack Integration',
      slug: 'slack-integration',
      summary: 'Connect your workflows to Slack channels and direct messages',
      risk_level: 'low',
      upvotes: 128,
      downloads: '4.9K',
      tags: ['slack', 'messaging', 'integration'],
      install: 'npx skills add slack-int'
    },
    {
      id: 6,
      name: 'API Gateway',
      slug: 'api-gateway',
      summary: 'Unified API gateway with rate limiting and authentication',
      risk_level: 'medium',
      upvotes: 115,
      downloads: '3.8K',
      tags: ['api', 'gateway', 'security'],
      install: 'npx skills add api-gateway'
    }
  ]

  const displaySkills = skills.length > 0 ? skills : mockSkills

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300">Skills Library</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            SKILLS <br/>LIBRARY.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Discover, install, and compare OpenClaw skills. All plugins are labeled with risk levels and required permissions.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search skills..."
              className="pl-12 h-14 bg-white dark:bg-[#262626]/20 border-[#262626]/10 dark:border-[#262626]/40 rounded-xl text-base focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-0 cursor-pointer hover:opacity-90 rounded-full font-bold text-xs uppercase tracking-widest">
              All
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-[#262626]/20 dark:border-[#262626]/40 cursor-pointer hover:bg-[#262626]/5 rounded-full font-bold text-xs uppercase tracking-widest">
              Code
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-[#262626]/20 dark:border-[#262626]/40 cursor-pointer hover:bg-[#262626]/5 rounded-full font-bold text-xs uppercase tracking-widest">
              Automation
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-[#262626]/20 dark:border-[#262626]/40 cursor-pointer hover:bg-[#262626]/5 rounded-full font-bold text-xs uppercase tracking-widest">
              Marketing
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-[#262626]/20 dark:border-[#262626]/40 cursor-pointer hover:bg-[#262626]/5 rounded-full font-bold text-xs uppercase tracking-widest">
              Social
            </Badge>
          </div>
        </div>

        {/* Skills Grid */}
        {displaySkills.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No skills available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displaySkills.map((skill) => (
              <div key={skill.id} className="group bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-2xl overflow-hidden hover:border-slate-900 dark:hover:border-slate-500 transition-all hover:shadow-xl">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:underline underline-offset-4">{skill.name}</h3>
                    <Badge className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tighter rounded ${
                      skill.risk_level === 'low'
                        ? 'bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300'
                        : skill.risk_level === 'medium'
                        ? 'bg-slate-400 text-white dark:bg-[#262626]/60 dark:text-slate-200'
                        : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    } border-0`}>
                      {skill.risk_level === 'low' ? 'Low Risk' : skill.risk_level === 'medium' ? 'Medium' : 'High Risk'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {skill.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skill.tags?.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5 border-[#262626]/20 dark:border-[#262626]/40 rounded-full font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#262626]/10 dark:border-[#262626]/30">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {skill.upvotes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {skill.downloads || '0'}
                      </span>
                    </div>
                    <Button size="sm" className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:opacity-90" asChild>
                      <Link href={`/skills/${skill.slug}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {displaySkills.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" className="border-2 border-[#262626]/20 dark:border-[#262626]/40 px-8 py-6 rounded-xl font-bold uppercase tracking-widest hover:bg-[#262626]/5">
              Load More Skills
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

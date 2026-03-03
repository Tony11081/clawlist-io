import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Layers, Clock, Shield } from 'lucide-react'
import { recipes } from '@/lib/catalog'

export default function RecipesPage() {
  // Mock data if catalog is empty
  const mockRecipes = [
    {
      id: 1,
      title: 'GitHub Issue Manager',
      slug: 'github-issue-manager',
      summary: 'Automatically triage, label, and respond to GitHub issues with AI-powered analysis',
      role_type: 'DevOps',
      difficulty: 'beginner',
      skills_count: 3,
      risk_level: 'low',
      estimatedTime: '15 min'
    },
    {
      id: 2,
      title: 'Content Marketing Bot',
      slug: 'content-marketing-bot',
      summary: 'Generate, schedule, and publish content across multiple social media platforms',
      role_type: 'Marketing',
      difficulty: 'intermediate',
      skills_count: 5,
      risk_level: 'low',
      estimatedTime: '30 min'
    },
    {
      id: 3,
      title: 'Customer Support Agent',
      slug: 'customer-support-agent',
      summary: 'Handle customer inquiries via email, chat, and ticketing systems with context awareness',
      role_type: 'Support',
      difficulty: 'intermediate',
      skills_count: 4,
      risk_level: 'medium',
      estimatedTime: '25 min'
    },
    {
      id: 4,
      title: 'Data Pipeline Monitor',
      slug: 'data-pipeline-monitor',
      summary: 'Monitor ETL pipelines, detect anomalies, and send alerts for data quality issues',
      role_type: 'Data Engineering',
      difficulty: 'advanced',
      skills_count: 6,
      risk_level: 'medium',
      estimatedTime: '45 min'
    },
    {
      id: 5,
      title: 'Code Review Assistant',
      slug: 'code-review-assistant',
      summary: 'Automated code review with security scanning, style checking, and best practice suggestions',
      role_type: 'Engineering',
      difficulty: 'intermediate',
      skills_count: 4,
      risk_level: 'low',
      estimatedTime: '20 min'
    },
    {
      id: 6,
      title: 'Sales Lead Qualifier',
      slug: 'sales-lead-qualifier',
      summary: 'Qualify inbound leads, enrich contact data, and route to appropriate sales reps',
      role_type: 'Sales',
      difficulty: 'beginner',
      skills_count: 3,
      risk_level: 'low',
      estimatedTime: '15 min'
    }
  ]

  const displayRecipes = recipes.length > 0 ? recipes : mockRecipes

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300">Job Recipes</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            JOB <br/>RECIPES.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            One-click job configurations for ready-to-use AI agents. Pre-configured workflows that combine multiple skills for common automation tasks.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Badge className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-0 cursor-pointer hover:opacity-90 rounded-full font-bold text-xs uppercase tracking-widest">
            All Recipes
          </Badge>
          <Badge variant="outline" className="px-4 py-2 border-[#262626]/20 dark:border-[#262626]/40 cursor-pointer hover:bg-[#262626]/5 rounded-full font-bold text-xs uppercase tracking-widest">
            DevOps
          </Badge>
          <Badge variant="outline" className="px-4 py-2 border-[#262626]/20 dark:border-[#262626]/40 cursor-pointer hover:bg-[#262626]/5 rounded-full font-bold text-xs uppercase tracking-widest">
            Marketing
          </Badge>
          <Badge variant="outline" className="px-4 py-2 border-[#262626]/20 dark:border-[#262626]/40 cursor-pointer hover:bg-[#262626]/5 rounded-full font-bold text-xs uppercase tracking-widest">
            Support
          </Badge>
          <Badge variant="outline" className="px-4 py-2 border-[#262626]/20 dark:border-[#262626]/40 cursor-pointer hover:bg-[#262626]/5 rounded-full font-bold text-xs uppercase tracking-widest">
            Engineering
          </Badge>
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecipes.map((recipe) => (
            <div key={recipe.id} className="group bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-2xl overflow-hidden hover:border-slate-900 dark:hover:border-slate-500 transition-all hover:shadow-xl">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:underline underline-offset-4">{recipe.title}</h3>
                  <Badge className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tighter rounded ${
                    recipe.risk_level === 'low'
                      ? 'bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300'
                      : 'bg-slate-400 text-white dark:bg-[#262626]/60 dark:text-slate-200'
                  } border-0`}>
                    {recipe.risk_level === 'low' ? 'Low Risk' : 'Medium Risk'}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {recipe.summary}
                </p>
                <div className="space-y-3 mb-6 pb-6 border-b border-[#262626]/10 dark:border-[#262626]/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">Role Type</span>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-[#262626]/20 dark:border-[#262626]/40 rounded-full font-bold">
                      {recipe.role_type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">Difficulty</span>
                    <span className="text-xs font-bold">
                      {recipe.difficulty === 'beginner' ? 'Beginner' : recipe.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-widest flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      Skills
                    </span>
                    <span className="text-xs font-bold">{recipe.skills_count} included</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-widest flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Setup Time
                    </span>
                    <span className="text-xs font-bold">{recipe.estimatedTime || '~20 min'}</span>
                  </div>
                </div>
                <Button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold uppercase tracking-widest hover:opacity-90" asChild>
                  <Link href={`/recipes/${recipe.slug}`}>
                    View Recipe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-8 rounded-2xl flex items-center gap-6 border border-slate-800 dark:border-slate-200">
          <div className="size-12 flex-shrink-0 bg-white/10 dark:bg-black/10 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Custom Recipes</h3>
            <p className="text-slate-300 dark:text-slate-600 text-sm leading-relaxed">
              Need a custom recipe for your specific workflow? Submit a request or contribute your own recipe to the community library.
            </p>
          </div>
          <Button variant="outline" className="hidden lg:block border border-white dark:border-slate-900 px-6 py-2 rounded-full font-bold hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white transition-all" asChild>
            <Link href="/submit">Submit Recipe</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

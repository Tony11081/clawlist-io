import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Layers, Puzzle, Shield, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { guides } from '@/lib/catalog'

export default function GuidesPage() {
  // Sample tutorial data - replace with actual data
  const tutorials = [
    {
      id: 1,
      title: 'Optimizing Parallel Processing with Core Engine V2',
      description: 'Explore how to maximize throughput and minimize latency using the redesigned scheduler in OpenClaw 2.0. This guide covers worker pools and async task orchestration.',
      level: 'Advanced',
      readTime: '12 Min Read',
      date: 'June 20, 2024',
      author: 'Alex Rivera',
      slug: 'parallel-processing-v2'
    },
    {
      id: 2,
      title: 'Custom Hook Implementation for State Management',
      description: 'A practical look at building reusable logic hooks that interface directly with the OpenClaw telemetry API for real-time monitoring components.',
      level: 'Intermediate',
      readTime: '8 Min Read',
      date: 'June 15, 2024',
      author: 'Sarah Chen',
      slug: 'custom-hooks-state'
    },
    {
      id: 3,
      title: 'Hello World: Your First OpenClaw Module',
      description: 'Everything you need to know to get started. From environment setup to deploying your first functional script in under 5 minutes.',
      level: 'Beginner',
      readTime: '5 Min Read',
      date: 'June 12, 2024',
      author: 'Markus Weber',
      slug: 'hello-world-module'
    }
  ]

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300">Guides & Tutorials</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            TECHNICAL <br/>RESOURCES.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            A curated collection of deep-dives, architectural overviews, and step-by-step implementations for the OpenClaw ecosystem.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-6 bg-[#262626]/5 dark:bg-[#262626]/20 border border-[#262626]/10 dark:border-[#262626]/40 rounded-xl hover:bg-[#262626]/10 transition-colors cursor-pointer group">
            <Sparkles className="mb-4 h-8 w-8 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold uppercase text-sm">Basics</h3>
            <p className="text-xs text-slate-500 mt-1">12 Tutorials</p>
          </div>
          <div className="p-6 bg-[#262626]/5 dark:bg-[#262626]/20 border border-[#262626]/10 dark:border-[#262626]/40 rounded-xl hover:bg-[#262626]/10 transition-colors cursor-pointer group">
            <Layers className="mb-4 h-8 w-8 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold uppercase text-sm">Advanced</h3>
            <p className="text-xs text-slate-500 mt-1">8 Tutorials</p>
          </div>
          <div className="p-6 bg-[#262626]/5 dark:bg-[#262626]/20 border border-[#262626]/10 dark:border-[#262626]/40 rounded-xl hover:bg-[#262626]/10 transition-colors cursor-pointer group">
            <Puzzle className="mb-4 h-8 w-8 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold uppercase text-sm">Integrations</h3>
            <p className="text-xs text-slate-500 mt-1">15 Tutorials</p>
          </div>
          <div className="p-6 bg-[#262626]/5 dark:bg-[#262626]/20 border border-[#262626]/10 dark:border-[#262626]/40 rounded-xl hover:bg-[#262626]/10 transition-colors cursor-pointer group">
            <Shield className="mb-4 h-8 w-8 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold uppercase text-sm">Security</h3>
            <p className="text-xs text-slate-500 mt-1">6 Tutorials</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-8 border-b border-[#262626]/10 dark:border-[#262626]/40 pb-4">
          <div className="flex gap-8">
            <button className="font-bold text-sm uppercase tracking-widest border-b-2 border-slate-900 dark:border-slate-100 pb-4 -mb-[18px]">
              Latest
            </button>
            <button className="font-bold text-sm uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Popular
            </button>
            <button className="font-bold text-sm uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Series
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">SORT BY:</span>
            <button className="flex items-center gap-1 font-bold">
              DATE DESC <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Tutorial Cards */}
        <div className="flex flex-col gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="group flex flex-col md:flex-row gap-8 p-6 bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-xl hover:border-slate-900 dark:hover:border-slate-500 transition-all">
              <div className="w-full md:w-72 h-48 shrink-0 bg-[#262626]/20 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-[#262626]/40 mix-blend-multiply"></div>
              </div>
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tighter rounded ${
                      tutorial.level === 'Advanced'
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                        : 'bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300'
                    } border-0`}>
                      {tutorial.level}
                    </Badge>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      {tutorial.readTime} • {tutorial.date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black mb-3 group-hover:underline underline-offset-4 decoration-2">
                    {tutorial.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
                    {tutorial.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <span className="text-xs font-medium">{tutorial.author}</span>
                  </div>
                  <Button className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform" asChild>
                    <Link href={`/guides/${tutorial.slug}`}>
                      Read Tutorial
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="size-10 flex items-center justify-center border border-[#262626]/20 dark:border-[#262626]/40 rounded-lg hover:bg-[#262626]/5">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="size-10 flex items-center justify-center bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold text-sm">
              1
            </button>
            <button className="size-10 flex items-center justify-center border border-[#262626]/20 dark:border-[#262626]/40 rounded-lg font-bold text-sm hover:bg-[#262626]/5">
              2
            </button>
            <button className="size-10 flex items-center justify-center border border-[#262626]/20 dark:border-[#262626]/40 rounded-lg font-bold text-sm hover:bg-[#262626]/5">
              3
            </button>
            <span className="px-2">...</span>
            <button className="size-10 flex items-center justify-center border border-[#262626]/20 dark:border-[#262626]/40 rounded-lg font-bold text-sm hover:bg-[#262626]/5">
              12
            </button>
            <button className="size-10 flex items-center justify-center border border-[#262626]/20 dark:border-[#262626]/40 rounded-lg hover:bg-[#262626]/5">
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </main>
    </div>
  )
}

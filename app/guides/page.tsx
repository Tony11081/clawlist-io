import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { extractFirstImage } from '@/lib/extract-image'
import { Breadcrumb } from '@/components/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Layers, Puzzle, Shield, ChevronLeft, ChevronRight, ArrowRight, Clock, Calendar } from 'lucide-react'

export const revalidate = 0 // 实时更新
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Guides & Tutorials - ClawList.io',
  description: 'A curated collection of deep-dives, architectural overviews, and step-by-step implementations for the OpenClaw ecosystem.',
  alternates: { canonical: '/guides' },
}

async function getGuides() {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', 'guides')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching guides:', error)
    return []
  }

  return data || []
}

export default async function GuidesPage() {
  const guides = await getGuides()

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides & Tutorials' },
          ]}
        />

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            TECHNICAL <br/>RESOURCES.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            A curated collection of deep-dives, architectural overviews, and step-by-step implementations for the OpenClaw ecosystem.
          </p>
        </div>

        {/* Tutorial Cards */}
        {guides.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No guides available yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col md:flex-row gap-8 p-6 bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-xl hover:border-slate-900 dark:hover:border-slate-500 transition-all"
              >
                {/* Cover Image */}
                <div className="w-full md:w-72 h-48 shrink-0 rounded-lg overflow-hidden relative bg-slate-200 dark:bg-slate-700">
                  {(() => {
                    const coverImage = guide.cover_image || extractFirstImage(guide.content)
                    return coverImage ? (
                      <Image
                        src={coverImage}
                        alt={guide.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                    )
                  })()}
                </div>

                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {guide.tags && guide.tags.length > 0 && (
                        <Badge className="px-2 py-1 text-[10px] font-bold uppercase tracking-tighter rounded bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300 border-0">
                          {guide.tags[0]}
                        </Badge>
                      )}
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {guide.reading_time && `${guide.reading_time} MIN READ`}
                        {guide.published_at && ` • ${new Date(guide.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black mb-3 group-hover:underline underline-offset-4 decoration-2">
                      {guide.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
                      {guide.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      {guide.author && (
                        <>
                          <div className="size-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                          <span className="text-xs font-medium">{guide.author}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-xs uppercase tracking-widest">
                      Read Tutorial
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

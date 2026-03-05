import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guides } from '@/lib/catalog'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ReactMarkdown from 'react-markdown'
import fs from 'fs'
import path from 'path'

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

async function getGuideContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'guides', `${slug}.md`)
    const content = fs.readFileSync(filePath, 'utf8')
    return content
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)
  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  return {
    title: `${guide.title} | ClawList Guides`,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)

  if (!guide) {
    notFound()
  }

  const content = await getGuideContent(slug)

  if (!content) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <article className="max-w-4xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <Link href="/guides" className="hover:text-slate-900 dark:hover:text-slate-100">Guides</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300 truncate max-w-[200px]">{guide.title}</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <Badge className="mb-4 px-3 py-1 bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300 border-0 text-[10px] font-bold uppercase tracking-wider">
            {guide.category}
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {guide.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-6 border-b border-slate-200 dark:border-[#262626]">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{guide.readTime}</span>
            </div>
            <Badge className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tighter rounded ${
              guide.difficulty === 'beginner'
                ? 'bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300'
                : 'bg-slate-400 text-white dark:bg-[#262626]/60 dark:text-slate-200'
            } border-0`}>
              {guide.difficulty}
            </Badge>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-8
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-[#262626] prose-h2:pb-3
          prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5
          prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4
          prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[17px]
          prose-a:text-slate-900 dark:prose-a:text-slate-100 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
          prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-bold
          prose-code:bg-slate-100 dark:prose-code:bg-[#262626] prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-[15px] prose-code:font-mono prose-code:text-slate-900 dark:prose-code:text-slate-100 prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#1e1e1e] dark:prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:my-8 prose-pre:overflow-x-auto
          prose-pre:shadow-xl
          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:my-3 prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:leading-relaxed
          prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400 prose-blockquote:my-8
          prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
          prose-hr:border-slate-200 dark:prose-hr:border-[#262626] prose-hr:my-12
          prose-table:my-8
          prose-th:bg-slate-100 dark:prose-th:bg-[#262626] prose-th:p-3 prose-th:font-bold
          prose-td:p-3 prose-td:border prose-td:border-slate-200 dark:prose-td:border-[#262626]
        ">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[#262626]">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl hover:opacity-90 transition-opacity font-bold text-sm uppercase tracking-widest"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Guides
          </Link>
        </div>
      </article>
    </div>
  )
}

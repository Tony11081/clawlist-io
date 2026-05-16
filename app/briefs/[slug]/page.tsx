import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

import { Breadcrumb } from '@/components/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { getBriefBySlug, getBriefs } from '@/lib/briefs'

export const revalidate = 300

type Props = {
  params: Promise<{ slug: string }>
}

function formatLongDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export async function generateStaticParams() {
  const briefs = await getBriefs()
  return briefs.map((brief) => ({ slug: brief.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const brief = await getBriefBySlug(slug)

  if (!brief) {
    return { title: 'Brief Not Found' }
  }

  const title = `${brief.title} | ClawList`
  const description = brief.summary

  return {
    title,
    description,
    alternates: { canonical: `/briefs/${brief.slug}` },
    openGraph: {
      title,
      description,
      url: `https://clawlist.io/briefs/${brief.slug}`,
      type: 'article',
      publishedTime: brief.published_at,
      images: brief.cover_image
        ? [
            {
              url: `https://clawlist.io${brief.cover_image}`,
              width: 1200,
              height: 630,
              alt: brief.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: brief.cover_image ? [`https://clawlist.io${brief.cover_image}`] : undefined,
    },
  }
}

export default async function BriefDetailPage({ params }: Props) {
  const { slug } = await params
  const brief = await getBriefBySlug(slug)

  if (!brief) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <article className="max-w-4xl mx-auto w-full px-6 py-12 lg:px-20">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Briefs', href: '/briefs' },
            { label: brief.title },
          ]}
        />

        <header className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
            Daily Ops Brief
          </p>
          <h1 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-slate-100">
            {brief.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {brief.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="font-mono uppercase tracking-[0.2em] text-xs">
              {formatLongDate(brief.published_at)}
            </span>
            {brief.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {brief.tags.slice(0, 6).map((tag) => (
                  <Badge
                    key={tag}
                    className="px-2 py-1 bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300 border-0 text-[10px] font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {brief.cover_image && (
          <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={brief.cover_image}
                alt={brief.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div
          className="prose prose-lg prose-slate dark:prose-invert max-w-none
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
          "
        >
          <ReactMarkdown>{brief.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}


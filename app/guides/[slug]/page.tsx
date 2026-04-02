import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedContent } from '@/components/related-content'
import { ContentViewTracker } from '@/components/content-view-tracker'
import { SocialShareButtons } from '@/components/social-share-buttons'
import { assessBlogIndexability } from '@/lib/content-quality'
import {
  getGuidePost,
  getGuideSlugs,
  getRelatedBlogPosts,
  getRelatedSkillsForPost,
} from '@/lib/blog'
import { resolveGuideSeo } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ReactMarkdown from 'react-markdown'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getGuideSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuidePost(slug)

  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  const seo = resolveGuideSeo(
    guide.title,
    guide.summary || guide.content.substring(0, 160),
  )
  const quality = assessBlogIndexability(guide)

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://clawlist.io/guides/${guide.slug}`,
      type: 'article',
      publishedTime: guide.published_at,
      authors: [guide.author || 'ClawList Team'],
      tags: guide.tags || [],
    },
    ...(!quality.indexable && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getGuidePost(slug)

  if (!guide) {
    notFound()
  }

  const [relatedGuides, relatedSkills] = await Promise.all([
    getRelatedBlogPosts(guide, {
      limit: 3,
      category: 'guides',
    }),
    getRelatedSkillsForPost(guide, 3),
  ])

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <ContentViewTracker
        contentType="guide"
        slug={guide.slug}
        pagePath={`/guides/${guide.slug}`}
        metadata={{
          category: guide.category,
          tags: guide.tags,
        }}
      />
      <article className="max-w-4xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guides' },
            { label: guide.title },
          ]}
        />

        {/* Header */}
        <header className="mb-12">
          {guide.tags && guide.tags.length > 0 && (
            <Badge className="mb-4 px-3 py-1 bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300 border-0 text-[10px] font-bold uppercase tracking-wider">
              {guide.tags[0]}
            </Badge>
          )}

          <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight">
            {guide.title}
          </h1>

          {guide.summary && (
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {guide.summary}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-6 border-b border-slate-200 dark:border-[#262626]">
            {guide.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(guide.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            )}
            {guide.reading_time && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{guide.reading_time} min read</span>
              </div>
            )}
            {guide.author && (
              <div>
                By <span className="font-semibold">{guide.author}</span>
              </div>
            )}
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
          <ReactMarkdown>{guide.content}</ReactMarkdown>
        </div>

        <SocialShareButtons
          title={guide.title}
          url={`https://clawlist.io/guides/${guide.slug}`}
          pagePath={`/guides/${guide.slug}`}
          contentType="guide"
          contentSlug={guide.slug}
        />

        {/* Tags */}
        {guide.tags && guide.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[#262626]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-[#262626]/20 text-slate-700 dark:text-slate-300 rounded-full text-sm font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <RelatedContent
          items={relatedSkills}
          type="skills"
          title="Related Skills"
          analyticsContext={{
            pagePath: `/guides/${guide.slug}`,
            sourceSlug: guide.slug,
            sourceType: 'guide',
          }}
        />

        {/* Related Guides */}
        <RelatedContent
          items={relatedGuides}
          type="blog"
          title="Related Guides"
          analyticsContext={{
            pagePath: `/guides/${guide.slug}`,
            sourceSlug: guide.slug,
            sourceType: 'guide',
          }}
        />

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[#262626]">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold hover:underline underline-offset-4"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Guides
          </Link>
        </div>
      </article>
    </div>
  )
}

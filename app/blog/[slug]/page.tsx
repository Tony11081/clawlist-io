import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/breadcrumb'
import { ContentViewTracker } from '@/components/content-view-tracker'
import { RelatedContent } from '@/components/related-content'
import { SocialShareButtons } from '@/components/social-share-buttons'
import {
  getBlogPost,
  getBlogSlugs,
  getRelatedBlogPosts,
  getRelatedSkillsForPost,
} from '@/lib/blog'
import { resolveBlogSeo } from '@/lib/seo'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { notFound, permanentRedirect } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export const revalidate = 300

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const seo = resolveBlogSeo(
    slug,
    post.title,
    post.summary || post.content.substring(0, 160),
  )
  const canonicalPath = post.category === 'guides'
    ? `/guides/${slug}`
    : seo.canonicalPath ?? `/blog/${slug}`

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://clawlist.io${canonicalPath}`,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author || 'ClawList Team'],
      tags: post.tags || [],
      images: [
        {
          url: `/api/og/blog?slug=${slug}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`/api/og/blog?slug=${slug}`],
    },
    ...(seo.canonicalPath && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  if (post.category === 'guides') {
    permanentRedirect(`/guides/${post.slug}`)
  }

  const seo = resolveBlogSeo(
    slug,
    post.title,
    post.summary || post.content.substring(0, 160),
  )
  const canonicalPath = seo.canonicalPath ?? `/blog/${post.slug}`
  const [relatedPosts, relatedSkills] = await Promise.all([
    getRelatedBlogPosts(post, { limit: 3 }),
    getRelatedSkillsForPost(post, 3),
  ])

  // Schema.org Article structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seo.title,
    description: seo.description,
    author: {
      '@type': 'Person',
      name: post.author || 'ClawList Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ClawList',
      logo: {
        '@type': 'ImageObject',
        url: 'https://clawlist.io/logo.png',
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://clawlist.io${canonicalPath}`,
    },
    keywords: post.tags?.join(', '),
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContentViewTracker
        contentType="blog"
        slug={post.slug}
        pagePath={`/blog/${post.slug}`}
        metadata={{
          category: post.category,
          tags: post.tags,
        }}
      />
      <article className="max-w-4xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        {seo.note && (
          <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-300">
              {seo.note.title}
            </p>
            <p className="mt-2 text-sm leading-6">
              {seo.note.description}
            </p>
            <Link
              href={seo.note.href}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"
            >
              {seo.note.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Header */}
        <header className="mb-12">
          {post.category && (
            <Badge className="mb-4 px-3 py-1 bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300 border-0 text-[10px] font-bold uppercase tracking-wider">
              {post.category}
            </Badge>
          )}

          <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {post.summary}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-6 border-b border-slate-200 dark:border-[#262626]">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            {post.reading_time && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time} min read</span>
              </div>
            )}
            {post.author && (
              <div>
                By <span className="font-semibold">{post.author}</span>
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
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <SocialShareButtons
          title={seo.title}
          url={`https://clawlist.io${canonicalPath}`}
          pagePath={`/blog/${post.slug}`}
          contentType="blog"
          contentSlug={post.slug}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[#262626]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
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
            pagePath: `/blog/${post.slug}`,
            sourceSlug: post.slug,
            sourceType: 'blog',
          }}
        />

        {/* Related Posts */}
        <RelatedContent
          items={relatedPosts}
          type="blog"
          analyticsContext={{
            pagePath: `/blog/${post.slug}`,
            sourceSlug: post.slug,
            sourceType: 'blog',
          }}
        />

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[#262626]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold hover:underline underline-offset-4"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  )
}

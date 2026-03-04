import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar, Share2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export const revalidate = 0 // 实时更新，不缓存
export const dynamic = 'force-dynamic' // 强制动态渲染

type Props = {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string) {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  // Increment view count
  if (data) {
    await supabase
      .from('blog_posts')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', data.id)
  }

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | ClawList Blog`,
    description: post.summary || post.content.substring(0, 160),
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary || post.content.substring(0, 160),
      url: `https://clawlist.io/blog/${slug}`,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author || 'ClawList Team'],
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || post.content.substring(0, 160),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <article className="max-w-4xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-slate-900 dark:hover:text-slate-100">Blog</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300 truncate max-w-[200px]">{post.title}</span>
        </div>

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
        <div className="prose prose-slate dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-slate-900 dark:prose-a:text-slate-100 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
          prose-code:bg-slate-100 dark:prose-code:bg-[#262626] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-slate-900 dark:prose-pre:bg-[#191919] prose-pre:border prose-pre:border-slate-700
          prose-ul:my-6 prose-li:my-2
          prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-bold
        ">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

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

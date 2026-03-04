import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'

export const revalidate = 300 // 5 minutes

export const metadata: Metadata = {
  title: 'Blog - AI Automation & OpenClaw Insights',
  description: 'Expert insights on AI automation, OpenClaw skills, developer tools, and modern engineering practices.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'ClawList Blog - AI Automation Insights',
    description: 'Expert insights on AI automation, OpenClaw skills, and developer tools.',
    url: 'https://clawlist.io/blog',
  },
}

async function getBlogPosts() {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300">Blog</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            BLOG.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Expert insights on AI automation, OpenClaw skills, developer tools, and modern engineering practices.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No blog posts available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-2xl overflow-hidden hover:border-slate-900 dark:hover:border-slate-500 transition-all hover:shadow-xl"
              >
                <div className="p-6">
                  {/* Category Badge */}
                  {post.category && (
                    <Badge className="mb-4 px-3 py-1 bg-slate-200 text-slate-900 dark:bg-[#262626]/40 dark:text-slate-300 border-0 text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </Badge>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 group-hover:underline underline-offset-4 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {post.summary}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    {post.reading_time && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.reading_time} min read</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-[#262626]/20 text-slate-600 dark:text-slate-400 rounded-full font-mono uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Breadcrumb } from '@/components/breadcrumb'
import { BlogListClient } from '@/components/blog-list-client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 0 // 实时更新，不缓存
export const dynamic = 'force-dynamic' // 强制动态渲染

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
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog' },
          ]}
        />

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            BLOG.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Expert insights on AI automation, OpenClaw skills, developer tools, and modern engineering practices.
          </p>
        </div>

        {/* Blog Posts with Tag Filter */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No blog posts available yet</p>
          </div>
        ) : (
          <BlogListClient posts={posts} />
        )}
      </main>
    </div>
  )
}

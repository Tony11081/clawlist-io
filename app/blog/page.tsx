import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

import { TagFilter } from '@/components/tag-filter'
import { BLOG_PAGE_SIZE, getBlogListData } from '@/lib/blog'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'News & Analysis',
  description: 'Editorial coverage, product analysis, and workflow reporting across AI tools, models, and agent systems.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'ClawList News & Analysis',
    description: 'Editorial coverage, product analysis, and workflow reporting across AI tools, models, and agent systems.',
    url: 'https://clawlist.io/blog',
  },
}

type BlogPageProps = {
  searchParams: Promise<{
    page?: string
    tag?: string
  }>
}

function buildBlogHref(page: number, tag?: string | null) {
  const params = new URLSearchParams()

  if (tag) {
    params.set('tag', tag)
  }

  if (page > 1) {
    params.set('page', String(page))
  }

  const query = params.toString()
  return query ? `/blog?${query}` : '/blog'
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1])

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right)
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const parsedPage = Number(resolvedSearchParams.page ?? '1')
  const page =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1

  const { allTags, page: currentPage, posts, selectedTag, totalCount, totalPages } =
    await getBlogListData({
      page,
      pageSize: BLOG_PAGE_SIZE,
      tag: resolvedSearchParams.tag,
    })
  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="max-w-7xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'News' },
          ]}
        />

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            NEWS &
            <br />
            ANALYSIS.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Editorial coverage, product analysis, and workflow reporting across AI tools, models, and agent systems.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-mono uppercase tracking-widest text-slate-500">
            {selectedTag
              ? `${totalCount} posts tagged #${selectedTag}`
              : `${totalCount} posts in the archive`}
          </p>
          {selectedTag && (
            <Link
              href="/blog"
              className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline underline-offset-4"
            >
              View all coverage
            </Link>
          )}
        </div>

        <TagFilter tags={allTags} selectedTag={selectedTag} />

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {selectedTag
                ? `No posts found for #${selectedTag}.`
                : 'No coverage published yet.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-3xl overflow-hidden hover:border-slate-400 dark:hover:border-slate-400 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="p-8 flex flex-col flex-1">
                    {post.category && (
                      <span className="inline-flex items-center rounded-md mb-4 px-3 py-1 bg-slate-200 text-slate-900 dark:bg-[#262626] dark:text-slate-300 border-0 text-[10px] font-bold uppercase tracking-wider w-fit">
                        {post.category}
                      </span>
                    )}

                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100 group-hover:underline underline-offset-4 leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed flex-1">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pt-4 border-t border-slate-200 dark:border-[#262626]">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      {post.reading_time && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.reading_time} min</span>
                        </div>
                      )}
                    </div>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-100 dark:bg-[#262626]/20 text-slate-600 dark:text-slate-400 rounded-full text-xs font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={buildBlogHref(Math.max(1, currentPage - 1), selectedTag)}
                  aria-disabled={currentPage === 1}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    currentPage === 1
                      ? 'pointer-events-none bg-slate-100 text-slate-400 dark:bg-[#262626]/30 dark:text-slate-500'
                      : 'bg-white text-slate-900 hover:bg-slate-100 dark:bg-[#262626]/40 dark:text-slate-100 dark:hover:bg-[#262626]'
                  }`}
                >
                  Previous
                </Link>

                {visiblePages.map((visiblePage) => (
                  <Link
                    key={visiblePage}
                    href={buildBlogHref(visiblePage, selectedTag)}
                    className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      visiblePage === currentPage
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                        : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#262626]/40 dark:text-slate-300 dark:hover:bg-[#262626]'
                    }`}
                  >
                    {visiblePage}
                  </Link>
                ))}

                <Link
                  href={buildBlogHref(Math.min(totalPages, currentPage + 1), selectedTag)}
                  aria-disabled={currentPage === totalPages}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    currentPage === totalPages
                      ? 'pointer-events-none bg-slate-100 text-slate-400 dark:bg-[#262626]/30 dark:text-slate-500'
                      : 'bg-white text-slate-900 hover:bg-slate-100 dark:bg-[#262626]/40 dark:text-slate-100 dark:hover:bg-[#262626]'
                  }`}
                >
                  Next
                </Link>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  )
}

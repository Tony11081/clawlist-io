'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { TagFilter } from '@/components/tag-filter'
import Link from 'next/link'
import { Clock, Calendar } from 'lucide-react'

interface BlogPost {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  category?: string
  tags?: string[]
  author?: string
  published_at: string
  reading_time?: number
  views?: number
}

interface BlogListClientProps {
  posts: BlogPost[]
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [posts])

  // Filter posts by selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts
    return posts.filter((post) =>
      selectedTags.some((tag) => post.tags?.includes(tag))
    )
  }, [posts, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleClearAll = () => {
    setSelectedTags([])
  }

  return (
    <>
      {/* Tag Filter */}
      <TagFilter
        tags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearAll={handleClearAll}
      />

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No posts found matching the selected tags.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-3xl overflow-hidden hover:border-slate-400 dark:hover:border-slate-400 transition-all shadow-sm hover:shadow-md"
            >
              <div className="p-8 flex flex-col flex-1">
                {post.category && (
                  <Badge className="mb-4 px-3 py-1 bg-slate-200 text-slate-900 dark:bg-[#262626] dark:text-slate-300 border-0 text-[10px] font-bold uppercase tracking-wider w-fit">
                    {post.category}
                  </Badge>
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

                {post.tags && post.tags.length > 0 && (
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
      )}
    </>
  )
}

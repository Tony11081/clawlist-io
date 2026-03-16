'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TagFilterProps {
  tags: string[]
  selectedTag?: string | null
  collapsedCount?: number
}

export function TagFilter({
  tags,
  selectedTag = null,
  collapsedCount = 8,
}: TagFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  if (!tags || tags.length === 0) return null

  const displayTags = isExpanded ? tags : tags.slice(0, collapsedCount)
  const hasMore = tags.length > collapsedCount

  const updateRoute = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (tag) {
      params.set('tag', tag)
      params.set('page', '1')
    } else {
      params.delete('tag')
      params.delete('page')
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.push(nextUrl)
  }

  return (
    <div className="mb-8 p-6 bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Filter by Tags {tags.length > 0 && `(${tags.length})`}
        </h3>
        {selectedTag && (
          <button
            onClick={() => updateRoute(null)}
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline underline-offset-4"
          >
            Clear filter
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => {
          const isSelected = selectedTag === tag
          return (
            <button
              key={tag}
              onClick={() => updateRoute(isSelected ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-mono transition-all ${
                isSelected
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-[#262626]/20 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#262626]'
              }`}
            >
              #{tag}
            </button>
          )
        })}
      </div>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show {tags.length - collapsedCount} more tags
            </>
          )}
        </button>
      )}
    </div>
  )
}

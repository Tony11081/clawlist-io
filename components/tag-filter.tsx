'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  onClearAll: () => void
}

export function TagFilter({ tags, selectedTags, onTagToggle, onClearAll }: TagFilterProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="mb-8 p-6 bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Filter by Tags
        </h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline underline-offset-4"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
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
    </div>
  )
}

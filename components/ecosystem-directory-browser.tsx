'use client'

import { startTransition, useDeferredValue, useState } from 'react'
import { Search } from 'lucide-react'

import { EcosystemItemCard } from '@/components/ecosystem-item-card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import type { EcosystemDirectorySection } from '@/lib/ecosystem-directory'

type EcosystemDirectoryBrowserProps = {
  sections: EcosystemDirectorySection[]
  totalResources: number
}

export function EcosystemDirectoryBrowser({
  sections,
  totalResources,
}: EcosystemDirectoryBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const normalizedSearch = deferredSearchQuery.trim().toLowerCase()
  const categories = ['All', ...sections.map((section) => section.category)]
  const isFilteredView = normalizedSearch.length > 0 || selectedCategory !== 'All'

  const filteredSections = sections
    .filter((section) => selectedCategory === 'All' || section.category === selectedCategory)
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!normalizedSearch) {
          return true
        }

        return (
          item.name.toLowerCase().includes(normalizedSearch)
          || item.hostname.toLowerCase().includes(normalizedSearch)
          || item.sectionCategory.toLowerCase().includes(normalizedSearch)
        )
      }),
    }))
    .filter((section) => section.items.length > 0)

  const visibleResources = filteredSections.reduce(
    (sum, section) => sum + section.items.length,
    0,
  )

  function handleCategoryChange(category: string) {
    startTransition(() => {
      setSelectedCategory(category)
    })
  }

  function toggleSection(sectionKey: string) {
    startTransition(() => {
      setExpandedSections((current) =>
        current.includes(sectionKey)
          ? current.filter((key) => key !== sectionKey)
          : [...current, sectionKey],
      )
    })
  }

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
            Directory explorer
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Browse the full board with ClawList briefs first.
          </h2>
        </div>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          Showing {visibleResources} of {totalResources} resources.
        </p>
      </div>

      <div className="mb-6 space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products, hosts, models, or platforms..."
            className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base dark:border-[#303030] dark:bg-[#191919]"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = selectedCategory === category

            return (
              <Badge
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`cursor-pointer border-0 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                  active
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-[#262626] dark:text-slate-300'
                }`}
              >
                {category}
              </Badge>
            )
          })}
        </div>
      </div>

      {filteredSections.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-[#303030]">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            No resources match that search.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Try a broader product name, platform name, or hostname.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredSections.map((section) => {
            const isExpanded = expandedSections.includes(section.key)
            const visibleItems = isFilteredView || isExpanded
              ? section.items
              : section.items.slice(0, 6)
            const hiddenCount = section.items.length - visibleItems.length

            return (
              <div key={section.key}>
                <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                      {section.items.length} resources
                    </p>
                    <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                      {section.category}
                    </h3>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {section.summary}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {visibleItems.map((item) => (
                    <EcosystemItemCard
                      key={item.id}
                      item={item}
                      pagePath="/directory"
                    />
                  ))}
                </div>

                {!isFilteredView && hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleSection(section.key)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                  >
                    {isExpanded ? 'Show fewer resources' : `Show ${hiddenCount} more resources`}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}


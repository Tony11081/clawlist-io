'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void
}

interface SearchFilters {
  risk?: string[]
  category?: string[]
  platform?: string[]
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})

  const categories = ['Code', 'Automation', 'Marketing', 'Social', 'Productivity']
  const riskLevels = ['Low', 'Medium', 'High']
  const platforms = ['macOS', 'Linux', 'Windows', 'All']

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    onSearch(newQuery, filters)
  }

  const toggleFilter = (type: keyof SearchFilters, value: string) => {
    const current = filters[type] || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    
    const newFilters = { ...filters, [type]: updated }
    setFilters(newFilters)
    onSearch(query, newFilters)
  }

  const clearFilters = () => {
    setFilters({})
    onSearch(query, {})
  }

  const hasFilters = Object.values(filters).some(f => f && f.length > 0)

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input
          placeholder="Search skills..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Category Filter */}
        <div>
          <p className="text-sm font-medium mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={filters.category?.includes(cat) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleFilter('category', cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Risk Level Filter */}
        <div>
          <p className="text-sm font-medium mb-2">Risk Level</p>
          <div className="flex flex-wrap gap-2">
            {riskLevels.map((risk) => (
              <Badge
                key={risk}
                variant={filters.risk?.includes(risk) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleFilter('risk', risk)}
              >
                {risk}
              </Badge>
            ))}
          </div>
        </div>

        {/* Platform Filter */}
        <div>
          <p className="text-sm font-medium mb-2">Platform</p>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Badge
                key={platform}
                variant={filters.platform?.includes(platform) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleFilter('platform', platform)}
              >
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}

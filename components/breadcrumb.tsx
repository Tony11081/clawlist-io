import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://clawlist.io${item.href}` }),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 dark:text-slate-100 font-medium">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

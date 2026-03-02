'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = [
    { href: '/guides', label: 'Guides' },
    { href: '/skills', label: 'Skills' },
    { href: '/recipes', label: 'Recipes' },
    { href: '/models', label: 'Models' },
    { href: '/security', label: 'Security' },
  ]

  return (
    <nav className="border-b bg-white dark:bg-neutral-950 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ClawList.io
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
                  pathname === link.href
                    ? 'text-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" asChild>
              <Link href="/submit">Submit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="w-full" asChild>
              <Link href="/submit">Submit</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

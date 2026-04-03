import Link from 'next/link'

import { CookiePreferencesButton } from '@/components/cookie-preferences-button'

export function Footer() {
  return (
    <footer className="border-t bg-neutral-50 dark:bg-neutral-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className="font-bold mb-4">ClawList.io</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Global AI directory, newsroom, and workflow reference.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Home</Link></li>
              <li><Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">News</Link></li>
              <li><Link href="/skills" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Skills</Link></li>
              <li><Link href="/topics" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Topics</Link></li>
              <li><Link href="/directory" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Directory Briefs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Guides</Link></li>
              <li><Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Editorial Policy</Link></li>
              <li><Link href="/security" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">About Us</Link></li>
              <li><Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Contact</Link></li>
              <li><a href="https://github.com/Tony11081/clawlist-io" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Privacy Policy</Link></li>
              <li><CookiePreferencesButton className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100" /></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>© 2026 ClawList.io. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/rss.xml" className="hover:text-neutral-900 dark:hover:text-neutral-100">RSS Feed</Link>
            {' • '}
            <Link href="/sitemap.xml" className="hover:text-neutral-900 dark:hover:text-neutral-100">Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

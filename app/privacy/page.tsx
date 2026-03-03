import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for ClawList.io.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">Last updated: 2026-03-03</p>
      <div className="space-y-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <p>We collect minimal analytics to improve site quality and user experience.</p>
        <p>We do not sell personal data. Sensitive keys or credentials should never be submitted through public forms.</p>
        <p>By using this site, you consent to essential logging for security and operational monitoring.</p>
      </div>
    </div>
  )
}

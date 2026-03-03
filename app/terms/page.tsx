import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using ClawList.io.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">Last updated: 2026-03-03</p>
      <div className="space-y-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <p>ClawList.io provides educational and informational resources for OpenClaw users.</p>
        <p>You are responsible for reviewing skill permissions before installation and for complying with relevant laws and platform policies.</p>
        <p>Content is provided as-is. Always test in a safe environment before production use.</p>
      </div>
    </div>
  )
}

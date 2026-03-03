import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using ClawList.io.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="container mx-auto max-w-3xl px-6 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-4 text-[#191919]">Terms of Service</h1>
          <p className="text-sm text-[#999999] mb-8">Last updated: 2026-03-03</p>
          <div className="space-y-6 text-[#666666] leading-relaxed">
            <p>ClawList.io provides educational and informational resources for OpenClaw users.</p>
            <p>You are responsible for reviewing skill permissions before installation and for complying with relevant laws and platform policies.</p>
            <p>Content is provided as-is. Always test in a safe environment before production use.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

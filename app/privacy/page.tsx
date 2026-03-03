import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for ClawList.io.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="container mx-auto max-w-3xl px-6 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-4 text-[#191919]">Privacy Policy</h1>
          <p className="text-sm text-[#999999] mb-8">Last updated: 2026-03-03</p>
          <div className="space-y-6 text-[#666666] leading-relaxed">
            <p>We collect minimal analytics to improve site quality and user experience.</p>
            <p>We do not sell personal data. Sensitive keys or credentials should never be submitted through public forms.</p>
            <p>By using this site, you consent to essential logging for security and operational monitoring.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

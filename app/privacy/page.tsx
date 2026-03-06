import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'

export const metadata: Metadata = {
  title: 'Privacy Policy - ClawList.io',
  description: 'Privacy policy for ClawList.io.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy' },
          ]}
        />

        <div className="bg-white dark:bg-[#262626]/40 rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 dark:border-[#262626]">
          <h1 className="text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-slate-100">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-12">
            Last updated: March 6, 2026
          </p>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              At ClawList.io, we take your privacy seriously. This policy describes how we collect, use,
              and protect your information.
            </p>

            <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100">
              1. Information We Collect
            </h2>

            <h3 className="text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-slate-100">
              1.1 Automatically Collected Information
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              When you visit ClawList.io, we automatically collect certain information:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
              <li>IP address (anonymized)</li>
              <li>Device type and screen resolution</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-slate-100">
              1.2 Information You Provide
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We collect information you voluntarily provide when you:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>Submit a skill for review</li>
              <li>Contact us via email</li>
              <li>Subscribe to our newsletter (if applicable)</li>
              <li>Participate in surveys or feedback forms</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              2. How We Use Your Information
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              We use collected information for the following purposes:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>To provide and improve the Service</li>
              <li>To analyze usage patterns and optimize user experience</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
              <li>To send important updates about the Service (if you've opted in)</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              3. Analytics and Tracking
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We use Vercel Analytics and Speed Insights to collect anonymous usage data. These services
              help us understand how users interact with our site and identify performance issues. This
              data is:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>Anonymized and aggregated</li>
              <li>Not sold to third parties</li>
              <li>Used solely for improving the Service</li>
              <li>Stored securely on Vercel's infrastructure</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              4. Cookies and Local Storage
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              ClawList.io uses minimal cookies and local storage for:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>Remembering your preferences (e.g., dark mode)</li>
              <li>Analytics (as described above)</li>
              <li>Essential site functionality</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
              You can disable cookies in your browser settings, but this may affect site functionality.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              5. Data Sharing and Disclosure
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information. We may share information only in
              the following circumstances:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>With service providers who help us operate the Service (e.g., hosting, analytics)</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer (merger, acquisition, etc.)</li>
              <li>With your explicit consent</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              6. Data Security
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure hosting infrastructure (Vercel)</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee
              absolute security.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              7. Third-Party Links
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              ClawList.io contains links to third-party websites (e.g., GitHub repositories). We are not
              responsible for the privacy practices of these external sites. We encourage you to review
              their privacy policies.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              8. Children's Privacy
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              ClawList.io is not intended for children under 13. We do not knowingly collect personal
              information from children. If you believe we have collected information from a child,
              please contact us immediately.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              9. Your Rights
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>Access: Request a copy of your personal data</li>
              <li>Correction: Request correction of inaccurate data</li>
              <li>Deletion: Request deletion of your data</li>
              <li>Objection: Object to certain data processing</li>
              <li>Portability: Request data in a portable format</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:privacy@clawlist.io" className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100">
                privacy@clawlist.io
              </a>
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              10. Data Retention
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We retain your information only as long as necessary to provide the Service and comply with
              legal obligations. Analytics data is typically retained for 90 days.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              11. International Data Transfers
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own.
              We ensure appropriate safeguards are in place to protect your data.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              12. Changes to This Policy
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated "Last updated" date. Continued use of the Service after changes constitutes
              acceptance of the updated policy.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              13. Contact Us
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2 mt-4">
              <li>
                Email:{' '}
                <a href="mailto:privacy@clawlist.io" className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100">
                  privacy@clawlist.io
                </a>
              </li>
              <li>
                General inquiries:{' '}
                <a href="mailto:hello@clawlist.io" className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100">
                  hello@clawlist.io
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

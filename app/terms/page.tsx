import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using ClawList.io.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Service' },
          ]}
        />

        <div className="bg-white dark:bg-[#262626]/40 rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 dark:border-[#262626]">
          <h1 className="text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-slate-100">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-12">
            Last updated: March 6, 2026
          </p>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              By accessing and using ClawList.io (&quot;the Service&quot;), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to these terms, please do not use the Service.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              2. Description of Service
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              ClawList.io provides educational and informational resources for OpenClaw users, including:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>A curated library of OpenClaw skills with documentation</li>
              <li>Guides and tutorials for AI automation</li>
              <li>Job recipes and workflow templates</li>
              <li>AI model comparisons and recommendations</li>
              <li>Blog articles and community resources</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              3. User Responsibilities
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              When using ClawList.io, you agree to:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>Review skill permissions and security implications before installation</li>
              <li>Test all skills in a safe, non-production environment first</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect intellectual property rights of skill authors</li>
              <li>Not use the Service for any illegal or unauthorized purpose</li>
              <li>Not attempt to gain unauthorized access to any part of the Service</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              4. Content and Intellectual Property
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              All content on ClawList.io, including text, graphics, logos, and software, is the property of
              ClawList.io or its content suppliers and is protected by international copyright laws. Skills
              listed on the platform retain their original licenses as specified by their authors.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              5. Disclaimer of Warranties
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              The Service is provided &quot;as is&quot; without warranties of any kind, either express or implied.
              ClawList.io does not warrant that:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2">
              <li>The Service will be uninterrupted or error-free</li>
              <li>Skills will work as described in all environments</li>
              <li>All security vulnerabilities have been identified</li>
              <li>The information provided is complete or up-to-date</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              6. Limitation of Liability
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              ClawList.io shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use of or inability to use the Service. This includes damages for loss
              of profits, data, or other intangible losses.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              7. Third-Party Content
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Skills and resources listed on ClawList.io are created by third-party developers. We review
              submissions for quality and security, but cannot guarantee the safety or functionality of
              third-party code. Users are responsible for reviewing and testing all skills before use.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              8. User Submissions
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              By submitting content to ClawList.io (including skills, comments, or feedback), you grant us
              a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display that
              content in connection with the Service.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              9. Termination
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We reserve the right to terminate or suspend access to the Service immediately, without prior
              notice, for any reason, including breach of these Terms.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              10. Changes to Terms
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately
              upon posting to the website. Your continued use of the Service after changes constitutes
              acceptance of the modified terms.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              11. Governing Law
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable international laws,
              without regard to conflict of law provisions.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-slate-100">
              12. Contact Information
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@clawlist.io" className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100">
                legal@clawlist.io
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

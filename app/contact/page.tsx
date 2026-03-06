import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { Mail, Github, Twitter, MessageSquare, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - ClawList.io',
  description: 'Get in touch with the ClawList team. We\'re here to help with questions, feedback, and collaboration opportunities.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact ClawList.io',
    description: 'Get in touch with the ClawList team for questions, feedback, and collaboration.',
    url: 'https://clawlist.io/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' },
          ]}
        />

        <div className="bg-white dark:bg-[#262626]/40 rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 dark:border-[#262626]">
          <h1 className="text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-slate-100">
            Get in Touch
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
            Have questions, feedback, or want to collaborate? We'd love to hear from you.
          </p>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <a
              href="mailto:hello@clawlist.io"
              className="group p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626] hover:border-slate-400 dark:hover:border-slate-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white dark:text-slate-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Email</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">General inquiries</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-mono text-sm">
                hello@clawlist.io
              </p>
            </a>

            <a
              href="https://github.com/Tony11081/clawlist-io"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626] hover:border-slate-400 dark:hover:border-slate-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6 text-white dark:text-slate-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">GitHub</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Issues & contributions</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-mono text-sm">
                @Tony11081/clawlist-io
              </p>
            </a>

            <a
              href="https://twitter.com/clawlist"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626] hover:border-slate-400 dark:hover:border-slate-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Twitter className="w-6 h-6 text-white dark:text-slate-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Twitter / X</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Latest updates</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-mono text-sm">
                @clawlist
              </p>
            </a>

            <a
              href="/submit"
              className="group p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626] hover:border-slate-400 dark:hover:border-slate-400 transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Send className="w-6 h-6 text-white dark:text-slate-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Submit a Skill</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Share your work</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Submit your OpenClaw skill for review
              </p>
            </a>
          </div>

          {/* FAQ Section */}
          <div className="border-t border-slate-200 dark:border-[#262626] pt-12">
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">
              Common Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">
                  How do I submit a skill?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Visit our <a href="/submit" className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100">Submit page</a> and
                  fill out the form with your skill's GitHub URL and details. Our team will review it within 48 hours.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">
                  Can I contribute to the documentation?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Absolutely! Visit our <a href="https://github.com/Tony11081/clawlist-io" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100">GitHub repository</a> to
                  submit pull requests for documentation improvements, bug fixes, or new features.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">
                  How do I report a security issue?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  For security-related concerns, please email us directly at <a href="mailto:security@clawlist.io" className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100">security@clawlist.io</a>.
                  We take security seriously and will respond promptly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">
                  Do you offer commercial support?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  For enterprise inquiries, custom integrations, or consulting services, please contact us at <a href="mailto:business@clawlist.io" className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100">business@clawlist.io</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Response Time Notice */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
            <h3 className="text-lg font-bold mb-2 text-blue-900 dark:text-blue-100">
              📬 Response Time
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
              We typically respond to all inquiries within 24-48 hours during business days.
              For urgent matters, please mark your email subject with [URGENT].
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

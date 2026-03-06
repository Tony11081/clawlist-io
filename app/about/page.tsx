import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { Mail, Github, Twitter, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - ClawList.io',
  description: 'Learn about ClawList.io, the comprehensive resource hub for OpenClaw developers and AI automation enthusiasts.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About ClawList.io',
    description: 'The comprehensive resource hub for OpenClaw developers and AI automation enthusiasts.',
    url: 'https://clawlist.io/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'About Us' },
          ]}
        />

        <div className="bg-white dark:bg-[#262626]/40 rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 dark:border-[#262626]">
          <h1 className="text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-slate-100">
            About ClawList
          </h1>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              ClawList.io is the definitive resource hub for OpenClaw developers, providing curated skills,
              comprehensive guides, and expert insights on AI automation.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Our Mission</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We believe in democratizing AI automation by making powerful tools accessible to developers
              of all skill levels. ClawList serves as a bridge between cutting-edge AI capabilities and
              practical, real-world applications.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">Skills Library</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Curated collection of OpenClaw skills with detailed documentation, installation guides,
                  and security reviews.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">Expert Guides</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Step-by-step tutorials covering everything from basic setup to advanced automation workflows.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">Job Recipes</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Pre-configured automation templates for common use cases like content creation,
                  data processing, and workflow optimization.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">Model Comparison</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Comprehensive comparison of AI models to help you choose the right tool for your specific needs.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Our Values</h2>
            <ul className="space-y-4 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Security First:</strong> Every skill is reviewed
                  for security implications and clearly labeled with required permissions.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Quality Over Quantity:</strong> We curate only
                  the most useful, well-maintained, and reliable resources.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Community Driven:</strong> We actively listen
                  to user feedback and continuously improve based on real-world needs.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  4
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Open & Transparent:</strong> All our content
                  is freely accessible, and we maintain transparency in our curation process.
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Get Involved</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              ClawList is built by developers, for developers. We welcome contributions from the community:
            </p>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li>• Submit your own OpenClaw skills for review</li>
              <li>• Share your automation workflows and best practices</li>
              <li>• Report issues or suggest improvements</li>
              <li>• Contribute to our open-source documentation</li>
            </ul>

            <div className="mt-12 p-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="mb-6 text-slate-200 dark:text-slate-700">
                Explore our skills library, read our guides, or reach out to our team.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/skills"
                  className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl font-bold hover:opacity-90 transition-opacity"
                >
                  Browse Skills
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border-2 border-white dark:border-slate-900 text-white dark:text-slate-900 rounded-2xl font-bold hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

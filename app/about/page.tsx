import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About ClawList',
  description:
    'ClawList is an editorial site for OpenClaw, autonomous AI agents, Claude Code, Codex workflows, and the skills behind agent-native work.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About ClawList',
    description:
      'Learn how ClawList covers autonomous AI agents, OpenClaw workflows, coding agents, and the editorial standards behind the site.',
    url: 'https://clawlist.io/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        />

        <div className="bg-white dark:bg-[#262626]/40 rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 dark:border-[#262626]">
          <h1 className="text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-slate-100">
            About ClawList
          </h1>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              ClawList is an editorial site for autonomous AI agents. We focus
              on OpenClaw, Claude Code, Codex workflows, agent orchestration,
              and the installable skills that move automation from demo to daily
              work.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">
              What We Publish
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We publish four main content types: reporting and analysis on
              agent-native work, practical guides for OpenClaw and coding-agent
              workflows, editorial topic hubs for fast-moving clusters, and a
              reviewed directory that supports the coverage with source links
              and implementation context.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">
              Our Coverage Focus
            </h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  OpenClaw Workflows
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We track how OpenClaw nodes, skills, memory, browser control,
                  and device automation turn agent ideas into usable systems.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Coding Agents
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We cover Claude Code, Codex, long-running tasks, task hubs,
                  CLI workflows, and the operational stack around autonomous
                  coding.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Agent Orchestration
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We explain multi-agent patterns, workflow routing, browser
                  execution, research pipelines, and where orchestration is
                  actually useful.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Installable Skills
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We connect coverage to working skills so readers can move from
                  reading about an agent capability to trying a concrete
                  workflow.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">
              How We Curate the Directory
            </h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Editorial Selection
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We prioritize products and resources that help readers
                  understand or build autonomous workflows. Inclusion is based
                  on editorial judgment, source quality, and practical
                  relevance.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Source Verification
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We link to original product sites, code repositories, docs, or
                  primary references whenever possible so readers can validate
                  claims at the source.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Useful Over Exhaustive
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We would rather maintain a tighter, more useful set of entries
                  than publish a broad database of unreviewed links that do not
                  help someone build or evaluate a workflow.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#262626]/20 rounded-2xl border border-slate-200 dark:border-[#262626]">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Ongoing Updates
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We revisit pages as products change, new evidence appears, or
                  a topic cluster grows into its own coverage area.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">
              Editorial Standards
            </h2>
            <ul className="space-y-4 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Original value first:
                  </strong>{' '}
                  We aim to add commentary, structure, context, or
                  implementation detail beyond the source material itself.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Clear sourcing:
                  </strong>{' '}
                  When we reference products, launches, benchmarks, or external
                  claims, we try to point readers to the original page or
                  documentation.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Reader usefulness:
                  </strong>{' '}
                  We prefer pages that help someone make a decision, understand
                  a trend, or execute a workflow over pages built only to target
                  a keyword.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  4
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">
                    Corrections matter:
                  </strong>{' '}
                  If we get something wrong, we update the page and appreciate
                  readers who send us the primary source or a better reference.
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">
              Advertising, Disclosure, and Independence
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              ClawList is building a media business around high-signal AI
              coverage. If we run advertising, sponsorships, or commercial
              partnerships, they should be clearly disclosed. Editorial
              decisions about what we cover, index, or update should remain tied
              to reader usefulness and source quality.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">
              Get Involved
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              If you think we missed an important source, need to correct a
              page, or want to suggest a product or workflow we should review,
              reach out. The strongest contributions include source links,
              screenshots, docs, and real usage context.
            </p>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li>• Suggest a product, tool, or topic we should review</li>
              <li>• Send corrections or updated source links</li>
              <li>
                • Share implementation notes or workflow examples that add
                practical value
              </li>
              <li>
                • Point us to the best original source when a market story is
                moving quickly
              </li>
            </ul>

            <div className="mt-12 p-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Explore the Coverage</h3>
              <p className="mb-6 text-slate-200 dark:text-slate-700">
                Start with autonomous-agent coverage, move into topic hubs, or
                browse the directory when you need the broader map.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl font-bold hover:opacity-90 transition-opacity"
                >
                  Read the Newsroom
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

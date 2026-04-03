import Link from 'next/link'
import { ArrowRight, Newspaper, Sparkles } from 'lucide-react'

import { EcosystemItemCard } from '@/components/ecosystem-item-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { BlogListItem } from '@/lib/blog'
import type {
  EcosystemDirectoryItem,
  EcosystemDirectorySection,
} from '@/lib/ecosystem-directory'
import type { SkillListItem } from '@/lib/skills'

type FeaturedTopic = {
  eyebrow: string
  slug: string
  summary: string
  title: string
}

type HomeDirectoryClientProps = {
  analysisPosts: BlogListItem[]
  directorySpotlights: EcosystemDirectoryItem[]
  editorsPicks: BlogListItem[]
  featuredGuides: BlogListItem[]
  featuredSections: EcosystemDirectorySection[]
  featuredSkills: SkillListItem[]
  featuredTopics: FeaturedTopic[]
  mostReadPosts: BlogListItem[]
  topStory: BlogListItem | null
  totalCategories: number
  totalResources: number
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function HomeDirectoryClient({
  analysisPosts,
  directorySpotlights,
  editorsPicks,
  featuredGuides,
  featuredSections,
  featuredSkills,
  featuredTopics,
  mostReadPosts,
  topStory,
  totalCategories,
  totalResources,
}: HomeDirectoryClientProps) {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-20 lg:py-16">
        <section className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <Badge className="mb-5 border-0 bg-slate-200 text-slate-900 dark:bg-[#262626] dark:text-slate-100">
              Global AI newsroom and directory
            </Badge>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100 lg:text-7xl">
              READ THE SIGNAL.
              <br />
              MAP THE STACK.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              ClawList is building an editorial home for AI tools, models, agents, workflows, and
              industry shifts. The homepage starts with coverage and judgment, then opens into the
              broader directory when you want the map behind the headlines.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="bg-slate-900 text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
                asChild
              >
                <Link href="/blog">Read the latest</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/directory">Open directory briefs</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/topics">Follow topic hubs</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
              Editor&apos;s snapshot
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-[#262626]/40">
                <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {totalResources}
                </p>
                <p className="mt-1 text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  Resources tracked
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-[#262626]/40">
                <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {totalCategories}
                </p>
                <p className="mt-1 text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  Sectors covered
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-[#303030]">
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                Publishing rule
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Lead with original reporting and analysis, keep directory coverage as reviewed briefs,
                and push outbound links behind ClawList context instead of using the homepage as a link wall.
              </p>
            </div>
          </div>
        </section>

        {topStory && (
          <section className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Link
              href={`/blog/${topStory.slug}`}
              className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-400 dark:border-[#262626] dark:bg-[#121212]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Top story
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
                {topStory.title}
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                {topStory.summary}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>{formatDate(topStory.published_at)}</span>
                {topStory.reading_time && <span>{topStory.reading_time} min read</span>}
                {typeof topStory.views === 'number' && <span>{topStory.views} reads</span>}
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                Read the story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    Editor&apos;s picks
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Start with the strongest reads.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                >
                  All news
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {editorsPicks.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                      {post.category ?? 'News'} • {formatDate(post.published_at)}
                    </p>
                    <h3 className="mt-3 text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {post.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Most read
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  What readers are spending time on.
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {mostReadPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white dark:bg-slate-100 dark:text-slate-900">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {post.summary}
                    </p>
                    <p className="mt-3 text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                      {typeof post.views === 'number' ? `${post.views} reads` : 'Most read'} • {formatDate(post.published_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Analysis
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Original judgment, not just launch summaries.
                </h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {analysisPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                >
                  <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                    {post.category ?? 'Analysis'}
                  </p>
                  <h3 className="mt-3 text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {post.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Topic hubs
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Follow the clusters shaping coverage.
                </h2>
              </div>
              <Link
                href="/topics"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
              >
                All topics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                >
                  <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                    {topic.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {topic.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    Featured skills
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Install-ready picks.
                  </h2>
                </div>
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                >
                  Open skills
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {featuredSkills.map((skill) => (
                  <Link
                    key={skill.slug}
                    href={`/skills/${skill.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                        {skill.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="rounded-full border-slate-200 text-[10px] font-mono uppercase tracking-[0.18em] dark:border-[#303030]"
                      >
                        {skill.risk_level}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {skill.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    Fresh guides
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Turn signal into execution.
                  </h2>
                </div>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4 dark:text-slate-100"
                >
                  All guides
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {featuredGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-400 dark:border-[#2d2d2d] dark:bg-[#191919]"
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                      {formatDate(guide.published_at)}
                    </p>
                    <h3 className="mt-3 text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                      {guide.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {guide.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                Directory briefs
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Start with ClawList context, then open the source.
              </h2>
            </div>
            <div className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Homepage directory coverage now stays intentionally narrow. The full board lives in the
              directory workspace so the homepage can behave like a publication front page instead of an
              outbound link directory.
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            {featuredSections.map((section) => (
              <div
                key={section.key}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-[#2d2d2d] dark:bg-[#191919]"
              >
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-slate-500">
                  {section.items.length} resources
                </p>
                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {section.category}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {section.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {directorySpotlights.map((item) => (
              <EcosystemItemCard
                key={item.slug}
                item={item}
                pagePath="/"
                showSection
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="bg-slate-900 text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
              asChild
            >
              <Link href="/directory">Open the full directory workspace</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">
                Read the editorial policy
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 dark:border-[#303030] dark:bg-[#121212]/70">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Source and editorial policy
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                ClawList uses public product and community pages as reporting inputs, then adds its own
                editorial framing, internal linking, and workflow judgment before sending readers off-site.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Newspaper className="h-4 w-4" />
              English-only frontend
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


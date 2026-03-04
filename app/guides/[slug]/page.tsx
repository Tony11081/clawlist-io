import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guides } from '@/lib/catalog'

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)
  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="container mx-auto max-w-4xl px-6 py-16">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-[#666666]">
          <Link href="/guides" className="hover:text-[#191919] transition-colors">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#191919]">{guide.title}</span>
        </div>

        {/* Header */}
        <h1 className="text-5xl font-bold mb-4 text-[#191919]">{guide.title}</h1>
        <p className="text-lg text-[#666666] mb-8">{guide.description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#191919]">
            {guide.category}
          </span>
          <span className="px-4 py-2 bg-[#f0f0f0] text-[#191919] rounded-full text-sm">
            {guide.difficulty === 'beginner' ? 'Beginner' : 'Intermediate'}
          </span>
          <span className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#191919]">
            📖 {guide.readTime}
          </span>
        </div>

        {/* What You Will Learn */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#191919]">What You Will Learn</h2>
          <div className="space-y-3 text-[#666666]">
            <p className="flex items-center gap-3">
              <span className="text-[#191919]">✓</span>
              Environment and prerequisite checklist
            </p>
            <p className="flex items-center gap-3">
              <span className="text-[#191919]">✓</span>
              Step-by-step setup instructions
            </p>
            <p className="flex items-center gap-3">
              <span className="text-[#191919]">✓</span>
              Common pitfalls and troubleshooting
            </p>
          </div>
        </div>

        {/* Execution Checklist */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#191919]">Execution Checklist</h2>
          <div className="space-y-4 text-[#666666]">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#191919] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <p className="pt-1">Confirm prerequisites are installed</p>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#191919] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <p className="pt-1">Run setup commands in order and verify outputs</p>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#191919] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <p className="pt-1">Validate with a smoke test before production use</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/guides"
          className="inline-block px-6 py-3 bg-[#191919] text-white rounded-2xl hover:bg-[#262626] transition-colors"
        >
          Back to Guides
        </Link>
      </div>
    </div>
  )
}

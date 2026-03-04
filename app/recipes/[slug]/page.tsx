import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { recipes } from '@/lib/catalog'

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const recipe = recipes.find((item) => item.slug === slug)
  if (!recipe) {
    return { title: 'Recipe Not Found' }
  }

  return {
    title: recipe.title,
    description: recipe.summary,
    alternates: {
      canonical: `/recipes/${recipe.slug}`,
    },
  }
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipe = recipes.find((item) => item.slug === slug)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="container mx-auto max-w-4xl px-6 py-16">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-[#666666]">
          <Link href="/recipes" className="hover:text-[#191919] transition-colors">
            Recipes
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#191919]">{recipe.title}</span>
        </div>

        {/* Header */}
        <h1 className="text-5xl font-bold mb-4 text-[#191919]">{recipe.title}</h1>
        <p className="text-lg text-[#666666] mb-8">{recipe.summary}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#191919]">
            {recipe.role_type}
          </span>
          <span className={`px-4 py-2 rounded-full text-sm ${
            recipe.risk_level === 'low'
              ? 'bg-[#f0f0f0] text-[#191919]'
              : 'bg-[#262626] text-white'
          }`}>
            {recipe.risk_level === 'low' ? 'Low Risk' : recipe.risk_level === 'medium' ? 'Medium Risk' : 'High Risk'}
          </span>
          <span className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#191919]">
            {recipe.skills_count} Skills
          </span>
          {recipe.estimatedTime && (
            <span className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#191919]">
              ⏱ {recipe.estimatedTime}
            </span>
          )}
        </div>

        {/* Recommended Workflow */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#191919]">Recommended Workflow</h2>
          <div className="space-y-4 text-[#666666]">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#191919] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <p className="pt-1">Initialize required skills and credentials</p>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#191919] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <p className="pt-1">Run the core automation loop for this role</p>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#191919] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <p className="pt-1">Track outcomes with weekly KPI review</p>
            </div>
          </div>
        </div>

        {/* Default Setup Profile */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#191919]">Default Setup Profile</h2>
          <div className="space-y-3 text-[#666666]">
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">•</span>
              <span><strong className="text-[#191919]">Effort mode:</strong> {recipe.difficulty === 'beginner' ? 'low-medium' : 'medium-high'}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">•</span>
              <span><strong className="text-[#191919]">Guardrails:</strong> permission checks + dry-run first</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">•</span>
              <span><strong className="text-[#191919]">Reporting cadence:</strong> daily summary + weekly retro</span>
            </p>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/recipes"
          className="inline-block px-6 py-3 bg-[#191919] text-white rounded-2xl hover:bg-[#262626] transition-colors"
        >
          Back to Recipes
        </Link>
      </div>
    </div>
  )
}

import { supabase } from '@/lib/supabase'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { CopyButton } from '@/components/copy-button'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedContent } from '@/components/related-content'
import { Shield, Check } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fallbackSkills } from '@/lib/catalog'
import type { Metadata } from 'next'

export const revalidate = 60

async function getSkill(slug: string) {
  const fallback = fallbackSkills.find((item) => item.slug === slug)

  // Return fallback data if Supabase is not configured
  if (!supabase) {
    console.warn('Supabase not configured, using fallback skill when available')
    return fallback ?? null
  }

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return fallback ?? null
  }

  return data
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const skill = await getSkill(slug)

  if (!skill) {
    return {
      title: 'Skill Not Found',
    }
  }

  return {
    title: `${skill.name} | ClawList Skills`,
    description: skill.summary,
    alternates: {
      canonical: `/skills/${slug}`,
    },
    openGraph: {
      title: skill.name,
      description: skill.summary,
      url: `https://clawlist.io/skills/${slug}`,
      type: 'website',
      images: [
        {
          url: `/api/og/skill?slug=${slug}`,
          width: 1200,
          height: 630,
          alt: skill.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: skill.name,
      description: skill.summary,
      images: [`/api/og/skill?slug=${slug}`],
    },
  }
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = await getSkill(slug)

  if (!skill) {
    notFound()
  }

  // Get related skills (same category)
  let relatedSkills: any[] = []
  if (supabase && skill.category) {
    const { data } = await supabase
      .from('skills')
      .select('slug, name, summary, category')
      .eq('category', skill.category)
      .neq('slug', slug)
      .limit(3)

    relatedSkills = data || []
  }

  // Schema.org SoftwareApplication structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: skill.name,
    description: skill.summary,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    ...(skill.github_url && { codeRepository: skill.github_url }),
    ...(skill.install_cmd && { installUrl: skill.github_url }),
    aggregateRating: skill.upvotes ? {
      '@type': 'AggregateRating',
      ratingValue: Math.min(5, (skill.upvotes / 10) + 3),
      reviewCount: skill.upvotes,
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnalyticsTracker
        payload={{
          eventType: 'skill_view',
          pagePath: `/skills/${skill.slug}`,
          skillId: skill.id,
          skillSlug: skill.slug,
          metadata: {
            category: skill.category,
            riskLevel: skill.risk_level,
          },
        }}
      />

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Skills', href: '/skills' },
            { label: skill.name },
          ]}
        />

        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-5xl font-bold text-[#191919]">{skill.name}</h1>
            <span className={`px-4 py-2 rounded-full text-sm ${
              skill.risk_level === 'low'
                ? 'bg-[#f0f0f0] text-[#191919]'
                : 'bg-[#262626] text-white'
            }`}>
              {skill.risk_level === 'low' ? 'Low Risk' : skill.risk_level === 'medium' ? 'Medium Risk' : 'High Risk'}
            </span>
          </div>
          <p className="text-xl text-[#666666] mb-6">
            {skill.summary}
          </p>
          <div className="flex gap-6 text-sm text-[#666666]">
            {skill.stars && <span>⭐ {skill.stars} stars</span>}
            <span>👍 {skill.upvotes || 0} upvotes</span>
            {skill.views && <span>👁️ {skill.views} views</span>}
          </div>
        </div>

        {/* Install Command */}
        {skill.install_cmd && (
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#191919]">Install Command</h2>
            <div className="bg-[#191919] p-4 rounded-2xl font-mono text-sm flex justify-between items-center">
              <code className="text-white">{skill.install_cmd}</code>
              <CopyButton
                text={skill.install_cmd}
                label="Copy"
                variant="ghost"
                analyticsPayload={{
                  eventType: 'install_copy',
                  pagePath: `/skills/${skill.slug}`,
                  skillId: skill.id,
                  skillSlug: skill.slug,
                  metadata: {
                    category: skill.category,
                  },
                }}
              />
            </div>
            {skill.openclaw_version_range && (
              <p className="text-sm text-[#666666] mt-3">
                Requires OpenClaw {skill.openclaw_version_range}
              </p>
            )}
          </div>
        )}

        {/* Description */}
        {skill.description && (
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-[#191919]">About</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-[#666666] leading-relaxed text-lg whitespace-pre-wrap">{skill.description}</p>
            </div>
          </div>
        )}

        {/* Features */}
        {skill.features && skill.features.length > 0 && (
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-[#191919]">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skill.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#f7f7f7] rounded-2xl hover:bg-slate-100 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#191919] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-[#666666] pt-1 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases */}
        {skill.use_cases && skill.use_cases.length > 0 && (
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-[#191919]">Use Cases</h2>
            <div className="space-y-4">
              {skill.use_cases.map((useCase: string, index: number) => (
                <div key={index} className="flex items-start gap-4 p-5 bg-[#f7f7f7] rounded-2xl hover:bg-slate-100 transition-colors">
                  <span className="text-3xl flex-shrink-0">💡</span>
                  <p className="text-[#666666] leading-relaxed pt-1">{useCase}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security & Permissions */}
        {skill.permissions && skill.permissions.length > 0 && (
          <div className="bg-[#fff9e6] border border-[#ffd700] rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-[#191919]" />
              <h2 className="text-2xl font-bold text-[#191919]">Security & Permissions</h2>
            </div>
            <p className="text-sm mb-4 text-[#666666]">This skill requires the following permissions:</p>
            <ul className="space-y-3 mb-6">
              {skill.permissions.map((perm: string) => (
                <li key={perm} className="flex items-center gap-3 text-sm text-[#666666]">
                  <Check className="h-5 w-5 text-[#191919]" />
                  {perm}
                </li>
              ))}
            </ul>
            <div className="border-t border-[#ffd700] pt-4">
              <p className="text-sm text-[#666666]">
                Recommendation: Use the principle of least privilege and regularly review skill behavior.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          {skill.github_url && (
            <a
              href={skill.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#191919] text-white rounded-2xl hover:bg-[#262626] transition-colors"
            >
              View Source Code
            </a>
          )}
          <button className="px-6 py-3 border border-[#e5e5e5] text-[#191919] rounded-2xl hover:bg-[#f7f7f7] transition-colors">
            👍 Upvote
          </button>
        </div>

        {/* Related Skills */}
        <RelatedContent items={relatedSkills} type="skills" />
      </div>
    </div>
  )
}

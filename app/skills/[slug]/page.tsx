import { AnalyticsTracker } from '@/components/analytics-tracker'
import { CopyButton } from '@/components/copy-button'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedContent, type RelatedItem } from '@/components/related-content'
import { SocialShareButtons } from '@/components/social-share-buttons'
import { TrackedExternalLink } from '@/components/tracked-external-link'
import { Shield, Check } from 'lucide-react'
import { notFound } from 'next/navigation'
import { resolveSkillSeo } from '@/lib/seo'
import { getSkillIntentModule } from '@/lib/skill-intent'
import {
  getRelatedSkills,
  getSkillDetail,
  getSkillSlugs,
} from '@/lib/skills'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getSkillSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const skill = await getSkillDetail(slug)

  if (!skill) {
    return {
      title: 'Skill Not Found',
    }
  }

  const seo = resolveSkillSeo(
    slug,
    skill.name,
    skill.summary,
  )

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/skills/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
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
      title: seo.title,
      description: seo.description,
      images: [`/api/og/skill?slug=${slug}`],
    },
  }
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = await getSkillDetail(slug)

  if (!skill) {
    notFound()
  }

  const seo = resolveSkillSeo(
    slug,
    skill.name,
    skill.summary,
  )

  const pagePath = `/skills/${skill.slug}`
  const relatedSkills: RelatedItem[] = await getRelatedSkills(skill, 3)

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
  const skillIntent = getSkillIntentModule(skill.slug)
  const faqJsonLd = skillIntent
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: skillIntent.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <AnalyticsTracker
        payload={{
          eventType: 'skill_view',
          pagePath,
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

        {skillIntent && (
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              {skillIntent.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#191919]">
              {skillIntent.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#666666]">
              {skillIntent.summary}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {skillIntent.highlights.map((item) => (
                <div key={item.label} className="rounded-2xl bg-[#f7f7f7] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#191919]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-[#191919]">Common setup checks</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#666666]">
                {skillIntent.troubleshooting.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-slate-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#191919]">FAQ</h3>
              <div className="mt-4 space-y-4">
                {skillIntent.faq.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-[#f7f7f7] p-5">
                    <p className="font-semibold text-[#191919]">{item.question}</p>
                    <p className="mt-2 text-sm leading-6 text-[#666666]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
                  pagePath,
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
        <div className="flex flex-wrap gap-4">
          {skill.github_url && (
            <TrackedExternalLink
              href={skill.github_url}
              className="px-6 py-3 bg-[#191919] text-white rounded-2xl hover:bg-[#262626] transition-colors"
              analyticsPayload={{
                eventType: 'cta_click',
                pagePath,
                skillId: skill.id,
                skillSlug: skill.slug,
                metadata: {
                  cta: 'view_source_code',
                  category: skill.category,
                },
              }}
            >
              View Source Code
            </TrackedExternalLink>
          )}
          <button className="px-6 py-3 border border-[#e5e5e5] text-[#191919] rounded-2xl hover:bg-[#f7f7f7] transition-colors">
            👍 Upvote
          </button>
        </div>

        <SocialShareButtons
          title={seo.title}
          url={`https://clawlist.io${pagePath}`}
          className="mb-10"
          pagePath={pagePath}
          contentType="skill"
          contentSlug={skill.slug}
        />

        {/* Related Skills */}
        <RelatedContent
          items={relatedSkills}
          type="skills"
          analyticsContext={{
            pagePath,
            sourceSlug: skill.slug,
            sourceType: 'skill',
          }}
        />
      </div>
    </div>
  )
}

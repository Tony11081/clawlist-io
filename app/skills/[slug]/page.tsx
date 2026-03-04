import { supabase } from '@/lib/supabase'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { CopyButton } from '@/components/copy-button'
import { Shield, Check } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fallbackSkills } from '@/lib/catalog'

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

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = await getSkill(slug)

  if (!skill) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
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
        <div className="mb-8 text-sm text-[#666666]">
          <Link href="/skills" className="hover:text-[#191919] transition-colors">
            Skills
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#191919]">{skill.name}</span>
        </div>

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
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#191919]">Description</h2>
            <p className="text-[#666666] leading-relaxed">{skill.description}</p>
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
      </div>
    </div>
  )
}

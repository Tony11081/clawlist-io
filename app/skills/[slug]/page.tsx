import { supabase } from '@/lib/supabase'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { CopyButton } from '@/components/copy-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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

export default async function SkillDetailPage({ params }: { params: { slug: string } }) {
  const skill = await getSkill(params.slug)
  
  if (!skill) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
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

      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        <Link href="/skills" className="hover:text-neutral-900 dark:hover:text-neutral-100">Skills</Link>
        {' / '}
        <span>{skill.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold">{skill.name}</h1>
          <Badge variant={skill.risk_level === 'low' ? 'secondary' : 'default'}>
            {skill.risk_level === 'low' ? 'Low Risk' : skill.risk_level === 'medium' ? 'Medium Risk' : 'High Risk'}
          </Badge>
        </div>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
          {skill.summary}
        </p>
        <div className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          {skill.stars && <span>⭐ {skill.stars} stars</span>}
          <span>👍 {skill.upvotes || 0} upvotes</span>
          {skill.views && <span>👁️ {skill.views} views</span>}
        </div>
      </div>

      {/* Install Command */}
      {skill.install_cmd && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>安装命令</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg font-mono text-sm flex justify-between items-center">
              <code>{skill.install_cmd}</code>
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
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                要求 OpenClaw {skill.openclaw_version_range}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Description */}
      {skill.description && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>功能说明</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-700 dark:text-neutral-300">{skill.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Security & Permissions */}
      {skill.permissions && skill.permissions.length > 0 && (
        <Card className="mb-8 border-yellow-200 dark:border-yellow-900">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <CardTitle>安全与权限</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">此 Skill 需要以下权限：</p>
            <ul className="space-y-2">
              {skill.permissions.map((perm: string) => (
                <li key={perm} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  {perm}
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              建议：使用最小权限原则，定期审查 Skill 行为。
            </p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        {skill.github_url && (
          <Button asChild>
            <a href={skill.github_url} target="_blank" rel="noopener noreferrer">
              查看源码
            </a>
          </Button>
        )}
        <Button variant="outline">👍 Upvote</Button>
      </div>
    </div>
  )
}

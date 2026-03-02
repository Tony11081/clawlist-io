import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Shield, Copy, Check } from 'lucide-react'
import Link from 'next/link'

export default function SkillDetailPage({ params }: { params: { slug: string } }) {
  // Mock data
  const skill = {
    name: 'GitHub Issues',
    summary: '自动处理 GitHub Issues 并提交 PR',
    description: '这个 Skill 可以自动监控 GitHub Issues，使用 AI 分析问题，生成修复代码，并自动提交 Pull Request。支持多仓库监控、自动标签分类、PR 审核等功能。',
    category: '代码',
    risk_level: 'low',
    upvotes: 156,
    github_url: 'https://github.com/openclaw/skills/gh-issues',
    stars: 234,
    last_update: '2026-03-01',
    install_cmd: 'npx skills add gh-issues',
    openclaw_version: '>=0.9.0',
    permissions: ['文件读写', '网络请求', 'Git 操作'],
    tags: ['github', 'automation', 'pr'],
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
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
            {skill.risk_level === 'low' ? '低风险' : '中风险'}
          </Badge>
        </div>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
          {skill.summary}
        </p>
        <div className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <span>⭐ {skill.stars} stars</span>
          <span>👍 {skill.upvotes} upvotes</span>
          <span>📅 {skill.last_update}</span>
        </div>
      </div>

      {/* Install Command */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>安装命令</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg font-mono text-sm flex justify-between items-center">
            <code>{skill.install_cmd}</code>
            <Button size="sm" variant="ghost">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            要求 OpenClaw {skill.openclaw_version}
          </p>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>功能说明</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-700 dark:text-neutral-300">{skill.description}</p>
        </CardContent>
      </Card>

      {/* Security & Permissions */}
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
            {skill.permissions.map((perm) => (
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

      {/* Actions */}
      <div className="flex gap-4">
        <Button asChild>
          <a href={skill.github_url} target="_blank" rel="noopener noreferrer">
            查看源码
          </a>
        </Button>
        <Button variant="outline">👍 Upvote</Button>
      </div>
    </div>
  )
}

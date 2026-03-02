import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search } from 'lucide-react'

// Mock data - 实际应该从数据库获取
const skills = [
  {
    id: 1,
    slug: 'github-issues',
    name: 'GitHub Issues',
    summary: '自动处理 GitHub Issues 并提交 PR',
    category: '代码',
    risk_level: 'low',
    upvotes: 156,
    tags: ['github', 'automation', 'pr'],
  },
  {
    id: 2,
    slug: 'browser-agent',
    name: 'Browser Agent',
    summary: '浏览器自动化测试和数据抓取',
    category: '自动化',
    risk_level: 'medium',
    upvotes: 89,
    tags: ['browser', 'testing', 'scraping'],
  },
  {
    id: 3,
    slug: 'email-marketing',
    name: 'Email Marketing',
    summary: '自动化邮件营销和客户管理',
    category: '营销',
    risk_level: 'low',
    upvotes: 67,
    tags: ['email', 'marketing', 'crm'],
  },
  {
    id: 4,
    slug: 'apple-notes',
    name: 'Apple Notes',
    summary: '管理 Apple Notes via CLI',
    category: '笔记',
    risk_level: 'low',
    upvotes: 45,
    tags: ['notes', 'macos', 'productivity'],
  },
  {
    id: 5,
    slug: 'wechat-publisher',
    name: 'WeChat Publisher',
    summary: '自动发布内容到微信公众号',
    category: '社媒',
    risk_level: 'medium',
    upvotes: 123,
    tags: ['wechat', 'publishing', 'social'],
  },
  {
    id: 6,
    slug: 'image-gen',
    name: 'Image Generator',
    summary: 'AI 图片生成与编辑',
    category: '创作',
    risk_level: 'low',
    upvotes: 234,
    tags: ['ai', 'image', 'generation'],
  },
]

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Skills 插件库</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          发现、安装、对比 OpenClaw Skills。所有插件均标注风险等级和所需权限。
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="搜索 Skills..."
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            全部
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            代码
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            自动化
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            营销
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            社媒
          </Badge>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <Card key={skill.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <Badge variant={skill.risk_level === 'low' ? 'secondary' : 'default'}>
                  {skill.risk_level === 'low' ? '低风险' : '中风险'}
                </Badge>
              </div>
              <CardDescription>{skill.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {skill.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  👍 {skill.upvotes}
                </span>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/skills/${skill.slug}`}>查看详情</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline">加载更多</Button>
      </div>
    </div>
  )
}

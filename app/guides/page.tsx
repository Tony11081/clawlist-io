import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Server, MessageSquare } from 'lucide-react'

const guides = [
  {
    id: 1,
    slug: 'macos-local-deploy',
    title: 'macOS 本地部署',
    description: '在 macOS 上快速部署 OpenClaw',
    category: '本地部署',
    difficulty: 'beginner',
    readTime: '15 分钟',
  },
  {
    id: 2,
    slug: 'vps-cloud-deploy',
    title: 'VPS 云端部署',
    description: '在云服务器上部署 OpenClaw 并配置安全',
    category: '云端部署',
    difficulty: 'intermediate',
    readTime: '30 分钟',
  },
  {
    id: 3,
    slug: 'telegram-integration',
    title: 'Telegram 接入',
    description: '将 OpenClaw 接入 Telegram Bot',
    category: '接入渠道',
    difficulty: 'beginner',
    readTime: '10 分钟',
  },
]

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Guides 教程中心</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        从部署到接入，从本地到云端的完整指南
      </p>

      {/* Categories */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
            <CardTitle>本地部署</CardTitle>
            <CardDescription>Windows / macOS / Linux</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Server className="h-8 w-8 mb-2 text-green-600 dark:text-green-400" />
            <CardTitle>云端部署</CardTitle>
            <CardDescription>VPS / Docker / 安全加固</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 mb-2 text-purple-600 dark:text-purple-400" />
            <CardTitle>接入渠道</CardTitle>
            <CardDescription>Telegram / Discord / WhatsApp</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Guides List */}
      <div className="space-y-4">
        {guides.map((guide) => (
          <Card key={guide.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </div>
                <Badge variant="outline">{guide.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <span>📚 {guide.difficulty === 'beginner' ? '入门' : '进阶'}</span>
                  <span>⏱️ {guide.readTime}</span>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/guides/${guide.slug}`}>阅读教程</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

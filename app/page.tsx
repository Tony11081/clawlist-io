import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, Zap, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4" variant="secondary">
            OpenClaw Ecosystem
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
            ClawList.io
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            一站式 OpenClaw 教程、Skills、岗位配置、模型与算力选择聚合站
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/guides">
                开始部署 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/skills">浏览 Skills</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">新手三步流程</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <CardTitle>Deploy</CardTitle>
                <CardDescription>部署 OpenClaw 到本地或云端</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link href="/guides">查看教程 →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <CardTitle>Install</CardTitle>
                <CardDescription>安装你需要的 Skills 插件</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link href="/skills">浏览 Skills →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                </div>
                <CardTitle>Import</CardTitle>
                <CardDescription>导入岗位配方，开箱即用</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link href="/recipes">查看配方 →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Skills */}
      <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">🔥 Trending Skills</h2>
            <Button variant="ghost" asChild>
              <Link href="/skills">查看全部 →</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'GitHub Issues', desc: '自动处理 GitHub Issues 并提交 PR', risk: 'low' },
              { name: 'Browser Agent', desc: '浏览器自动化测试和数据抓取', risk: 'medium' },
              { name: 'Email Marketing', desc: '自动化邮件营销和客户管理', risk: 'low' },
            ].map((skill) => (
              <Card key={skill.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <Badge variant={skill.risk === 'low' ? 'secondary' : 'default'}>
                      {skill.risk === 'low' ? '低风险' : '中风险'}
                    </Badge>
                  </div>
                  <CardDescription>{skill.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/skills/${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        查看详情
                      </Link>
                    </Button>
                    <Button size="sm">复制安装命令</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <CardTitle className="text-yellow-900 dark:text-yellow-100">安全提示</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-yellow-800 dark:text-yellow-200">
              <ul className="space-y-2">
                <li>• 安装 Skills 前请仔细阅读权限说明</li>
                <li>• 不要在评论或截图中泄露 API Key</li>
                <li>• 云端部署建议启用 SSH Key 认证</li>
              </ul>
              <Button variant="link" asChild className="mt-4 p-0 text-yellow-900 dark:text-yellow-100">
                <Link href="/security">查看完整安全指南 →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold mb-2">快速部署</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                30 分钟内完成部署并运行第一个 Skill
              </p>
            </div>
            <div className="text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold mb-2">详细教程</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                从本地到云端，从接入到维护的完整指南
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-bold mb-2">安全优先</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                权限最小化、Key 防泄露、云端防护清单
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

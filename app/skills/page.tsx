import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search } from 'lucide-react'

export const revalidate = 60 // 重新验证间隔 60 秒

async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('upvotes', { ascending: false })
  
  if (error) {
    console.error('Error fetching skills:', error)
    return []
  }
  
  return data || []
}

export default async function SkillsPage() {
  const skills = await getSkills()

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
      {skills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">暂无 Skills 数据</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <Card key={skill.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                  <Badge variant={skill.risk_level === 'low' ? 'secondary' : 'default'}>
                    {skill.risk_level === 'low' ? '低风险' : skill.risk_level === 'medium' ? '中风险' : '高风险'}
                  </Badge>
                </div>
                <CardDescription>{skill.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {skill.tags?.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    👍 {skill.upvotes || 0}
                  </span>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/skills/${skill.slug}`}>查看详情</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Load More */}
      {skills.length > 0 && (
        <div className="mt-8 text-center">
          <Button variant="outline">加载更多</Button>
        </div>
      )}
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const recipes = [
  {
    id: 1,
    slug: 'programmer',
    title: '程序员助手',
    summary: '代码审查、Bug 修复、文档生成',
    role_type: '开发',
    difficulty: 'intermediate',
    skills_count: 5,
    risk_level: 'medium',
  },
  {
    id: 2,
    slug: 'marketing-ops',
    title: '营销运营',
    summary: '内容创作、邮件营销、数据分析',
    role_type: '运营',
    difficulty: 'beginner',
    skills_count: 4,
    risk_level: 'low',
  },
  {
    id: 3,
    slug: 'ecommerce-assistant',
    title: '电商助理',
    summary: '商品优化、客服自动化、订单管理',
    role_type: '电商',
    difficulty: 'intermediate',
    skills_count: 6,
    risk_level: 'medium',
  },
]

export default function RecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Recipes 岗位配方</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        一键导入岗位专属配置，开箱即用的 AI 员工
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                <Badge variant={recipe.risk_level === 'low' ? 'secondary' : 'default'}>
                  {recipe.risk_level === 'low' ? '低风险' : '中风险'}
                </Badge>
              </div>
              <CardDescription>{recipe.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">岗位类型</span>
                  <Badge variant="outline">{recipe.role_type}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">难度</span>
                  <span>{recipe.difficulty === 'beginner' ? '入门' : '进阶'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">包含 Skills</span>
                  <span>{recipe.skills_count} 个</span>
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/recipes/${recipe.slug}`}>查看详情</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

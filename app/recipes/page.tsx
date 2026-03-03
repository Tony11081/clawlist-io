import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const recipes = [
  {
    id: 1,
    slug: 'programmer',
    title: 'Developer Assistant',
    summary: 'Code review, bug fixes, documentation',
    role_type: 'Development',
    difficulty: 'intermediate',
    skills_count: 5,
    risk_level: 'medium',
  },
  {
    id: 2,
    slug: 'marketing-ops',
    title: 'Marketing Ops',
    summary: 'Content creation, email marketing, analytics',
    role_type: 'Operations',
    difficulty: 'beginner',
    skills_count: 4,
    risk_level: 'low',
  },
  {
    id: 3,
    slug: 'ecommerce-assistant',
    title: 'E-commerce Assistant',
    summary: 'Product optimization, customer service, orders',
    role_type: 'E-commerce',
    difficulty: 'intermediate',
    skills_count: 6,
    risk_level: 'medium',
  },
]

export default function RecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Job Recipes</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        One-click job configurations for ready-to-use AI agents
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                <Badge variant={recipe.risk_level === 'low' ? 'secondary' : 'default'}>
                  {recipe.risk_level === 'low' ? 'Low Risk' : 'Medium Risk'}
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

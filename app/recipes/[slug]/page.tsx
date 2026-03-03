import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { recipes } from '@/lib/catalog'

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = recipes.find((item) => item.slug === params.slug)
  if (!recipe) {
    return { title: 'Recipe Not Found' }
  }

  return {
    title: recipe.title,
    description: recipe.summary,
    alternates: {
      canonical: `/recipes/${recipe.slug}`,
    },
  }
}

export default function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = recipes.find((item) => item.slug === params.slug)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        <Link href="/recipes" className="hover:underline">
          Recipes
        </Link>{' '}
        / <span>{recipe.title}</span>
      </div>

      <h1 className="mb-3 text-4xl font-bold">{recipe.title}</h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">{recipe.summary}</p>

      <div className="mb-8 flex gap-2">
        <Badge variant="outline">{recipe.role_type}</Badge>
        <Badge variant={recipe.risk_level === 'low' ? 'secondary' : 'default'}>
          {recipe.risk_level === 'low' ? 'Low Risk' : recipe.risk_level === 'medium' ? 'Medium Risk' : 'High Risk'}
        </Badge>
        <Badge variant="outline">{recipe.skills_count} Skills</Badge>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recommended workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <p>1. Initialize required skills and credentials.</p>
          <p>2. Run the core automation loop for this role.</p>
          <p>3. Track outcomes with weekly KPI review.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default setup profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <p>• Effort mode: {recipe.difficulty === 'beginner' ? 'low-medium' : 'medium-high'}</p>
          <p>• Guardrails: permission checks + dry-run first</p>
          <p>• Reporting cadence: daily summary + weekly retro</p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button asChild>
          <Link href="/recipes">Back to Recipes</Link>
        </Button>
      </div>
    </div>
  )
}

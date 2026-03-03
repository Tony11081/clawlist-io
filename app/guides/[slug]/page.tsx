import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { guides } from '@/lib/catalog'

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)
  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        <Link href="/guides" className="hover:underline">
          Guides
        </Link>{' '}
        / <span>{guide.title}</span>
      </div>

      <h1 className="mb-3 text-4xl font-bold">{guide.title}</h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">{guide.description}</p>

      <div className="mb-8 flex gap-2">
        <Badge variant="outline">{guide.category}</Badge>
        <Badge variant="secondary">{guide.difficulty === 'beginner' ? 'Beginner' : 'Intermediate'}</Badge>
        <Badge variant="outline">{guide.readTime}</Badge>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>What you will learn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <p>• Environment and prerequisite checklist</p>
          <p>• Step-by-step setup instructions</p>
          <p>• Common pitfalls and troubleshooting</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Execution checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <p>1. Confirm prerequisites are installed.</p>
          <p>2. Run setup commands in order and verify outputs.</p>
          <p>3. Validate with a smoke test before production use.</p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button asChild>
          <Link href="/guides">Back to Guides</Link>
        </Button>
      </div>
    </div>
  )
}

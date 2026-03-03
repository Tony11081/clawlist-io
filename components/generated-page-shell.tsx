import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { GeneratedPageEntry } from '@/lib/route-scaffolds'

export function GeneratedPageShell({ page }: { page: GeneratedPageEntry }) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <Badge variant="outline" className="mb-4">
          {page.section}
        </Badge>
        <h1 className="mb-4 text-4xl font-bold">{page.h1}</h1>
        <p className="max-w-3xl text-lg text-neutral-600 dark:text-neutral-400">{page.intro}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>What this page covers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          {page.highlights.map((highlight) => (
            <p key={highlight}>• {highlight}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next step</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            Continue from this recovery page using the closest matching ClawList section below.
          </p>
          <Button asChild>
            <Link href={page.ctaHref}>{page.ctaLabel}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

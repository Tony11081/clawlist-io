import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Search, BookOpen } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 mx-auto">
              <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-center">Go Home</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Return to the homepage
            </p>
            <Button asChild className="w-full">
              <Link href="/">Home</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4 mx-auto">
              <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-center">Browse Skills</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Explore our skills library
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link href="/skills">Skills</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-center">Read Guides</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Learn from our tutorials
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link href="/guides">Guides</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          If you believe this is an error, please{' '}
          <Link href="/submit" className="text-blue-600 dark:text-blue-400 hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

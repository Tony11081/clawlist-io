import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search } from 'lucide-react'

export const revalidate = 60 // Revalidate every 60 seconds

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
        <h1 className="text-4xl font-bold mb-4">Skills Library</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover, install, and compare OpenClaw skills. All plugins are labeled with risk levels and required permissions.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search skills..."
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            Code
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            Automation
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            Marketing
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
            Social
          </Badge>
        </div>
      </div>

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">No skills available yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <Card key={skill.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                  <Badge variant={skill.risk_level === 'low' ? 'secondary' : 'default'}>
                    {skill.risk_level === 'low' ? 'Low Risk' : skill.risk_level === 'medium' ? 'Medium Risk' : 'High Risk'}
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
                    <Link href={`/skills/${skill.slug}`}>View Details</Link>
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
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  )
}

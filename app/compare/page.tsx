'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, X, Search } from 'lucide-react'
import Link from 'next/link'

// Mock data - will be replaced with real data from Supabase
const mockSkills = [
  {
    id: '1',
    name: 'GitHub Issues',
    slug: 'github-issues',
    summary: 'Auto-handle GitHub issues and submit PRs',
    risk_level: 'low',
    install_cmd: 'npx skills add gh-issues',
    dependencies: ['gh CLI', 'git'],
    permissions: ['GitHub API', 'File system'],
    platforms: ['macOS', 'Linux', 'Windows'],
    price: 'Free',
    upvotes: 245
  },
  {
    id: '2',
    name: 'Browser Agent',
    slug: 'browser-agent',
    summary: 'Browser automation for testing and scraping',
    risk_level: 'medium',
    install_cmd: 'npx skills add agent-browser',
    dependencies: ['Playwright', 'Chrome'],
    permissions: ['Browser control', 'Network access'],
    platforms: ['macOS', 'Linux', 'Windows'],
    price: 'Free',
    upvotes: 189
  },
  {
    id: '3',
    name: 'Email Marketing',
    slug: 'email-marketing',
    summary: 'Automated email campaigns and CRM',
    risk_level: 'low',
    install_cmd: 'npx skills add email-marketing',
    dependencies: ['SMTP server'],
    permissions: ['Email API', 'Contact list'],
    platforms: ['All'],
    price: 'Free',
    upvotes: 156
  },
]

export default function ComparePage() {
  const [selectedSkills, setSelectedSkills] = useState<typeof mockSkills>([mockSkills[0], mockSkills[1]])
  const [searchQuery, setSearchQuery] = useState('')

  const addSkill = (skill: typeof mockSkills[0]) => {
    if (selectedSkills.length < 3 && !selectedSkills.find(s => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const removeSkill = (skillId: string) => {
    setSelectedSkills(selectedSkills.filter(s => s.id !== skillId))
  }

  const availableSkills = mockSkills.filter(
    skill => !selectedSkills.find(s => s.id === skill.id) &&
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Compare Skills</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Compare up to 3 skills side-by-side to find the best fit for your needs
        </p>
      </div>

      {/* Skill Selector */}
      {selectedSkills.length < 3 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add Skills to Compare ({selectedSkills.length}/3)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {availableSkills.slice(0, 6).map((skill) => (
                <Card key={skill.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => addSkill(skill)}>
                  <CardHeader>
                    <CardTitle className="text-base">{skill.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{skill.summary}</p>
                    <Button size="sm" className="mt-2 w-full">Add to Compare</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      {selectedSkills.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-semibold w-48">Feature</th>
                {selectedSkills.map((skill) => (
                  <th key={skill.id} className="text-left py-4 px-4 min-w-[250px]">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{skill.name}</h3>
                          <Badge variant={skill.risk_level === 'low' ? 'secondary' : 'default'} className="mt-1">
                            {skill.risk_level === 'low' ? 'Low Risk' : skill.risk_level === 'medium' ? 'Medium Risk' : 'High Risk'}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
                        {skill.summary}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Install Command */}
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Install Command</td>
                {selectedSkills.map((skill) => (
                  <td key={skill.id} className="py-4 px-4">
                    <code className="text-xs bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded">
                      {skill.install_cmd}
                    </code>
                  </td>
                ))}
              </tr>

              {/* Risk Level */}
              <tr className="border-b bg-neutral-50 dark:bg-neutral-900/50">
                <td className="py-4 px-4 font-medium">Risk Level</td>
                {selectedSkills.map((skill) => (
                  <td key={skill.id} className="py-4 px-4">
                    <Badge variant={skill.risk_level === 'low' ? 'secondary' : 'default'}>
                      {skill.risk_level}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Dependencies */}
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Dependencies</td>
                {selectedSkills.map((skill) => (
                  <td key={skill.id} className="py-4 px-4">
                    <ul className="text-sm space-y-1">
                      {skill.dependencies.map((dep, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                          {dep}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Permissions */}
              <tr className="border-b bg-neutral-50 dark:bg-neutral-900/50">
                <td className="py-4 px-4 font-medium">Permissions</td>
                {selectedSkills.map((skill) => (
                  <td key={skill.id} className="py-4 px-4">
                    <ul className="text-sm space-y-1">
                      {skill.permissions.map((perm, idx) => (
                        <li key={idx}>{perm}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Platforms */}
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Platforms</td>
                {selectedSkills.map((skill) => (
                  <td key={skill.id} className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {skill.platforms.map((platform, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b bg-neutral-50 dark:bg-neutral-900/50">
                <td className="py-4 px-4 font-medium">Price</td>
                {selectedSkills.map((skill) => (
                  <td key={skill.id} className="py-4 px-4 font-semibold">
                    {skill.price}
                  </td>
                ))}
              </tr>

              {/* Popularity */}
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Upvotes</td>
                {selectedSkills.map((skill) => (
                  <td key={skill.id} className="py-4 px-4">
                    👍 {skill.upvotes}
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="py-4 px-4 font-medium">Actions</td>
                {selectedSkills.map((skill) => (
                  <td key={skill.id} className="py-4 px-4">
                    <div className="space-y-2">
                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/skills/${skill.slug}`}>View Details</Link>
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Copy Install
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedSkills.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Select skills above to start comparing
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

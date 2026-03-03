'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    description: '',
    githubUrl: '',
    installCmd: '',
    category: '',
    riskLevel: 'low',
    tags: '',
  })

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // TODO: Submit to Supabase
    console.log('Submitting:', formData)
    
    setTimeout(() => {
      setSubmitting(false)
      alert('Skill submitted for review! We\'ll notify you once it\'s approved.')
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Submit a Skill</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Share your OpenClaw skill with the community. All submissions are reviewed before publishing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Information</CardTitle>
          <CardDescription>
            Provide details about your skill. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Skill Name *
              </label>
              <Input
                placeholder="e.g., GitHub Issues Handler"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Short Summary * (max 100 chars)
              </label>
              <Input
                placeholder="One-line description of what your skill does"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                maxLength={100}
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.summary.length}/100 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Detailed Description *
              </label>
              <Textarea
                placeholder="Explain what your skill does, how it works, and what problems it solves..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                GitHub Repository URL
              </label>
              <Input
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>

            {/* Install Command */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Install Command *
              </label>
              <Input
                placeholder="npx skills add your-skill"
                value={formData.installCmd}
                onChange={(e) => setFormData({ ...formData, installCmd: e.target.value })}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-neutral-950"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                <option value="Development">Development</option>
                <option value="Automation">Automation</option>
                <option value="Marketing">Marketing</option>
                <option value="Social Media">Social Media</option>
                <option value="Productivity">Productivity</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Creative">Creative</option>
                <option value="Utilities">Utilities</option>
                <option value="DevOps">DevOps</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Risk Level */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Risk Level *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'low', label: 'Low', desc: 'Read-only or minimal permissions' },
                  { value: 'medium', label: 'Medium', desc: 'Writes data or accesses APIs' },
                  { value: 'high', label: 'High', desc: 'System-level access or destructive actions' },
                ].map((risk) => (
                  <label key={risk.value} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="riskLevel"
                      value={risk.value}
                      checked={formData.riskLevel === risk.value}
                      onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <Badge variant={risk.value === 'low' ? 'secondary' : 'default'}>
                        {risk.label} Risk
                      </Badge>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {risk.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (comma-separated)
              </label>
              <Input
                placeholder="automation, github, code"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <p className="text-xs text-neutral-500 mt-1">
                Add relevant tags to help users find your skill
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit for Review
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-neutral-500 mt-2">
                Your submission will be reviewed within 24-48 hours
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Submission Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✅ Provide clear, accurate descriptions</p>
          <p>✅ Test your skill before submitting</p>
          <p>✅ Include installation instructions</p>
          <p>✅ Disclose all required permissions</p>
          <p>❌ Don't submit malicious or harmful skills</p>
          <p>❌ Don't plagiarize others' work</p>
        </CardContent>
      </Card>
    </div>
  )
}

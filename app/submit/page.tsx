'use client'

import { useState } from 'react'
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
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 text-[#191919]">Submit a Skill</h1>
          <p className="text-lg text-[#666666]">
            Share your OpenClaw skill with the community. All submissions are reviewed before publishing.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-2 text-[#191919]">Skill Information</h2>
          <p className="text-[#666666] mb-8">
            Provide details about your skill. Fields marked with * are required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#191919]">
                Skill Name *
              </label>
              <input
                type="text"
                placeholder="e.g., GitHub Issues Handler"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919]"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#191919]">
                Short Summary * (max 100 chars)
              </label>
              <input
                type="text"
                placeholder="One-line description of what your skill does"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                maxLength={100}
                required
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919]"
              />
              <p className="text-xs text-[#999999] mt-1">
                {formData.summary.length}/100 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#191919]">
                Detailed Description *
              </label>
              <textarea
                placeholder="Explain what your skill does, how it works, and what problems it solves..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919] resize-none"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#191919]">
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919]"
              />
            </div>

            {/* Install Command */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#191919]">
                Install Command *
              </label>
              <input
                type="text"
                placeholder="npx skills add your-skill"
                value={formData.installCmd}
                onChange={(e) => setFormData({ ...formData, installCmd: e.target.value })}
                required
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#191919]">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919] bg-white"
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
              <label className="block text-sm font-medium mb-2 text-[#191919]">
                Risk Level *
              </label>
              <div className="space-y-3">
                {[
                  { value: 'low', label: 'Low', desc: 'Read-only or minimal permissions' },
                  { value: 'medium', label: 'Medium', desc: 'Writes data or accesses APIs' },
                  { value: 'high', label: 'High', desc: 'System-level access or destructive actions' },
                ].map((risk) => (
                  <label key={risk.value} className="flex items-start gap-3 cursor-pointer p-4 border border-[#e5e5e5] rounded-2xl hover:border-[#191919] transition-colors">
                    <input
                      type="radio"
                      name="riskLevel"
                      value={risk.value}
                      checked={formData.riskLevel === risk.value}
                      onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                        risk.value === 'low' ? 'bg-[#f0f0f0] text-[#191919]' : 'bg-[#262626] text-white'
                      }`}>
                        {risk.label} Risk
                      </span>
                      <p className="text-sm text-[#666666] mt-2">
                        {risk.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#191919]">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                placeholder="automation, github, code"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919]"
              />
              <p className="text-xs text-[#999999] mt-1">
                Add relevant tags to help users find your skill
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#191919] text-white rounded-2xl hover:bg-[#262626] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit for Review
                  </>
                )}
              </button>
              <p className="text-xs text-center text-[#999999] mt-3">
                Your submission will be reviewed within 24-48 hours
              </p>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#191919]">Submission Guidelines</h2>
          <div className="space-y-3 text-sm text-[#666666]">
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">✓</span>
              Provide clear, accurate descriptions
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">✓</span>
              Test your skill before submitting
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">✓</span>
              Include installation instructions
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">✓</span>
              Disclose all required permissions
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">✗</span>
              Don't submit malicious or harmful skills
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#191919]">✗</span>
              Don't plagiarize others' work
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'
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
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 text-[#191919]">Compare Skills</h1>
          <p className="text-lg text-[#666666]">
            Compare up to 3 skills side-by-side to find the best fit for your needs
          </p>
        </div>

        {/* Skill Selector */}
        {selectedSkills.length < 3 && (
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#191919]">
              Add Skills to Compare ({selectedSkills.length}/3)
            </h2>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#999999]" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919]"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {availableSkills.slice(0, 6).map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => addSkill(skill)}
                  className="bg-[#f7f7f7] p-6 rounded-2xl cursor-pointer hover:bg-[#eeeeee] transition-colors"
                >
                  <h3 className="font-bold text-[#191919] mb-2">{skill.name}</h3>
                  <p className="text-sm text-[#666666] mb-4">{skill.summary}</p>
                  <button className="w-full py-2 bg-[#191919] text-white rounded-xl hover:bg-[#262626] transition-colors">
                    Add to Compare
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedSkills.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#e5e5e5]">
                  <th className="text-left py-4 px-4 font-semibold w-48 text-[#191919]">Feature</th>
                  {selectedSkills.map((skill) => (
                    <th key={skill.id} className="text-left py-4 px-4 min-w-[250px]">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-[#191919]">{skill.name}</h3>
                            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                              skill.risk_level === 'low' 
                                ? 'bg-[#f0f0f0] text-[#191919]' 
                                : 'bg-[#262626] text-white'
                            }`}>
                              {skill.risk_level === 'low' ? 'Low Risk' : skill.risk_level === 'medium' ? 'Medium Risk' : 'High Risk'}
                            </span>
                          </div>
                          <button
                            onClick={() => removeSkill(skill.id)}
                            className="p-2 hover:bg-[#f7f7f7] rounded-xl transition-colors"
                          >
                            <X className="h-4 w-4 text-[#666666]" />
                          </button>
                        </div>
                        <p className="text-sm text-[#666666]">
                          {skill.summary}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Install Command */}
                <tr className="border-b border-[#e5e5e5]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Install Command</td>
                  {selectedSkills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4">
                      <code className="text-xs bg-[#f7f7f7] px-3 py-2 rounded-xl text-[#191919]">
                        {skill.install_cmd}
                      </code>
                    </td>
                  ))}
                </tr>

                {/* Risk Level */}
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Risk Level</td>
                  {selectedSkills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        skill.risk_level === 'low' 
                          ? 'bg-[#f0f0f0] text-[#191919]' 
                          : 'bg-[#262626] text-white'
                      }`}>
                        {skill.risk_level}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Dependencies */}
                <tr className="border-b border-[#e5e5e5]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Dependencies</td>
                  {selectedSkills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4">
                      <ul className="text-sm space-y-1">
                        {skill.dependencies.map((dep, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-[#666666]">
                            <span className="text-[#191919]">✓</span>
                            {dep}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Permissions */}
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Permissions</td>
                  {selectedSkills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4">
                      <ul className="text-sm space-y-1 text-[#666666]">
                        {skill.permissions.map((perm, idx) => (
                          <li key={idx}>{perm}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Platforms */}
                <tr className="border-b border-[#e5e5e5]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Platforms</td>
                  {selectedSkills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4">
                      <div className="flex flex-wrap gap-2">
                        {skill.platforms.map((platform, idx) => (
                          <span key={idx} className="px-2 py-1 border border-[#e5e5e5] rounded-lg text-xs text-[#666666]">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Price */}
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Price</td>
                  {selectedSkills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4 font-semibold text-[#191919]">
                      {skill.price}
                    </td>
                  ))}
                </tr>

                {/* Popularity */}
                <tr className="border-b border-[#e5e5e5]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Upvotes</td>
                  {selectedSkills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4 text-[#666666]">
                      👍 {skill.upvotes}
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="py-4 px-4 font-medium text-[#191919]">Actions</td>
                  {selectedSkills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4">
                      <div className="space-y-2">
                        <Link
                          href={`/skills/${skill.slug}`}
                          className="block w-full py-2 bg-[#191919] text-white text-center rounded-xl hover:bg-[#262626] transition-colors"
                        >
                          View Details
                        </Link>
                        <button className="w-full py-2 border border-[#e5e5e5] text-[#191919] rounded-xl hover:bg-[#f7f7f7] transition-colors">
                          Copy Install
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedSkills.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <p className="text-[#666666]">
              Select skills above to start comparing
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

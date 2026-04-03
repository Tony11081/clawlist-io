import type { Metadata } from 'next'
import { Code2, FileText, Bot, BarChart3, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Model Guide',
  description:
    'An internal model selection workspace while ClawList develops deeper, source-linked coverage and testing notes.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/models',
  },
}

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 text-[#191919]">Model Guide</h1>
          <p className="text-lg text-[#666666]">
            Choose the right model, understand costs, integrate correctly
          </p>
        </div>

        {/* Model Comparison Table */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#191919]">Model Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5]">
                  <th className="text-left py-4 px-4 font-semibold text-[#191919]">Model</th>
                  <th className="text-left py-4 px-4 font-semibold text-[#191919]">Speed</th>
                  <th className="text-left py-4 px-4 font-semibold text-[#191919]">Cost</th>
                  <th className="text-left py-4 px-4 font-semibold text-[#191919]">Context</th>
                  <th className="text-left py-4 px-4 font-semibold text-[#191919]">Use Cases</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e5e5e5]">
                  <td className="py-4 px-4 font-medium text-[#191919]">GPT-5.3 Codex</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-[#f0f0f0] text-[#191919] rounded-full text-sm">Fast</span>
                  </td>
                  <td className="py-4 px-4 text-[#666666]">$$</td>
                  <td className="py-4 px-4 text-[#666666]">128K</td>
                  <td className="py-4 px-4 text-[#666666]">Code generation, technical tasks</td>
                </tr>
                <tr className="border-b border-[#e5e5e5]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Claude Opus 4.6</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-[#262626] text-white rounded-full text-sm">Medium</span>
                  </td>
                  <td className="py-4 px-4 text-[#666666]">$$$</td>
                  <td className="py-4 px-4 text-[#666666]">200K</td>
                  <td className="py-4 px-4 text-[#666666]">Complex reasoning, long documents</td>
                </tr>
                <tr className="border-b border-[#e5e5e5]">
                  <td className="py-4 px-4 font-medium text-[#191919]">Claude Sonnet 4.6</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-[#f0f0f0] text-[#191919] rounded-full text-sm">Fast</span>
                  </td>
                  <td className="py-4 px-4 text-[#666666]">$$</td>
                  <td className="py-4 px-4 text-[#666666]">200K</td>
                  <td className="py-4 px-4 text-[#666666]">Daily conversations, general tasks</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#191919]">Gemini 3.1 Pro</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-[#f0f0f0] text-[#191919] rounded-full text-sm">Fast</span>
                  </td>
                  <td className="py-4 px-4 text-[#666666]">$</td>
                  <td className="py-4 px-4 text-[#666666]">2M</td>
                  <td className="py-4 px-4 text-[#666666]">Long context, multimodal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Model Selector */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#191919]">Model Selector</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 text-[#191919]">What do you need?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="text-left p-6 border-2 border-[#e5e5e5] rounded-2xl hover:border-[#191919] transition-all group">
                  <div className="size-12 rounded-full bg-[#f7f7f7] flex items-center justify-center mb-4 group-hover:bg-[#191919] transition-colors">
                    <Code2 className="h-6 w-6 text-[#191919] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[#191919] font-semibold block">Code generation & review</span>
                </button>
                <button className="text-left p-6 border-2 border-[#e5e5e5] rounded-2xl hover:border-[#191919] transition-all group">
                  <div className="size-12 rounded-full bg-[#f7f7f7] flex items-center justify-center mb-4 group-hover:bg-[#191919] transition-colors">
                    <FileText className="h-6 w-6 text-[#191919] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[#191919] font-semibold block">Content creation & editing</span>
                </button>
                <button className="text-left p-6 border-2 border-[#e5e5e5] rounded-2xl hover:border-[#191919] transition-all group">
                  <div className="size-12 rounded-full bg-[#f7f7f7] flex items-center justify-center mb-4 group-hover:bg-[#191919] transition-colors">
                    <Bot className="h-6 w-6 text-[#191919] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[#191919] font-semibold block">Automated task execution</span>
                </button>
                <button className="text-left p-6 border-2 border-[#e5e5e5] rounded-2xl hover:border-[#191919] transition-all group">
                  <div className="size-12 rounded-full bg-[#f7f7f7] flex items-center justify-center mb-4 group-hover:bg-[#191919] transition-colors">
                    <BarChart3 className="h-6 w-6 text-[#191919] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[#191919] font-semibold block">Data analysis & reporting</span>
                </button>
              </div>
            </div>
            <div className="bg-[#f7f7f7] p-6 rounded-2xl">
              <p className="font-semibold mb-3 text-[#191919]">Recommended: GPT-5.3 Codex</p>
              <ul className="space-y-2 text-[#666666]">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#191919]" />
                  Fast speed, suitable for real-time interaction
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#191919]" />
                  Strong code capabilities
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#191919]" />
                  Moderate cost
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Key Setup */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#191919]">API Key Setup</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-[#191919]">Environment Variables (Recommended)</h3>
              <div className="bg-[#191919] p-6 rounded-2xl font-mono text-sm text-white overflow-x-auto">
                <code>
                  export OPENAI_API_KEY=&quot;sk-...&quot;<br />
                  export ANTHROPIC_API_KEY=&quot;sk-ant-...&quot;
                </code>
              </div>
            </div>
            <div className="bg-[#fff9e6] border-2 border-[#ffd700] p-6 rounded-2xl">
              <p className="font-semibold text-[#191919] mb-3 flex items-center gap-2">
                <span className="text-xl">⚠️</span> Security Tips
              </p>
              <ul className="space-y-2 text-[#666666] text-sm">
                <li>• Never hardcode keys in code or config files</li>
                <li>• Use .env.local and add to .gitignore</li>
                <li>• Rotate API keys regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

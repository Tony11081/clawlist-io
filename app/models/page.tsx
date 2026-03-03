import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function ModelsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Model Guide</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Choose the right model, understand costs, integrate correctly
      </p>

      {/* Model Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Model Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Model</th>
                  <th className="text-left py-3 px-4">Speed</th>
                  <th className="text-left py-3 px-4">Cost</th>
                  <th className="text-left py-3 px-4">Context</th>
                  <th className="text-left py-3 px-4">Use Cases</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">GPT-5.3 Codex</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">Fast</Badge>
                  </td>
                  <td className="py-3 px-4">$$</td>
                  <td className="py-3 px-4">128K</td>
                  <td className="py-3 px-4">Code generation, technical tasks</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Claude Opus 4.6</td>
                  <td className="py-3 px-4">
                    <Badge>Medium</Badge>
                  </td>
                  <td className="py-3 px-4">$$$</td>
                  <td className="py-3 px-4">200K</td>
                  <td className="py-3 px-4">Complex reasoning, long documents</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Claude Sonnet 4.6</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">Fast</Badge>
                  </td>
                  <td className="py-3 px-4">$$</td>
                  <td className="py-3 px-4">200K</td>
                  <td className="py-3 px-4">日常对话、通用任务</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Gemini 3.1 Pro</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">Fast</Badge>
                  </td>
                  <td className="py-3 px-4">$</td>
                  <td className="py-3 px-4">2M</td>
                  <td className="py-3 px-4">超长Context、多模态</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Model Selector */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Model选择器</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">你的需求是？</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  💻 代码生成与审查
                </Button>
                <Button variant="outline" className="justify-start">
                  ✍️ 内容创作与编辑
                </Button>
                <Button variant="outline" className="justify-start">
                  🤖 自动化任务执行
                </Button>
                <Button variant="outline" className="justify-start">
                  📊 数据分析与报告
                </Button>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">推荐：GPT-5.3 Codex</p>
              <ul className="text-sm space-y-1 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  SpeedFast，适合实时交互
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  代码能力强
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Cost适Medium
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Key Setup */}
      <Card>
        <CardHeader>
          <CardTitle>API Key 接入</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">环境变量配置（推荐）</h3>
              <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg font-mono text-sm">
                <code>
                  export OPENAI_API_KEY=&quot;sk-...&quot;<br />
                  export ANTHROPIC_API_KEY=&quot;sk-ant-...&quot;
                </code>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ 安全提示
              </p>
              <ul className="text-sm space-y-1 text-yellow-800 dark:text-yellow-200">
                <li>• Never hardcode keys in code or config files</li>
                <li>• Use .env.local and add to .gitignore</li>
                <li>• 定期轮换 API Key</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function ModelsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Models 模型指南</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        选择合适的模型、理解成本、正确接入
      </p>

      {/* Model Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>主流模型对比</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">模型</th>
                  <th className="text-left py-3 px-4">速度</th>
                  <th className="text-left py-3 px-4">成本</th>
                  <th className="text-left py-3 px-4">上下文</th>
                  <th className="text-left py-3 px-4">适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">GPT-5.3 Codex</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">快</Badge>
                  </td>
                  <td className="py-3 px-4">$$</td>
                  <td className="py-3 px-4">128K</td>
                  <td className="py-3 px-4">代码生成、技术任务</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Claude Opus 4.6</td>
                  <td className="py-3 px-4">
                    <Badge>中</Badge>
                  </td>
                  <td className="py-3 px-4">$$$</td>
                  <td className="py-3 px-4">200K</td>
                  <td className="py-3 px-4">复杂推理、长文档</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Claude Sonnet 4.6</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">快</Badge>
                  </td>
                  <td className="py-3 px-4">$$</td>
                  <td className="py-3 px-4">200K</td>
                  <td className="py-3 px-4">日常对话、通用任务</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Gemini 3.1 Pro</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">快</Badge>
                  </td>
                  <td className="py-3 px-4">$</td>
                  <td className="py-3 px-4">2M</td>
                  <td className="py-3 px-4">超长上下文、多模态</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Model Selector */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>模型选择器</CardTitle>
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
                  速度快，适合实时交互
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  代码能力强
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  成本适中
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
                <li>• 不要将 Key 写入代码或配置文件</li>
                <li>• 使用 .env.local 并加入 .gitignore</li>
                <li>• 定期轮换 API Key</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

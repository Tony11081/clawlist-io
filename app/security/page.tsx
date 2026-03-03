import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Key, Lock, AlertTriangle } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">安全Medium心</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Security guidelines and actionable protection checklist for high-privilege agents
      </p>

      {/* API Key Security */}
      <Card className="mb-8" id="api-keys">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <CardTitle>API Key Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Storage Best Practices</h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>✅ Store API keys in environment variables</li>
              <li>✅ Never hardcode keys in code or config files</li>
              <li>✅ Use .env.local and add to .gitignore</li>
              <li>❌ 不要在日志Medium输出 Key</li>
              <li>❌ 不要在截图Medium暴露 Key</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Rotation & Limits</h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>• Rotate API keys regularly (every 90 days recommended)</li>
              <li>• Set usage limits and alerts</li>
              <li>• Use read-only keys when possible</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Permission Control */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <CardTitle>Minimal Permissions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            安装 Skill 前，仔细阅读权限说明：
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">Low Risk</Badge>
              <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                <li>• 文件读取</li>
                <li>• 网络请求</li>
              </ul>
            </div>
            <div>
              <Badge variant="default" className="mb-2">Medium Risk</Badge>
              <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                <li>• 文件写入</li>
                <li>• 系统命令</li>
                <li>• 浏览器控制</li>
              </ul>
            </div>
            <div>
              <Badge variant="destructive" className="mb-2">High Risk</Badge>
              <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                <li>• 支付操作</li>
                <li>• 删除数据</li>
                <li>• 发货/发布</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cloud Deployment */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Cloud Deployment安全</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li>✅ 使用 SSH Key 认证，禁用密码登录</li>
            <li>✅ 配置防火墙，只开放必要端口</li>
            <li>✅ 使用反向代理（Nginx/Caddy）</li>
            <li>✅ 启用 HTTPS（Let's Encrypt）</li>
            <li>✅ 定期更新系统和依赖</li>
            <li>✅ 配置日志脱敏</li>
          </ul>
        </CardContent>
      </Card>

      {/* Risk Cases */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <CardTitle className="text-red-900 dark:text-red-100">常见风险案例</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-red-900 dark:text-red-100">案例 1：API Key 泄露</h3>
            <p className="text-sm text-red-800 dark:text-red-200 mb-2">
              Development者在 GitHub 提交了包含 OpenAI API Key 的配置文件，导致 Key 被爬虫抓取并滥用。
            </p>
            <p className="text-sm font-semibold text-red-900 dark:text-red-100">
              防护：使用 .env.local + .gitignore，定期扫描仓库历史
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-red-900 dark:text-red-100">案例 2：权限滥用</h3>
            <p className="text-sm text-red-800 dark:text-red-200 mb-2">
              某 Skill 声称"只读文件"，实际执行了删除操作。
            </p>
            <p className="text-sm font-semibold text-red-900 dark:text-red-100">
              防护：审查 Skill 源码，使用沙箱环境测试
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

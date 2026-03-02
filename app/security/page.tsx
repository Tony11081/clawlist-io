import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Key, Lock, AlertTriangle } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">安全中心</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        高权限 Agent 的安全教育与可执行防护清单
      </p>

      {/* API Key Security */}
      <Card className="mb-8" id="api-keys">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <CardTitle>API Key 安全</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">存储建议</h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>✅ 使用环境变量存储 API Key</li>
              <li>✅ 不要将 Key 写入代码或配置文件</li>
              <li>✅ 使用 .env.local 并加入 .gitignore</li>
              <li>❌ 不要在日志中输出 Key</li>
              <li>❌ 不要在截图中暴露 Key</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">轮换与限额</h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>• 定期轮换 API Key（建议每 90 天）</li>
              <li>• 设置使用限额和告警</li>
              <li>• 使用只读 Key（如果可能）</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Permission Control */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <CardTitle>权限最小化</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            安装 Skill 前，仔细阅读权限说明：
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">低风险</Badge>
              <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                <li>• 文件读取</li>
                <li>• 网络请求</li>
              </ul>
            </div>
            <div>
              <Badge variant="default" className="mb-2">中风险</Badge>
              <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                <li>• 文件写入</li>
                <li>• 系统命令</li>
                <li>• 浏览器控制</li>
              </ul>
            </div>
            <div>
              <Badge variant="destructive" className="mb-2">高风险</Badge>
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
            <CardTitle>云端部署安全</CardTitle>
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
              开发者在 GitHub 提交了包含 OpenAI API Key 的配置文件，导致 Key 被爬虫抓取并滥用。
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

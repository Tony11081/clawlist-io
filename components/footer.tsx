import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-neutral-50 dark:bg-neutral-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">ClawList.io</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              OpenClaw 生态资源聚合站
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">教程</Link></li>
              <li><Link href="/skills" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Skills</Link></li>
              <li><Link href="/recipes" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">配方</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">社区</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">GitHub</a></li>
              <li><a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">Discord</a></li>
              <li><a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">文档</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">安全</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/security" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">安全中心</Link></li>
              <li><Link href="/security#api-keys" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">API Key 安全</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-neutral-600 dark:text-neutral-400">
          © 2026 ClawList.io. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

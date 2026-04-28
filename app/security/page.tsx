import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Shield, Key, Lock, AlertTriangle, ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="max-w-4xl mx-auto w-full px-6 py-12 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300">Security Center</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            SECURITY <br/>CENTER.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Security guidelines and actionable protection checklist for high-privilege agents. Follow these best practices to keep your deployments secure.
          </p>
        </div>

        {/* Alert Banner */}
        <div className="mb-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-6 rounded-2xl flex items-start gap-4 border border-slate-800 dark:border-slate-200">
          <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold mb-2 text-lg">Critical Security Notice</h3>
            <p className="text-slate-300 dark:text-slate-600 text-sm leading-relaxed">
              OpenClaw agents can execute code and access APIs. Always review permissions before deployment and never expose API keys in public repositories or screenshots.
            </p>
          </div>
        </div>

        {/* API Key Security */}
        <div className="mb-8 bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-2xl overflow-hidden" id="api-keys">
          <div className="p-8 border-b border-[#262626]/10 dark:border-[#262626]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-slate-900 dark:bg-slate-100 rounded-full flex items-center justify-center">
                <Key className="h-5 w-5 text-white dark:text-slate-900" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">API Key Security</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Protect your API credentials from unauthorized access</p>
          </div>
          <div className="p-8 space-y-6">
            <div>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-500">Storage Best Practices</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Store API keys in environment variables (.env.local)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Never hardcode keys in code or config files</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Add .env files to .gitignore immediately</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Never output keys in logs or console</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Never expose keys in screenshots or screen recordings</span>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-[#262626]/10 dark:border-[#262626]/30">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-500">Rotation & Limits</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li>• Rotate API keys regularly (every 90 days recommended)</li>
                <li>• Set usage limits and budget alerts on provider dashboards</li>
                <li>• Use read-only keys when write access isn&apos;t required</li>
                <li>• Monitor API usage for unusual patterns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Permission Control */}
        <div className="mb-8 bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-2xl overflow-hidden">
          <div className="p-8 border-b border-[#262626]/10 dark:border-[#262626]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-slate-900 dark:bg-slate-100 rounded-full flex items-center justify-center">
                <Lock className="h-5 w-5 text-white dark:text-slate-900" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Minimal Permissions</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Grant only the permissions required for each skill</p>
          </div>
          <div className="p-8 space-y-4">
            <div className="bg-[#262626]/5 dark:bg-[#262626]/20 p-4 rounded-lg border border-[#262626]/10 dark:border-[#262626]/30">
              <h4 className="font-bold mb-2 text-sm">File System Access</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Restrict read/write to specific directories only</p>
            </div>
            <div className="bg-[#262626]/5 dark:bg-[#262626]/20 p-4 rounded-lg border border-[#262626]/10 dark:border-[#262626]/30">
              <h4 className="font-bold mb-2 text-sm">Network Access</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Whitelist allowed domains and API endpoints</p>
            </div>
            <div className="bg-[#262626]/5 dark:bg-[#262626]/20 p-4 rounded-lg border border-[#262626]/10 dark:border-[#262626]/30">
              <h4 className="font-bold mb-2 text-sm">Database Permissions</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Use separate credentials with limited scope</p>
            </div>
          </div>
        </div>

        {/* Cloud Deployment */}
        <div className="mb-12 bg-white dark:bg-[#262626]/10 border border-[#262626]/10 dark:border-[#262626]/30 rounded-2xl overflow-hidden">
          <div className="p-8 border-b border-[#262626]/10 dark:border-[#262626]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-slate-900 dark:bg-slate-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white dark:text-slate-900" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Cloud Hardening</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Secure your cloud deployments with these practices</p>
          </div>
          <div className="p-8 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-1 text-sm">SSH Key Authentication</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Disable password auth, use SSH keys only</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-1 text-sm">Firewall Configuration</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Close all ports except required services</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-1 text-sm">Regular Updates</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Keep system packages and dependencies updated</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-1 text-sm">Monitoring & Alerts</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Set up intrusion detection and log monitoring</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-8 py-6 rounded-xl font-bold uppercase tracking-widest hover:opacity-90" asChild>
            <Link href="/guides">
              View Deployment Guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CopyButton } from '@/components/copy-button'
import { Shield, Layers } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] mx-auto py-20 lg:py-32 px-8 lg:px-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge className="inline-block px-3 py-1 bg-slate-200 dark:bg-[#262626] text-[10px] font-black uppercase tracking-widest rounded-full w-fit border-0">
                Version 2.4.0
              </Badge>
              <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter">
                ClawList
              </h1>
              <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                Minimalist developer resource hub for OpenClaw. High-performance tools for modern engineering.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" className="bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all shadow-xl dark:shadow-none" asChild>
                <Link href="/guides">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 dark:border-[#262626] px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-100 dark:hover:bg-[#262626] transition-all" asChild>
                <Link href="/skills">Documentation</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square bg-slate-200 dark:bg-[#262626] rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-white/5 dark:bg-white/5 backdrop-blur-3xl rounded-lg border border-white/10 shadow-inner flex flex-col p-8 font-mono text-xs opacity-50">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                </div>
                <p className="text-slate-400">$ claw install @openclaw/core</p>
                <p className="text-slate-500">Checking compatibility...</p>
                <p className="text-white">Success: environment verified.</p>
                <p className="text-slate-400">$ claw deploy --production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="w-full max-w-[1200px] mx-auto py-16 px-8 lg:px-40">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Quick Start</h2>
            <p className="text-slate-500 dark:text-slate-400">Get up and running in under five minutes.</p>
          </div>
          <div className="h-[1px] flex-1 mx-8 bg-slate-200 dark:bg-[#262626] hidden lg:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-8 bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-3xl hover:border-slate-400 dark:hover:border-slate-400 transition-all duration-300">
            <div className="size-12 rounded-full border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center mb-6 group-hover:bg-slate-900 dark:group-hover:bg-slate-100 transition-colors">
              <span className="text-xl font-black group-hover:text-white dark:group-hover:text-black">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Deploy</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Launch your OpenClaw instance in seconds with our automated cloud environment provisioning tool.</p>
          </div>
          <div className="group p-8 bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-3xl hover:border-slate-400 dark:hover:border-slate-400 transition-all duration-300">
            <div className="size-12 rounded-full border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center mb-6 group-hover:bg-slate-900 dark:group-hover:bg-slate-100 transition-colors">
              <span className="text-xl font-black group-hover:text-white dark:group-hover:text-black">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Install</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Standard CLI installation for all environments. Support for Homebrew, NPM, and native binaries.</p>
          </div>
          <div className="group p-8 bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-3xl hover:border-slate-400 dark:hover:border-slate-400 transition-all duration-300">
            <div className="size-12 rounded-full border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center mb-6 group-hover:bg-slate-900 dark:group-hover:bg-slate-100 transition-colors">
              <span className="text-xl font-black group-hover:text-white dark:group-hover:text-black">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Import</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Migrate existing assets with zero friction using our intelligent legacy data mapping engine.</p>
          </div>
        </div>
      </section>

      {/* Trending Skills */}
      <section className="w-full max-w-[1200px] mx-auto py-16 px-8 lg:px-40">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Trending Skills</h2>
            <p className="text-slate-500 dark:text-slate-400">Master the ecosystem with these curated modules.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Kernel Optimization', desc: 'Direct memory access and register tuning for ultra-low latency execution paths.', risk: 'High Risk', slug: 'kernel-optimization', install: 'npx skills add kernel-opt', bg: 'bg-slate-300 dark:bg-[#262626]' },
            { name: 'Interface Synthesis', desc: 'Automated UI generation based on system schemas and user behavior patterns.', risk: 'Stable', slug: 'interface-synthesis', install: 'npx skills add ui-synthesis', bg: 'bg-slate-400 dark:bg-[#262626]/80' },
            { name: 'Neural Pipelines', desc: 'Integration of on-device inference for real-time data classification and sorting.', risk: 'Experimental', slug: 'neural-pipelines', install: 'npx skills add neural-pipe', bg: 'bg-slate-200 dark:bg-[#262626]/10' },
          ].map((skill) => (
            <div key={skill.name} className="flex flex-col bg-slate-100 dark:bg-[#262626]/20 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#262626] shadow-sm">
              <div className={`h-48 ${skill.bg} relative`}>
                <div className="absolute top-4 right-4 bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {skill.risk}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <h4 className="text-xl font-bold">{skill.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{skill.desc}</p>
                <Link href={`/skills/${skill.slug}`} className="text-sm font-bold underline underline-offset-4 hover:opacity-70">
                  View Module
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Notice */}
      <section className="w-full max-w-[1200px] mx-auto py-16 mb-20 px-8 lg:px-40">
        <div className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-8 rounded-2xl flex items-center gap-8 border border-slate-800 dark:border-slate-200 shadow-2xl">
          <div className="size-16 flex-shrink-0 bg-white/10 dark:bg-black/10 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Security Notice</h3>
            <p className="text-slate-300 dark:text-slate-600 leading-relaxed max-w-2xl">
              All OpenClaw deployments require verified cryptographic keys. Unauthorized access attempts to production hubs will result in automatic IP isolation. Please review our safety protocols before initializing a remote cluster.
            </p>
          </div>
          <Button variant="outline" className="hidden lg:block border border-white dark:border-slate-900 px-6 py-2 rounded-full font-bold hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white transition-all" asChild>
            <Link href="/security">Verify Identity</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

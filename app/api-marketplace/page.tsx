import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, ExternalLink, ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

const apiProviders = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4, GPT-5, DALL-E, Whisper',
    pricing: '$0.03 / 1K tokens',
    contextWindow: '128K',
    features: ['Best for code', 'Fast response', 'Function calling', 'Vision support'],
    status: 'Operational',
    popular: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Claude Opus, Sonnet, Haiku',
    pricing: '$0.015 / 1K tokens',
    contextWindow: '200K',
    features: ['Best for reasoning', 'Long context', 'Safe outputs', 'Artifacts'],
    status: 'Operational',
    popular: true
  },
  {
    id: 'google',
    name: 'Google AI',
    description: 'Gemini Pro, Flash, Ultra',
    pricing: '$0.001 / 1K tokens',
    contextWindow: '1M',
    features: ['Cheapest option', 'Huge context', 'Multimodal', 'Fast'],
    status: 'Operational',
    popular: false
  },
  {
    id: 'together',
    name: 'Together AI',
    description: 'Open-source models (Llama, Mixtral)',
    pricing: '$0.0002 / 1K tokens',
    contextWindow: '32K',
    features: ['Ultra cheap', 'Open models', 'Fast inference', 'No rate limits'],
    status: 'Operational',
    popular: false
  },
  {
    id: 'replicate',
    name: 'Replicate',
    description: 'Run ML models in the cloud',
    pricing: '$0.0005 / sec',
    contextWindow: 'Varies',
    features: ['Image generation', 'Video models', 'Audio processing', 'Custom models'],
    status: 'Operational',
    popular: false
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Open-source model hosting',
    pricing: 'Free tier available',
    contextWindow: 'Varies',
    features: ['Free hosting', 'Community models', 'Inference API', 'Datasets'],
    status: 'Operational',
    popular: false
  }
]

export default function APIMarketplacePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-slate-300">API Marketplace</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col gap-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#262626]/10 dark:bg-[#262626]/30 rounded-full w-fit">
            <span className="size-2 bg-green-500 rounded-full"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Network Status: Operational</span>
          </div>
          <h1 className="text-6xl font-black leading-tight tracking-tighter max-w-3xl uppercase">
            Developer Resource Hub <br/>
            <span className="text-slate-500">for OpenClaw</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-light">
            High-performance API endpoints, distributed compute, and secure data storage for modern engineering stacks. Built for speed.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex gap-4 border-b border-[#262626]/20 dark:border-[#262626] mb-8 overflow-x-auto pb-px">
          <button className="pb-4 px-2 border-b-2 border-slate-900 dark:border-slate-100 text-sm font-bold uppercase tracking-wider whitespace-nowrap">
            All APIs
          </button>
          <button className="pb-4 px-2 border-b-2 border-transparent text-slate-500 text-sm font-bold uppercase tracking-wider hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap">
            AI / ML
          </button>
          <button className="pb-4 px-2 border-b-2 border-transparent text-slate-500 text-sm font-bold uppercase tracking-wider hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap">
            Computing
          </button>
          <button className="pb-4 px-2 border-b-2 border-transparent text-slate-500 text-sm font-bold uppercase tracking-wider hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap">
            Storage
          </button>
          <button className="pb-4 px-2 border-b-2 border-transparent text-slate-500 text-sm font-bold uppercase tracking-wider hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap">
            Security
          </button>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {apiProviders.map((provider) => (
            <div key={provider.id} className="bg-white dark:bg-[#262626]/20 border border-[#262626]/10 dark:border-[#262626] p-8 rounded-xl flex flex-col justify-between group hover:border-slate-900 dark:hover:border-slate-500 transition-all">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black mb-1 uppercase tracking-tight">{provider.name}</h3>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">{provider.description}</p>
                  </div>
                  {provider.popular && (
                    <Badge className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-0 text-[10px] font-bold uppercase tracking-widest">
                      Popular
                    </Badge>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-slate-500" />
                    <span className="font-mono">{provider.pricing}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="font-mono">{provider.contextWindow} context</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="size-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{provider.status}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {provider.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-slate-900 dark:text-slate-100 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-[#262626]/10 dark:border-[#262626]/40">
                <Button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold uppercase tracking-widest hover:opacity-90 transition-opacity" asChild>
                  <Link href={`/api-marketplace/${provider.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full border-[#262626]/20 dark:border-[#262626]/40 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-[#262626]/5" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Official Docs
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-8 rounded-2xl flex items-center gap-6 border border-slate-800 dark:border-slate-200">
          <div className="size-12 flex-shrink-0 bg-white/10 dark:bg-black/10 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Security & Compliance</h3>
            <p className="text-slate-300 dark:text-slate-600 text-sm leading-relaxed">
              All listed providers meet enterprise security standards. API keys are encrypted at rest and in transit. Review our security guide before deployment.
            </p>
          </div>
          <Button variant="outline" className="hidden lg:block border border-white dark:border-slate-900 px-6 py-2 rounded-full font-bold hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white transition-all" asChild>
            <Link href="/security">Security Guide</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

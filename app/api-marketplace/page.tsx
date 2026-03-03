import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, ExternalLink, Zap } from 'lucide-react'
import Link from 'next/link'

const apiProviders = [
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '🤖',
    description: 'GPT-4, GPT-5, DALL-E, Whisper',
    pricing: '$0.03 / 1K tokens',
    contextWindow: '128K',
    features: ['Best for code', 'Fast response', 'Function calling', 'Vision support'],
    affiliateLink: 'https://platform.openai.com/signup?ref=clawlist',
    commission: '5%',
    popular: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logo: '🧠',
    description: 'Claude Opus, Sonnet, Haiku',
    pricing: '$0.015 / 1K tokens',
    contextWindow: '200K',
    features: ['Best for reasoning', 'Long context', 'Safe outputs', 'Artifacts'],
    affiliateLink: 'https://console.anthropic.com/signup?ref=clawlist',
    commission: '5%',
    popular: true
  },
  {
    id: 'google',
    name: 'Google AI',
    logo: '🔷',
    description: 'Gemini Pro, Flash, Ultra',
    pricing: '$0.001 / 1K tokens',
    contextWindow: '1M',
    features: ['Cheapest option', 'Huge context', 'Multimodal', 'Fast'],
    affiliateLink: 'https://ai.google.dev/?ref=clawlist',
    commission: '3%',
    popular: false
  },
  {
    id: 'together',
    name: 'Together AI',
    logo: '⚡',
    description: 'Open-source models (Llama, Mixtral)',
    pricing: '$0.0002 / 1K tokens',
    contextWindow: '32K',
    features: ['Ultra cheap', 'Open models', 'Fast inference', 'No rate limits'],
    affiliateLink: 'https://together.ai/signup?ref=clawlist',
    commission: '10%',
    popular: false
  },
]

export default function APIMarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">API Marketplace</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Compare AI API providers and get started with the best option for your needs.
          <span className="text-sm block mt-2">
            💡 Using our affiliate links helps support ClawList development
          </span>
        </p>
      </div>

      {/* Quick Comparison Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Comparison</CardTitle>
          <CardDescription>At a glance comparison of major providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Provider</th>
                  <th className="text-left py-3 px-4">Best For</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Context</th>
                  <th className="text-left py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {apiProviders.map((provider) => (
                  <tr key={provider.id} className="border-b">
                    <td className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{provider.logo}</span>
                        {provider.name}
                        {provider.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">{provider.features[0]}</td>
                    <td className="py-3 px-4">{provider.pricing}</td>
                    <td className="py-3 px-4">{provider.contextWindow}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" asChild>
                        <a href={provider.affiliateLink} target="_blank" rel="noopener noreferrer">
                          Sign Up <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {apiProviders.map((provider) => (
          <Card key={provider.id} className={provider.popular ? 'border-blue-200 dark:border-blue-900' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{provider.logo}</span>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {provider.name}
                      {provider.popular && (
                        <Badge variant="default" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{provider.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pricing */}
              <div>
                <p className="text-2xl font-bold">{provider.pricing}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Context: {provider.contextWindow}
                </p>
              </div>

              {/* Features */}
              <div>
                <p className="font-semibold mb-2">Features</p>
                <ul className="space-y-1">
                  {provider.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button className="w-full" asChild>
                  <a href={provider.affiliateLink} target="_blank" rel="noopener noreferrer">
                    Get Started <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="text-xs text-center text-neutral-500 mt-2">
                  We earn {provider.commission} commission at no extra cost to you
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost Calculator */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Cost Calculator</CardTitle>
          <CardDescription>Estimate your monthly API costs</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Coming soon: Interactive calculator to estimate costs based on your usage
          </p>
        </CardContent>
      </Card>

      {/* Integration Guide */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Integration Guide</CardTitle>
          <CardDescription>How to use these APIs with OpenClaw</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Get your API key</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Sign up with a provider above and generate an API key from their dashboard
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Add to OpenClaw config</h3>
            <pre className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded text-xs overflow-x-auto">
{`# ~/.openclaw/openclaw.json
{
  "models": {
    "default": "openai/gpt-4",
    "apiKeys": {
      "openai": "sk-...",
      "anthropic": "sk-ant-...",
      "google": "AIza..."
    }
  }
}`}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Start using</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              OpenClaw will automatically use your configured API keys
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FAQ } from '@/components/faq'
import { Shield } from 'lucide-react'
import { getFeaturedSkills } from '@/lib/skills'

const featuredSkillImages = [
  '/images/homepage/skill-kernel.png',
  '/images/homepage/skill-interface.png',
  '/images/homepage/skill-neural.png',
]

const quickLinks = [
  {
    eyebrow: '1',
    title: 'Browse Skills',
    description:
      'Explore real skill pages with working slugs, risk labels, and install commands.',
    href: '/skills',
  },
  {
    eyebrow: '2',
    title: 'Read Guides',
    description:
      'Go from idea to implementation with practical tutorials and technical walkthroughs.',
    href: '/guides',
  },
  {
    eyebrow: '3',
    title: 'Use Recipes',
    description:
      'Start from ready-made workflows when you want a faster path to a working setup.',
    href: '/recipes',
  },
]

export default async function Home() {
  const featuredSkills = await getFeaturedSkills(3)
  const faqItems = [
    {
      question: 'What is OpenClaw?',
      answer: 'OpenClaw is a powerful automation framework that enables developers to build intelligent workflows, integrate AI models, and automate complex tasks with minimal code.',
    },
    {
      question: 'How do I install OpenClaw skills?',
      answer: 'Skills can be installed using the command line with `npx skills add <skill-name>`. Each skill page provides the exact installation command you need.',
    },
    {
      question: 'Are OpenClaw skills safe to use?',
      answer: 'All skills in our library are reviewed for security. Each skill displays its required permissions and risk level. We recommend reviewing permissions before installation and following the principle of least privilege.',
    },
    {
      question: 'Can I contribute my own skills?',
      answer: 'Yes! We welcome community contributions. Visit our GitHub repository to submit your skills or check our contribution guidelines on the documentation page.',
    },
    {
      question: 'Which AI models does OpenClaw support?',
      answer: 'OpenClaw supports multiple AI providers including OpenAI, Anthropic Claude, Google Gemini, and local models. Check our Models page for a complete comparison and selection guide.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7] dark:bg-[#191919]">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] mx-auto py-20 lg:py-32 px-8 lg:px-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge className="inline-block px-3 py-1 bg-slate-200 dark:bg-[#262626] text-[10px] font-black uppercase tracking-widest rounded-full w-fit border-0">
                OpenClaw Resource Hub
              </Badge>
              <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter">
                Find the best OpenClaw skills faster.
              </h1>
              <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                Discover trusted skills, step-by-step guides, and ready-to-use
                recipes in one fast, searchable library.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" className="bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all shadow-xl dark:shadow-none" asChild>
                <Link href="/skills">Browse Skills</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 dark:border-[#262626] px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-100 dark:hover:bg-[#262626] transition-all" asChild>
                <Link href="/guides">Read Guides</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/homepage/hero.png"
              alt="ClawList Developer Workspace"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="w-full max-w-[1200px] mx-auto py-16 px-8 lg:px-40">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Start Here</h2>
            <p className="text-slate-500 dark:text-slate-400">Jump into the part of the library that matches what you need right now.</p>
          </div>
          <div className="h-[1px] flex-1 mx-8 bg-slate-200 dark:bg-[#262626] hidden lg:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-8 bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-3xl hover:border-slate-400 dark:hover:border-slate-400 transition-all duration-300"
            >
              <div className="size-12 rounded-full border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center mb-6 group-hover:bg-slate-900 dark:group-hover:bg-slate-100 transition-colors">
                <span className="text-xl font-black group-hover:text-white dark:group-hover:text-black">
                  {item.eyebrow}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Skills */}
      <section className="w-full max-w-[1200px] mx-auto py-16 px-8 lg:px-40">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Skills</h2>
            <p className="text-slate-500 dark:text-slate-400">Real entries from the library, surfaced from the current catalog instead of placeholder slugs.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSkills.map((skill, index) => (
            <div key={skill.slug} className="flex flex-col bg-slate-100 dark:bg-[#262626]/20 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#262626] shadow-sm">
              <div className="h-48 relative">
                <Image
                  src={featuredSkillImages[index % featuredSkillImages.length]}
                  alt={skill.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {skill.risk_level === 'low'
                    ? 'Low Risk'
                    : skill.risk_level === 'medium'
                      ? 'Medium'
                      : 'High Risk'}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                {skill.category && (
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    {skill.category}
                  </p>
                )}
                <h4 className="text-xl font-bold">{skill.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 min-h-16">
                  {skill.summary}
                </p>
                <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  {skill.upvotes} upvotes
                </p>
                <Link href={`/skills/${skill.slug}`} className="text-sm font-bold underline underline-offset-4 hover:opacity-70">
                  View Skill
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
            <h3 className="text-2xl font-bold mb-2">Compare Faster, Install Safer</h3>
            <p className="text-slate-300 dark:text-slate-600 leading-relaxed max-w-2xl">
              ClawList is built to help you evaluate tools before you install
              them. Start with skills, jump into related guides, and use recipes
              when you want a working workflow instead of a blank slate.
            </p>
          </div>
          <Button variant="outline" className="hidden lg:block border border-white dark:border-slate-900 px-6 py-2 rounded-full font-bold hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white transition-all" asChild>
            <Link href="/compare">Compare Tools</Link>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        items={faqItems}
        description="Everything you need to know about OpenClaw and ClawList."
      />
    </div>
  )
}

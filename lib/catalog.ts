import catalogExtensionsData from '@/data/catalog-extensions.json'

export type GuideItem = {
  id: number
  slug: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate'
  readTime: string
}

export type RecipeItem = {
  id: number
  slug: string
  title: string
  summary: string
  role_type: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  skills_count: number
  risk_level: 'low' | 'medium' | 'high'
  estimatedTime?: string
}

export type FallbackSkill = {
  id: string
  name: string
  slug: string
  summary: string
  description: string
  risk_level: 'low' | 'medium' | 'high'
  install_cmd: string
  permissions: string[]
  tags: string[]
  upvotes: number
  github_url?: string
  stars?: number
  views?: number
  category?: string
  openclaw_version_range?: string
  features?: string[]
  use_cases?: string[]
}

type CatalogExtensions = {
  guides: GuideItem[]
  recipes: RecipeItem[]
  skills: FallbackSkill[]
}

const catalogExtensions = catalogExtensionsData as CatalogExtensions

function mergeBySlug<T extends { slug: string }>(baseItems: T[], extensionItems: T[]) {
  const items = new Map<string, T>()

  for (const item of baseItems) {
    items.set(item.slug, item)
  }

  for (const item of extensionItems) {
    items.set(item.slug, item)
  }

  return Array.from(items.values())
}

const baseGuides: GuideItem[] = [
  {
    id: 1,
    slug: 'parallel-processing-v2',
    title: 'Optimizing Parallel Processing with Core Engine V2',
    description: 'Explore how to maximize throughput and minimize latency using the redesigned scheduler in OpenClaw 2.0. This guide covers worker pools and async task orchestration.',
    category: 'Performance',
    difficulty: 'intermediate',
    readTime: '12 min',
  },
  {
    id: 2,
    slug: 'custom-hooks-state',
    title: 'Custom Hook Implementation for State Management',
    description: 'A practical look at building reusable logic hooks that interface directly with the OpenClaw telemetry API for real-time monitoring components.',
    category: 'Development',
    difficulty: 'intermediate',
    readTime: '8 min',
  },
  {
    id: 3,
    slug: 'hello-world-module',
    title: 'Hello World: Your First OpenClaw Module',
    description: 'Everything you need to know to get started. From environment setup to deploying your first functional script in under 5 minutes.',
    category: 'Getting Started',
    difficulty: 'beginner',
    readTime: '5 min',
  },
  {
    id: 4,
    slug: 'macos-local-deploy',
    title: 'macOS Local Deployment',
    description: 'Quick OpenClaw deployment on macOS with step-by-step instructions for local development environment setup.',
    category: 'Deployment',
    difficulty: 'beginner',
    readTime: '15 min',
  },
  {
    id: 5,
    slug: 'vps-cloud-deploy',
    title: 'VPS Cloud Deployment',
    description: 'Deploy OpenClaw on cloud servers with security best practices, SSL configuration, and production-ready setup.',
    category: 'Deployment',
    difficulty: 'intermediate',
    readTime: '30 min',
  },
  {
    id: 6,
    slug: 'telegram-integration',
    title: 'Telegram Integration',
    description: 'Connect OpenClaw to Telegram Bot for seamless messaging and command execution through Telegram.',
    category: 'Integration',
    difficulty: 'beginner',
    readTime: '10 min',
  },
  {
    id: 7,
    slug: 'ai-personal-podcast-pipeline',
    title: 'Build Your Own AI-Powered Personal Podcast',
    description: 'Create a fully automated daily podcast in your own cloned voice. Three AI agents collect, fact-check, and narrate the news you care about — delivered every morning without any manual work.',
    category: 'Automation',
    difficulty: 'intermediate',
    readTime: '15 min',
  },
  {
    id: 8,
    slug: 'claude-code-beginner-guide',
    title: 'Claude Code for Complete Beginners: Install in 3 Minutes, No Coding Required',
    description: 'A step-by-step guide to installing Claude Code on Mac, Windows, and Linux. No programming background needed — just copy, paste, and follow along.',
    category: 'Getting Started',
    difficulty: 'beginner',
    readTime: '8 min',
  },
]

const baseRecipes: RecipeItem[] = [
  {
    id: 1,
    slug: 'programmer',
    title: 'Developer Assistant',
    summary: 'Code review, bug fixes, documentation',
    role_type: 'Development',
    difficulty: 'intermediate',
    skills_count: 5,
    risk_level: 'medium',
  },
  {
    id: 2,
    slug: 'marketing-ops',
    title: 'Marketing Ops',
    summary: 'Content creation, email marketing, analytics',
    role_type: 'Operations',
    difficulty: 'beginner',
    skills_count: 4,
    risk_level: 'low',
  },
  {
    id: 3,
    slug: 'ecommerce-assistant',
    title: 'E-commerce Assistant',
    summary: 'Product optimization, customer service, orders',
    role_type: 'E-commerce',
    difficulty: 'intermediate',
    skills_count: 6,
    risk_level: 'medium',
  },
]

const baseFallbackSkills: FallbackSkill[] = [
  {
    id: 'gh-issues',
    name: 'GitHub Issues',
    slug: 'github-issues',
    summary: 'Auto-handle GitHub issues and submit PRs',
    description: 'Automatically triage issues, generate fixes, and open pull requests. Integrates with GitHub API to monitor issues, analyze code, and submit automated fixes.',
    risk_level: 'low',
    install_cmd: 'npx skills add gh-issues',
    permissions: ['GitHub repository access', 'Read/write local workspace'],
    tags: ['github', 'automation', 'coding'],
    upvotes: 128,
    github_url: 'https://github.com/openclaw/skill-github-issues',
    stars: 342,
    category: 'Development',
    openclaw_version_range: '>=2026.1.0',
    features: [
      'Automatic issue triage and labeling',
      'Smart PR generation with fixes',
      'Code analysis and suggestions',
      'Integration with CI/CD pipelines'
    ],
    use_cases: [
      'Automate bug fix workflows',
      'Reduce manual issue management',
      'Speed up code review process'
    ]
  },
  {
    id: 'gh-automation',
    name: 'GitHub Automation',
    slug: 'github-automation',
    summary: 'Complete GitHub workflow automation',
    description: 'Automate GitHub workflows including issue management, PR reviews, release notes, and repository maintenance. Supports custom actions and integrations with full GitHub API coverage.',
    risk_level: 'medium',
    install_cmd: 'npx skills add github-automation',
    permissions: ['GitHub API access', 'Repository write access', 'Actions workflow'],
    tags: ['github', 'automation', 'devops', 'ci-cd'],
    upvotes: 245,
    github_url: 'https://github.com/openclaw/skill-github-automation',
    stars: 567,
    category: 'DevOps',
    openclaw_version_range: '>=2026.2.0',
    features: [
      'Automated PR reviews and approvals',
      'Release note generation',
      'Repository health monitoring',
      'Custom GitHub Actions integration',
      'Branch protection automation'
    ],
    use_cases: [
      'Streamline release management',
      'Enforce code quality standards',
      'Automate repository maintenance'
    ]
  },
  {
    id: 'agent-browser',
    name: 'Browser Agent',
    slug: 'browser-agent',
    summary: 'Browser automation for testing and scraping',
    description: 'Navigate websites, fill forms, capture screenshots, and extract page data. Built on Playwright for reliable cross-browser automation.',
    risk_level: 'medium',
    install_cmd: 'npx skills add agent-browser',
    permissions: ['Browser control', 'Network access'],
    tags: ['browser', 'automation', 'testing'],
    upvotes: 97,
    github_url: 'https://github.com/openclaw/skill-browser-agent',
    stars: 423,
    category: 'Testing',
    openclaw_version_range: '>=2026.1.0',
    features: [
      'Cross-browser support (Chrome, Firefox, Safari)',
      'Screenshot and PDF generation',
      'Form filling and interaction',
      'Data extraction with selectors'
    ],
    use_cases: [
      'E2E testing automation',
      'Web scraping and monitoring',
      'Automated form submissions'
    ]
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    slug: 'email-marketing',
    summary: 'Automated email campaigns and CRM workflows',
    description: 'Build email sequences, segment users, and automate campaign operations. Integrates with major email providers and CRM platforms.',
    risk_level: 'low',
    install_cmd: 'npx skills add email-marketing',
    permissions: ['Email provider API access'],
    tags: ['marketing', 'crm', 'automation'],
    upvotes: 76,
    github_url: 'https://github.com/openclaw/skill-email-marketing',
    stars: 189,
    category: 'Marketing',
    openclaw_version_range: '>=2026.1.0',
    features: [
      'Email sequence automation',
      'User segmentation and targeting',
      'A/B testing support',
      'Analytics and reporting'
    ],
    use_cases: [
      'Drip campaign automation',
      'Lead nurturing workflows',
      'Customer onboarding emails'
    ]
  },
  {
    id: 'slack-bot',
    name: 'Slack Bot',
    slug: 'slack-bot',
    summary: 'Intelligent Slack bot for team automation',
    description: 'Create custom Slack bots that respond to messages, automate workflows, and integrate with external services. Supports slash commands, interactive messages, and event subscriptions.',
    risk_level: 'low',
    install_cmd: 'npx skills add slack-bot',
    permissions: ['Slack API access', 'Channel read/write'],
    tags: ['slack', 'communication', 'automation'],
    upvotes: 189,
    github_url: 'https://github.com/openclaw/skill-slack-bot',
    stars: 512,
    category: 'Communication',
    openclaw_version_range: '>=2026.1.0',
    features: [
      'Custom slash commands',
      'Interactive message buttons',
      'Event-driven automation',
      'External service integrations'
    ],
    use_cases: [
      'Team standup automation',
      'Incident response workflows',
      'Knowledge base queries'
    ]
  },
  {
    id: 'data-scraper',
    name: 'Data Scraper',
    slug: 'data-scraper',
    summary: 'Extract structured data from websites',
    description: 'Scrape data from websites with custom selectors, handle pagination, and export to various formats. Supports JavaScript-rendered pages and rate limiting.',
    risk_level: 'medium',
    install_cmd: 'npx skills add data-scraper',
    permissions: ['Network access', 'File system write'],
    tags: ['scraping', 'data', 'automation'],
    upvotes: 156,
    github_url: 'https://github.com/openclaw/skill-data-scraper',
    stars: 378,
    category: 'Data',
    openclaw_version_range: '>=2026.1.0',
    features: [
      'CSS and XPath selectors',
      'Pagination handling',
      'Export to JSON, CSV, Excel',
      'Proxy and rate limiting support'
    ],
    use_cases: [
      'Competitive analysis',
      'Price monitoring',
      'Content aggregation'
    ]
  },
  {
    id: 'twitter-bot',
    name: 'Twitter Bot',
    slug: 'twitter-bot',
    summary: 'Automated Twitter posting and engagement',
    description: 'Schedule tweets, auto-reply to mentions, track keywords, and analyze engagement metrics. Full Twitter API v2 support.',
    risk_level: 'medium',
    install_cmd: 'npx skills add twitter-bot',
    permissions: ['Twitter API access', 'Tweet read/write'],
    tags: ['twitter', 'social-media', 'automation'],
    upvotes: 203,
    github_url: 'https://github.com/openclaw/skill-twitter-bot',
    stars: 445,
    category: 'Social Media',
    openclaw_version_range: '>=2026.2.0',
    features: [
      'Scheduled tweet posting',
      'Auto-reply to mentions',
      'Keyword tracking and alerts',
      'Engagement analytics'
    ],
    use_cases: [
      'Brand monitoring',
      'Customer support automation',
      'Content distribution'
    ]
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    slug: 'code-reviewer',
    summary: 'Automated code review and quality checks',
    description: 'Review pull requests, check code quality, suggest improvements, and enforce coding standards. Integrates with GitHub, GitLab, and Bitbucket.',
    risk_level: 'low',
    install_cmd: 'npx skills add code-reviewer',
    permissions: ['Repository read access', 'PR comment access'],
    tags: ['code-review', 'quality', 'development'],
    upvotes: 312,
    github_url: 'https://github.com/openclaw/skill-code-reviewer',
    stars: 689,
    category: 'Development',
    openclaw_version_range: '>=2026.2.0',
    features: [
      'Automated PR reviews',
      'Code quality scoring',
      'Security vulnerability detection',
      'Style guide enforcement'
    ],
    use_cases: [
      'Maintain code quality standards',
      'Reduce manual review time',
      'Catch bugs early'
    ]
  },
  {
    id: 'seo-optimizer',
    name: 'SEO Optimizer',
    slug: 'seo-optimizer',
    summary: 'Automated SEO analysis and optimization',
    description: 'Analyze website SEO, generate meta tags, optimize content, and track rankings. Supports Google Search Console and Analytics integration.',
    risk_level: 'low',
    install_cmd: 'npx skills add seo-optimizer',
    permissions: ['Website access', 'Analytics API'],
    tags: ['seo', 'marketing', 'analytics'],
    upvotes: 134,
    github_url: 'https://github.com/openclaw/skill-seo-optimizer',
    stars: 267,
    category: 'Marketing',
    openclaw_version_range: '>=2026.1.0',
    features: [
      'On-page SEO analysis',
      'Meta tag generation',
      'Keyword research',
      'Ranking tracking'
    ],
    use_cases: [
      'Improve search rankings',
      'Content optimization',
      'Competitor analysis'
    ]
  },
]

export const guides = mergeBySlug(baseGuides, catalogExtensions.guides)

export const recipes = mergeBySlug(baseRecipes, catalogExtensions.recipes)

export const fallbackSkills = mergeBySlug(baseFallbackSkills, catalogExtensions.skills)

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug)
}

export function getFallbackSkillBySlug(slug: string) {
  return fallbackSkills.find((skill) => skill.slug === slug)
}

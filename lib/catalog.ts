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
  difficulty: 'beginner' | 'intermediate'
  skills_count: number
  risk_level: 'low' | 'medium' | 'high'
}

export const guides: GuideItem[] = [
  {
    id: 1,
    slug: 'macos-local-deploy',
    title: 'macOS Local Deployment',
    description: 'Quick OpenClaw deployment on macOS',
    category: 'Local Deployment',
    difficulty: 'beginner',
    readTime: '15 min',
  },
  {
    id: 2,
    slug: 'vps-cloud-deploy',
    title: 'VPS Cloud Deployment',
    description: 'Deploy OpenClaw on cloud servers with security',
    category: 'Cloud Deployment',
    difficulty: 'intermediate',
    readTime: '30 min',
  },
  {
    id: 3,
    slug: 'telegram-integration',
    title: 'Telegram Integration',
    description: 'Connect OpenClaw to Telegram Bot',
    category: 'Integration',
    difficulty: 'beginner',
    readTime: '10 min',
  },
]

export const recipes: RecipeItem[] = [
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

export const fallbackSkills = [
  {
    id: 'gh-issues',
    name: 'GitHub Issues',
    slug: 'github-issues',
    summary: 'Auto-handle GitHub issues and submit PRs',
    description: 'Automatically triage issues, generate fixes, and open pull requests.',
    risk_level: 'low',
    install_cmd: 'npx skills add gh-issues',
    permissions: ['GitHub repository access', 'Read/write local workspace'],
    tags: ['github', 'automation', 'coding'],
    upvotes: 128,
  },
  {
    id: 'agent-browser',
    name: 'Browser Agent',
    slug: 'browser-agent',
    summary: 'Browser automation for testing and scraping',
    description: 'Navigate websites, fill forms, capture screenshots, and extract page data.',
    risk_level: 'medium',
    install_cmd: 'npx skills add agent-browser',
    permissions: ['Browser control', 'Network access'],
    tags: ['browser', 'automation', 'testing'],
    upvotes: 97,
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    slug: 'email-marketing',
    summary: 'Automated email campaigns and CRM workflows',
    description: 'Build email sequences, segment users, and automate campaign operations.',
    risk_level: 'low',
    install_cmd: 'npx skills add email-marketing',
    permissions: ['Email provider API access'],
    tags: ['marketing', 'crm', 'automation'],
    upvotes: 76,
  },
]

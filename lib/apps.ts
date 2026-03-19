export type AppSegment =
  | 'Coding Agents'
  | 'Productivity'
  | 'Creative'
  | 'Entertainment'

export type AppDirectoryEntry = {
  slug: string
  name: string
  summary: string
  segment: AppSegment
  signal:
    | 'Core pick'
    | 'Watch'
    | 'Self-hosted'
    | 'Creative tool'
    | 'Community favorite'
  labels: string[]
  relatedHref: string
  relatedLabel: string
  featured?: boolean
  watch?: boolean
}

export const appSegments: AppSegment[] = [
  'Coding Agents',
  'Productivity',
  'Creative',
  'Entertainment',
]

export const appDirectory: AppDirectoryEntry[] = [
  {
    slug: 'openclaw',
    name: 'OpenClaw',
    summary:
      'Action-oriented agent setup for workflows that need tools, memory, and multi-step execution.',
    segment: 'Productivity',
    signal: 'Core pick',
    labels: ['Personal Agents', 'Workflow Automation'],
    relatedHref: '/topics/ai-agent-workflows',
    relatedLabel: 'AI Agent Workflows',
    featured: true,
  },
  {
    slug: 'claude-code',
    name: 'Claude Code',
    summary:
      'Terminal-first coding agent for repository work, debugging, and iterative code changes.',
    segment: 'Coding Agents',
    signal: 'Core pick',
    labels: ['CLI Agents', 'Coding'],
    relatedHref: '/topics/claude-code',
    relatedLabel: 'Claude Code Topic',
    featured: true,
  },
  {
    slug: 'cline',
    name: 'Cline',
    summary:
      'In-editor autonomous coding assistant designed for long edit loops and tool-heavy development sessions.',
    segment: 'Coding Agents',
    signal: 'Core pick',
    labels: ['IDE Extensions', 'Coding'],
    relatedHref: '/topics/claude-code',
    relatedLabel: 'Coding Agent Topic',
    featured: true,
  },
  {
    slug: 'open-webui',
    name: 'Open WebUI',
    summary:
      'Self-hosted interface for teams that want tighter control over model access and internal workflows.',
    segment: 'Productivity',
    signal: 'Self-hosted',
    labels: ['General Chat', 'Self-hosted'],
    relatedHref: '/topics/ai-agent-workflows',
    relatedLabel: 'AI Agent Workflows',
    featured: true,
  },
  {
    slug: 'kilo-code',
    name: 'Kilo Code',
    summary:
      'VS Code-oriented coding agent focused on fast in-editor generation and edit loops.',
    segment: 'Coding Agents',
    signal: 'Watch',
    labels: ['IDE Extensions', 'CLI Agents'],
    relatedHref: '/topics/claude-code',
    relatedLabel: 'Coding Agent Topic',
    watch: true,
  },
  {
    slug: 'roo-code',
    name: 'Roo Code',
    summary:
      'Multi-agent coding workspace inside the editor for teams that want a broader coding surface area.',
    segment: 'Coding Agents',
    signal: 'Watch',
    labels: ['IDE Extensions', 'Cloud Agents'],
    relatedHref: '/topics/claude-code',
    relatedLabel: 'Coding Agent Topic',
    watch: true,
  },
  {
    slug: 'openhands',
    name: 'OpenHands',
    summary:
      'Autonomous coding agent that can plan, run commands, browse, and work through larger engineering tasks.',
    segment: 'Coding Agents',
    signal: 'Watch',
    labels: ['CLI Agents', 'Autonomous Agents'],
    relatedHref: '/topics/ai-agent-workflows',
    relatedLabel: 'AI Agent Workflows',
    watch: true,
  },
  {
    slug: 'hermes-agent',
    name: 'Hermes Agent',
    summary:
      'General-purpose agent workspace aimed at personal task execution and always-on assistant workflows.',
    segment: 'Productivity',
    signal: 'Watch',
    labels: ['Personal Agents', 'Always-on'],
    relatedHref: '/topics/ai-agent-workflows',
    relatedLabel: 'AI Agent Workflows',
    watch: true,
  },
  {
    slug: 'descript',
    name: 'Descript',
    summary:
      'AI-assisted video and podcast editor for teams shipping audio and visual content quickly.',
    segment: 'Creative',
    signal: 'Creative tool',
    labels: ['Video Editing', 'Podcasting'],
    relatedHref: '/blog',
    relatedLabel: 'Related Blog Posts',
    featured: true,
  },
  {
    slug: 'vidmuse',
    name: 'VidMuse',
    summary:
      'Creative app focused on turning audio and prompts into music videos, shorts, and social assets.',
    segment: 'Creative',
    signal: 'Watch',
    labels: ['Video Generation', 'Short-form'],
    relatedHref: '/blog',
    relatedLabel: 'Related Blog Posts',
  },
  {
    slug: 'novelcrafter',
    name: 'novelcrafter',
    summary:
      'Long-form writing workspace for authors planning, drafting, and iterating on story structure.',
    segment: 'Creative',
    signal: 'Creative tool',
    labels: ['Writing', 'Long-form'],
    relatedHref: '/blog',
    relatedLabel: 'Related Blog Posts',
  },
  {
    slug: 'janitor-ai',
    name: 'Janitor AI',
    summary:
      'Character chat platform with strong community usage in entertainment-oriented AI experiences.',
    segment: 'Entertainment',
    signal: 'Community favorite',
    labels: ['Roleplay', 'Character Chat'],
    relatedHref: '/blog',
    relatedLabel: 'Related Blog Posts',
    featured: true,
  },
  {
    slug: 'sillytavern',
    name: 'SillyTavern',
    summary:
      'Power-user frontend for roleplay and experimental chat setups with heavy prompt customization.',
    segment: 'Entertainment',
    signal: 'Community favorite',
    labels: ['Roleplay', 'Frontend'],
    relatedHref: '/blog',
    relatedLabel: 'Related Blog Posts',
  },
  {
    slug: 'isekai-zero',
    name: 'ISEKAI ZERO',
    summary:
      'AI entertainment experience built around character-led adventures and game-like narrative sessions.',
    segment: 'Entertainment',
    signal: 'Watch',
    labels: ['Entertainment', 'Narrative'],
    relatedHref: '/blog',
    relatedLabel: 'Related Blog Posts',
  },
]

export function getFeaturedApps() {
  return appDirectory.filter((app) => app.featured)
}

export function getWatchlistApps() {
  return appDirectory.filter((app) => app.watch)
}

export function getAppsBySegment(segment: AppSegment) {
  return appDirectory.filter((app) => app.segment === segment)
}

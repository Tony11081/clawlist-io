interface SeoOverride {
  title: string
  description: string
  canonicalPath?: string
  note?: {
    title: string
    description: string
    href: string
    label: string
  }
}

const blogSeoOverrides: Record<string, SeoOverride> = {
  'quick-configuration-for-claude-agent-sdk-integration': {
    title: 'Claude Agent SDK Quick Setup Guide',
    description:
      'Configure Claude Agent SDK in 5 minutes. Covers base URL, environment variables, and common errors with working code examples.',
  },
  'openclaw-agent-system-prompt-architecture-9-layers': {
    title: 'OpenClaw 9-Layer System Prompt Architecture Explained',
    description:
      'Why your AI agent needs layered prompts. Deep dive into OpenClaw\'s 9-layer architecture with design rationale and implementation code.',
  },
  'openclaw-node-tutorial': {
    title: 'OpenClaw Node.js Tutorial: Build Your First AI Agent',
    description:
      'Step-by-step guide to building an AI agent with OpenClaw and Node.js. From installation to your first working skill.',
  },
  'whatsapp-scheduling-ai-agent-with-google-calendar': {
    title: 'Build a WhatsApp AI Scheduler with Google Calendar',
    description:
      'Automate WhatsApp scheduling with an AI agent connected to Google Calendar. Full setup guide with code and deployment steps.',
  },
  'zhipu-s-2025-summary-going-global-with-ai-products': {
    title: 'Zhipu AI 2025: Going Global with AutoClaw & AI Products',
    description:
      'Zhipu\'s 2025 strategy breakdown: global expansion, AutoClaw launch, and what it means for the AI agent ecosystem.',
  },
  'openclaw-9-layer-system-prompt-architecture': {
    title: 'OpenClaw System Prompt: 9-Layer Design Pattern for AI Agents',
    description:
      'The complete 9-layer system prompt pattern used by OpenClaw. Includes bootstrap protocol, memory management, and skill loading architecture.',
    canonicalPath: '/blog/openclaw-agent-system-prompt-architecture-9-layers',
    note: {
      title: 'Primary reference page',
      description:
        'We keep one main article for the full 9-layer architecture so rankings and internal links stay focused.',
      href: '/blog/openclaw-agent-system-prompt-architecture-9-layers',
      label: 'Read the main architecture breakdown',
    },
  },
  'building-image-generation-skills-for-ai-agents': {
    title: 'How to Build Image Generation Skills for AI Agents (Tutorial)',
    description:
      'Add image generation capability to your AI agent. Skill template with provider integration and practical code examples.',
  },
  'similarweb-and-semrush-integration-with-ai-tools': {
    title: 'SimilarWeb vs Semrush for AI Tools',
    description:
      'A practical comparison of SimilarWeb and Semrush integrations for AI workflows, including strengths, limits, and use cases.',
  },
  'ai-short-video-factory': {
    title: 'AI Short Video Factory: Shorts Automation Workflow',
    description:
      'Automate short video production from scriptwriting to final export with batch workflows for AI-generated shorts.',
  },
  'using-linear-as-ai-task-management-hub': {
    title: 'Linear as an AI Task Hub for Agent Workflows',
    description:
      'How to use Linear as a central task hub for AI agents, PR workflows, status tracking, and execution handoffs.',
  },
  'claude-code-ai-can-now-work-independently': {
    title: 'Claude Code Can Now Work Independently',
    description:
      'What changed in Claude Code, how independent execution works, and where autonomous workflows fit best.',
  },
  'codex-monitor-agent-orchestration-demo': {
    title: 'Codex Monitor Multi-Agent Orchestration Demo',
    description:
      'See how Codex Monitor coordinates multiple agents with prompt-based orchestration and parallel task execution.',
  },
  'building-workany-a-week-of-vibe-coding-with-claude-agent-sdk': {
    title: 'Building WorkAny with Claude Agent SDK in 1 Week',
    description:
      'A rapid build story showing how Claude Agent SDK and Tauri were used to ship WorkAny in a single week.',
  },
  'manus-integration-enables-long-task-capability-in-claude-code': {
    title: 'Manus + Claude Code: Run Long AI Tasks Without Timeout',
    description:
      'Break Claude Code\'s task duration limits. Learn how Manus integration enables persistent long-running AI agent workflows.',
  },
  'obsidian-ceo-creates-claude-skills': {
    title: 'Obsidian CEO Builds Claude Skills',
    description:
      'Why the Obsidian CEO built Claude Skills directly, and what it reveals about real-world skill design.',
  },
}

const skillSeoOverrides: Record<string, SeoOverride> = {
  'union-search': {
    title: 'Union Search: Multi-Source AI Search Aggregator',
    description:
      'One skill to search across multiple sources simultaneously. Union Search aggregates results from web, docs, and APIs for AI agents.',
  },
  'rtk': {
    title: 'RTK: Real-Time Knowledge Retrieval for AI Agents',
    description:
      'Give your AI agent real-time knowledge access. RTK skill handles web search, extraction, and structured data retrieval.',
  },
}

function normalizeDescription(value: string) {
  const cleaned = value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (cleaned.length <= 160) {
    return cleaned
  }

  return `${cleaned.slice(0, 157).trimEnd()}...`
}

export function resolveBlogSeo(slug: string, title: string, description: string) {
  const override = blogSeoOverrides[slug]

  return {
    title: override?.title ?? title,
    description: normalizeDescription(override?.description ?? description),
    canonicalPath: override?.canonicalPath,
    note: override?.note,
  }
}

export function resolveSkillSeo(slug: string, title: string, description: string) {
  const override = skillSeoOverrides[slug]

  return {
    title: override?.title ?? title,
    description: normalizeDescription(override?.description ?? description),
  }
}

export function resolveGuideSeo(title: string, description: string) {
  return {
    title,
    description: normalizeDescription(description),
  }
}

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
  'openclaw-agent-system-prompt-architecture-9-layers': {
    title: 'OpenClaw 9-Layer System Prompt Architecture',
    description:
      'See the 9 prompt layers OpenClaw sends to the LLM, from identity and tools to memory, hooks, and runtime context.',
  },
  'openclaw-node-tutorial': {
    title: 'OpenClaw Nodes Tutorial: Control Phones & IoT',
    description:
      'Learn how to use OpenClaw Nodes to control phones, Raspberry Pi, and IoT devices from one agent workflow.',
  },
  'whatsapp-scheduling-ai-agent-with-google-calendar': {
    title: 'WhatsApp Booking Agent with Google Calendar',
    description:
      'Build a WhatsApp scheduling agent that checks Google Calendar availability and books meetings automatically.',
  },
  'zhipu-s-2025-summary-going-global-with-ai-products': {
    title: 'Zhipu 2025 Global AI Product Expansion Lessons',
    description:
      'What Zhipu learned about taking AI products global in 2025, with practical lessons for teams expanding overseas.',
  },
  'openclaw-9-layer-system-prompt-architecture': {
    title: "Inside OpenClaw's 9-Layer System Prompt",
    description:
      "A practical breakdown of OpenClaw's 9-layer system prompt, including core instructions, tools, and dynamic context.",
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
    title: 'How to Build Image Generation Skills for AI Agents',
    description:
      'Step-by-step guide to building image generation skills for AI agents with composition patterns and API integration.',
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
    title: 'Claude Code + Manus for Long-Running Tasks',
    description:
      'How Manus extends Claude Code with longer-running task execution and more durable agent workflows.',
  },
  'obsidian-ceo-creates-claude-skills': {
    title: 'Obsidian CEO Builds Claude Skills',
    description:
      'Why the Obsidian CEO built Claude Skills directly, and what it reveals about real-world skill design.',
  },
}

const skillSeoOverrides: Record<string, SeoOverride> = {
  'union-search': {
    title: 'Union Search for OpenClaw: Search 30+ Sources',
    description:
      'Search Xiaohongshu, Douyin, Bilibili, YouTube, X, and 30+ sources from one OpenClaw skill.',
  },
  'rtk': {
    title: 'RTK for OpenClaw: Brew Install & Token Compression',
    description:
      'Install RTK with Homebrew and compress noisy CLI output to save 60-90% of tokens in AI coding workflows.',
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

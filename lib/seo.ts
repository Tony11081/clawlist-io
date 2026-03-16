interface SeoOverride {
  title: string
  description: string
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
}

const skillSeoOverrides: Record<string, SeoOverride> = {
  'union-search': {
    title: 'Union Search for OpenClaw: Search 30+ Sources',
    description:
      'Search Xiaohongshu, Douyin, Bilibili, YouTube, X, and 30+ sources from one OpenClaw skill.',
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

export type TopicContentLink = {
  href: string
  slug: string
  summary: string
  title: string
  type: 'blog' | 'skill'
}

export type TopicHubAction = {
  description: string
  href: string
  id: string
  label: string
}

export type TopicHubEditorialPick = {
  href: string
  label: string
  reason: string
}

export type TopicHubTimelineEntry = {
  date: string
  description: string
  title: string
}

export type TopicHubEditorial = {
  bestFirstRead: TopicHubEditorialPick
  bestSkillToTry: TopicHubEditorialPick
  timeline: TopicHubTimelineEntry[]
  whatChangedThisMonth: string[]
  whyItMattersNow: string
}

export type KeywordOwnershipEntry = {
  keyword: string
  note: string
  primaryPath: string
  searchIntent: string
  supportingPaths: string[]
}

export type TopicHub = {
  description: string
  editorial: TopicHubEditorial
  eyebrow: string
  highlights: string[]
  linkedPostSlugs: string[]
  nextSteps: TopicHubAction[]
  ownership: KeywordOwnershipEntry[]
  slug: string
  summary: string
  title: string
  featuredArticles: TopicContentLink[]
  featuredSkills: TopicContentLink[]
}

export const topicHubs: TopicHub[] = [
  {
    slug: 'system-prompt-architecture',
    eyebrow: 'Topic Hub',
    title: 'System Prompt Architecture',
    summary:
      'One place for the pages shaping how ClawList covers prompt architecture, layered agent instructions, and context design.',
    description:
      'This hub consolidates the system prompt architecture cluster so rankings, internal links, and follow-up CTA traffic all reinforce one primary narrative instead of splitting across lookalike pages.',
    highlights: [
      'Route every 9-layer query to one primary architecture breakdown.',
      'Use supporting posts for comparisons, implementation notes, and prompt design principles.',
      'Drive readers from architecture theory into installable memory and skills tooling.',
    ],
    editorial: {
      whyItMattersNow:
        'System prompts are becoming product architecture, not background configuration. Teams need to understand how identity, tools, memory, safety, and runtime context work together before they can trust autonomous agents with real tasks.',
      whatChangedThisMonth: [
        'The hub now treats the 9-layer OpenClaw breakdown as the canonical page for architecture queries.',
        'Supporting prompt-design articles are positioned as implementation notes instead of competing explainers.',
        'Memory and skills tooling are used as the practical next step after readers understand the architecture.',
      ],
      bestFirstRead: {
        href: '/blog/openclaw-agent-system-prompt-architecture-9-layers',
        label: 'OpenClaw Agent System Prompt Architecture Explained',
        reason:
          'Best entry point for readers who need the full layer-by-layer model before comparing implementation patterns.',
      },
      bestSkillToTry: {
        href: '/skills/skills-cli',
        label: 'Skills CLI',
        reason:
          'Turns architecture decisions into reusable, installable skill packages instead of one-off prompt edits.',
      },
      timeline: [
        {
          date: 'Start here',
          title: 'Understand the canonical stack',
          description:
            'Read the 9-layer OpenClaw architecture page and treat it as the primary reference.',
        },
        {
          date: 'Then',
          title: 'Compare design principles',
          description:
            'Move into prompt engineering and software-design articles to understand tradeoffs.',
        },
        {
          date: 'Next',
          title: 'Package the workflow',
          description:
            'Use Skills CLI or memory tooling to turn the prompt design into a repeatable system.',
        },
      ],
    },
    featuredArticles: [
      {
        href: '/blog/openclaw-agent-system-prompt-architecture-9-layers',
        slug: 'openclaw-agent-system-prompt-architecture-9-layers',
        title: 'OpenClaw Agent System Prompt Architecture Explained (9 Layers)',
        summary:
          'The canonical breakdown of OpenClaw’s full 9-layer prompt stack, from identity and tools to memory and runtime context.',
        type: 'blog',
      },
      {
        href: '/blog/openclaw-9-layer-system-prompt-architecture',
        slug: 'openclaw-9-layer-system-prompt-architecture',
        title: "Inside OpenClaw's 9-Layer System Prompt",
        summary:
          'Supporting page that now points search equity back to the canonical architecture article.',
        type: 'blog',
      },
      {
        href: '/blog/engineering-better-ai-agent-prompts-with-software-design-principles',
        slug: 'engineering-better-ai-agent-prompts-with-software-design-principles',
        title:
          'Engineering Better AI Agent Prompts with Software Design Principles',
        summary:
          'A practical companion piece on designing clearer, more modular prompts for agent systems.',
        type: 'blog',
      },
    ],
    featuredSkills: [
      {
        href: '/skills/skills-cli',
        slug: 'skills-cli',
        title: 'Skills CLI',
        summary:
          'Manage and version reusable skills so prompt architecture decisions turn into repeatable installs.',
        type: 'skill',
      },
      {
        href: '/skills/claude-mem-memory-plugin-for-claude-code',
        slug: 'claude-mem-memory-plugin-for-claude-code',
        title: 'Claude-Mem Memory Plugin',
        summary:
          'Persistent memory support for Claude Code workflows that need stable context across sessions.',
        type: 'skill',
      },
      {
        href: '/skills/ruvector',
        slug: 'ruvector',
        title: 'Ruvector',
        summary:
          'Vector search and trend discovery to structure the retrieval layer behind prompt-driven workflows.',
        type: 'skill',
      },
    ],
    nextSteps: [
      {
        id: 'view_topic_hub',
        label: 'Explore the full architecture hub',
        href: '/topics/system-prompt-architecture',
        description:
          'See the canonical page, supporting articles, and the keyword ownership plan for this cluster.',
      },
      {
        id: 'install_skills_cli',
        label: 'Install Skills CLI',
        href: '/skills/skills-cli',
        description:
          'Turn prompt design decisions into reusable, installable workflows.',
      },
      {
        id: 'browse_blog_archive',
        label: 'Continue with the blog archive',
        href: '/blog',
        description:
          'Keep reading adjacent workflow and architecture breakdowns from the same search session.',
      },
    ],
    ownership: [
      {
        keyword: 'openclaw 9-layer system prompt',
        searchIntent: 'Understand the canonical OpenClaw prompt structure.',
        primaryPath: '/blog/openclaw-agent-system-prompt-architecture-9-layers',
        supportingPaths: ['/blog/openclaw-9-layer-system-prompt-architecture'],
        note: 'Keep one main ranking URL and use secondary pages only for supplementary framing.',
      },
      {
        keyword: 'openclaw system prompt architecture',
        searchIntent:
          'Find the high-level architecture and layer responsibilities.',
        primaryPath: '/topics/system-prompt-architecture',
        supportingPaths: [
          '/blog/openclaw-agent-system-prompt-architecture-9-layers',
        ],
        note: 'The hub owns broader cluster intent; the article owns exact architecture breakdown intent.',
      },
      {
        keyword: 'ai agent prompt architecture',
        searchIntent: 'Compare design patterns for complex prompt systems.',
        primaryPath:
          '/blog/engineering-better-ai-agent-prompts-with-software-design-principles',
        supportingPaths: ['/topics/system-prompt-architecture'],
        note: 'Use supporting content for methodology, not duplicate architecture titles.',
      },
    ],
    linkedPostSlugs: [
      'openclaw-agent-system-prompt-architecture-9-layers',
      'openclaw-9-layer-system-prompt-architecture',
      'engineering-better-ai-agent-prompts-with-software-design-principles',
      'agent-skills-architecture-deep-dive',
      'agent-skills-for-context-engineering-multi-agent-systems',
    ],
  },
  {
    slug: 'openclaw-nodes',
    eyebrow: 'Topic Hub',
    title: 'OpenClaw Nodes & Automation',
    summary:
      'The main cluster for OpenClaw Nodes, browser/device automation, and practical control-layer tutorials.',
    description:
      'This hub pulls together the pages that explain how OpenClaw nodes connect to browsers, Electron apps, and device workflows so readers can move from theory into hands-on automation faster.',
    highlights: [
      'Give the node tutorial one clear home instead of scattering device automation across multiple entry pages.',
      'Link browser and Electron automation tutorials into installable node-adjacent skills.',
      'Use the hub as the connective page for readers comparing control layers and execution environments.',
    ],
    editorial: {
      whyItMattersNow:
        'Autonomous agents become materially more useful when they can reach browsers, devices, and local apps. OpenClaw Nodes give that control layer a concrete shape, which makes this cluster one of the site’s most defensible editorial lanes.',
      whatChangedThisMonth: [
        'The node tutorial now anchors the broader browser, Electron, and device automation journey.',
        'Agent-browser coverage is treated as an execution layer for OpenClaw workflows, not a detached tutorial.',
        'Skill recommendations emphasize installable control surfaces that readers can test immediately.',
      ],
      bestFirstRead: {
        href: '/blog/openclaw-node-tutorial',
        label: 'OpenClaw Nodes Tutorial',
        reason:
          'Best first stop for understanding how OpenClaw extends agents into phones, Raspberry Pi, browsers, and device workflows.',
      },
      bestSkillToTry: {
        href: '/skills/agent-browser',
        label: 'agent-browser',
        reason:
          'Gives readers a concrete browser and Electron automation path after they understand the node model.',
      },
      timeline: [
        {
          date: 'Start here',
          title: 'Learn the node model',
          description:
            'Use the OpenClaw Nodes tutorial to understand how agents reach external execution environments.',
        },
        {
          date: 'Then',
          title: 'Add browser and desktop control',
          description:
            'Read the agent-browser and CDP tutorials to connect node concepts to real UI automation.',
        },
        {
          date: 'Next',
          title: 'Install the execution skill',
          description:
            'Try agent-browser or adjacent automation skills to turn the tutorial into a working workflow.',
        },
      ],
    },
    featuredArticles: [
      {
        href: '/blog/openclaw-node-tutorial',
        slug: 'openclaw-node-tutorial',
        title: 'OpenClaw Nodes Tutorial: Control Phones & IoT',
        summary:
          'The primary tutorial for understanding how OpenClaw Nodes extend agents into phones, Raspberry Pi, and other devices.',
        type: 'blog',
      },
      {
        href: '/blog/agent-browser-electron-app-automation-via-cdp',
        slug: 'agent-browser-electron-app-automation-via-cdp',
        title: 'agent-browser: Electron App Automation via CDP',
        summary:
          'A focused walkthrough for controlling Electron applications through Chrome DevTools Protocol.',
        type: 'blog',
      },
      {
        href: '/blog/electron-app-automation-with-agent-browser-and-cdp',
        slug: 'electron-app-automation-with-agent-browser-and-cdp',
        title: 'Electron App Automation with agent-browser and CDP',
        summary:
          'Supporting tutorial covering the same execution layer from a broader automation use-case angle.',
        type: 'blog',
      },
    ],
    featuredSkills: [
      {
        href: '/skills/agent-browser',
        slug: 'agent-browser',
        title: 'agent-browser',
        summary:
          'Reusable browser and Electron automation skill that pairs naturally with OpenClaw node execution.',
        type: 'skill',
      },
      {
        href: '/skills/union-search',
        slug: 'union-search',
        title: 'Union Search',
        summary:
          'Multi-platform discovery layer for the research and sourcing workflows people often automate through nodes.',
        type: 'skill',
      },
      {
        href: '/skills/team-builder',
        slug: 'team-builder',
        title: 'Team Builder',
        summary:
          'Multi-agent orchestration skill for teams that need nodes plus async coordination.',
        type: 'skill',
      },
    ],
    nextSteps: [
      {
        id: 'view_nodes_hub',
        label: 'See the OpenClaw Nodes hub',
        href: '/topics/openclaw-nodes',
        description:
          'Jump from the current article into the full device and automation cluster.',
      },
      {
        id: 'install_agent_browser',
        label: 'Install agent-browser',
        href: '/skills/agent-browser',
        description:
          'Move from the tutorial into a working automation skill for browsers and Electron apps.',
      },
      {
        id: 'browse_skills_library',
        label: 'Browse more automation skills',
        href: '/skills',
        description:
          'Compare adjacent skills before you commit to a specific control stack.',
      },
    ],
    ownership: [
      {
        keyword: 'openclaw node tutorial',
        searchIntent: 'Learn the main OpenClaw Nodes workflow and setup path.',
        primaryPath: '/blog/openclaw-node-tutorial',
        supportingPaths: ['/topics/openclaw-nodes'],
        note: 'Keep the tutorial page focused on setup and control patterns; let the hub own the broader cluster.',
      },
      {
        keyword: 'agent-browser electron automation',
        searchIntent: 'Find the best page for Electron automation with CDP.',
        primaryPath: '/blog/agent-browser-electron-app-automation-via-cdp',
        supportingPaths: [
          '/blog/electron-app-automation-with-agent-browser-and-cdp',
          '/skills/agent-browser',
        ],
        note: 'Use the secondary article and skill page for implementation paths, not competing titles.',
      },
      {
        keyword: 'openclaw browser automation',
        searchIntent:
          'Evaluate how OpenClaw handles browser and desktop control.',
        primaryPath: '/topics/openclaw-nodes',
        supportingPaths: [
          '/skills/agent-browser',
          '/blog/openclaw-node-tutorial',
        ],
        note: 'The hub should be the broad comparison entry point.',
      },
    ],
    linkedPostSlugs: [
      'openclaw-node-tutorial',
      'agent-browser-electron-app-automation-via-cdp',
      'electron-app-automation-with-agent-browser-and-cdp',
      'openclaw-browser-configuration-fix',
    ],
  },
  {
    slug: 'claude-code',
    eyebrow: 'Topic Hub',
    title: 'Claude Code Workflows',
    summary:
      'The cluster page for autonomous Claude Code usage, memory, long-running execution, and practical task management.',
    description:
      'This hub gives Claude Code traffic a dedicated destination instead of forcing readers to bounce between disconnected posts about autonomy, planning, memory, and long-running execution.',
    highlights: [
      'Consolidate the autonomous Claude Code narrative into one cluster page.',
      'Route long-running tasks, task-management, and memory support into one connected journey.',
      'Use skills as the conversion bridge from thought leadership into actual workflow adoption.',
    ],
    editorial: {
      whyItMattersNow:
        'Coding agents are moving from interactive pair-programming into longer-running autonomous work. The important question is no longer only what Claude Code can generate, but how teams route, monitor, remember, and recover its work.',
      whatChangedThisMonth: [
        'Autonomy, task hubs, long-running execution, and memory are now organized as one workflow story.',
        'RTK and memory tooling are treated as operating infrastructure for coding agents, not isolated utilities.',
        'The hub separates Claude Code-specific search intent from broader multi-agent orchestration intent.',
      ],
      bestFirstRead: {
        href: '/blog/claude-code-ai-can-now-work-independently',
        label: 'Claude Code Can Now Work Independently',
        reason:
          'Best first read for understanding the autonomy shift before going into task management or memory layers.',
      },
      bestSkillToTry: {
        href: '/skills/rtk',
        label: 'RTK',
        reason:
          'A practical first skill for reducing terminal noise and making coding-agent sessions cheaper to run.',
      },
      timeline: [
        {
          date: 'Start here',
          title: 'Frame the autonomy shift',
          description:
            'Read the independent-work explainer to understand why coding agents are changing operational workflows.',
        },
        {
          date: 'Then',
          title: 'Add durable task routing',
          description:
            'Move into long-running tasks and Linear-as-task-hub coverage to see how work is coordinated.',
        },
        {
          date: 'Next',
          title: 'Stabilize the tooling layer',
          description:
            'Try RTK, memory tooling, or Skills CLI to make autonomous coding sessions easier to operate.',
        },
      ],
    },
    featuredArticles: [
      {
        href: '/blog/claude-code-ai-can-now-work-independently',
        slug: 'claude-code-ai-can-now-work-independently',
        title: 'Claude Code Can Now Work Independently',
        summary:
          'Primary article for the autonomy narrative and how independent execution changes real workflows.',
        type: 'blog',
      },
      {
        href: '/blog/manus-integration-enables-long-task-capability-in-claude-code',
        slug: 'manus-integration-enables-long-task-capability-in-claude-code',
        title: 'Claude Code + Manus for Long-Running Tasks',
        summary:
          'Supporting page focused on extending Claude Code into durable, longer-running execution.',
        type: 'blog',
      },
      {
        href: '/blog/using-linear-as-ai-task-management-hub',
        slug: 'using-linear-as-ai-task-management-hub',
        title: 'Linear as an AI Task Hub for Agent Workflows',
        summary:
          'A workflow-centric article on operationalizing Claude Code work with clearer task routing and status tracking.',
        type: 'blog',
      },
      {
        href: '/blog/claude-code-multi-agent-workflow-integration-guide',
        slug: 'claude-code-multi-agent-workflow-integration-guide',
        title: 'Claude Code Multi-Agent Workflow Integration Guide',
        summary:
          'Cluster support content for readers evaluating how Claude Code works in larger multi-agent systems.',
        type: 'blog',
      },
    ],
    featuredSkills: [
      {
        href: '/skills/rtk',
        slug: 'rtk',
        title: 'RTK',
        summary:
          'Compress noisy CLI output so Claude Code and other coding agents can stay fast and context-efficient.',
        type: 'skill',
      },
      {
        href: '/skills/claude-mem-memory-plugin-for-claude-code',
        slug: 'claude-mem-memory-plugin-for-claude-code',
        title: 'Claude-Mem Memory Plugin',
        summary:
          'Persistent memory layer for longer-running or multi-session Claude Code workflows.',
        type: 'skill',
      },
      {
        href: '/skills/skills-cli',
        slug: 'skills-cli',
        title: 'Skills CLI',
        summary:
          'Helps package and reuse the commands, hooks, and workflows that make Claude Code productive at scale.',
        type: 'skill',
      },
    ],
    nextSteps: [
      {
        id: 'view_claude_code_hub',
        label: 'Open the Claude Code hub',
        href: '/topics/claude-code',
        description:
          'See the main cluster page for autonomy, long-running tasks, and workflow management.',
      },
      {
        id: 'install_rtk',
        label: 'Install RTK',
        href: '/skills/rtk',
        description:
          'Cut terminal noise and make Claude Code workflows cheaper to run.',
      },
      {
        id: 'browse_guides_archive',
        label: 'Read the guides archive',
        href: '/guides',
        description:
          'Move from news and commentary into more structured setup guidance.',
      },
    ],
    ownership: [
      {
        keyword: 'claude code autonomous workflow',
        searchIntent:
          'Understand what autonomous Claude Code execution can do.',
        primaryPath: '/blog/claude-code-ai-can-now-work-independently',
        supportingPaths: ['/topics/claude-code'],
        note: 'Let the article own the announcement/explainer intent and the hub own broader discovery intent.',
      },
      {
        keyword: 'claude code long-running tasks',
        searchIntent:
          'Find the best path to durable or extended task execution.',
        primaryPath:
          '/blog/manus-integration-enables-long-task-capability-in-claude-code',
        supportingPaths: ['/topics/claude-code'],
        note: 'Keep Manus-specific queries on the Manus integration page.',
      },
      {
        keyword: 'claude code task management',
        searchIntent:
          'See how to operationalize Claude Code work across multiple tasks.',
        primaryPath: '/blog/using-linear-as-ai-task-management-hub',
        supportingPaths: ['/topics/claude-code'],
        note: 'Task-management intent belongs to the Linear page; don’t reuse that framing elsewhere.',
      },
      {
        keyword: 'claude code productivity stack',
        searchIntent: 'Compare the broader setup around Claude Code.',
        primaryPath: '/topics/claude-code',
        supportingPaths: [
          '/skills/rtk',
          '/skills/claude-mem-memory-plugin-for-claude-code',
        ],
        note: 'The hub owns comparison intent across memory, CLI compression, and workflow design.',
      },
    ],
    linkedPostSlugs: [
      'claude-code-ai-can-now-work-independently',
      'manus-integration-enables-long-task-capability-in-claude-code',
      'using-linear-as-ai-task-management-hub',
      'claude-code-multi-agent-workflow-integration-guide',
      'building-workany-a-week-of-vibe-coding-with-claude-agent-sdk',
      'obsidian-ceo-creates-claude-skills',
    ],
  },
  {
    slug: 'ai-agent-workflows',
    eyebrow: 'Topic Hub',
    title: 'AI Agent Workflows',
    summary:
      'The cluster page for orchestration demos, multi-model workflows, and high-intent agent build tutorials.',
    description:
      'This hub connects the orchestration, workflow, and build-story posts that already attract agent-centric traffic so we can turn that attention into deeper reading and skill installs.',
    highlights: [
      'Use one cluster page for workflow orchestration and end-to-end build stories.',
      'Send high-intent readers from conceptual articles into installable tools and workflow skills.',
      'Keep workflow comparison queries separate from Claude Code-only ownership.',
    ],
    editorial: {
      whyItMattersNow:
        'The agent market is shifting from single-model demos to orchestration patterns that combine research, planning, execution, review, and distribution. Readers need concrete workflow examples before they can judge which tools matter.',
      whatChangedThisMonth: [
        'Codex orchestration, short-video automation, image generation skills, and multi-model workflows now sit in one execution-focused cluster.',
        'Build stories are used as proof of workflow shape, while skills provide the next action.',
        'The hub now separates orchestration examples from Claude Code-only productivity coverage.',
      ],
      bestFirstRead: {
        href: '/blog/codex-monitor-agent-orchestration-demo',
        label: 'Codex Monitor Multi-Agent Orchestration Demo',
        reason:
          'Best first read for seeing how orchestration, monitoring, and execution visibility fit together.',
      },
      bestSkillToTry: {
        href: '/skills/claude-flow',
        label: 'Claude Flow',
        reason:
          'A natural next step for readers who want to chain tools and models into repeatable agent workflows.',
      },
      timeline: [
        {
          date: 'Start here',
          title: 'Study a visible orchestration loop',
          description:
            'Use the Codex Monitor demo to understand how multi-agent execution can be observed and coordinated.',
        },
        {
          date: 'Then',
          title: 'Compare production workflows',
          description:
            'Read the short-video and image-generation build stories to see how orchestration changes by output type.',
        },
        {
          date: 'Next',
          title: 'Move into installable flow tools',
          description:
            'Try Claude Flow, Team Builder, or Union Search depending on the workflow you want to automate first.',
        },
      ],
    },
    featuredArticles: [
      {
        href: '/blog/codex-monitor-agent-orchestration-demo',
        slug: 'codex-monitor-agent-orchestration-demo',
        title: 'Codex Monitor Multi-Agent Orchestration Demo',
        summary:
          'Primary demo page for multi-agent coordination, orchestration structure, and execution visibility.',
        type: 'blog',
      },
      {
        href: '/blog/ai-short-video-factory',
        slug: 'ai-short-video-factory',
        title: 'AI Short Video Factory: Shorts Automation Workflow',
        summary:
          'A concrete production workflow showing how agent systems can turn scripts into short-form video output.',
        type: 'blog',
      },
      {
        href: '/blog/building-image-generation-skills-for-ai-agents',
        slug: 'building-image-generation-skills-for-ai-agents',
        title: 'How to Build Image Generation Skills for AI Agents',
        summary:
          'A build tutorial for turning visual generation capability into reusable agent skills.',
        type: 'blog',
      },
      {
        href: '/blog/multi-model-workflow-optimization-with-ccg',
        slug: 'multi-model-workflow-optimization-with-ccg',
        title: 'Multi-Model Workflow Optimization with CCG',
        summary:
          'A broader cluster page for teams coordinating Claude, Gemini, Codex, and other models in one workflow.',
        type: 'blog',
      },
    ],
    featuredSkills: [
      {
        href: '/skills/claude-flow',
        slug: 'claude-flow',
        title: 'Claude Flow',
        summary:
          'Chain AI models and CLI tools into orchestration flows for larger agent workflows.',
        type: 'skill',
      },
      {
        href: '/skills/team-builder',
        slug: 'team-builder',
        title: 'Team Builder',
        summary:
          'Deploy multi-agent teams with shared workspaces and async coordination patterns.',
        type: 'skill',
      },
      {
        href: '/skills/union-search',
        slug: 'union-search',
        title: 'Union Search',
        summary:
          'Strong top-of-funnel skill for research, sourcing, and cross-platform discovery workflows.',
        type: 'skill',
      },
    ],
    nextSteps: [
      {
        id: 'view_workflows_hub',
        label: 'See the AI agent workflows hub',
        href: '/topics/ai-agent-workflows',
        description:
          'Open the full cluster page for orchestration demos, workflow examples, and next-step tools.',
      },
      {
        id: 'install_claude_flow',
        label: 'Install Claude Flow',
        href: '/skills/claude-flow',
        description:
          'Turn workflow inspiration into an installable orchestration layer.',
      },
      {
        id: 'browse_skills_archive',
        label: 'Browse the skills archive',
        href: '/skills',
        description:
          'Compare the tools that best fit your next workflow build.',
      },
    ],
    ownership: [
      {
        keyword: 'agent orchestration demo',
        searchIntent:
          'See a concrete orchestration example with multiple agents.',
        primaryPath: '/blog/codex-monitor-agent-orchestration-demo',
        supportingPaths: ['/topics/ai-agent-workflows'],
        note: 'The demo page owns concrete orchestration intent.',
      },
      {
        keyword: 'ai short video workflow',
        searchIntent:
          'Find a real automation pipeline for short-form video output.',
        primaryPath: '/blog/ai-short-video-factory',
        supportingPaths: ['/topics/ai-agent-workflows'],
        note: 'Use this page for workflow execution intent, not a generic hub title.',
      },
      {
        keyword: 'image generation skills for agents',
        searchIntent:
          'Learn how to build reusable image-generation capabilities for agents.',
        primaryPath: '/blog/building-image-generation-skills-for-ai-agents',
        supportingPaths: ['/topics/ai-agent-workflows'],
        note: 'Owns build/tutorial intent for visual skill creation.',
      },
      {
        keyword: 'multi-model agent workflow',
        searchIntent:
          'Compare how multiple models collaborate in one workflow.',
        primaryPath: '/blog/multi-model-workflow-optimization-with-ccg',
        supportingPaths: ['/topics/ai-agent-workflows'],
        note: 'Keep multi-model comparison intent on the CCG page.',
      },
    ],
    linkedPostSlugs: [
      'codex-monitor-agent-orchestration-demo',
      'ai-short-video-factory',
      'building-image-generation-skills-for-ai-agents',
      'multi-model-workflow-optimization-with-ccg',
      'whatsapp-scheduling-ai-agent-with-google-calendar',
      'similarweb-and-semrush-integration-with-ai-tools',
    ],
  },
]

export function getTopicHubBySlug(slug: string) {
  return topicHubs.find((hub) => hub.slug === slug)
}

export function getTopicHubByBlogSlug(slug: string) {
  return topicHubs.find((hub) => hub.linkedPostSlugs.includes(slug))
}

export function getAllKeywordOwnershipEntries() {
  return topicHubs.flatMap((hub) =>
    hub.ownership.map((entry) => ({
      ...entry,
      topicSlug: hub.slug,
      topicTitle: hub.title,
    })),
  )
}

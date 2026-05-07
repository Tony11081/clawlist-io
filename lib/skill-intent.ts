export interface SkillFaqItem {
  question: string
  answer: string
}

export interface SkillIntentModule {
  eyebrow: string
  heading: string
  summary: string
  highlights: Array<{
    label: string
    value: string
  }>
  troubleshooting: string[]
  faq: SkillFaqItem[]
}

const skillIntentModules: Record<string, SkillIntentModule> = {
  rtk: {
    eyebrow: 'Quick Answer',
    heading: 'Install RTK with Homebrew and cut noisy CLI output fast',
    summary:
      'RTK is best when your coding agent spends too many tokens on verbose terminal output. Install it quickly, keep the signal, and make agent loops cheaper to run.',
    highlights: [
      {
        label: 'Install',
        value: 'brew install rtk',
      },
      {
        label: 'Best for',
        value: 'Claude Code, Codex, and other AI coding workflows with noisy CLI logs.',
      },
      {
        label: 'Result',
        value: 'Lower token usage, cleaner context windows, and easier debugging handoffs.',
      },
    ],
    troubleshooting: [
      'If Homebrew cannot find RTK, run `brew update` and try the install again.',
      'If `rtk` is not recognized after install, restart the terminal or confirm your Homebrew bin path is on `PATH`.',
      'For OpenClaw workflows, confirm your environment is on OpenClaw >=0.9.0 before wiring RTK into agent loops.',
    ],
    faq: [
      {
        question: 'What does RTK do?',
        answer:
          'RTK compresses verbose CLI output so AI coding agents can keep the important signal without burning unnecessary tokens.',
      },
      {
        question: 'How do I install RTK?',
        answer:
          'Install it with `brew install rtk`, then use the binary in the coding workflows where terminal output is too large or repetitive.',
      },
      {
        question: 'When should I use RTK?',
        answer:
          'Use RTK when terminal logs, test output, or build traces are crowding out the context window for Claude Code, Codex, or other agent loops.',
      },
    ],
  },
  'managed-agents-kit': {
    eyebrow: 'Quick Answer',
    heading: 'Ship managed-agent automation with outcomes + memory hygiene',
    summary:
      'Managed Agents Kit is best when you need long-running work that can grade itself, improve memory quality over time, and delegate to subagents without losing visibility.',
    highlights: [
      {
        label: 'Start with',
        value: 'Define an outcome rubric, then add a webhook on completion.',
      },
      {
        label: 'Best for',
        value: 'PR review loops, weekly retros, and durable research → brief pipelines.',
      },
      {
        label: 'Watch for',
        value: 'Over-broad repo/tool access. Keep permissions scoped and review memory changes.',
      },
    ],
    troubleshooting: [
      'If runs drift or produce inconsistent output, tighten the outcome rubric and add explicit rejection criteria.',
      'If memory gets noisy, treat dreaming as a scheduled hygiene job and review diffs before publishing updates.',
      'If multi-agent delegation gets expensive, cap subagent count and prefer parallelism only on independent steps.',
    ],
    faq: [
      {
        question: 'What problem does Managed Agents Kit solve?',
        answer:
          'It packages common managed-agent patterns: outcome grading loops, delegation templates, and memory hygiene so your automation stays durable as it runs across many sessions.',
      },
      {
        question: 'Is this only for coding agents?',
        answer:
          'No. It works best for any workflow that needs repeatable quality checks: writing briefs, review checklists, incident retros, and documentation generation.',
      },
      {
        question: 'What is the biggest risk?',
        answer:
          'Scope creep: granting broad file, network, or repo access too early. Start with minimal permissions and expand only when the workflow proves stable.',
      },
    ],
  },
  'mcp-sandbox-guard': {
    eyebrow: 'Quick Answer',
    heading: 'Harden MCP toolchains before you give agents local execution',
    summary:
      'MCP Sandbox Guard is best when your agent stack depends on MCP servers (especially stdio transports) and you need least-privilege defaults, audits, and a predictable sandbox boundary.',
    highlights: [
      {
        label: 'Goal',
        value: 'Reduce blast radius for agent tool execution.',
      },
      {
        label: 'Best for',
        value: 'Teams rolling out MCP servers, IDE toolchains, or shared agent workstations.',
      },
      {
        label: 'Default stance',
        value: 'Treat MCP servers as privileged processes; sandbox first, then grant exceptions.',
      },
    ],
    troubleshooting: [
      'If a tool suddenly needs broad file access, move to explicit per-directory grants instead of expanding the default sandbox.',
      'If audits show unsafe stdio commands, replace them with pinned binaries and allowlisted args; avoid shell passthrough.',
      'If you must expose MCP over HTTP, require auth tokens and prefer IPC/unix sockets where possible.',
    ],
    faq: [
      {
        question: 'Why is MCP hard to secure?',
        answer:
          'Because MCP servers often run with the same privileges as the client, and stdio-based launches can become arbitrary command execution if configuration is writable or untrusted.',
      },
      {
        question: 'Does this replace a security review?',
        answer:
          'No. It helps you surface obvious risks and apply safer defaults, but you still need policy, code review, and incident response playbooks for production deployments.',
      },
      {
        question: 'What is the safest default setup?',
        answer:
          'Minimal filesystem and network access, pinned tool binaries, explicit user grants, and strong separation between agent prompts and tool configuration files.',
      },
    ],
  },
}

export function getSkillIntentModule(slug: string) {
  return skillIntentModules[slug]
}

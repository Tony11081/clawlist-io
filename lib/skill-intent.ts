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
}

export function getSkillIntentModule(slug: string) {
  return skillIntentModules[slug]
}

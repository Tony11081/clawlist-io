---
title: "Agent Ops Brief - Repositories need an onboarding contract for agents"
summary: "Copilot's generated repository overviews, layered instructions, portable skills, and task-tier models point to a new baseline: every agent-ready repository needs a compact map, explicit operating rules, and verified workflows."
published_at: "2026-07-11"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-11.svg"
tags:
  - agent-ops
  - github-copilot
  - repository-context
  - agent-instructions
  - skills
  - model-routing
  - automation
---

## What changed (high signal)

### 1) Repository orientation is becoming an agent-generated interface

GitHub's July 9 release lets Copilot generate a high-level overview when someone visits an unfamiliar repository. The overview gathers repository context and summarizes its purpose, technologies, and contribution guidelines. It can also answer how to contribute, summarize recent changes, and generate a README when one is missing.

That turns repository orientation into a callable agent task. The useful part is not the summary alone; it is the emerging expectation that a new human or agent should be able to build an accurate operating map without reading the entire tree first.

Treat the generated overview as a diagnostic. If it misidentifies the architecture, misses the real validation command, or cannot explain where a change belongs, the repository's own context is under-specified. Fix the source documents and instruction files instead of polishing the generated answer by hand.

### 2) An overview explains the system; instructions define permission to act

GitHub's instruction support now spans repository-wide `.github/copilot-instructions.md`, path-specific instruction files, and agent instructions such as `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`. Support varies by surface, but Copilot cloud agent can combine repository, path, agent, and organization instructions. The nearest `AGENTS.md` takes precedence in the directory tree.

This gives repositories a layered operating contract. A root instruction file should contain durable facts shared by most work: dependency setup, architecture boundaries, required checks, security constraints, and completion evidence. Path-specific files should cover local rules that would otherwise clutter the root context. Personal preferences should not carry repository safety policy.

The main failure mode is contradiction. When generated overviews, READMEs, package scripts, and nested agent instructions disagree, agents may follow the most specific file while humans follow the most visible one. Assign an owner and review these surfaces together when build or release workflows change.

### 3) Agent onboarding should be tested like developer onboarding

GitHub's documentation explicitly describes asking the cloud agent to onboard a repository by generating `.github/copilot-instructions.md`. That is a useful bootstrap, but generated instructions should be treated as a draft pull request, not ground truth.

Use a small onboarding acceptance test. Give a clean agent session five questions: what does this repository ship, where should a representative change go, how is the local environment prepared, which checks are mandatory, and what actions require approval? Then ask it to execute one low-risk workflow in a clean worktree.

The repository is agent-ready only when the answers cite current files and the workflow succeeds without undocumented repair steps. Record any repair as repository documentation, a deterministic setup script, or a reusable skill so the next session does not rediscover it.

### 4) Skills are the executable half of the onboarding contract

GitHub defines agent skills as folders of instructions, scripts, and resources that agents load for specialized tasks. Project skills can live in `.github/skills`, `.claude/skills`, or `.agents/skills`; personal skills can be shared across projects. The same skill concept now works across cloud agent, code review, CLI, the Copilot app, VS Code, and JetBrains.

That portability changes what belongs in documentation. Stable facts and constraints belong in repository instructions. Repeatable procedures with commands, templates, or reference material belong in skills. A release checklist described only in prose is easy to skip; a release skill can stage the exact checks and return consistent evidence.

Keep skills narrow and inspectable. Each should declare when it applies, which files or systems it can change, required inputs, verification steps, and a clear stop condition. Installable does not mean universally trusted: review scripts and tool authority before adding third-party skills to an agent's search path.

### 5) Model tiers should follow the repository's task map

GitHub also released three GPT-5.6 variants across Copilot surfaces: Sol for complex, long-running reasoning over large codebases; Terra as the balanced default for everyday agentic coding; and Luna for smaller, faster, cost-efficient tasks. Business and Enterprise administrators must explicitly enable the model policy, which is off by default.

The operational lesson is to connect model selection to the onboarding map. Repository overview generation, issue classification, and bounded documentation edits can start on a fast tier. Cross-package migrations, ambiguous production failures, and security-sensitive changes may justify a higher reasoning tier. Escalation should depend on task evidence, not on whichever model a developer last selected.

Define the routing table beside the repository's task classes: default model tier, maximum tool authority, expected checks, budget ceiling, and escalation triggers. A model picker becomes useful infrastructure only when the repository can explain what each task requires.

## Operator takeaways

### Build one canonical repository map

Document purpose, architecture boundaries, setup, validation, ownership, and approval-sensitive actions in sources that both humans and agents can cite.

### Layer instructions by scope

Keep global rules at the root and local rules near the files they govern. Audit conflicts whenever workflows change.

### Run an onboarding acceptance test

Test a clean agent session on orientation questions and one low-risk task. Convert every undocumented recovery step into durable context.

### Move repeatable procedures into skills

Use skills for executable workflows and instructions for durable constraints. Review installed skill scripts and permissions before use.

### Route models by task evidence

Set a default tier, budget, verification bar, and escalation trigger for each recurring task class.

## Sources

- [GitHub Changelog: Ask Copilot for a repository overview](https://github.blog/changelog/2026-07-09-ask-copilot-for-a-repository-overview/)
- [GitHub Changelog: OpenAI's GPT-5.6 Sol, Terra, and Luna are now available in GitHub Copilot](https://github.blog/changelog/2026-07-09-openais-gpt-5-6-sol-terra-and-luna-are-now-available-in-github-copilot/)
- [GitHub Docs: Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)
- [GitHub Docs: Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)


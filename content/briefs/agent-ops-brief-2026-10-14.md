---
title: "Agent Ops Brief - Treat skills as operating playbooks, not permission bundles"
summary: "Current OpenAI guidance sharpens the boundary between a skill that teaches a repeatable workflow and an MCP server that exposes controlled actions. Keep both small, explicit, and independently reviewable."
published_at: "2026-10-14"
tags:
  - agent-ops
  - skills
  - codex
  - mcp
  - automation
  - governance
  - claude-code
  - openai
---

## What changed (high signal)

### 1) Skills are being defined more narrowly: reusable workflow guidance

OpenAI's current skills and plugin documentation draws a useful operational boundary. A skill is a directory with a `SKILL.md` manifest and optional references, scripts, templates, or assets. Its job is to tell an agent **when** a workflow applies, the steps to take, how to handle ordinary ambiguity, and what a successful result looks like.

That makes a skill an operating playbook—not a bag of permissions. A release-note skill can define how to collect sources, identify the user impact, run editorial checks, and produce a cited draft. It should not silently decide which customer system to contact or grant itself access to publish.

### 2) Keep execution authority in the tool layer

The complementary boundary is just as important: an MCP server provides live data and controlled actions, including its input/output schemas, authentication, and authorization. When a workflow needs a real capability—read a private system, write a record, create a deployment, or send a message—the server should expose the narrow action and enforce its policy.

This separation gives operators two things they need for dependable automation:

- a reviewable procedure that can be edited and versioned with the project;
- an independently enforceable action boundary that does not rely on the model remembering a paragraph of prose.

Start with a skills-only package if existing tools already cover the work. Add an MCP server when the workflow truly needs a service connection or a controlled effect. Add custom UI only where someone must inspect, compare, edit, confirm, or navigate structured information.

### 3) Discovery text is part of reliability engineering

At discovery time, the model sees a skill's name and description before it reads the full instructions. OpenAI's recent Codex guidance warns that oversized descriptions and too many broadly triggered skills consume context and make selection less reliable.

Write the description as a routing rule, not a marketing blurb. It should name the concrete outcome and the precise trigger:

- weak: “Helps with databases.”
- useful: “Create and validate a Postgres schema migration. Use when adding, changing, or reviewing a migration rollout.”

The same principle applies to Claude Code, Codex, and any agent host that selects instruction bundles from metadata: narrow activation produces fewer accidental detours and less contradictory context.

### 4) Design for progressive disclosure, then test the terminal condition

Put the minimum routing and safety-critical guidance in `SKILL.md`. Link to references only when needed, keep repeatable mechanics in scripts, and place reusable output structures in templates. A model working on a narrow task should not need to ingest a full department handbook.

More importantly, define a terminal condition that another person can verify. “Publish a polished update” is not enough. Prefer: “create a draft with three attributable sources; run the content checker; do not publish if the checker fails; return the artifact path and validation result.” That gives the agent an outcome, a boundary, and evidence expectations without turning the entire process into brittle choreography.

## A practical package shape

For a recurring, source-backed editorial automation, a small package can look like this:

```text
daily-brief/
├── SKILL.md                 # trigger, workflow, safety boundary, terminal condition
├── references/
│   └── editorial-standard.md # voice, source-quality and citation rules
├── scripts/
│   └── check-brief.mjs       # deterministic format/link checks
└── assets/
    └── brief-template.md     # reusable output structure
```

Keep the skill responsible for choosing and ordering the work. Keep the checker responsible for deterministic validation. Keep any publishing or data-access capability behind a tool with a narrow schema and explicit authorization.

## Operator takeaways

### Separate “how” from “may”

Put process guidance in a skill; put data access and side effects in controlled tools. Review both, but do not make either carry the other's job.

### Make activation specific

Treat the skill description as the first decision gate. Say exactly when the workflow applies and avoid catch-all labels such as “use for engineering.”

### Load context on demand

Use a concise root instruction file that routes to references and scripts. Progressive disclosure protects both context budget and selection quality.

### Define proof before execution

Specify the expected artifact, validation command or rule, publish boundary, and the evidence the agent must return. A workflow is only dependable if its terminal state can be checked.

## Sources

- [OpenAI Developers: Skills](https://developers.openai.com/plugins/concepts/skills)
- [OpenAI API: Agent Skills](https://developers.openai.com/api/docs/guides/tools-skills)
- [OpenAI Developers: Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)
- [OpenAI Developers: Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)

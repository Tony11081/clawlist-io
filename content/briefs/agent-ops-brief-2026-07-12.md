---
title: "Agent Ops Brief - Agent authority needs provenance"
summary: "Claude Code's latest auto-mode controls and Codex's read/write app approvals point to the same rule: every delegated capability needs a trusted policy source, an attributable approval, and a boundary the repository cannot silently widen."
published_at: "2026-07-12"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-12.svg"
tags:
  - agent-ops
  - claude-code
  - codex
  - permissions
  - plugins
  - mcp
  - worktrees
  - automation
---

## What changed (high signal)

### 1) Auto mode is expanding, but its authority is moving above the repository

Claude Code 2.1.207 makes auto mode available without an environment-variable opt-in on Bedrock, Vertex AI, and Foundry. At the same time, it stops reading the auto-mode setting from the repository-resident `.claude/settings.local.json`; operators must set it in the user-level configuration instead.

Those two changes belong together. Wider autonomous execution is useful only when the code being inspected cannot quietly grant the agent more authority. A cloned repository may propose commands, skills, hooks, and configuration, but it should not be able to decide that approvals are no longer required.

Treat execution mode as an operator or organization policy. Repository files can declare the workflow and required tools; a higher-trust layer should decide whether that workflow may run automatically, which actions still prompt, and which environments are eligible.

### 2) Consent is an event, not a boolean

The same Claude Code release fixes remote managed settings from non-interactive runs being permanently recorded as consented even though no security dialog was shown. Version 2.1.205 also changes background notifications to state explicitly that no human input occurred, preventing text inside a transcript from being interpreted as approval.

This exposes a common orchestration bug: systems persist `approved: true` while losing who approved, what was shown, which channel captured the decision, and how long it remains valid. Once that context disappears, automation can inherit authority that no person actually granted.

Approval records should include actor, policy source, requested action, resource scope, interface, timestamp, expiry, and the evidence displayed at decision time. Non-interactive workers should be unable to mint human consent; they can only inherit a narrowly scoped policy or stop with a clear question.

### 3) Plugin configuration is part of the command boundary

Claude Code now rejects `${user_config.*}` expansion in shell-form commands used by plugin hooks, monitors, and MCP header helpers because it can enable shell injection. It recommends exec-form argument arrays for hooks, while plugin option values are no longer read from project-level settings and must come from user, explicit command-line, or managed configuration.

This is the installable-skill lesson in concrete form. Reviewing a plugin's script is not enough if repository-controlled values can later be interpolated into that script's shell command. Trust is the combination of code, configuration source, interpolation rules, and runtime permissions.

Prefer structured argument arrays over shell strings. Classify every plugin option by trust source, keep credentials out of repository files, and test hostile values containing spaces, quotes, substitutions, redirects, and newlines before approving a plugin for unattended use.

### 4) Worktree and transcript integrity are control-plane concerns

Claude Code 2.1.206 asks for confirmation before entering a worktree outside its managed worktree directory. The following releases fix repository config left behind after sparse worktree removal, blank resumes from worktrees, malformed worktree include patterns, a Windows removal bug that could delete outside the worktree through junctions or symlinks, and transcript tampering in auto mode.

These are not cosmetic reliability fixes. Parallel agents rely on worktrees for filesystem isolation and transcripts for attribution. If a task crosses into an unexpected checkout, follows a filesystem indirection, or can rewrite its own history, the orchestration layer can no longer prove where a change came from.

Record the canonical worktree root and real path at dispatch time. Refuse boundary changes without a new approval, validate symlinks and junctions before cleanup, and store append-only task events outside the agent's writable project area.

### 5) Read/write separation is becoming the practical approval primitive

Codex CLI 0.144 adds a `writes` app-approval mode that permits declared read-only app actions while prompting for writes. It also enables interactive MCP authentication by default, allows app-server hosts to provide Codex authentication at runtime, refreshes expired authentication during long-running app sessions, and warns that high multi-agent concurrency with Ultra reasoning can consume usage quickly.

The useful abstraction is not blanket tool access. It is capability plus effect: read issue, create comment, inspect calendar, send invitation, query database, mutate row. Authentication establishes identity; the approval layer still needs to govern the effect and scope of each operation.

Build connector policies around read, write, destructive, financial, and external-communication classes. Add concurrency and spend ceilings to the same dispatch policy so a technically permitted fan-out cannot become an unbounded operational or cost event.

## Operator takeaways

### Put autonomy policy above repository control

Let repositories describe workflows, but keep auto mode, broad permissions, and trusted plugin options in user or managed policy.

### Make approval records attributable

Persist who approved which effect, through which interface, with what evidence, scope, and expiry. Never infer consent from transcript text.

### Threat-model plugin configuration

Review configuration sources and interpolation behavior alongside plugin code. Prefer exec-form arguments and reject untrusted shell expansion.

### Seal worktree and transcript boundaries

Pin canonical paths, validate filesystem indirections before cleanup, and keep task history append-only outside agent-writable roots.

### Authorize connectors by effect

Separate reads from writes, require stronger approval for destructive or external actions, and attach concurrency and spend limits to dispatch.

## Sources

- [Anthropic Claude Code releases: v2.1.207, v2.1.206, and v2.1.205](https://github.com/anthropics/claude-code/releases)
- [OpenAI Codex changelog: CLI 0.144.0](https://learn.chatgpt.com/docs/changelog#codex-cli-01440)
- [OpenAI Codex 0.144.0 release notes](https://github.com/openai/codex/releases/tag/rust-v0.144.0)


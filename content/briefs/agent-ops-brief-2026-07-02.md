---
title: "Agent Ops Brief - Sandboxed workspaces meet skill supply-chain risk"
summary: "Claude Code's July 1 background-agent release, Codex's July 1 npm update, OpenAI Agents SDK sandbox patterns, OpenClaw 2026.6.11, and Unit 42's ClawHub findings all point to one operational requirement: agent work needs isolated execution, durable provenance, and reviewable handoff."
published_at: "2026-07-02"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-02.svg"
tags:
  - agent-ops
  - codex
  - claude-code
  - openclaw
  - skills
  - supply-chain
  - sandboxes
  - automation
---

## What changed (high signal)

### 1) Background agents are moving from "finish the task" to "ship a reviewable artifact"

Claude Code 2.1.198 shipped on July 1, 2026 with a notable change for delegated work: background agents launched from `claude agents` now commit, push, and open a draft PR when they finish code work in a worktree. The same release added completion and needs-input notifications for background sessions, improved stuck-task reporting, and kept subagents aligned with the main session's extended thinking configuration.

For ClawList readers, the important part is the handoff model. A background coding agent is no longer only a long-running terminal process. It is becoming a producer of a concrete review object: branch, commit, pushed remote state, draft PR, notification event, and transcript. That is the minimum shape teams need before agent work can run unattended without disappearing into local state.

This also raises the bar for local automations. If a recurring job edits production content, patches a repo, syncs a catalog, or refreshes documentation, the end state should be as reviewable as a teammate's work: source facts, generated assets, test results, commit hash, and deployment status.

### 2) Codex remote control makes pairing and host identity part of agent policy

The current public `@openai/codex` package is 0.142.5, modified on July 1, 2026. OpenAI's Codex changelog also documents Codex Remote general availability, authenticated one-to-one QR pairing between mobile devices and hosts, and a DigitalOcean plugin that can provision a droplet, configure SSH access, and connect it to the Codex App as a remote workspace.

That is a meaningful operational boundary. Once agents can be started from mobile, resumed remotely, and pointed at provisioned workspaces, the trusted unit is not just "this user" or "this repository." It is user, device pairing, host, remote workspace, plugin, approval surface, and branch state together.

Teams should treat host pairing like access control, not convenience setup. A paired device that can approve actions against a connected machine has real authority. Remote workspace provisioning also needs cleanup policy: who owns the droplet, which credentials were created, what repo was cloned, which plugins ran, and when the environment is destroyed or rotated.

### 3) Sandbox agents turn filesystem work into an explicit runtime contract

OpenAI's Agents SDK documentation now presents Sandbox Agents as a beta pattern for agents that need to inspect files, run commands, apply patches, and carry workspace state across longer tasks. The JavaScript/TypeScript SDK shows `SandboxAgent` with a git-backed manifest and a local sandbox client. The Python release notes describe the same broader direction: persistent isolated workspaces, repo mounts, snapshots, resume support, hosted sandbox providers, sandbox memory, and tracing that is aware of sandbox state.

This matters because many "agent automation" failures are not reasoning failures. They are boundary failures. The agent had too much filesystem reach, unclear persistence, no clean resume model, or no durable record of what it learned last run. Sandboxes make those assumptions visible enough to audit.

The practical operating model is to bind every autonomous run to a workspace manifest: source repo, allowed directories, mounted data, secrets policy, shell availability, network scope, memory location, and artifact outputs. If the agent cannot describe its workspace contract, the operator cannot reliably review the run.

### 4) OpenClaw skill risk is now an agent-native supply-chain problem

Unit 42's June 23 research on ClawHub found five malicious OpenClaw skills that passed existing screening at the time of analysis. The cases included macOS infostealer delivery, scanner evasion through inflated file size, and agentic financial abuse patterns such as affiliate injection and front-running. Unit 42 reported the skills, and OpenClaw removed them and banned the associated accounts.

The key distinction is that malicious skills are not just packages with code. They are instruction-bearing artifacts that can exploit the agent's own interpretation layer and authenticated context. Unit 42's conclusion is blunt in operational terms: publisher provenance and line-by-line source review matter because skill execution happens inside the agent process.

This should change how teams evaluate installable skills across ecosystems. A `SKILL.md` file, plugin manifest, MCP server wrapper, browser connector, or workflow template should be treated as part dependency, part policy file, and part prompt injection surface. Static malware scans are useful, but they do not fully cover semantic instruction abuse.

### 5) OpenClaw 2026.6.11 reinforces the reliability side of the same story

OpenClaw 2026.6.11 was released on June 30, 2026 with a focus on reliability: channel delivery fixes across chat surfaces, reconnect behavior, model setup failures, stuck sends, misplaced replies, and safer admin defaults. That release pairs naturally with the supply-chain discussion.

Agent platforms need both sides to mature at once. Reliability without provenance makes automation easier to trust too quickly. Security review without reliable delivery makes agents difficult to operate in real workflows. The durable pattern is channel-aware execution with skill provenance, exact runtime versioning, scoped credentials, and a transcript that survives retries and handoffs.

## Operator takeaways

### Require a review artifact for background work

For coding agents, the artifact should be a branch, commit, pushed state, PR, test result, and transcript. For content agents, it should include changed files, sources, generated assets, build result, and deployment status.

### Pair remote control to explicit hosts and modes

Record which device can control which host, which repo or workspace was active, which plugins were enabled, and which approvals were granted from mobile or remote surfaces.

### Treat sandbox manifests as policy

Use workspace manifests to declare repo source, writable paths, shell access, network scope, mounted data, memory, and output artifacts. Review manifest changes like CI or deployment config changes.

### Audit skills beyond malware scanning

Inspect `SKILL.md`, bundled scripts, remote fetches, install steps, update behavior, publisher identity, and model-facing instructions. Semantic instruction hijacking can be invisible to ordinary dependency checks.

### Preserve run memory deliberately

Background and recurring agents should keep concise memory of decisions, sources, failures, and current state. Memory should improve continuity without silently expanding authority or carrying secrets between runs.

## Sources

- [Claude Code changelog](https://code.claude.com/docs/en/changelog)
- [Claude Code v2.1.198 release](https://github.com/anthropics/claude-code/releases/tag/v2.1.198)
- [@anthropic-ai/claude-code npm package](https://www.npmjs.com/package/@anthropic-ai/claude-code)
- [Codex changelog](https://developers.openai.com/codex/changelog)
- [@openai/codex npm package](https://www.npmjs.com/package/@openai/codex)
- [OpenAI Agents SDK JavaScript repository](https://github.com/openai/openai-agents-js)
- [OpenAI Agents SDK Python release notes](https://openai.github.io/openai-agents-python/release/)
- [Unit 42: OpenClaw's skill marketplace and the emerging AI supply-chain threat](https://unit42.paloaltonetworks.com/openclaw-ai-supply-chain-risk/)
- [OpenClaw 2026.6.11 release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11)
- [OpenClaw npm package](https://www.npmjs.com/package/openclaw)

---
title: "Agent Ops Brief — Claude adds CLI MCP auth, GitHub exposes bypass-mode agent risk, and Codex hardens remote execution"
summary: "Claude Code 2.1.186 turns MCP login, plugin skills, workflows, and bash-response behavior into operator-visible controls; GitHub's June 22 Copilot update brings Claude into JetBrains while explicitly flagging bypass-mode permissions; and openai/codex 0.141.0 moves remote executors toward authenticated, encrypted channels."
published_at: "2026-06-23"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-06-23.svg"
tags:
  - claude-code
  - codex
  - github
  - mcp
  - skills
  - security
  - automation
---

## What changed (high signal)

### 1) Claude Code is turning MCP and skills into first-class operator surfaces

Claude Code **2.1.186** shipped on **June 22, 2026** with several changes that are more important as operating-model signals than as individual CLI conveniences.

The sharpest change is `claude mcp login <name>` and `claude mcp logout <name>`. MCP authentication no longer has to route through the interactive `/mcp` menu, and `--no-browser` support makes remote SSH-style completion practical. For agent operators, that moves connector authentication closer to repeatable runbook behavior.

The same release also added:

- a **Skills** section in the `/plugin` Installed tab
- status filtering in the `/workflows` agent detail view
- `teammateMode: "iterm2"` configuration with a warning when the local terminal bridge is missing
- bash-command behavior where `!` commands now trigger Claude to respond to command output automatically, unless disabled
- fixes for streaming failures after machine sleep, subagent scroll-state leakage, named-subagent permission enforcement, and runaway workflow subagents after repeated schema-validation failures

The pattern is clear: Claude Code is making agent capability, connector auth, workflow state, and subagent boundaries more visible to the operator. That is the right direction for teams who need to debug automation after the impressive demo phase.

### 2) GitHub's Claude-in-JetBrains preview is useful, but the bypass-mode note is the story

GitHub's **June 22** Copilot update added Claude as an agent provider in public preview for JetBrains IDEs. The integration uses the local Claude Code CLI path and exposes Claude in the Copilot Chat agent picker.

The operationally important caveat is explicit: the Claude agent currently runs in **bypass permissions mode**, so file edits and tool calls are automatically approved. GitHub says configurable permissions are coming later.

That makes this preview a useful test case for agent governance:

- provider choice is moving into IDE-native agent pickers
- local CLI agents are being wrapped by platform UIs
- enterprise admins still need preview-policy gates
- permission models are not interchangeable across providers yet

Teams should treat this as a controlled pilot surface, not a general unattended automation lane. The same update also added queued-message controls, steering behavior for in-flight Copilot CLI turns, an agent debug logs summary view, larger-context model picker options, and per-turn AI-credit visibility.

### 3) openai/codex 0.141.0 is hardening the remote-executor layer

The open-source **openai/codex 0.141.0** release on **June 18** is worth pulling into this cycle because it focuses on the remote execution substrate rather than UI polish.

The release adds authenticated, end-to-end encrypted **Noise relay channels** for remote executors. It also improves cross-platform remote execution by preserving executor-native working directories, shells, and filesystem-permission paths across app-server and exec-server boundaries.

That matters because long-running coding agents increasingly move work between local apps, remote hosts, browser sessions, app servers, and executor plugins. The executor boundary needs to preserve both security context and developer ergonomics. If a remote run silently changes shell behavior, working directory, or permission path semantics, the agent may pass local checks while failing in the actual execution environment.

### 4) Codex app skills and handoff make reusable automation more product-shaped

OpenAI's **June 18** Codex app changelog added **Record & Replay**, which turns a demonstrated macOS workflow into a reusable skill where available. The same release added bulk actions for automation run history and thread handoff between local and remote hosts.

Read together with the open-source executor changes, Codex is converging on a product shape where:

- a user demonstrates a workflow once
- that workflow becomes a skill
- a thread can move between matching local and remote hosts
- execution infrastructure keeps host-specific assumptions intact
- run history becomes something operators can triage, archive, and audit

This is the practical version of "agent automation": not just a prompt that worked once, but a reusable workflow with state, host affinity, history, and review.

### 5) OpenClaw's latest recovery work remains the reference baseline

OpenClaw's **2026.6.9** release from **June 21** still anchors the broader ClawList theme this week. Its recovery, provenance, Codex integration, remote-node `exec`, and terminal-outcome work matches what the newer Claude, GitHub, and Codex updates are also pointing toward.

The common denominator is not a specific model. It is the operating surface around the model:

- explicit connector authentication
- visible skill provenance and installation state
- subagent and workflow status views
- remote execution boundaries that preserve context
- permission modes that are clear enough for enterprise policy
- recovery behavior for interrupted, backgrounded, or long-running work

## Operator takeaways

### Do not treat IDE agent pickers as a complete permissions model

Provider choice in the IDE is useful, but every provider brings its own approval semantics. If an integration runs in bypass mode, scope it like a privileged local automation tool.

### Put MCP login and logout in runbooks

CLI-visible MCP auth makes connector setup easier to audit. Prefer named-server login/logout steps over undocumented manual menu state, especially for SSH, remote hosts, and onboarding scripts.

### Track skill inventory where plugins are installed

If a plugin tab now exposes skills, use that as an operational inventory. Teams should know which skills are installed, where they came from, and which workflows invoke them.

### Test remote execution for environment drift

Remote executors need checks for shell, working directory, permissions, path casing, and filesystem roots. Treat those as part of the agent runtime contract, not incidental platform differences.

### Watch for steering controls in long-running sessions

Queued prompts, steer-after-tool behavior, and visible run summaries are becoming standard because interrupting an agent safely is now a core workflow. Use tools that make redirection visible instead of relying on ad hoc cancellation.

## Sources

- [Claude Code changelog](https://code.claude.com/docs/en/changelog)
- [Claude Code v2.1.186 release](https://github.com/anthropics/claude-code/releases)
- [GitHub Copilot: Claude as agent provider preview in JetBrains IDEs](https://github.blog/changelog/2026-06-22-new-features-and-claude-as-agent-provider-preview-in-jetbrains-ides/)
- [openai/codex 0.141.0 release](https://github.com/openai/codex/releases)
- [OpenAI Codex changelog](https://developers.openai.com/codex/changelog)
- [OpenClaw 2026.6.9 release](https://github.com/openclaw/openclaw/releases)

---
title: "Agent Ops Brief - Delegation now needs its own control plane"
summary: "Copilot CLI's MCP controls and auto-approval modes, Claude Code's background subagents, Codex's trace-log privacy fix, and OpenClaw's skill allowlists all point to a sharper operating model: delegated agents need visible permissions, budgets, and handoff state."
published_at: "2026-07-07"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-07.svg"
tags:
  - agent-ops
  - delegation
  - mcp
  - claude-code
  - github-copilot
  - codex
  - openclaw
  - skills
  - governance
---

## What changed (high signal)

### 1) Copilot CLI is exposing MCP state while the agent is still working

GitHub's July 4 and July 6 Copilot CLI releases are small on the surface, but they change the operator model. The CLI can list attached MCP servers while the agent is running, open the MCP manager mid-turn to enable or disable servers, keep OAuth-gated MCP servers registered after reconnect, and disconnect a repo-scoped plugin's MCP server when the repository disables it or the session leaves that repository.

That is not just interface polish. It treats tool access as live state, not startup trivia. If an agent is already executing, operators still need to know which external systems are attached, which servers require auth, and whether a repository-scoped plugin is still allowed in the current working context.

The practical move is to make MCP visibility part of every delegated run. A session handoff should include the MCP servers in scope, auth state, repo scope, tool categories, and whether the agent can change those attachments during the turn. If an MCP server can be toggled mid-run, that action should be as reviewable as changing a CI secret or branch protection rule.

### 2) Auto-approval is becoming configurable, so policy needs names

Copilot CLI also added an auto allow-all mode that lets an LLM judge approve requests it evaluates as acceptable, plus a `stayInAutopilot` setting that can keep the CLI in autopilot mode after a task completes. Nearby fixes ensure bypass prompts are skipped when policy disables bypass mode and that double-press Escape can stop the main turn or background agents.

This is the control-plane problem in miniature. "Autopilot" is no longer a single product state. It can mean a one-off permission shortcut, a policy-disabled bypass, a persistent mode after task completion, an LLM-mediated approval decision, or a background task that needs to be interrupted separately from the foreground session.

Teams should name these modes in their own runbooks. For example: inspect-only, patch-with-review, test-with-network, autopilot-in-sandbox, and unattended-background. Each mode should define allowed tools, credential visibility, spending ceilings, network rules, interruption semantics, and what evidence the agent must produce before the run is considered complete.

### 3) Claude Code's background subagents are now a normal execution lane

Anthropic's July 1 Claude Code release says subagents now run in the background by default, Claude continues working while they run, and the main session is notified when they finish. The same release adds background agent notifications in `claude agents`, with `agent_needs_input` and `agent_completed` events firing through the Notification hook. It also says background agents launched from `claude agents` now commit, push, and open draft PRs after code work in a worktree instead of stopping to ask.

That is a meaningful shift from helper threads to delegated execution. A subagent can now run while the parent continues, report through hooks, and, in some cases, finish by moving code into a draft pull request. The governance question is no longer only "can the agent edit files?" It is "can a child agent turn work into a branch, push, and PR without another human checkpoint?"

For operators, child agents need identity and lifecycle metadata. Logs should distinguish parent from child, show which model and thinking settings the child inherited, record the worktree and branch, and make completion state machine-readable: finished, needs input, interrupted, failed, pushed PR, or awaiting review.

### 4) Codex's trace-log fix is a reminder that observability can leak authority

OpenAI's July 1 Codex CLI 0.142.5 release fixed a bug that could write full Responses WebSocket request payloads to trace logs. Earlier June notes also show Codex investing in plugin organization, usage-limit reset credits, and reliability around delegated or remote work. The high-signal point for agent operators is that diagnostics now sit next to sensitive control data.

Agent traces can contain prompts, tool arguments, file paths, snippets, environment hints, command output, and sometimes credentials or proprietary context if a harness gets logging wrong. The more useful the trace is for debugging a failed autonomous run, the more careful teams need to be about retention, access, redaction, and support bundle export.

Treat agent logs as operational evidence, not casual debug text. Keep enough to reconstruct decisions and tool calls, but avoid storing raw provider payloads by default. Make trace sharing explicit, scoped, and time-limited, especially for runs that used MCP servers, browser sessions, cloud credentials, private repositories, or customer data.

### 5) OpenClaw's skill model shows how installable capabilities become policy

OpenClaw's current docs describe skills as `SKILL.md` instruction bundles loaded from workspace, project-agent, personal-agent, managed, bundled, extra, and plugin roots. They also document per-agent allowlists, environment and API-key injection, plugin-shipped skills, snapshots that refresh when skills change, and a warning that skill allowlists are not a host shell authorization boundary.

That is exactly the right framing for installable agent skills. Skills are not just documentation. They influence what the agent knows how to do, what commands it is likely to run, which environment values may be injected, which remote nodes make skills eligible, and what capabilities are visible to each agent at session start.

For ClawList readers, the lesson is to review skills like policy plus code. Pin trusted skill roots, separate personal convenience skills from project automation, keep per-agent allowlists small, avoid silent environment injection, and remember that skill visibility must be paired with sandboxing, OS isolation, credential scoping, and network controls.

## Operator takeaways

### Record the delegated run's control state

Every handoff should capture MCP servers, enabled plugins, active skills, sandbox mode, network posture, model, budget, worktree, and parent-child relationship.

### Give autopilot modes concrete names

Avoid a generic "approved" flag. Define mode-specific authority so operators know whether a run may inspect, patch, test, install, use the network, push branches, or open pull requests.

### Treat child agents as auditable actors

Subagents and background agents should have IDs, inherited settings, independent status, interrupt behavior, and visible completion outcomes.

### Keep logs useful but bounded

Preserve decisions and tool-call evidence, but redact or avoid raw provider payloads, secrets, customer context, and full transcript exports unless explicitly needed.

### Pair skill allowlists with real isolation

Skill visibility improves prompt hygiene and routing, but shell authorization, network access, and credentials still need enforcement outside the prompt.

## Sources

- [GitHub Copilot CLI releases](https://github.com/github/copilot-cli/releases)
- [GitHub Copilot CLI changelog](https://github.com/github/copilot-cli/blob/main/changelog.md)
- [Claude Code releases](https://github.com/anthropics/claude-code/releases)
- [Codex changelog](https://developers.openai.com/codex/changelog)
- [OpenClaw repository](https://github.com/openclaw/openclaw)
- [OpenClaw skills documentation](https://docs.openclaw.ai/tools/skills)

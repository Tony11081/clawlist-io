---
title: "Agent Ops Brief - OpenClaw expands channel control, Claude Code hardens MCP recovery, and Codex ships a patch after 0.142"
summary: "OpenClaw's June 24 stable and late beta releases push agent operations toward channel-aware delivery, file-driven wake paths, plugin distribution, and safer fallback behavior; Claude Code 2.1.191 turns MCP retries, OAuth recovery, sandbox host grants, and stopped-agent finality into reliability work; and Codex 0.142.1 shows why teams should track patch-level CLI updates after major control-plane releases."
published_at: "2026-06-25"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-06-25.svg"
tags:
  - openclaw
  - claude-code
  - codex
  - mcp
  - orchestration
  - automation
  - plugins
---

## What changed (high signal)

### 1) OpenClaw's stable release made fast mode operational, not cosmetic

OpenClaw published **2026.6.10** on **June 24, 2026**, promoting the fast-mode work covered in the last brief from beta into the current stable line. The important part is not only that short conversational turns can run faster. It is that the release treats speed changes as runtime state that has to survive retries, fallback transitions, progress events, embedded clients, CLI clients, and ACP normalization.

The same release kept the surrounding control surface in scope:

- model routing through Zai, GLM overload failover, and reasoning-level selection
- session and channel state, including stale channel-origin resets
- cron delivery awareness attached to the target session
- trusted tool policies preserved across composed hook registries
- provider plugin registry refresh after setup-time installs

For operators, this is the right framing. Any automatic speed or reasoning-mode change needs to preserve identity, delivery context, approval policy, and fallback behavior. Otherwise, "fast mode" becomes another hidden branch in the agent runtime.

### 2) OpenClaw's June 24 beta shifts attention to channels, wake paths, and usage accounting

The later **2026.6.11-beta.1** release, also published on **June 24, 2026**, is bigger and more directional. Its highlights point toward OpenClaw as a multi-channel operations layer, not just a local coding assistant.

Notable operator-facing items:

- Slack relay mode and native Mattermost `/oc_queue` support
- per-DM model overrides for tuning conversations by channel
- `openclaw agent --message-file` for file-driven runs
- RAFT CLI wake bridge support for remote wake-up paths
- additional official plugins externalized with bundled icon metadata
- per-agent usage-cost reporting for tighter accounting
- better handling for Codex partial deltas, harness activation, and long-context prompt-cache stability

The practical signal is that agent products are converging on the same missing primitives: channel identity, queueing, remote wake-up, plugin metadata, and per-agent cost visibility. Those are runtime features, not UI preferences.

### 3) Claude Code 2.1.191 is a reliability release for real MCP usage

Anthropic's current Claude Code package is **2.1.191**, published on **June 24, 2026**. The release reads like a checklist from teams running MCP-backed agents in terminals, SSH sessions, and background task panels.

High-signal changes:

- `/rewind` can resume a conversation from before `/clear`
- stopped background agents no longer resurrect from the tasks panel
- managed settings refresh now honors `forceRemoteSettingsRefresh` and bypasses stale proxy caches
- sandbox network host approvals are remembered for the session
- MCP capability discovery retries transient network errors with backoff
- MCP OAuth discovery and token requests retry once after transient network errors
- headless MCP OAuth skips browser popup flow and goes straight to paste-the-URL
- MCP 404 messages include the URL and point back to config
- streaming response rendering reduces CPU usage by coalescing text updates
- long-session terminal-output memory growth is reduced

This is not flashy, but it is the work that makes background agents and MCP connectors survivable. Tool discovery, OAuth, sandbox grants, stopped-task finality, and long-session memory are the places unattended workflows fail first.

### 4) Codex 0.142.1 is a reminder to track patch releases after control-plane changes

OpenAI's Codex changelog still frames **0.142.0** as the major recent release: usage-limit reset credits, remote plugin surfacing, rollout token budgets, delegation controls, scoped indexed web search, scheduled reminders, and remote-executor resilience. The npm package has already moved to **0.142.1**, published on **June 25, 2026**.

That matters operationally even when the public changelog entry is still anchored on 0.142.0. The 0.142 line changes how teams govern multi-agent runs:

- budget enforcement can warn and abort instead of relying on prompt discipline
- delegation can be disabled, explicit-request-only, or proactive per thread and turn
- plugin provenance is easier to review through remote plugin categories
- web search can be allowed while page access stays server-scoped
- scheduled reminders and client-provided clocks make recurrent agent work less ad hoc

Patch-level releases immediately after that kind of control-plane update should be treated as required review items. They often carry the first fixes for edge cases that only show up once teams run the new controls under real automation load.

### 5) The common pattern is explicit recovery state

Across all three systems, the useful trend is not "more agents." It is more explicit recovery state:

- OpenClaw is preserving fast-mode, channel, cron, plugin, fallback, and cost context.
- Claude Code is retrying MCP discovery and OAuth paths while making stopped background agents stay stopped.
- Codex is giving teams budget, delegation, plugin, search, and scheduler controls that can be audited outside the prompt.

The next maturity test for agent stacks is whether every long-running workflow can answer five questions after a reconnect, retry, wake-up, or fallback: which channel is this for, which agent owns it, which tools are allowed, which model/provider is active, and how much budget remains?

## Operator takeaways

### Treat channel identity as first-class state

Slack, Mattermost, Telegram, WhatsApp, cron, CLI, and background panels all need explicit routing and delivery context. Do not rely on the last visible prompt to define where a response should land.

### Test MCP failure paths, not just happy-path auth

Add checks for transient `tools/list` failures, OAuth retry behavior, 404 config diagnostics, and headless auth flows. These are now active release surfaces in Claude Code and should be part of connector QA.

### Review patch releases after governance features

When a CLI adds budgets, delegation policies, plugin categories, or scoped search, follow the next patch release closely. The high-risk bugs are usually in resume, disconnect, fallback, and policy propagation.

### Require per-agent accounting before expanding background work

OpenClaw's per-agent cost reporting and Codex's rollout budgets point to the same operating rule: background agent lanes should have visible owner, budget, and stop conditions before they become routine.

### Make stopped mean stopped

Claude Code's background-agent finality fix is a useful standard. Any agent panel, queue, wake bridge, or retry loop should preserve an explicit terminal state instead of reviving work because a watcher still has stale state.

## Sources

- [OpenClaw 2026.6.10 release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.10)
- [OpenClaw 2026.6.11-beta.1 release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.1)
- [Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [@anthropic-ai/claude-code npm package](https://www.npmjs.com/package/@anthropic-ai/claude-code)
- [Codex changelog](https://developers.openai.com/codex/changelog)
- [@openai/codex npm package](https://www.npmjs.com/package/@openai/codex)

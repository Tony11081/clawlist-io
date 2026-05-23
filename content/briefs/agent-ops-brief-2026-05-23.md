---
title: "Agent Ops Brief — Permission profiles become the UI, and policy plugins ship with the runtime"
summary: "Codex makes permission profiles and goals more operational, Claude Code adds multi-session agent view while disabling remote control when API keys are set, OpenClaw tightens exec approvals with a policy plugin, and new research shows package hallucinations still enable slopsquatting."
published_at: "2026-05-23"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-05-23.png"
tags:
  - codex
  - claude-code
  - openclaw
  - permissions
  - supply-chain
---

## What changed (high signal)

### 1) Codex: permission profiles and goals move closer to “policy you can ship”

The open-source Codex runtime keeps turning safety knobs into *operational primitives*: goals are enabled by default with dedicated storage, and permission profiles add richer APIs and enterprise-oriented config support (including managed `requirements.toml`). The direction is clear: **agent governance is becoming a first-class runtime feature**, not a bolt-on checklist.

### 2) Claude Code: multi-session “agent view”, `/goal`, and a hard split between API-key mode and remote control

Claude Code shipped an “agent view” dashboard (`claude agents`) that makes parallel work observable as a list of sessions, plus `/goal` to run until a completion condition holds. In the same release line, Anthropic also drew a security boundary: Remote Control, `/schedule`, and Claude.ai MCP connectors are disabled when `ANTHROPIC_API_KEY` (or related auth tokens) are set — you must unset the API key to re-enable those features. That’s a useful precedent: **auth mode is policy**.

### 3) OpenClaw: stricter exec approvals + a bundled policy plugin + more “doctor” hygiene

OpenClaw’s latest releases keep converging on operational safety: the runtime removes a legacy exec allowlist compatibility path (pushing users toward safer “read then run” behavior), adds a bundled Policy plugin for conformance checks and opt-in repair, and expands “doctor” warnings (including plaintext secret-bearing config fields). This is what “agents in production” looks like: more guardrails, fewer quiet footguns.

### 4) Research: package hallucinations still leave a slopsquatting attack surface

New work re-evaluates package hallucinations across newer frontier code models and argues that even if hallucination rates change, the resulting **slopsquatting** risk remains: attackers can register the hallucinated names and turn “helpful install commands” into a supply-chain compromise. For agent workflows that can run shell/package managers, this is not theoretical — it’s an operator checklist item.

## Operator takeaways (do this, not vibes)

### Treat permissions as part of your UX

- Define named permission profiles (read-only, workspace-write, network-allowlisted) and use them consistently across local runs and CI-driven agent jobs.
- Force high-risk actions to stop for review: credential access, package installs, registry publishes, and any prod-facing commands.

### Make “auth mode = policy” explicit

- If your agent can run in both “API-key mode” and “signed-in mode”, document what capabilities change (remote control, connectors, scheduling).
- Don’t mix those modes inside a single run without a deliberate handoff step and a fresh approval checkpoint.

### Block the “hallucinated dependency” failure mode

- Add an allowlist step for package installs (or a registry-existence check) before any agent can run `npm i`, `pip install`, or similar.
- Prefer lockfiles and pinned versions; treat “new dependency” as a reviewed diff, not an emergent side effect.

## Sources

- OpenAI Codex (GitHub releases): “0.133.0” (May 21, 2026) — https://github.com/openai/codex/releases
- Claude Code Docs: “Week 20 · May 11–15, 2026” — https://code.claude.com/docs/en/whats-new/2026-w20
- OpenClaw (GitHub releases): “openclaw 2026.5.20” (May 21, 2026) — https://github.com/openclaw/openclaw/releases/
- arXiv: “The Range Shrinks, the Threat Remains: Re-evaluating LLM Package Hallucinations…” (Submitted May 16, 2026) — https://arxiv.org/abs/2605.17062

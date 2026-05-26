---
title: "Agent Ops Brief — Goals go default, desktop agent mode hardens, and MCP threat models get a name"
summary: "Codex 0.133.0 turns goals on by default and expands permission profiles + extension lifecycle hooks, Claude Cowork documents its VM + folder boundary and MCP/internet permissions, MCP-38 formalizes the MCP attack surface, and OpenClaw clarifies how skill precedence differs from Codex skill roots."
published_at: "2026-05-26"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-05-26.png"
tags:
  - codex
  - claude-code
  - cowork
  - mcp
  - openclaw
  - security
  - permissions
---

## What changed (high signal)

### 1) Codex: default-on goals + “policy as runtime” keeps accelerating

Codex 0.133.0 makes a few governance-adjacent choices that are easy to miss because they look like “just UX”:

- **Goals are enabled by default**, stored durably, and track progress across turns — a strong hint that “long-running agent intent” is becoming a first-class runtime object.
- **Permission profiles** pick up more operational surface area (list APIs, inheritance, managed `requirements.toml` support, stronger Windows sandbox integration).
- **Extensions get deeper lifecycle observability** (subagent start/stop, tool execution, async approval/turn processing) — the kind of hook surface you need for org policy plugins that are more than just lint.

### 2) Claude Cowork: the boundary is explicit (VM, connected folders, and egress controls)

Anthropic’s Cowork help center docs are worth reading not for the marketing, but for the **concrete boundary statement**:

- Shell/code execution runs inside an **isolated VM** (separate from the host OS).
- File access is constrained to **folders you explicitly connect**, and network follows configured egress settings.
- The permission system is framed as “same as chat”, but calls out two controls operators should treat as policy inputs: **which MCPs are connected** and **internet access**.

If you’re rolling desktop agents out to non-dev teams, this is the security model you’ll be asked to explain.

### 3) MCP-38: the MCP attack surface is now a protocol-specific taxonomy, not a vague fear

MCP is powerful because it normalizes tool access — and dangerous because it shifts risk into a **semantic interface** (tool descriptions, chaining, and trust boundaries). MCP-38 is one of the first attempts to name that precisely: a taxonomy of 38 MCP-specific threat categories, mapped to familiar frameworks (STRIDE + OWASP lists) and motivated by MCP’s distinct attack surface.

### 4) OpenClaw: skill roots and precedence differ from Codex (avoid “why can’t the agent find my skill?”)

OpenClaw’s skills docs call out a subtle operator gotcha: **Codex’s `$CODEX_HOME/skills` directory is not an OpenClaw skill root**. OpenClaw loads skills from workspace / project / personal / managed roots in a fixed precedence order, so importing existing Codex skills requires an explicit migration step instead of “it’s on disk so it should work”.

## Operator takeaways (do this, not vibes)

### Treat goal mode like a deployable primitive

- Define what “done” means per workflow (explicit stop conditions, artifacts to produce, checks to pass).
- Require an approval gate where a goal would cross boundaries (new deps, network egress changes, credential access).

### Make the desktop boundary reviewable

- Use “connected folders” as a least-privilege mechanism (separate workspaces for sensitive vs non-sensitive work).
- Treat “MCP connected” and “internet enabled” as policy toggles with auditability, not convenience settings.

### Threat-model MCP like a protocol, not a feature

- Add checks for tool-description poisoning, indirect prompt injection, and “parasitic” tool chaining to your review checklist.
- Prefer allowlists (servers, tools, domains) over post-hoc incident response.

## Sources

- OpenAI Codex (GitHub releases): “0.133.0” (May 21, 2026) — https://github.com/openai/codex/releases/tag/rust-v0.133.0
- Anthropic: “Get started with Claude Cowork” — https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork
- Anthropic: “Release notes” (May 2026) — https://support.claude.com/en/articles/12138966-release-notes
- arXiv: “MCP-38: A Comprehensive Threat Taxonomy for Model Context Protocol Systems” (Submitted Mar 18, 2026) — https://arxiv.org/abs/2603.18063
- OpenClaw docs: “Skills” (locations and precedence) — https://github.com/openclaw/openclaw/blob/main/docs/tools/skills.md

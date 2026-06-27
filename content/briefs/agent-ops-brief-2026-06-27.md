---
title: "Agent Ops Brief - Skill supply chains become the agent security perimeter"
summary: "Unit 42's OpenClaw marketplace findings, Claude Code's plugin-consent and MCP-auth fixes, Codex Remote's authenticated device pairing, and OpenClaw's provenance work all point to the same operational shift: agent teams need auditable skill sources, explicit plugin install consent, recoverable connector auth, and remote-session identity before expanding autonomous workflows."
published_at: "2026-06-27"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-06-27.svg"
tags:
  - openclaw
  - security
  - claude-code
  - codex
  - mcp
  - plugins
  - skills
  - automation
---

## What changed (high signal)

### 1) Malicious OpenClaw skills make marketplace trust an operating problem

Unit 42 reported on **June 23, 2026** that malicious OpenClaw skills were found in public marketplaces, including macOS-focused infostealer behavior. The practical point for ClawList readers is not that one package ecosystem had bad entries. It is that agent skills are now executable supply-chain artifacts: they sit close to prompts, tools, credentials, browser sessions, shells, files, and user trust.

That makes a skill catalog materially different from a prompt library. A prompt can be wrong or manipulative. A skill can include instructions, scripts, assets, connector setup, runtime assumptions, and hidden operational behavior. Once agents can install or activate skills from marketplaces, repositories, shared workspaces, or local paths, every team needs a review path that answers:

- who published it
- what code or instructions it adds
- which tools and credentials it can reach
- whether it is enabled by default
- how updates are reviewed
- how it is removed after a bad finding

The OpenClaw ecosystem has been moving fast on skills and plugins. This report turns provenance from a nice directory feature into a baseline control.

### 2) OpenClaw's latest beta work is already pointing at provenance

OpenClaw's newest public beta line remains **2026.6.11-beta.1**, published on **June 24, 2026**. In addition to channel and wake-path work, the release notes call out source provenance for official/builtin plugins and additional official plugins being externalized with bundled metadata.

That is the right direction after a marketplace-risk finding. Operators need to distinguish builtin, official, workspace, shared, local, and third-party entries without reading every file first. The next useful layer is policy: block unknown sources by default for background agents, require approval for marketplace installs, preserve plugin provenance in audit output, and show source identity when a skill changes the runtime.

For OpenClaw deployments, the immediate takeaway is to treat skill and plugin inventory as production dependency inventory. If an agent can load it, the team should be able to list it, source it, disable it, and explain why it is trusted.

### 3) Claude Code 2.1.195 closes plugin-consent and hook-matcher gaps

Claude Code's latest npm package is **2.1.195**, published on **June 26, 2026**. The release includes several items that sit directly on the same security boundary:

- external plugins enabled only through project settings now require explicit install consent across loader paths
- `/plugin` Enable/Disable works when marketplace names and plugin manifest names differ
- hook matchers with hyphenated identifiers now exact-match instead of accidentally substring-matching
- background jobs no longer disappear or run unreachable after newer-version writes or control-socket startup failures
- Remote startup now shows a provisioning checklist while the container starts

Those are not cosmetic fixes. Plugin consent has to be enforced consistently, hook matching has to be exact when MCP server names are tool selectors, and background jobs need visible state when they fail. Otherwise an agent runtime can drift from the operator's intended policy while still looking normal in the terminal.

### 4) Claude Code 2.1.193 makes MCP auth recovery visible

The **2.1.193** release, published on **June 25, 2026**, added another piece of the same operating model. Claude Code now shows a startup notice when MCP servers need authentication, improves `headersHelper` auth by rerunning the helper and reconnecting automatically after 401/403 tool-call responses, and follows marketplace plugin renames automatically.

This matters because MCP connectors are often where useful agent work meets credentials. A connector that silently fails auth can strand an automation. A connector that silently recovers without operator-visible state can hide policy drift. The stronger pattern is visible startup state, explicit auth repair, and preserved connector identity after renames.

The release also added auto-mode denial reasons to transcripts and permission UI, plus a setting that routes all shell commands through the auto-mode classifier. That moves command policy from hidden inference toward reviewable runtime evidence.

### 5) Codex Remote GA makes device pairing part of agent identity

OpenAI's Codex changelog now lists **Codex Remote reaching general availability**, with ChatGPT mobile access and authenticated one-to-one QR pairing between a mobile device and a host. The current npm package line is **@openai/codex 0.142.3**, published on **June 26, 2026**, following the 0.142 control-plane release covered earlier this week.

Remote control is powerful only if identity is crisp. A local terminal agent can lean on local session context. A remote/mobile agent lane needs a stronger record of which user, device, host, repo, sandbox, tool policy, and budget authorized the work. Authenticated pairing is a product-level answer to one part of that problem; teams still need to carry that identity into runbooks and post-run review.

The broader trend is clear: agent platforms are no longer just adding more execution surfaces. They are adding the identity, provenance, and recovery controls required to make those surfaces governable.

## Operator takeaways

### Review skills like dependencies

Add skills, plugins, and marketplace entries to dependency review. Capture publisher, source URL, install path, default-enabled state, tool reach, update policy, and removal steps.

### Require install consent on every loader path

Project settings, marketplace installs, local plugin folders, and shared workspace entries should converge on the same approval path. Loader shortcuts are where policy bypasses tend to live.

### Audit hook and tool matchers

Exact matching matters when identifiers such as `mcp__server-name` select real tools. Recheck broad wildcard rules, comma-separated matchers, and hyphenated server names after runtime upgrades.

### Make connector auth state visible

Treat MCP login, OAuth recovery, 401/403 reconnects, and plugin renames as observable events. A recovered connector should still leave enough trace for operators to understand what happened.

### Tie remote sessions to paired identity

For mobile or remote agent control, keep device, host, repo, sandbox, user, and budget identity together. Pairing is the entry point; post-run audit needs the full chain.

## Sources

- [Unit 42: OpenClaw's skill marketplace and the emerging AI supply chain threat](https://unit42.paloaltonetworks.com/openclaw-ai-supply-chain-risk/)
- [OpenClaw 2026.6.11-beta.1 release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.1)
- [OpenClaw npm package](https://www.npmjs.com/package/openclaw)
- [Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [@anthropic-ai/claude-code npm package](https://www.npmjs.com/package/@anthropic-ai/claude-code)
- [Codex changelog](https://developers.openai.com/codex/changelog)
- [@openai/codex npm package](https://www.npmjs.com/package/@openai/codex)

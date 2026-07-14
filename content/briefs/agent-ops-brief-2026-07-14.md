---
title: "Agent Ops Brief - Authority needs provenance"
summary: "Claude Code 2.1.207 closes several paths where unattended agents could inherit consent, configuration, or shell authority from the wrong place—a reminder to record who authorized every capability and where it came from."
published_at: "2026-07-14"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-14.svg"
tags:
  - agent-ops
  - claude-code
  - permissions
  - plugins
  - supply-chain
  - security
  - automation
  - provenance
---

## What changed (high signal)

### 1) A headless run cannot consent on a human's behalf

Claude Code 2.1.207 fixes remote managed settings from non-interactive runs being permanently recorded as consented even though no security consent dialog was shown. That is more than a UI bug: it separates configuration availability from authorization to use it.

An unattended process may discover a connector, policy bundle, or managed capability, but discovery is not consent. Persisted approval should require an authenticated actor, an explicit decision, the exact capability set, and an expiry or revocation path. If the runtime cannot present the approval surface, it should pause or stay within a previously granted scope.

Store consent as an auditable record rather than a boolean: actor, source, capability digest, environment, timestamp, expiry, and the run that consumed it. A headless worker may read that record; it should never mint one implicitly.

### 2) Repository configuration is input, not operator authority

The release stops auto mode from reading `autoMode` in repository-resident `.claude/settings.local.json`; the setting now belongs in the user's home configuration. Plugin option values likewise no longer come from project-level `.claude/settings.json`, only user, explicit `--settings`, and managed settings.

This is the right trust split for cloned repositories. Project files can describe how work should be performed, but they should not silently widen autonomy or supply privileged plugin values. Otherwise, opening a repository can change the agent's permission posture before the operator has reviewed the change.

Classify configuration keys by authority. Formatting preferences and test commands can be project-scoped. Permission mode, credential helpers, network destinations, destructive-operation policy, and secret-bearing plugin options should come from user, organization, or an explicit launch profile. Reject privileged keys at weaker scopes instead of resolving them by ordinary precedence.

### 3) Configuration interpolation becomes code at a shell boundary

Claude Code now rejects `${user_config.*}` inside shell-form plugin hook, monitor, and MCP `headersHelper` commands. Hooks are directed toward exec-form argument arrays or environment variables; monitors and helpers should read values inside their scripts or server environment.

The lesson is structural: quoting untrusted text inside one command string is an unreliable security boundary. Once configuration crosses into a shell parser, whitespace, substitutions, redirections, and control operators can turn data into behavior.

Prefer an executable plus an argument vector. Pass sensitive values through a narrowly scoped environment or file descriptor, validate them against the receiving program's schema, and redact them from traces. If shell syntax is unavoidable, treat the entire template as privileged code and keep user-controlled values out of it.

### 4) Approval evidence must name its source

The preceding 2.1.205 release changed background-task notifications to state explicitly that no human input occurred, preventing fabricated in-transcript approvals from being acted on. Version 2.1.207 also fixes benign system-generated conversation updates triggering prompt-injection warnings.

Together these changes show why plain transcript text is a poor control channel. A sentence that looks like approval may come from a user, a tool, another agent, a notification, restored state, or hostile content. The words alone do not establish authority.

Use typed events with an authenticated origin. Approval checks should accept only a dedicated decision event tied to a pending action ID and capability digest. Render system notices and agent messages differently, but enforce the boundary below the UI so copied text cannot impersonate an operator.

### 5) Safety policy must survive convenience features

The current changelog also records that sandbox auto-allow no longer bypasses dangerous-path checks for `rm` or `rmdir` against `/`, `$HOME`, and other critical locations. Auto mode now asks before `rm -rf` when its target variable cannot be resolved from context, and it blocks tampering with session transcript files.

Convenience policies should narrow prompts for well-understood actions, not disable invariant protections. A command may be allowed by the active mode and still be unsafe because its resolved target is critical, ambiguous, or part of the runtime's own audit trail.

Evaluate the concrete action after expansion and path resolution. Apply non-bypassable invariants last: protected roots, session state, credential stores, control sockets, and policy files. When resolution is incomplete, downgrade to human review instead of assuming the optimistic path.

## Operator takeaways

### Attach provenance to every grant

Record who approved which capability, from which surface, for what scope, and until when.

### Separate instructions from authority

Let repositories suggest workflows, but keep autonomy, credentials, and privileged plugin configuration at user or managed scope.

### Keep configuration out of shell strings

Use argument arrays and typed inputs; treat shell templates as privileged executable code.

### Accept only typed approval events

Never infer permission from transcript prose, notifications, tool output, or another agent's claim.

### Enforce invariants after resolution

Auto-allow may reduce friction, but it must not bypass checks on resolved targets or protected runtime state.

## Sources

- [Anthropic Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#21207)
- [Claude Code 2.1.207 raw changelog](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)
- [Claude Code security documentation](https://docs.anthropic.com/en/docs/claude-code/security)
- [Claude Code settings documentation](https://docs.anthropic.com/en/docs/claude-code/settings)

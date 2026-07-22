---
title: "Agent Ops Brief - Placement is an authority decision"
summary: "OpenClaw's new cloud-worker and native-session flows make a critical orchestration rule concrete: place execution near the work, but keep identity, credentials, adoption, and publication with the control plane."
published_at: "2026-07-22"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-22.svg"
tags:
  - agent-ops
  - openclaw
  - cloud-workers
  - orchestration
  - codex
  - claude-code
  - worktrees
  - mcp
  - automation
---

## What changed (high signal)

### 1) A worker should execute work, not own the workflow

OpenClaw 2026.7.2 beta 3 adds cloud-worker placement and dispatch for remote coding sessions. Its worker runtime accepts only the assigned session and turn, runs coding tools inside the worker workspace, proxies model calls through the Gateway, and sends transcript and lifecycle events back to the Gateway. It does not load standing model or forge credentials, start channels, or dispatch other workers.

This is a useful boundary for every agent platform. A remote executor needs enough authority to transform its assigned workspace, but it does not need to choose its next placement, impersonate the operator, publish upstream, or become a new control plane.

Issue a placement lease containing the session, turn, workspace snapshot, tool policy, model policy, deadline, and output contract. Make it single-purpose and expiring. Reject work that arrives outside the lease, and revoke it when the turn completes, is canceled, or moves elsewhere.

### 2) The sync anchor must have one owner

OpenClaw's cloud-worker design anchors a remote session to a Gateway-local managed worktree, never the user's live checkout. The worker authors commits in its isolated copy without credentials. The Gateway verifies that returned commits descend from the recorded base, adopts them into the local worktree, and retains responsibility for push, pull requests, and optional signing.

That ownership split prevents two dangerous ambiguities: which copy is canonical, and which machine may cross the trust boundary. Bidirectional directory sync without an exclusive owner turns ordinary edits, caches, generated files, and retries into nondeterministic merge inputs.

Record one authoritative workspace and one active placement epoch. Tag every outbound snapshot and inbound result with both. Before adoption, verify the base, expected repository identity, allowed paths, result digest, and placement epoch. If ownership changed while the worker was running, quarantine the result for reconciliation rather than applying it optimistically.

### 3) Resume on the host that owns the session

The Control UI can now discover Codex, Claude Code, OpenCode, and Pi sessions across the Gateway and paired nodes, then open an eligible session in its native CLI on the owning host. Terminal resume uses the stored working directory and an allowlisted duplex relay instead of exposing arbitrary node command execution.

A session ID is not enough to make a resume portable. Native agent state may depend on a host-local checkout, CLI version, credential boundary, transcript store, environment, and process contract. Recreating the command elsewhere can quietly produce a different agent with a familiar label.

Resolve resume through a host-qualified session handle. Validate host identity, runtime kind and version, working directory, repository state, and operator scope before opening the relay. If the owner is offline, report the session as unavailable; do not silently substitute a local process or a similarly named workspace.

### 4) Discovery and control are different capabilities

OpenClaw exposes remote coding catalogs as read-only node commands, while terminal resume is a separate allowlisted capability that can require approval when a node advertises a new command surface. Its Control UI defaults native Codex and Claude rows to a read-only viewer; opening the terminal is an explicit choice.

Keep those rungs separate: list, inspect, stream, resume, send input, cancel, mutate metadata, and publish. A dashboard that can show every session should not automatically be able to type into all of them. A relay that can carry keystrokes should not infer permission to upload files, approve tools, or change repository state.

Log the operator decision that crossed each rung. Make the UI show the owning host, workspace, branch, runtime, and whether the current view is observational or interactive before input becomes possible.

### 5) Tool connections belong to the requesting session

The same release scopes MCP server connections to their requesting session. That small-sounding change closes a large multi-tenant gap: a connection can carry authentication, negotiated capabilities, server-side state, pending requests, and resource handles that must not bleed into another session merely because both use the same server configuration.

Key connection pools by tenant, agent, session, server identity, credential identity, and policy revision. Never pool solely by endpoint. On cancellation, archive, credential rotation, or policy change, close or revalidate the connection and invalidate outstanding handles.

Treat tool output the same way. Bind every result to the requesting call and placement epoch, enforce size and type limits before it enters history, and refuse late results after the session has moved or ended.

## Operator takeaways

### Keep orchestration at the Gateway

Workers may execute an assigned turn, but placement, credentials, policy, adoption, and publication should stay with a trusted control plane.

### Give the workspace one owner

Use an isolated sync anchor, version every transfer, and require an explicit adoption step for remote results.

### Resume by qualified identity

Bind a native session to its host, runtime, working directory, and repository state. Offline should mean unavailable, not substituted.

### Split visibility from interaction

Grant catalog read, transcript read, terminal attach, input, cancellation, and publication as separate capabilities.

### Isolate stateful tools per session

Scope MCP connections, credentials, handles, and late results to the exact requesting session and placement epoch.

## A minimal placement record

Persist at least:

- session and turn IDs, tenant and agent identity, and placement epoch;
- owning Gateway, assigned worker, runtime version, and lease expiry;
- repository identity, base commit, managed-worktree ID, branch, and outbound snapshot digest;
- model route, tool policy, MCP server and credential identities, and policy revision;
- allowed paths, network destinations, resource budgets, and cancellation channel;
- worker result digest, authored commits, transcript-event range, and completion state;
- adoption checks, conflicts or quarantine status, approving operator or policy, and adopted commit;
- push, pull-request, signing, deployment, and rollback evidence performed by the trusted control plane.

Remote execution becomes safer when location is explicit state rather than an implementation detail. The worker can be disposable; authority and provenance cannot be.

## Sources

- [OpenClaw 2026.7.2 beta 3 release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.3)
- [OpenClaw cloud workers plan](https://docs.openclaw.ai/plan/cloud-workers)
- [OpenClaw worker runtime boundary](https://docs.openclaw.ai/cli/worker)
- [OpenClaw Control UI and native terminal resume](https://docs.openclaw.ai/web/control-ui)
- [OpenClaw managed worktrees](https://docs.openclaw.ai/concepts/managed-worktrees)
- [OpenClaw node session catalogs](https://docs.openclaw.ai/nodes)


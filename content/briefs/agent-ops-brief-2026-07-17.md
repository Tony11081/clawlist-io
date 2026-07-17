---
title: "Agent Ops Brief - Remote execution needs portable authority"
summary: "OpenClaw's new cloud-worker routing and session-scoped MCP changes expose the control plane remote agents need: bind identity, tools, approvals, history, and recovery to the session rather than the machine carrying it."
published_at: "2026-07-17"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-17.svg"
tags:
  - agent-ops
  - openclaw
  - codex
  - remote-agents
  - mcp
  - permissions
  - orchestration
  - automation
---

## What changed (high signal)

### 1) Session placement is now part of the agent control plane

OpenClaw 2026.7.2 beta adds placement, dispatch, and worker-turn routing for remote session execution. Its Control UI can run sessions on cloud workers, open Codex and Claude catalog sessions in terminals on their owning hosts, and resume other coding-agent sessions directly in a terminal.

That makes location a runtime property instead of a launch-time assumption. A conversation may begin in a browser, execute on a cloud worker, continue through a paired terminal, and surface approvals in a chat channel. The session is the durable unit; the current process, terminal, and host are replaceable carriers.

Give every session a stable ID and an attributable placement record: worker ID, host, repository, worktree, branch, runtime, model, tool policy, credential profile, and placement reason. Route follow-ups to the recorded owner or perform an explicit migration. Never let a reconnect silently create a second writer for the same session.

### 2) Tool isolation must travel with the session

The release scopes MCP server connections to the requesting session. That is a small line with a large consequence: a remote worker must not inherit a shared tool connection merely because another session on the same gateway already authenticated it.

Treat an MCP connection as a delegated capability, not ambient infrastructure. Bind it to the session, principal, server identity, granted scopes, repository or tenant, and expiration. On placement change or resume, re-evaluate the binding before the next tool call. A copied conversation should not copy live authority by accident.

Use separate connection pools when providers cannot enforce per-call identity. Log the session and grant used for every external action, but keep secrets and raw credentials out of the task transcript. Revocation should terminate or quarantine existing connections instead of only preventing new ones.

### 3) Human control must remain reachable during active turns

OpenClaw's channel fixes keep Signal stop and approval controls responsive during active turns, prevent Telegram durable-ingress loss after restart, and stop channel allowlists from granting owner access. Together they distinguish three properties that are often collapsed: a message was durably accepted, its sender was authenticated, and that sender was authorized for the requested control action.

Design stop and approval as control-plane traffic with priority over ordinary model output. A long tool call, full output buffer, or reconnect should not make the emergency brake unavailable. Persist inbound control events before acknowledging them, deduplicate on replay, and record the actor plus the exact session and action targeted.

Channel membership is not administrative authority. Map external identities to explicit roles, keep owner operations separate from conversational access, and make high-impact grants narrow and time-bound.

### 4) Recovery needs a ledger, not conversational guesswork

The release serves cron run history from a task ledger and fixes gateway admission, reply-session finalization, and one-shot cron lifecycle races. This points to a reliable recovery model: after a restart, reconstruct work from committed state transitions rather than from whichever messages remain visible.

Store dispatch, claim, start, checkpoint, side-effect, completion, failure, stop, and retry events with monotonic task revisions. A worker should atomically claim a revision before executing it. A one-shot job remains eligible until that claim is durably resolved, but an acknowledged side effect must not be repeated merely because the reply failed to finalize.

Use idempotency keys at the external boundary and reconcile uncertain outcomes before retrying. Chat delivery, Git pushes, deployments, payments, and destructive filesystem operations all need a recorded attempt ID and an observable result.

### 5) Command safety is contextual, not a keyword list

Codex CLI 0.144.5 expands dangerous-command detection to cover more forced `rm` forms and returns clearer rejection reasons. Better matching is useful, but remote execution makes context equally important: the same command has a different blast radius on an isolated disposable worktree than on a shared host or mounted production volume.

Evaluate the parsed operation, resolved target, execution host, sandbox, current repository, and active grant together. Reject unresolved variables and unexpectedly broad targets before execution. Return a structured reason that tells the agent what boundary was crossed without teaching it how to evade the policy.

Keep the policy outside the worker's ordinary write scope. Test equivalent spellings, flags, path traversal, symlinks, shell wrappers, and commands issued through tools rather than only direct terminal input.

## Operator takeaways

### Make the session the durable principal

Attach placement, model, repository, tools, approvals, and history to a stable session identity. Treat host and terminal changes as migrations.

### Scope every external capability

Bind MCP and other tool connections to the requesting session and explicit grant. Re-authorize after migration, resume, or policy change.

### Separate ingress, identity, and authority

Durably accept control events, authenticate the sender, then authorize the action. Channel access alone must not imply ownership.

### Recover from committed transitions

Use a task ledger and idempotency keys so restarts cannot lose accepted work or duplicate completed side effects.

### Check blast radius at execution time

Resolve the command, target, host, and sandbox together. A dangerous-operation detector should produce auditable policy decisions, not only pattern matches.

## A portable session envelope

Before dispatching or migrating a remote agent, carry a signed or integrity-protected envelope containing:

- stable session ID, task revision, and parent automation ID;
- authenticated actor and role for the current request;
- worker, host, repository, worktree, branch, and runtime identity;
- model and instruction-manifest digests;
- tool grants, MCP connection identities, scope, and expiry;
- approval policy plus pending stop or approval events;
- last durable ledger checkpoint and unresolved side effects;
- allowed migration targets and lease expiration.

The envelope should reference credentials, never contain them. Its purpose is to make authority portable without making it ambient.

## Sources

- [OpenClaw 2026.7.2 beta release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.1)
- [OpenAI Codex CLI 0.144.5 release notes](https://github.com/openai/codex/releases/tag/rust-v0.144.5)
- [OpenClaw pull request: cloud-worker session execution](https://github.com/openclaw/openclaw/pull/106332)
- [OpenClaw pull request: session-scoped MCP connections](https://github.com/openclaw/openclaw/pull/106359)


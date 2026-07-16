---
title: "Agent Ops Brief - A handoff is only useful if its state is true"
summary: "Claude Code's latest background-agent fixes expose a practical orchestration contract: preserve worker identity, report observed state, make stop final, isolate edits, and render approvals as hostile input."
published_at: "2026-07-16"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-16.svg"
tags:
  - agent-ops
  - claude-code
  - background-agents
  - orchestration
  - worktrees
  - permissions
  - observability
  - automation
---

## What changed (high signal)

### 1) Completion must be observed, not inferred

Claude Code 2.1.211 improves background-agent result reporting so the parent reports workers that are still running and waits for their actual completion instead of fabricating a finished result. The release also adds `--forward-subagent-text`, which can include subagent text and thinking in stream-JSON output.

These changes identify two different interfaces. The operator needs a compact, trustworthy lifecycle view: dispatched, running, waiting, stopped, failed, or completed. A debugging or orchestration client may additionally need the worker's streamed output. Neither should be reconstructed from a plausible model summary.

Make worker state a runtime event owned by the supervisor. A parent agent may explain a result, but it should not be able to declare a child complete. Emit child ID, parent ID, observed state, transition time, terminal reason, output-artifact references, and whether the parent actually waited for the terminal event.

### 2) A resumed worker must remain the same worker

The same release fixes subagents created with an explicit model override reverting to the parent's model after resume or follow-up. It also fixes killed background agents automatically respawning and revived agents replaying stale prompts from older sessions.

Identity continuity matters because model, instructions, tools, worktree, permissions, and task revision together define the worker that was delegated. If any of those silently change after sleep, reconnect, or follow-up, the resumed process is not operationally equivalent to the original one.

Persist an immutable launch manifest for every child: agent definition digest, model, reasoning or effort setting, tool allowlist, permission mode, working directory, worktree, environment profile, and exact task revision. On resume, compare the requested runtime with that manifest. Reject or record any migration instead of silently inheriting current parent defaults.

### 3) Stop is a terminal decision, not a temporary hint

Agent view is designed around sessions that survive terminal detachment and supervisor restarts. That persistence is useful, but it makes the difference between stopped, crashed, sleeping, and eligible-for-restart critical. Version 2.1.211's killed-agent fix shows what goes wrong when a user stop is treated like an incidental process exit.

Represent stop intent separately from process health. A crash may be restartable under policy; a user kill should remain terminal until an attributable actor explicitly respawns the worker. Store the stop actor, reason, timestamp, last acknowledged task revision, and whether unpushed work or open subprocesses remain.

For recurring automations, use idempotency keys at dispatch and at side-effect boundaries. A revived worker must not repeat an old push, message, purchase, deployment, or destructive command merely because its conversation replayed.

### 4) Worktree isolation must apply to commands as well as file tools

Claude Code 2.1.210 fixes `isolation: 'worktree'` subagents being able to run Git-mutating commands against the main checkout rather than the isolated worktree. The official agent-view documentation says dispatched sessions are blocked from editing until they enter a worktree, precisely to prevent concurrent agents from colliding.

Isolation is incomplete if only `Edit` and `Write` are scoped. Shell commands, Git discovery, hooks, package scripts, language servers, and MCP tools can all resolve paths or repository state independently. A worker operating in a worktree should see that worktree as its repository root across every execution path.

Verify isolation from inside the child, not only in the orchestrator configuration. Record `pwd`, Git top level, branch, worktree identity, and target paths before the first mutation. Add a canary test that attempts a harmless Git write and confirms the main checkout remains unchanged.

### 5) Approval previews are security-sensitive output

Version 2.1.211 neutralizes bidirectional-override, zero-width, and look-alike quote characters in permission previews relayed to chat channels. Version 2.1.210 also fixes auto mode overriding a `PreToolUse` hook's `ask` decision for unsandboxed Bash; a hook request now establishes a minimum of human review.

An approval surface is part of the authorization boundary. If untrusted tool input can visually reorder or hide what will execute, the operator may approve a different action from the one the runtime receives. If a lower-trust classifier can downgrade an explicit hook decision, policy composition is not monotonic.

Render a normalized preview while preserving the exact machine payload for audit. Flag invisible and directional characters, show the executable separately from its arguments, and identify the requesting worker and repository. Combine policy decisions by restriction: deny beats ask, and ask beats allow, unless a higher-trust managed policy explicitly says otherwise.

## Operator takeaways

### Separate state from narrative

Let the runtime own lifecycle transitions. Treat agent summaries as explanations, never as proof that a child finished.

### Pin the worker manifest

Persist model, instructions, tools, permissions, worktree, and task revision. Compare them whenever a worker resumes.

### Make stop durable

Do not automatically revive a user-killed worker. Require an explicit respawn event and guard side effects with idempotency keys.

### Test the whole isolation boundary

Confirm shell, Git, hooks, and external tools resolve to the child's worktree, not merely file-edit operations.

### Treat approval text as hostile

Normalize display-confusing Unicode, retain the exact payload, and compose permission decisions toward the most restrictive result.

## A minimal handoff record

Before a parent accepts child-agent work, require a machine-readable record containing:

- child and parent run IDs;
- immutable launch-manifest digest and task revision;
- observed terminal state and transition timestamp;
- worktree, branch, commit, and changed-file list;
- commands and validators executed with exit status;
- approvals requested, granted, denied, or still waiting;
- produced artifacts and unresolved risks;
- side-effect idempotency keys consumed by the run.

This is small enough to attach to a task, pull request, or automation log. More importantly, it lets the next human or agent distinguish finished work from a convincing story about finished work.

## Sources

- [Anthropic Claude Code changelog (versions 2.1.210 and 2.1.211)](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [Claude Code docs: Manage multiple agents with agent view](https://code.claude.com/docs/en/agent-view)
- [Claude Code docs: Run agents in parallel](https://code.claude.com/docs/en/agents)
- [Claude Code docs: Create custom subagents](https://code.claude.com/docs/en/sub-agents)


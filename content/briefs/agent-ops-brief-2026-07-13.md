---
title: "Agent Ops Brief - Every background task needs an owner"
summary: "OpenAI Agents SDK 0.18.2 pairs hosted multi-agent support with lifecycle fixes across sandboxes, realtime callbacks, state restoration, and refusals—a useful blueprint for orchestration that can stop cleanly and explain why."
published_at: "2026-07-13"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-13.svg"
tags:
  - agent-ops
  - openai-agents-sdk
  - multi-agent
  - orchestration
  - sandboxes
  - lifecycle
  - reliability
  - automation
---

## What changed (high signal)

### 1) Hosted multi-agent execution moves orchestration into the model runtime

OpenAI Agents SDK 0.18.2 adds beta support for hosted multi-agent workflows over the Responses WebSocket path. The implementation includes local function-tool injection, attribution for hosted agents, normalized output handling, examples, and regression tests.

That changes where orchestration can happen. A local coordinator no longer has to perform every handoff itself; the hosted runtime can delegate while local tools remain available. The benefit is less client-side routing code. The cost is another execution boundary whose events, identities, budgets, and outputs must be reconciled with the local run.

Treat hosted delegation as a child run, not an opaque model call. Give it a stable run ID, parent ID, agent identity, tool manifest, budget, deadline, and terminal outcome. If the hosted runtime returns work from several agents, preserve attribution through normalization instead of flattening everything into one assistant message.

### 2) A task is not owned unless shutdown can find and await it

The same release fixes unowned background work in three sandbox paths. Daytona PTY waiters and log readers are now retained by their owning PTY entry; Docker sessions retain and drain deferred workspace cleanup; Unix PTY file-descriptor closes remain tracked and receive a bounded shutdown grace period.

These fixes expose a durable runtime rule: creating an asynchronous task transfers responsibility to a lifecycle owner. Fire-and-forget cleanup is especially dangerous because a run can report completion while processes, readers, archive streams, or file descriptors remain alive.

Keep a registry of every worker created by a session. On stop, cancel cooperative work, await the exact workers, run provider cleanup, bound any operation that can stall, and assert that the registry is empty. Test normal completion, cancellation, partial startup, pruning, and repeated shutdown separately.

### 3) Terminal events must win the race against cleanup

Agents SDK 0.18.2 also changes realtime callback failures to enter the session queue synchronously instead of through untracked asynchronous tasks. This makes guardrail, tool-output retry, and tool-call failures immediately observable while preventing late errors from appearing after the session has closed.

Version 0.18.1 makes realtime cleanup deterministic through one session-owned task. It waits for cooperative cancellation before transport shutdown, blocks late mutation of closed state, shields shared cleanup from caller cancellation, and avoids a reentrant deadlock when tracked work calls `close()`.

Model the session as a state machine with one shutdown authority. Error, refusal, canceled, timed out, and completed should be explicit terminal outcomes. Once a terminal transition begins, new work must be rejected; once it finishes, callbacks must not mutate state or emit misleading success.

### 4) Restoration needs identity, not list position

Agents SDK 0.18.1 fixes nested agent-tool restoration when earlier serialized function entries are disabled, removed, or no longer parseable. The new path restores normalized nested run state without relying on the position of raw serialized entries.

Positional coupling is fragile in long-running automation. Tools change, approvals remove calls, plugins disappear, and schemas evolve between checkpoint and resume. If state is restored by array index, one skipped item can attach approval or continuation state to the wrong tool call.

Persist stable IDs and typed state for agents, calls, approvals, and checkpoints. During restoration, validate identity and schema version, record skipped entries, and fail closed when a pending action cannot be matched unambiguously. A successful JSON parse is not proof of a safe resume.

### 5) Refusal is a terminal signal, not an empty turn

The 0.18.2 LiteLLM fix turns empty `content_filter` completions into explicit refusal outputs. Previously, some providers could return an empty message with only a filtered finish reason; the agent loop treated that like a transient empty response and repeatedly prompted until its turn budget was exhausted.

This is a small adapter fix with a large orchestration lesson. Provider-normalization layers must preserve semantic outcomes. Empty, refused, interrupted, rate-limited, timed out, and transport-failed are different states with different retry policies.

Define a provider-independent outcome vocabulary and test every adapter against it. Refusals should stop or reroute according to policy, not trigger blind retries. Retry budgets should be keyed to classified failure types, with the original provider evidence retained for audit.

## Operator takeaways

### Assign every task to a lifecycle owner

Session objects should retain every worker they create and prove those workers are drained before reporting shutdown.

### Preserve the delegation tree

Record parent-child IDs, agent attribution, tool scope, budgets, and terminal outcomes across hosted and local execution.

### Use one terminal-state machine

Serialize shutdown, prevent late state mutation, and make failure events observable before cleanup removes their context.

### Restore by stable identity

Version serialized state and match calls by durable IDs, never by position after tools or approvals may have changed.

### Classify before retrying

Normalize provider outcomes so refusals, empty responses, rate limits, and transport failures receive distinct policies.

## Sources

- [OpenAI Agents SDK 0.18.2 release notes](https://github.com/openai/openai-agents-python/releases/tag/v0.18.2)
- [Hosted multi-agent beta implementation](https://github.com/openai/openai-agents-python/pull/3788)
- [Daytona PTY worker ownership fix](https://github.com/openai/openai-agents-python/pull/3778)
- [Docker deferred cleanup ownership fix](https://github.com/openai/openai-agents-python/pull/3779)
- [Unix PTY file-descriptor cleanup fix](https://github.com/openai/openai-agents-python/pull/3780)
- [Realtime callback error ordering fix](https://github.com/openai/openai-agents-python/pull/3777)
- [Deterministic realtime session cleanup](https://github.com/openai/openai-agents-python/pull/3767)
- [Nested tool-state restoration fix](https://github.com/openai/openai-agents-python/pull/3753)
- [Content-filter refusal normalization fix](https://github.com/openai/openai-agents-python/pull/3769)

---
title: "Agent Ops Brief - Recovery is a protocol, not a retry"
summary: "OpenClaw's extended-stable release hardens session, channel, and SQLite recovery. The durable pattern is to checkpoint intent and evidence, then reconcile every external effect before an agent resumes."
published_at: "2026-08-10"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-08-10.png"
tags:
  - agent-ops
  - openclaw
  - durable-execution
  - recovery
  - idempotency
  - checkpoints
  - agent-orchestration
---

## What changed (high signal)

### 1) OpenClaw hardened recovery across the whole run, not just the model call

OpenClaw's `2026.6.34` extended-stable release groups a set of repairs that point to the same operational problem: a long-running agent crosses many failure boundaries. Retained session writes, provider fallback, stream progress, and stdio failures now recover without silently ending active work. Pending channel work resumes after recovery, acknowledgements are idempotent, and SQLite checkpoint handling is more tolerant of transient host conditions.

That is more than crash resistance. An agent run spans model generation, local state, tool processes, message delivery, remote APIs, and the control plane supervising them. Recovering only the conversation can leave the run internally coherent but externally wrong: the model believes a message was not sent, a branch was not pushed, or a payment was not created when the side effect already happened.

Treat recovery as a protocol shared by every boundary. Each step needs a durable identity, committed inputs, a declared side-effect class, an observable completion record, and a reconciliation method. “Retry the turn” is not a recovery protocol.

### 2) Persist facts; reconstruct transient execution

A checkpoint should not serialize every incidental detail of a live process. File descriptors, sockets, streaming buffers, child-process handles, and in-memory locks are host-specific and often unsafe to revive. Persist the logical facts needed to reconstruct execution instead:

- the run, step, attempt, and parent identifiers;
- the admitted objective, policy, model, tools, and immutable inputs;
- the last committed state transition and its evidence;
- outstanding effects and their idempotency or reconciliation keys;
- budgets, deadlines, approvals, leases, and cancellation state;
- the exact condition that permits the next transition.

On restart, create a new execution attempt against that checkpoint. Reopen resources, reacquire leases, revalidate authority, and compare the world with the recorded expectation. A resumed process is a new attempt in the same logical run—not a continuation that can assume its former environment still exists.

### 3) Separate model continuation from effect continuation

OpenAI's background mode illustrates one useful boundary: a long-running response can execute asynchronously while the caller polls a durable response object instead of holding one fragile connection open. That protects generation from client timeouts, but it does not make downstream tool effects exactly-once.

Keep model progress and tool-effect progress in separate state machines. Model output may be safely regenerated when it has not crossed an effect boundary. A tool call that can mutate remote state must first receive a stable operation key and expected precondition. After any ambiguous timeout, query the destination using that key before deciding whether to retry.

Do not ask the model to infer whether an effect occurred from prose in the transcript. The control plane should supply a typed result: `not_started`, `confirmed_success`, `confirmed_failure`, or `unknown_requires_reconciliation`. Only the last state should block automatic continuation.

### 4) Make checkpoints atomic with the state they claim

SQLite write-ahead logging separates durable transaction records from later checkpointing into the main database. The implementation details vary by store, but the operator lesson is stable: never publish a checkpoint that claims a transition without atomically committing the state and evidence behind that claim.

Use a transactional outbox when a local transition schedules remote work. Commit the new state and an unsent outbox record in one transaction; a separate dispatcher delivers it with a stable operation key. For inbound events, record the delivery ID before processing. For locks and workers, use expiring leases plus fencing tokens so a delayed pre-crash worker cannot overwrite the result of a newer recovery attempt.

Checkpoint cadence should follow risk, not token count. Commit immediately before and after irreversible effects, approvals, authority changes, expensive tool runs, and handoffs between agents. Lightweight reasoning between those boundaries can often be replayed.

### 5) Recovery must preserve policy and cancellation

A stale checkpoint can outlive its credentials, approvals, repository revision, dependency versions, network policy, or operator intent. Blindly resuming with the old authority is both a correctness and security failure.

At recovery time, re-evaluate live policy against the checkpointed request. Verify that the task is still active, the target revision still matches, approval has not expired, budgets remain, secrets are valid, and the tool or skill digest is still admitted. Cancellation is a durable terminal signal, not an in-memory flag that disappears during a restart.

If policy changed, do not silently replay under a different contract. Pause with a typed reason and preserve a migration path: restart from a safe boundary under the new policy, request renewed approval, or terminate and compensate completed effects.

## Operator takeaways

### Give every logical step a stable identity

Attempts may multiply after failures; the run and operation keys must not.

### Reconcile before retrying

After an ambiguous response, inspect destination state using the stable operation key and expected precondition.

### Checkpoint around effects

Persist intent before mutation and durable evidence after it. Replay reasoning freely only between effect boundaries.

### Fence stale workers

Use leases and monotonically increasing fencing tokens so an old process cannot commit after recovery assigns the work elsewhere.

### Reauthorize on resume

Recheck cancellation, approvals, budgets, target revisions, credentials, tools, skills, and network policy before continuing.

## A minimal recovery receipt

Persist at least:

- run ID, parent run, step ID, attempt number, checkpoint version, creation time, worker identity, and fencing token;
- objective digest, policy version, target revision, model, tool and skill digests, authorized capabilities, budgets, deadlines, and cancellation state;
- input references and digests, last committed transition, output references, transcript position, and evidence for completion;
- effect type, destination, stable operation key, expected precondition, request digest, dispatch time, acknowledgement, remote object ID, and reconciliation result;
- lease owner and expiry, retry class, backoff, provider fallback, stream position, local transaction or outbox ID, and delivery acknowledgement;
- recovery trigger, newly evaluated policy, changed dependencies, renewed approvals, compensation actions, verification result, and final disposition.

The durable pattern is not “restart the agent where it stopped.” It is “restore committed facts, establish fresh authority, reconcile the outside world, and advance exactly one valid transition.”

## Sources

- [OpenClaw 2026.6.34: recovery, delivery, and SQLite reliability fixes](https://github.com/openclaw/openclaw/releases/tag/v2026.6.34)
- [OpenAI API: Background mode for long-running responses](https://developers.openai.com/api/docs/guides/background)
- [SQLite: Write-ahead logging and checkpointing](https://www.sqlite.org/wal.html)
- [GitHub: Copilot agent session streaming](https://github.blog/changelog/2026-07-02-copilot-agent-session-streaming-is-now-in-public-preview/)

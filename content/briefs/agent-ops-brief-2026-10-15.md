---
title: "Agent Ops Brief - Make the task record the control plane, not the chat"
summary: "Long-running agent work becomes operable when the durable task—not an individual session or pull request—owns state, evidence, recovery, and the next human decision."
published_at: "2026-10-15"
tags:
  - agent-ops
  - codex
  - agent-orchestration
  - automation
  - reliability
  - workflow-design
  - governance
  - openai
---

## What changed (high signal)

### 1) The orchestration unit is moving from a session to a durable task

OpenAI's current Agents API describes the infrastructure needed for agents that run for days: durable sessions, context management, recovery, tools, environments, and subagent coordination. Its Symphony orchestration specification makes the corresponding operating choice explicit: use the issue tracker as the control plane, and assign an agent workspace to each active task.

That distinction is more than a UI preference. A chat or terminal session is an implementation detail that can time out, lose context, or be restarted. A task record can outlive all of those events. It can retain the requested outcome, status, owner, constraints, artifacts, validation evidence, dependencies, and the next required human decision.

For a practical agent program, start with a single durable task ID and let every run, workspace, branch, pull request, log stream, and deployment receipt attach to it. Do not make the human reconstruct the work from tabs.

### 2) Treat task status as a small, enforceable state machine

Symphony's central pattern is simple: agents only take unblocked work, and task dependencies determine what can run in parallel. The useful implementation lesson is to keep the task lifecycle small enough to audit:

```text
intake → ready → running → awaiting-review → approved-to-effect → done
                    ↘ blocked / failed / cancelled
```

Each transition should have an owner and an evidence rule. For example, `running → awaiting-review` requires a diff or deliverable plus validation output; `awaiting-review → approved-to-effect` requires an explicit reviewer decision; `approved-to-effect → done` requires the external receipt, such as a merged commit or published deployment.

Avoid statuses that report mood rather than control state—"almost done," "looking," or "needs attention." An orchestration system can safely retry, assign, or escalate only when it can tell what happened and what is permitted next.

### 3) Parallelism needs bounded workspaces and explicit merge points

More agents do not automatically mean more throughput. OpenAI's Symphony write-up describes task trees whose independent nodes can run in parallel; it also separates large deliverables from the individual sessions that produce them. The operational constraint is shared state.

Give each agent a bounded workspace, a narrow task contract, and one integration point. A research task may write a cited report; an implementation task may produce a branch and test output; a reviewer task may produce findings only. Let one designated integration task reconcile overlapping changes. This prevents parallel agents from silently competing over the same files, external record, or production decision.

Use a dependency edge whenever one task needs another's artifact, approval, or environment mutation. Use a shared label only for discovery—not as a substitute for a prerequisite.

### 4) Recovery needs receipts, not just retries

OpenAI's safety guidance pairs bounded execution and approval policies with agent-native telemetry. Apply the same idea to ordinary reliability: if a worker restarts, it should first read the task record and receipts, then decide whether to resume, retry, or escalate. It should not blindly replay a destructive step because a previous session disappeared.

Capture the smallest useful receipt at every consequential boundary:

- source URLs and notes after research;
- patch, branch, and validation output after a code change;
- reviewer decision before a write with external impact;
- object ID, deployment URL, or transaction reference after the effect.

This is what makes retry safe. A restart that sees a successful receipt can advance the task; a restart without one can present the incomplete boundary for review instead of duplicating the action.

## Operator takeaways

### Make the task readable without its agent transcript

A reviewer should be able to answer five questions from the task record: what outcome is requested, what may the agent do, what has it done, what proof exists, and what decision is next. Link the transcript for detail, but do not make it the database of record.

### Separate assignment from authorization

Assigning an agent to `ready` work starts analysis or implementation within its workspace. It should not automatically authorize irreversible effects. Put approvals at explicit state transitions and retain the approval alongside the resulting receipt.

### Design for a worker that disappears mid-task

Assume every agent can be interrupted. Store checkpoints as artifacts, keep mutations idempotent where possible, and mark the uncertain boundary rather than guessing. Reliable orchestration is less about perfect sessions than about recoverable work.

### Measure flow, not just completions

Track time in each state, retry counts, blocked reasons, validation failures, reviewer wait time, and the rate of duplicate or conflicting work. These show whether adding agents is accelerating delivery or simply creating more coordination load.

## A task record worth keeping

For every consequential agent task, retain the outcome and acceptance criteria; risk tier and allowed effects; dependencies and assigned workspace; current state and transition history; source, patch, test, and approval receipts; retry policy and escalation owner; and links to the resulting branch, pull request, deployment, or external object. That compact record turns a collection of autonomous sessions into an operable system.

## Sources

- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [OpenAI: An open-source spec for Codex orchestration: Symphony](https://openai.com/index/open-source-codex-orchestration-symphony/)
- [OpenAI: Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/)
- [OpenAI Developers: Skills](https://developers.openai.com/plugins/concepts/skills)

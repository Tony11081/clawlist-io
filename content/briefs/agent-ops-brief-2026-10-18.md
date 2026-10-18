---
title: "Agent Ops Brief - Make recovery a workflow, not a fresh prompt"
summary: "Recent OpenClaw recovery fixes underline a durable rule for agent operations: retain a resumable work record outside the chat, then restart from verified state—not from memory."
published_at: "2026-10-18"
tags:
  - agent-ops
  - openclaw
  - codex
  - automation
  - reliability
  - recovery
  - agent-orchestration
---

## What changed (high signal)

### 1) Recovery is now a first-class agent workflow problem

OpenClaw's October 2026 maintenance releases focus on failure modes that become visible only after agents run for a while: interrupted work after sleep or clock changes, chats that remain stuck after an update, and missing or repeated replies. The release notes also distinguish a conversation reconnect from the work request's own timeout. That distinction matters.

An agent can lose a browser tab, gateway connection, process, or local session without the underlying task becoming invalid. Conversely, a chat can look healthy while the task has exceeded its deadline, lost a required approval, or performed an effect that must not be repeated. Treating “start a new prompt” as the universal recovery action hides both cases.

Design recovery around the **work record**, not the interface that last displayed it.

### 2) Persist a resume receipt at every safe checkpoint

For each meaningful checkpoint, write a compact, machine- and reviewer-readable receipt outside the agent's transient context:

- immutable task-contract version, owner, risk tier, and deadline;
- current phase and the next allowed action;
- source revision, workspace/environment identifier, and dependency versions;
- completed effects with idempotency keys or external receipts;
- artifact locations, validation commands and their exact results;
- unresolved approvals, failure reason, and a bounded retry count.

This receipt is smaller than a full transcript but much more useful during recovery. A replacement worker should be able to answer three questions before taking action: **what was authorized, what definitely happened, and what remains safe to do?** If any answer is missing, it should stop at the uncertainty rather than replay an action that might charge a customer, overwrite data, or publish a duplicate change.

### 3) Separate session repair from task repair

Use two distinct recovery paths:

```text
session unavailable
  -> reconnect or provision a replacement worker
  -> load the latest resume receipt
  -> re-check access, source revision, and task deadline
  -> continue from the recorded checkpoint

task invalid, expired, or materially changed
  -> retain the receipt as evidence
  -> pause and request a new contract or human decision
```

The first path restores execution capacity; the second changes authorization. Merging them is how a harmless reconnect turns into silent scope drift. OpenAI's Agents API describes durable environments, intermediate results, and recovery as core infrastructure for agents that run continuously; its Codex safety guidance makes the complementary governance point: lower-risk actions should remain easy inside technical boundaries, while higher-risk actions must be explicit.

### 4) Test recovery as a product capability

Do not wait for a production outage to discover whether a long-running automation is resumable. Add controlled interruption drills to the operating plan:

- terminate a worker after it has created an artifact but before its final response;
- revoke and restore an integration connection between checkpoints;
- restart after a simulated sleep, clock change, or deployment;
- attempt the same external effect twice and confirm the second attempt is safely deduplicated;
- hand the resume receipt to a fresh worker and verify that it reaches the same next action.

Track recovery latency, the percentage of resumes requiring human clarification, duplicate-effect attempts prevented, and tasks abandoned because no trustworthy receipt existed. Those measures expose whether the system is actually durable or merely lucky when sessions stay alive.

## A practical starting policy

Choose one automation that can run longer than a single human attention span. Define two or three safe checkpoints, store an append-only resume receipt at each, and make the worker prove that the receipt still matches the environment before it continues. Give retries a small, explicit budget; after it is exhausted, surface the receipt to a human with one precise decision to make.

Reliable automation is not an agent that never disconnects. It is a system that can reconnect without guessing—and can refuse to continue when the facts no longer justify the next effect.

## Sources

- [OpenClaw: v2026.10.4 release notes](https://docs.openclaw.ai/releases/2026.10.4)
- [OpenClaw: v2026.10.2 release notes](https://docs.openclaw.ai/releases/2026.10.2)
- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [OpenAI: Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/)

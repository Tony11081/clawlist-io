---
title: "Agent Ops Brief - Version the task contract, not just the code"
summary: "Long-running agents need a stable, reviewable task definition. Give each run an immutable contract version and explicit change path, so a moving ticket cannot silently turn into a different job."
published_at: "2026-10-17"
tags:
  - agent-ops
  - codex
  - agent-orchestration
  - automation
  - task-design
  - reliability
  - openai
---

## What changed (high signal)

### 1) Long-running agent work makes mutable tickets an execution risk

OpenAI's Agents API is aimed at work that can run for days, with durable execution, environments, intermediate results, and subagent coordination. Symphony makes the related workflow decision explicit: the issue tracker becomes the control plane and each active task receives a dedicated agent workspace.

That model has an easy-to-miss consequence: an issue cannot remain an informal, continuously editable conversation once an agent has started acting on it. A title, comment, linked document, acceptance criterion, or priority may change while the worker is reading files, opening a pull request, or waiting for approval. If the run silently follows the newest text, its original evidence no longer proves what it was authorized to do. If it follows stale text, it may finish the wrong job.

Treat the task definition as a versioned **contract** at dispatch time.

### 2) Freeze the executable definition into a compact receipt

Create a task-contract record when work begins. It should contain the resolved values the agent is actually allowed to use, rather than only a link back to a mutable issue:

- immutable task ID and contract version;
- outcome, acceptance tests, risk tier, and explicit non-goals;
- repository, branch, environment, dependency, and source-document revisions;
- allowed effects, approval requirements, cost/time budget, and owner;
- inputs and context artifacts with timestamps or content digests;
- required final evidence: patch or artifact, validation output, external action receipt, and the next human decision if incomplete.

This is not needless process. OpenAI's safety guidance emphasizes bounded execution, explicit approval for higher-risk actions, and telemetry that can explain what an agent did. A concrete contract gives those controls something unambiguous to evaluate. It also lets a reviewer distinguish “the agent did not finish” from “the requested work changed underneath it.”

### 3) Make a change a state transition—not an invisible prompt edit

Do not expect an in-flight agent to infer whether a ticket edit is cosmetic, clarifying, or a new authorization. Define an explicit policy:

```text
contract change detected
  -> classify as editorial, compatible, or material
  -> editorial: retain original contract; attach annotation
  -> compatible: create v+1; resume only at a safe checkpoint
  -> material: pause current run; require re-review and re-dispatch
```

A material change includes a new external target, higher privilege, changed acceptance test, different production environment, altered source of truth, or expanded scope. The run should stop before its next consequential effect—not attempt to merge two incompatible instructions from chat history.

For compatible changes, create a new contract version and record why continuation is safe. The agent must re-check its repository revision, prior side effects, remaining budget, permissions, and any already-completed validation. This preserves a useful audit trail without forcing teams to restart harmless work for every wording fix.

### 4) Review contracts where intent becomes action

The most valuable review point is just before execution, not after the result appears. Show the human operator a compact dispatch preview: requested outcome, diff from the previous contract, intended workspace and tools, proposed effects, acceptance evidence, and escalation conditions. The same information should be available to a resumed worker.

OpenAI's skills documentation draws a related boundary: a skill provides repeatable workflow guidance, while its tools provide controlled actions. Apply that separation to task updates. A new note can improve context, but it should not silently expand tool authority or redefine completion. Those changes belong in the contract and must pass the corresponding policy gate.

## A practical starting policy

Start with one workflow where tickets commonly change mid-flight—release preparation, customer-data cleanup, migration planning, or dependency remediation. Snapshot the task at dispatch and put its version in every status event, branch name, artifact, and approval. Require a human decision for material changes; allow narrowly defined compatible updates only at checkpoints. Then measure how often work is paused because the original request was underspecified or changed. That number is a signal to improve intake, not to ask agents to guess harder.

Reliable autonomy depends on a simple invariant: every effect must be attributable to a particular approved task definition. Versioning the task contract makes that invariant visible, enforceable, and recoverable.

## Sources

- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [OpenAI: An open-source spec for Codex orchestration: Symphony](https://openai.com/index/open-source-codex-orchestration-symphony/)
- [OpenAI: Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/)
- [OpenAI Developers: Build skills](https://developers.openai.com/plugins/build/skills)

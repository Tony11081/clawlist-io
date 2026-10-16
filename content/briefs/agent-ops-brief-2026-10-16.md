---
title: "Agent Ops Brief - Plan capacity in runnable hours, not agent seats"
summary: "As agent work becomes longer-running and more parallel, the useful capacity unit is supervised runnable hours with bounded concurrency—not the number of licenses or chat seats purchased."
published_at: "2026-10-16"
tags:
  - agent-ops
  - codex
  - agent-orchestration
  - automation
  - capacity-planning
  - reliability
  - openai
---

## What changed (high signal)

### 1) Long-horizon agent work is becoming normal operating load

OpenAI's current research says that, by May 2026, more than 70% of Codex users had asked it to tackle work estimated to take a person more than an hour. At the high end, users were regularly generating more than 60 hours of agent turns in a day across multiple parallel agents. The corresponding Agents API launch describes the infrastructure required for that class of work: durable execution, context management, tools, environments, intermediate results, and subagent coordination.

The operational implication is straightforward: an agent program is no longer sized by how many people can open a chat. It is sized by how much work can run concurrently while still receiving the context, compute, review, and recovery attention it needs.

### 2) Use a capacity model that exposes the real bottleneck

For a recurring automation, estimate demand as **runnable agent-hours**, then constrain it by the narrowest stage:

```text
weekly demand = tasks × median agent runtime × expected retry factor

safe throughput = min(
  allowed concurrent environments,
  tool/API concurrency,
  CI and deployment capacity,
  reviewer decision capacity
)
```

The final line is often the surprise. A team can add more agents without increasing throughput if every meaningful task still queues behind the same test runner, protected environment, approver, or integration owner. Treat each of those as a named capacity pool, rather than assuming the model is the only scarce resource.

### 3) Reserve concurrency for recovery and urgent work

Long-running jobs fail, pause for an approval, or discover a dependency. If every environment slot is occupied by routine work, recovery work competes with new work and the queue becomes hard to predict.

Keep a small explicit reserve for three classes of work:

- **recovery:** retries or resumed tasks with incomplete receipts;
- **urgent:** time-sensitive incidents, customer-impacting fixes, or a human escalation;
- **integration:** validation and merge work that resolves the outputs of parallel agents.

Do not make an agent reacquire its entire context simply because it waited for capacity. Persist a task record with its goal, constraints, current phase, source or patch artifacts, validation output, and the exact unresolved decision. That turns a pause into an ordinary scheduling event instead of a costly restart.

### 4) Measure utilization alongside decision latency

High environment utilization can look efficient while making the system slower. Once review or approval is the limiting pool, extra agent execution merely creates a larger pile of work waiting to be judged.

Track these together:

- runnable agent-hours requested, started, completed, retried, and abandoned;
- queue time by capacity pool and by task risk tier;
- median time from completed artifact to reviewer decision;
- rework caused by stale context, failed validation, or integration conflicts;
- the percentage of work that needs a human decision before it can continue.

The goal is not maximal agent utilization. It is predictable flow with enough headroom to recover safely and enough evidence that a reviewer can make a quick, informed decision.

## A practical starting policy

Start with a small fixed concurrency limit and allocate work into three lanes: routine, recovery, and integration. Require every task to report an estimated runtime, risk tier, dependency state, and a resume receipt before it enters the queue. Review the queue weekly: if routine work backs up, find the constrained pool before buying more execution capacity. If review is the constraint, improve the evidence and acceptance criteria delivered to reviewers instead of adding more parallel agents.

This keeps automation from creating a fast but ungovernable backlog. The right question is not “How many agents do we have?” It is “How many autonomous hours can this system safely supervise to a verified outcome?”

## Sources

- [OpenAI: How agents are transforming work](https://openai.com/index/how-agents-are-transforming-work/)
- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [OpenAI: Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/)
- [OpenAI: The EU's next chapter in AI is agentic](https://openai.com/index/the-eus-next-chapter-in-ai-is-agentic/)

---
title: "Agent Ops Brief - Measure delegated work, not AI access"
summary: "Enterprise Codex output now outweighs chat output, while frontier firms use plugins and skills far more deeply. The operating gap is moving from model access to repeatable workflows, scoped authority, review, and outcome evidence."
published_at: "2026-08-29"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-08-29.png"
tags:
  - agent-ops
  - codex
  - enterprise-agents
  - agent-skills
  - plugins
  - governance
  - measurement
---

## What changed (high signal)

### 1) Enterprise AI usage is crossing from answers into execution

OpenAI's August enterprise research gives the transition a useful quantitative marker: as of June, Codex produced 64% of combined Codex and ChatGPT output tokens among enterprise customers. The measure does not prove that 64% of work was valuable or autonomous—agent tasks naturally emit more tokens—but it does show that longer, multi-step production is becoming a larger part of enterprise AI use than conversational output.

The operating unit therefore needs to change. A chat message is easy to count but says little about delegated work. An agent run has an intent, inputs, tools, permissions, intermediate actions, artifacts, checks, reviewer decisions, and a terminal outcome. Measure that complete chain.

For every repeatable workflow, track admitted tasks, successful completions, human interventions, rejected outputs, cycle time, review time, cost, and downstream acceptance. Keep output tokens as a capacity signal, not a proxy for productivity.

### 2) The frontier gap is a workflow gap

OpenAI classifies the top 10% of enterprise customers by monthly output tokens per active user as frontier firms. In June, those firms generated 8.3 times as many output tokens per user as typical firms, up from 2.6 times in January. Access to the same model does not explain that widening difference by itself.

Frontier firms also use reusable capabilities more often. Among weekly active users, 21% use Plugins and 19% use skills, compared with 9% and 3% at typical firms. That correlation is not proof that plugins caused deeper usage, but it supports a practical hypothesis: teams compound value when they package context, instructions, tools, and review criteria into reusable operating paths.

Do not respond by maximizing installs. Build a small portfolio of versioned workflows tied to valuable jobs, named owners, bounded data access, and measurable service levels. A capability catalog becomes useful when each entry states what it is for, who may invoke it, which evidence proves success, and how it is disabled.

### 3) Non-engineering adoption moves agents into new authority domains

Since February, weekly active enterprise Codex users reportedly grew 108 times in legal, 41 times in sales, 41 times in recruiting, and 26 times in marketing, versus 5 times in engineering. These are growth multipliers from different starting points, not comparable absolute usage shares. The directional signal is still important: agent operations can no longer inherit governance designed only for source code.

A legal workflow may touch privileged documents and retention rules. Recruiting introduces candidate data and employment decisions. Sales connects customer records, pricing, and outbound communication. Marketing can publish externally or spend budget. Each domain needs its own authority map, review threshold, evidence policy, and incident owner.

Keep a shared agent control plane, but make policy task-specific. The same model should receive different tools, data scopes, approval requirements, and retention rules when drafting an internal code migration versus preparing a customer proposal.

### 4) Reuse needs an evidence-backed promotion path

The research recommends turning effective individual workflows into shared ways of working. That is the right direction, but an individual's successful prompt is not yet an organizational procedure. It may depend on ambient credentials, undocumented judgment, forgiving reviewers, or data the next user cannot safely access.

Promote workflows in stages:

- capture the task boundary, required context, tools, expected artifact, and review rubric;
- replay representative successes and failures in an isolated environment;
- replace ambient access with explicit identities and least-privilege grants;
- version the skill, plugin, model route, and policy together;
- pilot with a named owner and mandatory review;
- expand autonomy only when acceptance, intervention, and incident evidence justify it.

Every promotion should be reversible. Preserve the previous workflow version, record which runs used each version, and define a kill switch that removes execution authority without erasing evidence.

### 5) Outcome telemetry must catch hidden human work

Agent output can grow while total work stays flat if people spend more time correcting, reconciling, or re-running it. Aggregate token volume also hides abandoned runs and low-value fan-out. The durable metric is accepted work per constrained unit of time, cost, and risk.

Instrument both the agent and the surrounding human process. Capture queue time, run time, tool errors, approval waits, reviewer edits, rework, rollback, and the lag until an artifact is actually used. Sample completed runs for false-success states: green checks with the wrong artifact, technically valid output that violates policy, or a draft that never reaches its intended destination.

## Operator takeaways

### Define a workflow before buying more capacity

Name the job, owner, inputs, authority, artifact, verifier, service level, and stop conditions. More tokens cannot repair an undefined operating contract.

### Separate depth from value

Use tokens and runtime to understand consumption. Use accepted outcomes, cycle time, rework, and incidents to understand value.

### Govern by task domain

Legal, recruiting, sales, marketing, and engineering runs should not inherit one generic permission profile just because they share a model or client.

### Promote reusable capabilities deliberately

Move a personal prompt into a shared skill only after replay, least-privilege design, ownership, versioning, and rollback are in place.

### Measure the reviewer loop

Human correction is part of the system. If it is invisible, automation quality will be overstated.

## A minimal delegated-work receipt

Persist at least:

- workflow name and version, business owner, task class, requester, intended beneficiary, priority, and service-level target;
- skill and plugin revisions, model route, instructions, input sources, data classification, tool inventory, and effective permissions;
- run, thread, parent and child IDs, start and end times, retries, checkpoints, approvals, denials, and stop reason;
- artifacts produced, destination, validation results, reviewer, edits after generation, acceptance decision, and time to use;
- tokens, runtime, tool calls, external writes, cost, queue delay, review time, rework time, rollback, and incident linkage;
- baseline comparison, expected value, realized outcome where observable, and the decision to retain, revise, restrict, or retire the workflow.

Enterprise agents are no longer constrained mainly by access to a capable model. The compounding advantage comes from converting valuable work into reusable, governed execution paths—and proving that those paths produce accepted outcomes without hiding cost or risk in the reviewer loop.

## Sources

- [OpenAI: From assistance to execution — how enterprises put AI to work](https://openai.com/index/how-enterprises-put-ai-to-work/)
- [OpenAI: Enterprise Signals](https://openai.com/business/guides-and-resources/enterprise-signals/)
- [OpenAI: How agents are transforming work](https://openai.com/index/how-agents-are-transforming-work/)

---
title: "Agent Ops Brief - Trace the decision path, not just the tool calls"
summary: "GitHub's Copilot app can now export agent activity through OpenTelemetry. Use traces to connect an agent's objective, policy decisions, tool effects, and validation evidence—not to create a surveillance archive of every prompt."
published_at: "2026-10-07"
tags:
  - agent-ops
  - observability
  - opentelemetry
  - github-copilot
  - codex
  - governance
  - automation
  - reliability
---

## What changed (high signal)

### 1) Agent traces are moving into the existing observability stack

GitHub's Copilot app now supports OpenTelemetry configuration through enterprise-managed settings. That gives teams a way to send agent-session activity to their existing monitoring tools and follow a session's model requests and tool use through a trace, rather than treating each agent run as an opaque chat.

The useful shift is not “collect more agent data.” It is joining the facts needed to answer an operational question: what was the requested outcome, what boundary applied, what did the agent try, what external effect occurred, and what evidence says the result met the acceptance test? A final message is a claim; the trace and its linked artifacts are the receipt.

### 2) Model observability around meaningful decisions

Tool-call volume alone is a poor health metric. A short run can make a consequential change, and a long run can merely explore. Instrument the decisions and state transitions that alter risk or explain outcomes:

- workload accepted, narrowed, blocked, or escalated;
- policy or permission evaluated, approved, denied, or expired;
- tool intent, tool effect, normalized result, retry, and failure class;
- checkpoint created, human review requested, approval received, and resume revalidated;
- validation started, evidence attached, acceptance test passed or failed, and final artifact published.

Give each event a stable run ID and correlate it with the task owner, workflow or prompt version, repository revision, environment, model configuration, and artifact references. Then an operator can move from an alert to a concrete causal path without reading an entire transcript.

### 3) Keep provenance and content capture separate

GitHub notes that prompts and responses are excluded from OpenTelemetry export by default. That is a sound starting posture. Operational traces need enough context to prove what happened, but they do not need to become a second, uncontrolled copy of every secret, customer record, source file, or speculative conversation.

Start with metadata and references: event time, trace and run IDs, actor, environment, tool name, target class, policy outcome, latency, cost or budget counters, error category, artifact digest, and validation status. Store sensitive content only in the system that already owns it, under its retention and access policy; put a scoped reference or content hash in the trace.

If a team enables prompt or response capture for debugging, make it explicit and temporary. Apply redaction before export, limit access by role, set a short retention period, record why capture was enabled, and test that the redactor covers tool arguments and tool output as well as model text.

### 4) Treat approvals as traceable control points

OpenAI's Codex safety guidance describes the operating boundary in terms of sandboxing, approval policy, network policy, and agent-native logs. Those controls become much more useful when an incident or reviewer can see the exact decision path: what action was proposed, what scope was presented, who approved it, what approval was valid at the time, and whether the eventual tool invocation stayed inside that scope.

Model an approval as a first-class event, not a UI click. Record the proposed effect, bounded target, authority, timestamp and expiry, policy version, constraints, and the resulting action or refusal. On resume, re-check repository state, environment, inputs, and approval freshness; a trace should make a stale approval visible instead of silently carrying it forward.

### 5) Build an operator view before a telemetry warehouse

Raw spans are necessary but not sufficient. Create a compact run view that answers five questions in one screen:

1. What outcome was requested, by whom, and under which workflow version?
2. What phase is the run in, and what was the last meaningful progress event?
3. Which tools or external systems were involved, and what changed?
4. Which policy, approval, or sandbox decisions gated the work?
5. What artifacts and validation evidence support the terminal status?

Alert on operator-relevant conditions: an effect without a validation event, a policy denial repeatedly retried, a run with no meaningful progress past its deadline, an approval used after expiry, an unexpected target class, or a cost ceiling reached before an artifact exists. Avoid paging on ordinary model chatter or every successful read-only call.

## Operator takeaways

### Trace the receipt chain

Connect objective, configuration, policy decision, tool effect, artifact, and acceptance evidence under one stable run ID.

### Instrument transitions, not token noise

Prioritize effects, approvals, checkpoints, retries, validation, and failures. A useful trace reconstructs a decision path.

### Default to provenance over content

Export metadata, hashes, and scoped references first. Treat prompt and response capture as a separately governed diagnostic capability.

### Make approval auditable and expiring

Record the proposed effect and authority, then revalidate both before a paused run resumes.

### Alert on broken control chains

Surface missing validation, stale approvals, deadline breaches, repeated denials, unexpected targets, and budget exhaustion—not routine agent narration.

## A minimal agent-trace envelope

Persist at least:

- trace ID, run ID, parent and child span IDs, workflow or instruction version, requester and owner, environment, repository or data revision, agent and model configuration, and start/end timestamps;
- requested outcome, allowed and prohibited effects, tool identity and target class, policy and sandbox decision, approval reference and expiry, normalized tool result, retry count, latency, and budget counters;
- artifact reference and digest, evidence links, validation command or rule, validation outcome, terminal state, failure classification, escalation target, and retention classification;
- content-capture state, redaction policy version, access scope, retention expiry, and the reason for any elevated diagnostic logging.

Agent observability earns its keep when it lets an operator reconstruct an authorized, validated outcome quickly—and when it preserves that evidence without creating a new collection of sensitive conversational data.

## Sources

- [GitHub Changelog: OpenTelemetry in the GitHub Copilot app](https://github.blog/changelog/2026-09-22-opentelemetry-in-the-github-copilot-app/)
- [OpenAI: Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/)
- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)

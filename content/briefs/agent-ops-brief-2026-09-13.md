---
title: "Agent Ops Brief - Managed harnesses need portable run contracts"
summary: "OpenAI's Agents API packages durable sessions, selectable sandboxes, context compaction, tool discovery, and parallel subagents behind one managed Codex harness. Operators still need a portable contract for authority, state, evidence, and recovery."
published_at: "2026-09-13"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-09-13.svg"
tags:
  - agent-ops
  - openai
  - codex
  - agents-api
  - orchestration
  - sandboxes
  - multi-agent
---

## What changed (high signal)

### 1) The harness is now a managed production boundary

OpenAI introduced the Agents API in public beta on September 10. Developers define a model, instructions, tools, and an environment; OpenAI runs the Codex harness and can provision the sandbox. A durable session can then accept new work, stream events, receive mid-turn steering, resume after interruption, compact context, and delegate subtasks.

This removes a large amount of orchestration plumbing. It does not remove operational ownership. The managed harness decides how work advances, while the application still decides what the agent may access, which environment it enters, when its result is trusted, and what happens when the run outlives the request that started it.

Treat every session creation as a deployment. Bind it to a versioned run contract containing the agent definition, tool catalog, environment policy, capability bundle, budget, stop conditions, output schema, and escalation owner. A prompt plus a session ID is not enough to reproduce a production decision.

### 2) Environment choice must not change authority by accident

Agents API sessions can run without an environment, in an OpenAI-hosted sandbox, on self-hosted infrastructure, or through an integrated sandbox provider. Hosted sandboxes can receive files, packages, skills, and plugins; other environments may provide different storage, network, secret, CPU, GPU, cold-start, and cost characteristics.

Portability at the API layer can hide meaningful differences underneath. The same task can have a different filesystem lifetime, egress path, credential source, isolation boundary, or cleanup guarantee when moved between providers.

Define capabilities independently from provider configuration. Resolve a logical policy—allowed repositories, writable paths, network destinations, secret classes, commands, persistence, and artifact retention—into provider-specific controls, then attest the effective result before work starts. Refuse execution when a required control cannot be represented or verified in the selected environment.

Keep outputs outside the sandbox lifecycle. A final answer is not the only artifact worth preserving: retain diffs, test results, tool receipts, intermediate evidence, and a manifest of files intentionally exported before teardown.

### 3) Durable sessions need explicit ownership and expiry

The API defines a session as a durable agent instance. Applications can follow it through events or webhooks, continue it with later input, steer an active turn, and resume where it stopped. Long-lived continuity is useful, but it also creates a new security object whose authority may outlast the user request, incident, credential, or policy version that created it.

Give every session an owner, purpose, classification, maximum lifetime, idle timeout, spend ceiling, and revocation path. Re-authorize sensitive tools when the principal, environment, policy revision, or task purpose changes. A session that resumes successfully may still be unauthorized to continue.

Model lifecycle states explicitly: provisioning, ready, running, waiting for input, waiting for approval, suspended, completed, failed, revoked, and expired. Webhook delivery should be idempotent, and every transition should carry a monotonically increasing event position so delayed notifications cannot move the application backward.

### 4) Compaction preserves continuity, not auditability

The managed harness summarizes earlier work as context grows. OpenAI's compaction documentation describes the resulting compaction item as encrypted and opaque rather than human-interpretable, and says the returned compacted window is the canonical context for the next call.

That is an effective runtime mechanism, but it is not an audit record. After compaction, the agent may retain the facts it needs while an operator can no longer inspect exactly how earlier evidence was represented inside the compressed state.

Persist important facts before compaction: source identifiers, retrieved revisions, tool inputs and outputs, approvals, rejected alternatives, test artifacts, and decisions consumed by later steps. Record compaction boundaries and the session event position on both sides. Never ask the compacted context to prove its own fidelity.

For high-impact workflows, periodically checkpoint a human-readable state manifest. The agent may continue from opaque runtime state, while reviewers validate the decision from durable external evidence.

### 5) Tool search turns catalog design into routing policy

Tool search can defer tool definitions and load only the relevant subset at runtime. OpenAI recommends clear namespace descriptions and small groups, and distinguishes hosted search from client-executed search when discovery depends on tenant or project state.

This improves context efficiency, but discovery becomes part of the authorization path. If the search layer omits the right tool, selects an overly broad namespace, or reveals a tenant-specific capability to the wrong session, the agent's behavior changes before any tool call is made.

Filter candidates by authorization before relevance ranking. Log the catalog revision, eligible set, search request, returned definitions, and final selection. Treat namespace descriptions as security-sensitive routing metadata: review them like code, test ambiguous queries, and avoid descriptions that encourage a powerful tool to win every search.

### 6) Parallel subagents share more than a coordinator

Agents API multi-agent support lets a coordinator delegate independent work with a configurable concurrency limit. Each subagent has separate context, but subagents inherit MCP tools, credentials, allowed-tool settings, web search, and access to the environment. The coordinator and subagents share one filesystem rather than receiving isolated environments.

Concurrency is therefore a contention and authority problem, not only a latency setting. Two subagents can inspect stale state, overwrite the same artifact, duplicate an external action, or consume the same rate and spend budget.

Partition work explicitly. Assign read and write scopes, output paths, idempotency keys, dependency edges, and merge ownership per subtask. Use immutable inputs where possible and serialize side effects that cannot safely commute. The coordinator should reconcile evidence and conflicts; it should not silently choose whichever result arrived last.

## Operator takeaways

### Version the run contract

Pin the agent definition, tools, environment policy, skills, plugins, budget, completion criteria, and output schema for every session.

### Normalize environment authority

Express capabilities independently from the sandbox provider, attest the effective controls, and fail closed when a required boundary is missing.

### Expire durable sessions

Assign ownership, purpose, time and spend limits, lifecycle states, and revocation. Re-authorize when identity or policy changes.

### Externalize evidence before compaction

Store source revisions, tool receipts, approvals, artifacts, and decisions outside opaque runtime context. Mark every compaction boundary.

### Authorize before tool discovery

Search only within the session's eligible catalog, and retain the catalog revision and routing trace.

### Partition shared multi-agent state

Give subagents explicit scopes, artifact paths, budgets, and idempotency keys. Detect conflicting writes and serialize irreversible actions.

## A minimal managed-session receipt

Persist at least:

- session, turn, event position, initiator, owner, purpose, classification, agent-definition revision, model, instructions digest, start time, expiry, idle timeout, and stop reason;
- environment type and provider, sandbox identity, image or template digest, workspace mount, network policy, secret references without values, persistence rules, and effective-capability attestation;
- tool-catalog revision, pre-authorized candidates, namespace metadata, search request and result, loaded schemas, MCP server identities, credentials scopes, and tool-call receipts;
- capability bundle, skill and plugin versions, file inputs, exported artifacts, checksums, retention policy, and teardown result;
- parent and subagent IDs, delegated requests, concurrency limit, inherited authority, read and write scopes, output paths, dependency edges, idempotency keys, conflicts, and reconciliation decision;
- compaction boundaries, external checkpoints, source revisions, approvals, tests, budgets, usage, webhook deliveries, retries, recovery actions, and final disposition.

A managed harness makes sophisticated agent behavior easier to adopt. Reliable operations still depend on the contract around it: portable across environments, explicit about inherited authority, durable outside compacted context, and precise enough to replay why a long-running session was allowed to act.

## Sources

- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [OpenAI API documentation: Agents API overview](https://developers.openai.com/api/docs/guides/agents-api/overview)
- [OpenAI API documentation: OpenAI-hosted sandboxes](https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted)
- [OpenAI API documentation: Multi-agent](https://developers.openai.com/api/docs/guides/agents-api/multi-agent)
- [OpenAI API documentation: Compaction](https://developers.openai.com/api/docs/guides/compaction)
- [OpenAI API documentation: Tool search](https://developers.openai.com/api/docs/guides/tools-tool-search)

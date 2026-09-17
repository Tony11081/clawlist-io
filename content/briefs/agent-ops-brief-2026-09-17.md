---
title: "Agent Ops Brief - A managed harness does not outsource control"
summary: "OpenAI's Agents API exposes the Codex harness as a managed service with durable sessions, selectable sandboxes, tools, and subagents. Reliable deployments still need explicit ownership boundaries, lifecycle receipts, and portable acceptance tests."
published_at: "2026-09-17"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-09-17.svg"
tags:
  - agent-ops
  - openai
  - codex
  - agents-api
  - sandboxes
  - multi-agent
  - observability
  - automation
---

## What changed (high signal)

### 1) The agent harness is now an infrastructure dependency

OpenAI has released the Agents API in public beta, offering the managed harness and infrastructure behind Codex through an API. An application supplies work, tools, knowledge, and an execution environment; OpenAI operates the model-and-tool loop and maintains the agent session.

This removes substantial orchestration work, but it does not remove architecture decisions. The harness now sits on the critical path for context management, tool selection, delegation, progress events, and turn completion. Treat its configuration and behavior as a versioned production dependency rather than an invisible implementation detail.

Record the agent definition, model, instructions, tool catalog, harness or API version when exposed, session ID, environment choice, policy revision, and acceptance criteria for every run. Test upgrades on representative tasks before changing production defaults.

### 2) Session state and execution state are different lifecycles

The API separates the managed session from the environment where commands run and files live. A task can use no environment, an OpenAI-hosted sandbox, or self-hosted compute. With self-hosting, the application owns provisioning, connection, reconnection, shutdown, and preservation of required files.

Do not use “agent is running” as a single lifecycle state. A session may be waiting for a function result while its environment is healthy; a sandbox may be connected while no turn is active; a completed turn may leave artifacts that still need export and retention. Shutdown based on an explicit joint state, not on a quiet event stream or elapsed time.

Maintain separate state machines for session, turn, environment, executor connection, tool calls, and artifacts. Reconcile them after webhook retries, stream interruptions, worker restarts, and operator intervention.

### 3) Environment choice is a policy decision

An environment-free agent can call remote MCP services and application-hosted functions, but it cannot use built-in shell and patch tools or workspace files. OpenAI-hosted environments can run code and manage files with configured packages and network access. Self-hosted environments reach private infrastructure and custom software, but transfer more lifecycle responsibility to the application.

Choose by capability and trust boundary, not convenience alone. Define the data classification, network routes, credentials, package sources, compute limits, persistence rules, and incident owner permitted for each environment profile. Resolve that profile before the run and reject work that requires unavailable or prohibited capabilities.

Keep secrets outside prompts and general workspace files. Grant tools and network access per workload, rotate credentials independently of sessions, and capture which policy produced the effective environment.

### 4) Multi-agent speedups share a failure domain

The managed harness can delegate independent work to subagents with separate contexts and a concurrency limit. When an environment is present, the coordinator and subagents share its filesystem; creating a subagent does not create an isolated sandbox. Configured MCP credentials and allowed tools are inherited, while function tools are not available to subagents.

Separate context is therefore not execution isolation. Parallel agents can race on files, consume a shared quota, amplify a faulty tool, or overwrite each other's evidence. Partition work by directory, artifact namespace, resource budget, or read-only scope. Serialize dependent steps and edits to the same files.

Capture the delegation graph and attribute commands to the executing agent. A completed create or wait action is not proof that delegated work succeeded, and the live event stream may not contain a full inter-agent transcript. Use saved turns and items when the audit requires more than the synthesized answer.

### 5) Managed compaction needs semantic checkpoints

The harness automatically compacts earlier context as long sessions approach their limit. That enables work across multiple context windows, but operators should not assume every operational constraint survives as intended merely because the session continues.

Persist critical state outside conversational context: objectives, non-negotiable constraints, approved actions, environment identity, completed checks, open risks, artifact locations, and the exact revision under work. At meaningful boundaries, have the agent produce a structured checkpoint and validate it against the external task record.

Test compaction with long, adversarial workflows. Include late-stage reversals, repeated filenames, superseded instructions, partial tool failures, and requirements stated early but verified only at the end.

### 6) Portability requires outcome contracts, not prompt copies

The hosted harness can reduce custom infrastructure, and the open-source Codex foundation gives teams visibility into core orchestration logic. Still, moving between a local harness, a managed session, and a self-hosted environment changes available tools, event semantics, filesystem behavior, network policy, persistence, and failure recovery.

Define a portable task contract above any one runtime: inputs and digests, allowed capabilities, required outputs, verification commands, evidence schema, budgets, timeout behavior, cleanup obligations, and acceptance result. Replay the same contract across candidate environments and compare verified outcomes rather than raw text similarity.

The goal is not identical traces. It is consistent policy enforcement, inspectable evidence, and equivalent accepted results despite different execution substrates.

## Operator takeaways

### Version the harness contract

Pin and record the agent definition, tools, model, policy, environment profile, and evaluation suite for each production cohort.

### Reconcile independent lifecycles

Track sessions, turns, environments, executors, tool calls, and artifacts separately, then shut down only from a confirmed safe state.

### Treat shared files as shared mutable state

Partition subagent writes, cap concurrency and resource use, and serialize overlapping work.

### Externalize critical memory

Store constraints and checkpoints in an authoritative task record that can survive compaction, retries, and environment replacement.

### Benchmark portability

Run the same outcome contract on every supported harness-and-environment combination before calling a workflow portable.

## A minimal managed-harness receipt

Persist at least:

- task ID, input digest, repository and revision, requested outputs, acceptance tests, data classification, owner, and deadline;
- session ID, turn IDs, agent-definition revision, model, instructions digest, harness or API version when exposed, start time, completion state, and continuation history;
- environment type and ID, image or runtime digest, workspace path, package manifest, network policy, credential references, compute limits, persistence policy, and lifecycle events;
- tool catalog and policy, MCP server identities, allowed operations, function-call handler revision, tool calls, results, retries, approvals, and denied actions;
- delegation graph, coordinator and subagent IDs, assignments, concurrency limit, shared-resource boundaries, command attribution, conflicts, waits, interrupts, and synthesized result;
- checkpoint versions, compaction events when exposed, unresolved constraints, artifact inventory and digests, export status, cleanup confirmation, evaluator result, and operator overrides.

A managed harness can make durable agent infrastructure accessible through one API. It becomes dependable only when teams keep control of the contracts around it: policy, state, evidence, lifecycle, and verified outcomes.

## Sources

- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [OpenAI Developers: Agents API overview](https://developers.openai.com/api/docs/guides/agents-api/overview)
- [OpenAI Developers: Agents API architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture)
- [OpenAI Developers: Multi-agent orchestration](https://developers.openai.com/api/docs/guides/agents-api/multi-agent)

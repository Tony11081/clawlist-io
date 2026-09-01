---
title: "Agent Ops Brief - Memory is part of the runtime"
summary: "Copilot now carries memory across JetBrains agent sessions and can route work to local models. Reproducible agent operations need inspectable memory, explicit model provenance, policy resolution, and clean-room replay."
published_at: "2026-09-01"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-09-01.svg"
tags:
  - agent-ops
  - github-copilot
  - codex
  - memory
  - local-models
  - byok
  - provenance
---

## What changed (high signal)

### 1) Persistent memory changes the unit of reproducibility

GitHub Copilot for JetBrains can now retain useful information across agent chat sessions. The same release exposes Codex sessions in agent debug logs, expands instruction and skill customization, and adds Ollama as a bring-your-own-model provider.

These features remove setup friction, but they also make a transcript an incomplete record of a run. Two operators can submit the same request against the same commit and get different behavior because one session resolves repository facts or user preferences learned earlier. A local model can introduce another invisible difference through its weights, quantization, runtime, or tool-calling behavior.

Treat effective memory and model identity as runtime inputs. A run receipt should distinguish what the operator wrote, what repository instructions supplied, what persistent memory injected, which skills and tools loaded, and which model endpoint actually executed the work.

### 2) Learned facts need lifecycle controls

Copilot Memory stores repository-level facts and user-level preferences. GitHub lets users enable or disable memory and lets repository owners inspect and delete stored repository facts. In managed environments, an organization or enterprise must allow the feature, and a user's selected billing entity determines which account owns user-level preferences.

That makes memory a governed state store, not merely a convenience cache. A remembered convention can become stale after a migration, encode a workaround that should have expired, or conflict with versioned repository instructions. Personal preferences can also be inappropriate when work crosses repositories, clients, or organizational boundaries.

Give every durable memory a scope, source, owner, creation time, last confirmation time, and expiry or review condition. Prefer versioned repository instructions for contractual behavior. Use learned memory for advisory context, and surface conflicts instead of silently choosing the oldest or most convenient instruction.

### 3) Memory precedence must be observable

Agent behavior can now be shaped by the request, conversation history, repository instructions, skills, persistent facts, user preferences, organization policy, and client defaults. Without a declared precedence model, operators cannot tell whether a surprising action came from the current task or inherited state.

Resolve context before execution and record the result. At minimum, deny and safety policy should outrank every advisory source; explicit task constraints should outrank learned preferences; versioned repository instructions should outrank inferred repository facts; and a direct conflict should stop the agent for clarification rather than produce a hidden merge.

Do not dump sensitive memory contents into ordinary logs. Store stable identifiers, hashes, provenance, scope, and the reason each item was selected. Provide an authorized inspection path for the underlying value when incident review requires it.

### 4) BYOK moves model provenance outside the platform boundary

GitHub documents Copilot CLI support for OpenAI-compatible endpoints, Azure OpenAI, Anthropic, and locally running systems such as Ollama. Models must support streaming and tool calling, while usage tracking and rate limits can move to the selected provider. GitHub's Copilot app similarly allows local and external providers, with credentials stored in the system credential store.

“Ran in Copilot” is therefore no longer sufficient provenance. Record provider type, endpoint class, model identifier, model artifact or digest when available, runtime version, context limit, tool schema, and whether the route was local, enterprise-hosted, or vendor-hosted. Never record provider keys or credential material.

Local execution can improve data locality, cost control, and offline availability, but it does not automatically establish equivalence or safety. Validate tool calls, permission boundaries, context behavior, latency, and task outcomes for each approved model-runtime pair. A model that can stream and call tools still may not satisfy the workflow contract.

### 5) Central policy and local state must reconcile

GitHub's enterprise-managed settings span permissions, bypass-mode controls, plugins, marketplaces, telemetry, MCP servers, remote control, models, and sandbox restrictions. Multiple delivery sources have explicit precedence, while safety-sensitive settings compose toward the more restrictive result. JetBrains support brings more of that control plane into the same client that now carries memory and local model configuration.

Before a run, compute the effective policy rather than reporting a single configuration file. Then reconcile that policy with local state: selected provider, available model, remembered context, enabled skills, reachable MCP servers, permission mode, sandbox, and telemetry settings. If a local selection violates policy or cannot be attested, fail closed or route the task to a known environment.

Central controls also need coverage tests. Verify the exact client and version used by the team, because a setting supported in one surface may be unavailable or behave differently in another.

## Operator takeaways

### Put memory in the run manifest

Record selected memory IDs, hashes, scopes, provenance, and resolution decisions alongside instructions, skills, tools, policy, model, and environment.

### Keep contractual context versioned

Store required build, review, security, and release behavior in repository-controlled files. Do not depend on a learned fact for a production invariant.

### Add clean-room replay

For regressions, replay once with the captured context and once with persistent memory disabled. The delta helps separate model drift, memory drift, and code or harness changes.

### Attest local routes

Approve a model-runtime pair, not a friendly display name. Pin or record artifacts where possible and re-evaluate after model, runtime, quantization, tool schema, or permission changes.

### Reconcile before execution

Resolve enterprise policy, client capability, local provider state, memory, skills, MCP access, sandbox, and permissions before the agent receives authority to act.

## A minimal memory-aware run receipt

Persist at least:

- task, repository, commit, worktree, client, client version, operator, organization, environment, and start time;
- prompt hash, conversation reference, repository-instruction revisions, skill and plugin revisions, and tool schemas;
- selected repository facts and user preferences by ID and hash, their scope, source, owner, age, last confirmation, and conflict-resolution result;
- provider type, endpoint class, model ID, artifact or digest when available, runtime and quantization, context limit, and local or hosted classification;
- effective managed-setting sources and precedence, permission mode, sandbox profile, MCP allow and deny result, telemetry state, and policy exceptions;
- tool calls, approvals, artifacts, checks, completion result, latency, token and cost evidence where available, and post-run memory writes;
- clean-room replay result, drift classification, reviewer, remediation, memory deletion or refresh decision, and final disposition.

Persistent memory makes agents less repetitive, and local models make execution more flexible. Dependable operations require both conveniences to become visible dependencies: inspectable, attributable, policy-resolved, and removable when a clean-room run is the only reliable way to explain what happened.

## Sources

- [GitHub Changelog: Copilot memory and Ollama in GitHub Copilot for JetBrains](https://github.blog/changelog/2026-08-11-copilot-memory-and-ollama-in-github-copilot-for-jetbrains/)
- [GitHub Docs: Managing Copilot Memory for your personal account](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory/manage-for-yourself)
- [GitHub Docs: Using your own LLM models in GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-byok-models)
- [GitHub Docs: Enterprise managed settings](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings)

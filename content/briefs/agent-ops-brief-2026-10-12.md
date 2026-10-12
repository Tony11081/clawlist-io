---
title: "Agent Ops Brief - Design tool catalogs for selection, not maximum availability"
summary: "As agent tool catalogs grow, tool discovery becomes a reliability and governance problem. Treat names, descriptions, deferred loading, selection tests, and approval boundaries as one operating surface."
published_at: "2026-10-12"
tags:
  - agent-ops
  - tool-use
  - mcp
  - orchestration
  - governance
  - evaluation
  - coding-agents
  - reliability
---

## What changed (high signal)

### 1) A longer tool menu is not a more capable agent

GitHub's current Copilot CLI guidance makes an important practical point: every connected MCP or external tool consumes context through its definition, and a large menu makes it harder for an agent to select the right action. Its tool-search feature can defer named tools until the task calls for them; custom agents can opt in with `deferred-tool-loading: true`.

This is a useful correction to the usual integration instinct. Adding every available connector to a general-purpose agent raises more than token cost. It creates ambiguity between similarly named actions, increases the chance of selecting a broad mutation over a narrow lookup, and makes it harder to review what authority a run actually needed. A tool catalog is an interface: it should help the agent discriminate, not merely enumerate possibilities.

### 2) Make tool metadata part of the reliability contract

Tool search matches an active request against tool names, descriptions, and parameter descriptions. That means vague metadata is not just a documentation defect; it changes routing behavior. A tool called `manage` with a generic description can be effectively invisible to a task that needs to "reconcile a failed invoice," while a precise name and verb-oriented description gives the agent a better chance of finding the intended capability.

Write metadata for the request language operators and users actually use. State the effect, target, preconditions, whether the call reads or changes state, and the expected artifact or confirmation. Parameter descriptions should distinguish identifiers, scopes, time windows, dry-run controls, and irreversible options. Avoid two tools whose descriptions promise the same outcome unless their authority boundary is explicit.

### 3) Deferred discovery needs an observable fallback

Loading tools on demand keeps the initial context focused, but it creates a new failure mode: the correct capability might not be discovered. Make the discovery decision reviewable. Record the task class, search terms or intent class, candidate tools surfaced, selected tool, rejected candidates, whether a tool was deferred, and the validation result.

Then test the catalog as a routing system. Build a small corpus of representative requests, including alternate wording, partial identifiers, ambiguous requests, requests that should stay read-only, and requests that must be denied or escalated. Measure whether the intended tool is discovered, whether an unsafe near-match is proposed, and whether the system stops cleanly when no suitable tool exists. A successful final answer alone can hide an accidental broad-tool selection.

### 4) Discovery limits do not replace execution limits

GitHub custom-agent profiles can specify tools and MCP servers, but the default profile can access all available tools. This makes per-agent declarations valuable: a researcher does not need deployment tools, and a release agent does not need a customer-data connector simply because both exist in the environment.

Still, a focused menu is a usability and least-privilege control, not the whole authorization system. Pair it with tool-side policy: scoped credentials, target validation, allowlisted environments, budget limits, and approval before consequential effects. OpenAI's guardrail guidance similarly separates automatic checks around inputs, outputs, and tool behavior from human review that pauses a workflow before sensitive actions. The catalog proposes a capability; the policy layer decides whether this invocation may use it.

### 5) Promote tool changes as tested interface changes

Adding, renaming, or re-describing a tool can change how an agent routes a task even if no model or prompt changes. Treat it like an API change. Keep a versioned catalog, run the routing corpus before promotion, compare selection precision and unsafe proposals, and retain a rollback path for the previous metadata and permissions.

For installable skills, the same principle applies. A skill's capability list, the tool terms it teaches, and its recommended fallback behavior shape which external actions the agent can find and attempt. Review skill updates alongside the effective tool catalog, not as isolated prose changes.

## Operator takeaways

### Start with a task-shaped menu

Give each agent only the tools it should reasonably need for its declared job. Use broad catalogs only when their discovery quality is measured.

### Describe effects and boundaries precisely

Names and descriptions should say what changes, what is read, required scope, and the safe alternative. Metadata is routing code.

### Test selection, including safe refusal

Evaluate whether the agent finds the intended tool, avoids a dangerous near-match, and escalates when the correct capability is absent.

### Keep discovery separate from authority

Deferred loading and allowlists reduce confusion. Tool-side validation, scoped credentials, and approvals decide what may actually occur.

### Leave a catalog receipt

For important runs, preserve the catalog revision, loaded and deferred tools, selection path, policy decision, effect, and validation evidence.

## A minimal tool-catalog evaluation record

Persist at least:

- catalog revision, agent profile, tool and MCP-server versions, enabled and deferred tools, effective permissions, and environment;
- request class, expected tool or expected refusal, candidate tools surfaced, selected tool, parameters redacted or hashed as appropriate, and fallback path;
- read versus write classification, policy and approval decision, credential scope, target validation, rate or spend budget, effect receipt, and rollback or compensation reference; and
- routing precision and recall by task family, unsafe near-match rate, no-match escalation rate, end-to-end validation result, owner, and promotion decision.

The goal is not to turn every tool call into an approval ceremony. It is to ensure an expanding ecosystem of MCP servers, skills, and coding-agent integrations remains easy to select from, difficult to misuse, and measurable when it changes.

## Sources

- [GitHub Docs: Loading tools on demand with tool search](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/tool-search)
- [GitHub Docs: About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [GitHub Docs: Invoking custom agents in Copilot CLI](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
- [OpenAI API: Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)

---
title: "Agent Ops Brief - Model retirement is a production migration"
summary: "GitHub Copilot retires six model routes on September 1 while global model policy becomes enforceable. Agent operators need dependency inventory, policy checks, replay evaluation, staged cutover, and a tested rollback path."
published_at: "2026-08-31"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-08-31.png"
tags:
  - agent-ops
  - github-copilot
  - model-routing
  - migrations
  - evaluation
  - governance
  - plugins
---

## What changed (high signal)

### 1) A model retirement is an agent dependency event

GitHub will retire Gemini 3.1 Pro, Claude Opus 4.5 and 4.6, Claude Sonnet 4.5 and 4.6, and Raptor Mini across Copilot experiences on September 1. The affected surface includes chat, inline edits, ask and agent modes, and code completions. GitHub publishes suggested alternatives, but a replacement model is not a drop-in production guarantee.

Agent workflows depend on more than a model name. They depend on instruction following, tool selection, latency, context behavior, cost, refusal boundaries, patch style, and the way a model responds to harness retries or partial failures. A route that remains syntactically valid can still change workflow behavior materially.

Treat model retirement like a dependency migration: find every explicit pin and implicit default, name an owner, select a candidate route, replay representative work, stage the cutover, observe outcomes, and retain a rollback route until the new baseline is accepted.

### 2) Inventory resolved routes, not just configuration files

A model can be selected directly in an IDE, stored in user preferences, inherited from an organization policy, chosen by a custom agent, or supplied by a CLI or integration. The effective route may also differ across repositories, teams, clients, and subscription types. GitHub notes a narrow exception for Claude Sonnet 4.6 on certain individual annual plans, which makes account context part of the dependency graph.

Build an inventory from both static configuration and runtime evidence. Search repositories, managed settings, custom-agent definitions, scripts, CI variables, workflow templates, and documentation. Then compare that list with recent usage by client, organization, workflow, and model.

Record three values separately:

- **requested route:** what the workflow or user explicitly names;
- **effective route:** what policy and availability resolve at execution time;
- **fallback route:** what the client or workflow uses when the requested route is unavailable.

If the platform chooses a fallback, expose it in the run receipt. Silent substitution makes evaluation results and incident diagnosis unreliable.

### 3) Availability policy is part of the cutover

GitHub's global model policy for Copilot Business and Enterprise is rolling into enforcement through September 1. Previously unconfigured and newly generally available models can inherit a live default state, while explicit per-model choices remain preserved. Open-weight models and models outside GitHub's data-retention agreement are excluded from default enablement.

That means selecting a supported successor is not enough. An enterprise administrator may need to enable it, and an inherited policy can differ from an explicit approval. Before migration, resolve the policy chain for every target organization and confirm the candidate appears in the actual client used by the workflow.

Make model policy intentional. For each route, persist the policy source, effective state, data-retention class, approval owner, and last verification time. Do not infer organizational approval from the fact that a model appears in a consumer picker.

### 4) Replay must test the workflow contract

Provider recommendations establish availability, not equivalence. Evaluate successor models against the job the agent performs. Use a frozen corpus containing normal tasks, difficult cases, tool failures, ambiguous requests, security boundaries, and known regressions. Preserve environment, harness version, skill and plugin revisions, permissions, and verifier so the comparison isolates the route change as much as possible.

Score complete outcomes: task completion, test and lint results, reviewer acceptance, tool-call correctness, unsafe or unnecessary actions, retries, latency, and cost. Compare artifact diffs and operational traces, not just final prose. A model that solves more tasks but broadens tool use or increases destructive proposals may require a tighter permission profile.

Promote through shadow, canary, and then broader traffic. Define acceptance thresholds and rollback triggers before the first production run. Keep the old route only while it is actually available; after retirement, rollback may mean a third supported model or a temporarily reduced workflow scope.

### 5) Automatic plugin updates create a second moving dependency

GitHub now lets enterprises set `autoUpdate: true` for individual plugin marketplaces in managed settings. Supported clients can then update installed plugins automatically, while the marketplace still must pass the effective `strictKnownMarketplaces` allowlist.

This reduces maintenance friction but can confound a model migration. If a model route and its tools, skills, or plugin instructions change in the same evaluation window, operators cannot attribute a regression cleanly. Automatic retrieval is also not the same as automatic promotion: a newly fetched plugin version still needs provenance, compatibility checks, and a rollout decision.

During model cutover, freeze capability revisions or record their exact resolved versions. Where automatic updates remain enabled, test the model-and-plugin pair as one release unit, retain the previous approved artifact, and make rollback available independently for routing and capability code.

## Operator takeaways

### Finish the dependency inventory today

Search pins, defaults, custom agents, CI, local preferences, policies, and recent runtime records. Assign every affected route an owner and disposition.

### Confirm the successor is effectively enabled

Resolve enterprise, organization, team, client, and account context. A recommended model that policy disables is not a migration target.

### Replay before redirecting unattended work

Use accepted historical tasks and known failures. Validate tool behavior, permission use, artifacts, checks, latency, cost, and reviewer acceptance.

### Change one moving layer at a time

Freeze harness, skill, and plugin revisions during route evaluation where possible. If not, version and test the combined release explicitly.

### Make fallback observable

Record requested, effective, and fallback routes on every run. Alert on substitution, unavailable routes, policy denial, and material drift from the accepted baseline.

## A minimal model migration receipt

Persist at least:

- workflow, repository, organization, owner, environment, client, harness, skill, plugin, and policy versions;
- requested, effective, predecessor, candidate, fallback, and rollback routes, plus provider retirement deadline;
- policy source, inherited or explicit state, data-retention class, account exception, and availability check time;
- replay corpus version, task classes, tool and permission profile, verifier, acceptance thresholds, and baseline results;
- completion, checks, reviewer acceptance, tool errors, risky actions, retries, latency, tokens, cost, and artifact diffs;
- shadow and canary windows, traffic share, stop conditions, incidents, rollback rehearsal, approval, and final disposition.

Model catalogs will keep moving faster than long-lived agent workflows. Dependable operations come from treating the route as a versioned production dependency—observable at runtime, tested against the whole workflow contract, governed by explicit policy, and replaceable before a provider deadline becomes an outage.

## Sources

- [GitHub Changelog: Upcoming August 2026 model deprecations in GitHub Copilot](https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot/)
- [GitHub Changelog: Global model policy generally available](https://github.blog/changelog/2026-08-26-global-model-policy-generally-available/)
- [GitHub Changelog: Enterprise-managed settings now support autoUpdate for plugin marketplaces](https://github.blog/changelog/2026-08-26-enterprise-managed-settings-now-support-autoupdate-for-plugin-marketplaces/)
- [GitHub Changelog: GitHub Copilot weekly releases - August 24](https://github.blog/changelog/2026-08-28-github-copilot-weekly-releases-august-24/)

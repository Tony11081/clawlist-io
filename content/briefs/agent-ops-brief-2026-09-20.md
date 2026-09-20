---
title: "Agent Ops Brief - Customization telemetry needs outcome evidence"
summary: "GitHub now reports adoption for CLI skills, custom agents, MCP servers, slash commands, and plugins. Operators should use the new signals to guide investigation—not mistake activity for value, reliability, or safety."
published_at: "2026-09-20"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-09-20.svg"
tags:
  - agent-ops
  - github-copilot
  - skills
  - mcp
  - plugins
  - observability
  - governance
  - automation
---

## What changed (high signal)

### 1) Agent customization is becoming an observable product surface

GitHub has added Copilot CLI customization activity to its usage metrics API. Enterprise and organization reports can now show activity for skills, custom agents, Model Context Protocol (MCP) servers, slash commands, and plugins. The fields appear in one-day per-user and aggregate reports, 28-day per-user reports, and daily entries inside aggregate 28-day reports.

This gives platform teams a useful new view of the agent layer between a base model and completed work. Instead of treating every instruction, tool connection, or workflow extension as an opaque local choice, teams can see which categories are being used, how broad adoption is, and whether usage changes after enablement or training.

Do not turn visibility into an automatic endorsement. A popular customization may be valuable, mandatory, easy to discover, accidentally invoked, or responsible for repeated retries. Use the new fields to decide where to investigate, not which assets deserve promotion by default.

### 2) The counters have category-specific meanings

Each report exposes top-item arrays and distinct-item counts. The top arrays include up to five items with an `interaction_count`; the distinct fields count how many different items appeared, including items outside the top five. But an interaction is not one universal event.

For skills, slash commands, and plugin skills, the metric counts invocations. For custom agents, it counts starts. For MCP servers, it counts connection or reconnection attempts—not tool calls—and both successful and failed attempts increase the value. Plugin interactions are also included in skill totals because the plugin measurement covers associated skill invocations.

Normalize these semantics before comparing categories. Never add plugin and skill totals, interpret MCP connections as completed tool work, or rank an agent start against a skill invocation as if they represented equivalent effort. Preserve the raw category, measurement definition, report version, and collection window in every downstream dataset.

### 3) Privacy aggregation limits asset-level governance

GitHub names recognized GitHub-provided items, but customer-defined skills, custom agents, MCP servers, and plugins are grouped under `other`; custom slash commands use the existing `custom` label. This protects private names, but it prevents the central report from identifying which internal asset caused a rise, failure pattern, or adoption gap.

Treat the API as fleet-level telemetry and join it with an internal registry that you control. Give each approved customization a stable ID, owner, version, risk class, distribution channel, support state, and retirement date. Instrument the execution path to emit privacy-conscious outcome records keyed to that registry where policy permits.

Do not try to reverse-engineer individual behavior from aggregate changes. Use coarse metrics for portfolio questions and local, access-controlled evidence for debugging a specific workflow.

### 4) Adoption metrics need a denominator and a cohort

A raw count cannot tell you whether an asset is spreading. Ten skill invocations may represent one power user repeating a workflow or ten people completing it once. A growing distinct-item count may indicate healthy exploration, uncontrolled sprawl, or a migration where old and new versions coexist.

Pair activity with eligible users, active CLI users, enabled repositories, team membership, role, onboarding date, and time since release. Compare voluntary adoption separately from policy-mandated use. Use both daily and rolling windows: daily data exposes launches and regressions, while a 28-day view reduces weekday and release-cycle noise.

Define expected adoption before rollout. A security gate may be successful with broad coverage and few visible invocations; a specialist database agent may be valuable with a small expert cohort. Portfolio targets should follow the intended job, not a universal engagement curve.

### 5) Usage is not an outcome metric

The new reports answer which customizations are active and how varied the active set is. They do not establish that a skill produced a correct artifact, an MCP connection succeeded, a custom agent completed its task, or a plugin saved time. They also do not reveal rework, unsafe tool calls, abandoned sessions, or human correction cost.

Build an evidence chain from availability to discovery, invocation, execution, verification, acceptance, and retained value. For each stage, choose a small number of operational measures: eligible-user coverage, first successful use, completion rate, acceptance-test pass rate, retries, latency, cost, rollback, user correction, and repeat use after a successful outcome.

A customization should graduate from experiment to recommended default only when it improves verified results for a defined cohort. High activity with poor acceptance is a debugging signal. Low activity with strong outcomes may call for better discovery. High adoption and high value support promotion.

### 6) Promotion and retirement should be reversible decisions

Usage telemetry can help identify assets that merit documentation, optimization, consolidation, or retirement. It should feed a governed lifecycle rather than a popularity leaderboard.

For every decision, capture the observation window, eligible cohort, metric semantics, data gaps, outcome evidence, owner, and rollback condition. Canary new versions with a bounded group. Keep the previous version available until acceptance and safety signals stabilize. When retiring an asset, inspect dependencies, scheduled automations, documentation links, and fallback behavior before removing it.

Missing or null customization fields mean data was unavailable; empty arrays and zero counts mean no matching activity. Preserve that distinction. Treat telemetry gaps as unknown state, not proof that an asset is unused.

## Operator takeaways

### Preserve metric semantics

Store what each counter actually represents and never combine overlapping plugin and skill activity.

### Join activity to an internal registry

Maintain stable IDs, owners, versions, risk classes, and lifecycle state for private customizations hidden behind aggregate labels.

### Measure the outcome funnel

Connect discovery and invocation to execution, verification, acceptance, retained use, and correction cost.

### Compare meaningful cohorts

Use eligible users and active-user denominators, and separate mandated controls from optional productivity tools.

### Make lifecycle changes reversible

Canary promotions, retain rollback paths, and distinguish zero use from missing telemetry before retirement.

## A minimal customization-evidence receipt

Persist at least:

- report date, collection window, API version, enterprise or organization scope, source endpoint, data availability, and ingestion time;
- customization category, stable internal asset ID when available, displayed bucket, owner, version, release channel, risk class, approval state, and intended job;
- eligible cohort, active CLI users, enabled repositories, team and role segmentation, rollout date, mandatory or optional status, and comparison cohort;
- top-item rank, interaction count, distinct-item count, category-specific event definition, plugin-to-skill overlap handling, and missing-versus-zero state;
- session and task IDs, invocation time, connection result for MCP, tool or workflow completion, retries, latency, token or credit cost, and failure class where policy allows;
- acceptance test, verifier, accepted artifact, human corrections, rollback, repeat successful use, user feedback, promotion or retirement decision, decision owner, and review date.

Customization telemetry makes the agent extension layer easier to manage. Its durable value comes from connecting coarse adoption signals to a controlled asset registry and independently verified outcomes—not from optimizing invocation counts in isolation.

## Sources

- [GitHub Changelog: Agentic CLI customizations now in the usage metrics API](https://github.blog/changelog/2026-09-17-agentic-cli-customizations-now-in-the-usage-metrics-api/)
- [GitHub Docs: REST API endpoints for Copilot usage metrics](https://docs.github.com/en/enterprise-cloud@latest/rest/copilot/copilot-usage-metrics)
- [GitHub Changelog: Copilot impact dashboard now shows feature engagement](https://github.blog/changelog/2026-09-17-copilot-impact-dashboard-now-shows-feature-engagement/)
- [GitHub Changelog: GitHub Copilot weekly releases — September 14](https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14/)

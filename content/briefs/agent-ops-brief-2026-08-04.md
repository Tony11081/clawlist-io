---
title: "Agent Ops Brief - Make agent policy inheritable"
summary: "GitHub now lets enterprise teams specialize centrally managed Copilot settings. The durable pattern is a locked policy ceiling, narrow override contracts, and additive extension paths."
published_at: "2026-08-04"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-08-04.png"
tags:
  - agent-ops
  - agent-governance
  - policy-as-code
  - github-copilot
  - skills
  - plugins
  - enterprise-ai
  - least-privilege
---

## What changed (high signal)

### 1) Managed agent policy can now specialize by team

GitHub enterprise administrators can now mark individual keys in `copilot/managed-settings.json` as overridable, keep all other keys fixed at the enterprise level, and map team-specific files under `copilot/teams/` to enterprise team slugs. The resulting configuration is enforced in VS Code, Copilot CLI, the Copilot app, and the Copilot cloud agent for covered Business and Enterprise users.

This is a useful shift from one global agent configuration toward governed specialization. A security team can hold the non-negotiable boundary while teams adapt models, permissions, or workflow settings inside an explicitly delegated surface.

The operator pattern is broader than Copilot: define a stable organization baseline, publish a schema of fields that teams may specialize, validate every specialization before merge, and compile the effective policy for each agent identity at runtime.

### 2) An override is an API, not an escape hatch

GitHub requires each overridable key to be declared centrally. Team files may only set those keys; everything else falls back to the enterprise decision. That makes the override surface a versioned contract.

Treat it like a privileged API. For every overridable field, document the allowed values, reason for delegation, owner, expiry or review date, and maximum operational impact. Validate unknown keys and invalid values as errors rather than silently ignoring them. A team should never gain a new capability merely because a client introduced a new configuration field.

Prefer bounded choices over arbitrary values. `model: one-of-approved-set` is safer than a free-form model identifier. A named permissions profile is easier to audit than a collection of loosely related booleans. The narrower the contract, the easier it is to reason about the effective authority of an agent.

### 3) Floors and ceilings need different merge rules

GitHub describes two distinct composition behaviors. Enterprise-locked keys act as a ceiling. Team settings can specialize only keys declared overridable. Plugin and marketplace lists are additive, so a team may extend the enterprise baseline without removing required entries.

Do not use one generic deep-merge function for agent policy. Each field needs an explicit operator:

- **replace within an allowlist** for a default model or approved execution profile;
- **intersection** for permissions and network destinations, so child policy cannot exceed the parent grant;
- **union** for mandatory controls, scanners, telemetry sinks, and organization-required plugins;
- **additive extension with provenance** for team-approved skills, plugins, and marketplaces;
- **deny wins** for prohibited tools, data classes, and destructive action types.

Record the operator in the policy schema. Otherwise a harmless-looking merge-order change can become an authority escalation.

### 4) Multi-team membership is a conflict-resolution problem

For users in multiple enterprise teams, GitHub combines team-level settings using the least restrictive value for each key, beneath the enterprise file. That favors enablement, but it also means membership in one permissive team can affect an agent everywhere that identity is used.

Operators should choose this behavior deliberately. Least restrictive can work for model availability or optional productivity features. It is a poor default for credentials, data access, shell permissions, deployment rights, or external side effects.

For authority-bearing policy, calculate access from the task's active role and environment—not the union of every team a person belongs to. Show the resolved policy and its provenance before execution: which baseline, team mapping, override, and conflict rule produced each effective value.

### 5) Let teams propose changes through reviewable artifacts

GitHub recommends storing the AI standards repository with internal visibility and allowing users to propose governance updates through pull requests. This makes policy evolution inspectable and gives specialized teams a path to contribute without receiving direct administrative control.

Apply the same workflow to installable skills and agent automation. A request to add a marketplace, plugin, MCP server, skill, or tool permission should include its source, version or digest, requested capabilities, network destinations, credential needs, data handling, owner, and rollback plan. Automated checks can reject mutable references, undeclared tools, broad credentials, or packages that exceed the team's delegated envelope.

Review the compiled policy diff, not just the source diff. The meaningful question is not “what line changed?” but “which agents gained or lost which capabilities?”

## Operator takeaways

### Lock the control plane

Keep compliance, audit, credential, sandbox, and destructive-action controls enterprise-owned. Make delegation explicit field by field.

### Compile effective policy

Resolve inheritance, team mappings, defaults, and conflicts into a deterministic artifact. Sign or digest it, attach it to the run, and make it available in logs.

### Separate extensions from authority

An additive plugin list must not imply additive permission. Installable skills and plugins still execute under independently scoped tools, credentials, network policy, and approval gates.

### Test policy like code

Maintain fixtures for single-team and multi-team identities, unknown keys, conflicting overrides, revoked membership, stale mappings, and client-version drift. Assert both allowed and denied behavior.

### Measure the delegated surface

Track the number of overridable keys, specialized teams, exceptions, installed extensions, capability deltas, policy conflicts, and time since each delegation was reviewed.

## A minimal inherited-policy receipt

Persist at least:

- enterprise baseline repository, commit, schema version, signer, and policy digest;
- agent identity, active role, organization, team memberships, environment, and delegated objective;
- team mapping files, matched specializations, override values, field-level merge operators, and provenance;
- effective model, tools, skills, plugins, marketplaces, permissions, credentials, network destinations, and approval requirements;
- validation results, policy conflicts, denied fields, exceptions, expiry dates, and reviewer decisions;
- client and agent versions, compiled policy digest, execution time, and observed capability use.

The durable pattern is not “let every team configure its own agent.” It is “centralize the safety boundary, then expose small, typed seams where teams can adapt without weakening it.”

## Sources

- [GitHub: Enterprise team specialization for managed settings](https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings/)
- [GitHub Docs: Applying different managed settings to enterprise teams](https://docs.github.com/enterprise-cloud@latest/copilot/reference/enterprise-managed-settings-reference#applying-different-settings-to-enterprise-teams)
- [GitHub: Enterprise teams model policy targeting in public preview](https://github.blog/changelog/2026-07-31-enterprise-teams-model-policy-targeting-in-public-preview/)

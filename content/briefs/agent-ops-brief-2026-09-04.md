---
title: "Agent Ops Brief - Skills need an identity boundary"
summary: "OpenClaw 2026.9.1 adds personal skill libraries on shared Gateways, renewed capability consent for plugin updates, durable Codex MCP approvals, and rollback-aware upgrades. Teams now need identity-scoped capability governance, not one undifferentiated tool catalog."
published_at: "2026-09-04"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-09-04.svg"
tags:
  - agent-ops
  - openclaw
  - skills
  - plugins
  - identity
  - approvals
  - governance
---

## What changed (high signal)

### 1) A shared Gateway can now host personal capability libraries

OpenClaw 2026.9.1 introduces `openclaw skills library`: operators can keep personal skills beside workspace skills, import a library from a ZIP archive, and share or publish it under an identity on a team Gateway. This is more than a catalog feature. It separates who owns a capability from where the agent runs it.

That boundary matters on a shared runtime. A workspace skill is part of the team's versioned operating surface; a personal skill may be experimental, tailored to one operator, or authorized for a narrower set of systems. Flattening both into one effective catalog makes provenance, review, incident response, and removal needlessly ambiguous.

Resolve skills for each run from explicit scopes: platform, organization, workspace, identity, and session. Record which scope supplied the selected skill and why it won. A same-named personal skill should not silently shadow a reviewed workspace capability.

### 2) Capability consent must follow the version, not just the package name

The release also changes plugin updates: when previous capability acceptance is stale, an update requires fresh consent, while verified first-party plugins are exempt. That recognizes an important supply-chain fact: approving a plugin once does not approve every future authority it might request.

Evaluate the capability delta before promotion. Compare filesystem reach, network destinations, executable access, credential classes, channels, MCP servers, and delegated actions between the installed and candidate versions. Bind approval to an immutable artifact digest and a declared capability manifest, not only to a package name or mutable channel.

First-party exemptions reduce friction, but they should remain observable. Record the signer or publisher, verification result, artifact digest, capability diff, exemption policy, and effective reviewer. An exemption is a policy decision, not an absence of risk.

### 3) Durable approvals need narrow keys and revocation paths

OpenClaw now preserves Codex “Allow Always” decisions for MCP tools on configured servers, carries the session permission posture into tool handling, and reuses approvals already granted to an active Codex placement. Delegated system-agent approval cards for configuration changes or Gateway restarts also return to the originating chat instead of waiting invisibly elsewhere.

Durability removes repeated prompts, but an approval must be keyed narrowly enough to remain meaningful. Include identity, Gateway, MCP server identity, tool name, argument or resource constraints, session posture, environment, and expiry. Do not let “always” mean across unrelated users, renamed servers, changed tool schemas, or production environments.

Make revocation immediate and discoverable. When a server, plugin, or skill changes identity or declared authority, invalidate dependent grants and ask again at the point of use. Approval delivery should include the requesting agent, intended effect, target scope, and the run that will resume.

### 4) Installation convenience increases the need for post-setup attestation

Fresh OpenClaw installs now offer a quick-start path that detects existing Claude Code or Codex logins and API keys, verifies them live, and opens the dashboard from a foreground Gateway. The fast path is valuable, but discovery can turn ambient developer credentials into runtime dependencies that were never documented in the deployment plan.

After setup, produce an attestation showing the selected identity, credential class, provider, model route, Gateway address, loaded skill scopes, enabled plugins, and approval posture. Never print secret values. Confirm that the detected account is appropriate for the workspace and that a personal credential has not accidentally become the authentication path for shared automation.

Treat quick-start as bootstrap, not final configuration. Promote a shared Gateway only after replacing incidental local state with managed identities, explicit secret references, reviewed capability sources, and a reproducible setup manifest.

### 5) Capability rollout and runtime upgrade need one recovery contract

OpenClaw's updater now rolls back an npm candidate when post-update Doctor fails, preserves configuration and secret references through a failed upgrade, waits for plugin readiness before restart, and can hand failure analysis to a built-in triage agent. These changes connect runtime health to the capability layer that must be ready when the Gateway returns.

A successful package install is not a successful agent deployment. Readiness should prove that the Gateway is healthy, configured identities resolve, required plugins load, skill catalogs can be enumerated, approval state is compatible, and a small synthetic tool call completes within its intended boundary.

Keep runtime, plugin, and skill rollback independently addressable. If a plugin expands authority or a personal library import fails validation, operators should be able to remove that capability without reversing an unrelated runtime security fix.

## Operator takeaways

### Separate capability scopes

Maintain distinct platform, organization, workspace, identity, and session catalogs. Show provenance and shadowing before execution.

### Consent to diffs

Review capability changes for every update and bind acceptance to the exact artifact and manifest. Re-prompt when identity, authority, or schema changes.

### Make “always” finite

Scope durable approvals by user, runtime, server, tool, environment, and constraints. Add expiry, usage visibility, and immediate revocation.

### Attest quick-start state

After credential discovery, record the non-secret identity and routing facts that will govern the Gateway. Replace accidental local dependencies before shared use.

### Test recovery end to end

Verify Gateway health, plugin readiness, skill resolution, approval compatibility, and one bounded tool action after every update or rollback.

## A minimal capability-resolution receipt

Persist at least:

- run, task, workspace, Gateway, environment, initiating identity, execution identity, and session posture;
- resolved skill and plugin names, versions, artifact digests, publishers, signatures, source scopes, precedence decisions, and shadowed candidates;
- declared and effective capabilities, capability delta, consent record, exemption policy, reviewer, approval time, expiry, and revocation reference;
- MCP server identity, tool schema hash, resource and argument constraints, durable-grant key, last use, and invalidation reason;
- provider and model route, credential class and owner without secret material, configuration revision, and quick-start attestation;
- preflight, Doctor, plugin-readiness, synthetic-tool, rollback, and post-recovery results, with artifacts and final disposition.

Installable skills make agents adaptable, and shared Gateways make them useful to teams. The operational boundary must follow the identity that owns the capability: explicit at resolution time, reviewable when authority changes, and removable without destabilizing the rest of the runtime.

## Sources

- [OpenClaw 2026.9.1 release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.9.1)
- [OpenClaw documentation: Skills](https://docs.openclaw.ai/tools/skills)
- [OpenClaw CLI documentation: Skills](https://docs.openclaw.ai/cli/skills)
- [OpenClaw CLI documentation: Update](https://docs.openclaw.ai/cli/update)

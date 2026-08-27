---
title: "Agent Ops Brief - Portable plugins need a trust contract"
summary: "Agent Plugins 1.0 standardizes how skills and MCP servers travel across agent clients. Operators still own installation policy, credentials, execution boundaries, and evidence for every loaded capability."
published_at: "2026-08-27"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-08-27.svg"
tags:
  - agent-ops
  - agent-plugins
  - agent-skills
  - mcp
  - supply-chain
  - governance
  - agent-orchestration
---

## What changed (high signal)

### 1) Agent capability packaging now has a portable floor

Agent Plugins 1.0 defines one vendor-neutral package for the two components that already have meaningful cross-client adoption: Agent Skills and MCP servers. A conforming package has a root `plugin.json`, discovers skills from immediate children of `skills/`, and reads MCP server definitions from a root `mcp.json`. GitHub shipped general support across VS Code, Copilot CLI, the Copilot SDK, and the Copilot app after publishing the specification with AWS, Anysphere, Microsoft, OpenAI, and Vercel; Google joined as a core maintainer.

This is intentionally a narrow interoperability layer. Version 1 does not try to make an entire agent runtime portable. Custom agents, hooks, commands, rules, installation UX, permissions, credentials, and distribution policy remain client concerns. Client-specific behavior can live in reverse-domain namespaces such as `com.github.copilot/`, which other clients ignore.

That boundary is the useful part. Teams can maintain the reusable knowledge and tool connection once while preserving host-specific controls around execution.

### 2) Portability moves the bottleneck from authoring to admission

When a capability works across several clients, installation becomes easier—and mistakes propagate farther. A valid manifest proves structural conformance, not that a plugin is safe, appropriate, or authorized for a particular repository.

Treat every plugin as a software supply-chain unit. Pin an immutable version or commit, verify provenance and license, inventory every skill and MCP server, inspect executable content, and record the exact package digest admitted to each environment. Keep a separate policy decision for whether a client may load the package and whether a run may invoke a specific capability.

The catalog entry should answer five questions before installation:

- who published and reviewed this version;
- which files, processes, network destinations, and credentials it can reach;
- which lifecycle events can execute code without a direct model tool call;
- which data may enter model context or leave the machine;
- how the operator disables, rolls back, and audits it.

### 3) Skills and MCP servers require different controls

A skill primarily supplies instructions, scripts, references, and assets that load on demand. Its risk is not limited to prose: referenced scripts can execute, instructions can redirect agent behavior, and bundled resources can shape decisions. Review both the activation description and the full transitive contents.

An MCP server is an active tool boundary. Agent Plugins supports `stdio` and `streamable-http` configurations, but version 1 defines no portable OAuth or credential-reference fields. Authentication discovery, secret storage, consent, and user interaction stay with the client. Do not put credentials in the package or assume a plugin can carry authorization safely between hosts.

Apply least privilege at runtime: allow specific server identities and destinations, restrict environment injection, isolate subprocesses, gate mutating tools, and retain structured tool-call receipts. A portable `mcp.json` is configuration—not authority.

### 4) Failure isolation is part of the contract

The specification uses deliberately narrow failure boundaries. An invalid skill should be skipped without preventing other valid components from loading. An invalid or unavailable MCP server entry should disable that server rather than destroy the rest of the package. Schema-version mismatches in `mcp.json` do not automatically invalidate otherwise valid skills.

Operators should preserve that granularity in telemetry. Report package validation, component discovery, activation, tool connection, and invocation as separate states. “Plugin loaded” is too coarse: it can hide a skipped safety skill, a dead tool server, or a client extension that was ignored by the current host.

Before a production run, produce a capability receipt containing the plugin digest, declared spec version, client name and version, discovered components, rejected components with reasons, effective policy, MCP transport, granted credentials, and enabled client extensions.

### 5) Build a portable core and explicit host adapters

Do not chase false parity. Put stable, reusable operating knowledge in `skills/`; put portable MCP connection declarations in `mcp.json`; and isolate host-only agents, hooks, commands, and rules under the host namespace. Document the behavioral delta for every supported client.

Then test the package as a matrix, not a single artifact:

- validate manifests and component-level failure behavior;
- install from a clean environment with no ambient secrets;
- confirm which skills and servers each client actually discovers;
- exercise read-only, mutating, denied, offline, and rollback paths;
- verify that uninstall removes executable capability while preserving only declared user data;
- compare receipts across clients before calling the plugin portable.

Portability is achieved when the common core behaves predictably and every client-specific difference is visible—not when every host silently improvises around the same folder.

## Operator takeaways

### Pin packages, not marketplace labels

Record an immutable source revision and content digest. A mutable marketplace name is discovery metadata, not a deployment identity.

### Separate install, load, and invoke authority

Approval to obtain a plugin should not automatically authorize every component or tool call it contains.

### Keep secrets client-owned

Inject credentials at runtime through the host's secret boundary. Never embed them in `plugin.json`, `mcp.json`, skills, or bundled scripts.

### Audit the effective capability set

Capture what the current client discovered, skipped, enabled, and actually invoked. The package contents alone are not the runtime truth.

### Test host extensions explicitly

Hooks and custom agents are outside the portable v1 core. Treat each namespaced extension as a separate compatibility and security surface.

## A minimal plugin admission receipt

Persist at least:

- plugin name, publisher, marketplace or source repository, immutable revision, package digest, signature or provenance evidence, license, reviewer, and approval expiry;
- declared specification version, manifest validation result, client and version, install scope, update policy, and rollback target;
- discovered skills, skipped skills and reasons, referenced scripts and assets, activation descriptions, and content digests;
- MCP server names, transport, command or URL, working directory, environment keys requested, network destinations, credential grants, tool inventory, and mutation class;
- client-extension namespaces, hooks and lifecycle events, custom agents, commands, rules, and unsupported components ignored by the host;
- effective sandbox, filesystem and network policy, allowed repositories, secret sources, consent requirements, budgets, and human-approval gates;
- installation, activation, connection, invocation, denial, update, uninstall, and rollback events with timestamps and evidence.

Agent Plugins 1.0 makes capabilities easier to move. The durable operating model is to keep the package portable while making trust, authority, and runtime evidence explicit at every destination.

## Sources

- [Agent Plugins Specification 1.0.0](https://agent-plugins.org/specification)
- [GitHub: Agent Plugins 1.0 in VS Code, Copilot CLI, and the Copilot app](https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app/)
- [Visual Studio Code: Agent plugins and cross-tool compatibility](https://code.visualstudio.com/docs/agent-customization/agent-plugins)
- [Agent Plugins: MCP server packaging and authentication boundary](https://agent-plugins.org/plugin-authors/mcp-servers)

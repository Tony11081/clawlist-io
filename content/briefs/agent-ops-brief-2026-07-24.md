---
title: "Agent Ops Brief - Intent must survive execution"
summary: "GitHub's new issue intents, Linear controls, and stateless MCP transport point to one operating rule: carry the requested outcome, confidence, rationale, and authority through every agent handoff."
published_at: "2026-07-24"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-24.svg"
tags:
  - agent-ops
  - github-copilot
  - mcp
  - orchestration
  - agent-automation
  - auditability
  - human-in-the-loop
  - coding-agents
---

## What changed (high signal)

### 1) Intent is becoming a first-class automation artifact

GitHub Issues can now attach an intent to supported agent actions: the proposed change, a high, medium, or low confidence rating, and a rationale. Repository administrators choose which confidence levels apply automatically and which wait for review. The first actions covered include labels, fields, issue type, closure, and assignment.

This is more than a nicer approval panel. It separates an agent's interpretation from the mutation it wants to perform. That distinction makes uncertain work reviewable without forcing every action into a comment thread, and it gives operators a record of why metadata changed.

Persist the intent before executing the action. Give it its own ID, source event, subject, proposed effect, confidence scheme and version, rationale, evidence references, policy decision, and final disposition. Never reconstruct intent later from the resulting state: a label tells you what happened, not why it happened or which alternatives were rejected.

### 2) Confidence should route review, not manufacture trust

GitHub can automatically apply high-confidence changes while holding medium- and low-confidence ones. That is a useful attention router, but the company explicitly says the approval flow is a workflow convenience rather than a server-side security boundary. An agent that already has permission to mutate an issue can apply the change directly.

Treat confidence as a calibrated prediction about a defined decision, not as permission. A model's self-reported certainty, a rules-engine score, and an empirically calibrated probability are different signals and should not share an unlabeled field. Measure each score against later accept, reject, correction, and incident outcomes by action type.

Authorization must still be enforced at the mutation boundary. Check the actor, resource, action, policy revision, and current state when the write occurs. For irreversible or high-impact actions, require an independent control even when confidence is high.

### 3) Task trackers are becoming agent control surfaces

Copilot cloud agent for Linear is now generally available. A Linear issue can start an ephemeral coding session, receive progress updates, and end with a draft pull request and review request. Teams can choose the model, select a repository-defined custom agent, set base and working branches, and steer a running session from comments; defaults can live at issue, team, or workspace scope.

Once a tracker can select execution policy, its fields and comments are control-plane input. A copied issue is no longer merely prose. Branch selection affects the code lineage, the chosen custom agent affects tools and instructions, and a steering comment can change work already in progress.

Snapshot the resolved task contract at dispatch: issue revision, repository, base commit, target and working branches, model route, custom-agent revision, inherited guidance, initiating identity, and allowed steering identities. Record subsequent comments as ordered amendments. If a branch, policy, or agent definition changes, decide explicitly whether the live session keeps its snapshot, restarts, or requests review.

### 4) Stateless transport makes hidden context an application bug

The upcoming MCP `2026-07-28` specification removes the protocol session and initialization handshake. Each request carries the protocol and client context it needs; method and tool names become HTTP headers for routing; W3C trace context is standardized in request metadata; and stateful tools return explicit handles that later calls pass back as arguments.

This improves scaling and observability, but it also removes a convenient place to hide assumptions. Tenant, user, task, policy, credential, data region, budget, and trace identity do not become optional because a load balancer can send consecutive calls to different server instances.

Build a signed or server-resolved execution envelope for every tool call. Keep authorization claims minimal and short-lived, bind state handles to the tenant and originating workflow, validate header/body agreement, and reject missing or stale policy context. Propagate trace identity for diagnosis without placing secrets or unrestricted personal data in trace baggage.

### 5) Conformance proves protocol behavior, not workflow correctness

The MCP project now provides conformance scenarios for clients and servers, including core, extensions, authorization, metadata, backward compatibility, and the draft specification. GitHub reports that its MCP server supports the new specification ahead of the final release.

Run conformance tests in CI and pin the specification versions you claim to support. Then add workflow-level tests the protocol suite cannot supply: cross-tenant handle replay, expired credentials, altered intent metadata, duplicate delivery, out-of-order steering, cancellation races, branch movement, partial tool failure, and retries landing on another instance.

Passing the wire contract means components can communicate. It does not prove that the right actor asked for the right action on the right resource.

## Operator takeaways

### Store intent before effect

Make the requested outcome, rationale, evidence, confidence, and policy decision durable before applying a mutation.

### Separate confidence from authority

Use confidence to allocate human attention. Enforce permission independently at the resource boundary.

### Version every handoff

Snapshot tracker content, inherited guidance, custom-agent configuration, model route, branches, and base commit when work is dispatched.

### Put context in the request contract

With stateless MCP, carry or securely resolve the identity, policy, tenant, budget, trace, and state handles required for each call.

### Test semantic failure modes

Pair protocol conformance with adversarial tests for replay, isolation, retries, steering, cancellation, and stale policy.

## A minimal intent envelope

Persist at least:

- workflow, task, intent, action, attempt, and trace IDs;
- source system, source object and revision, initiating actor, and event time;
- requested outcome, proposed mutation, rationale, evidence references, alternatives, and assumptions;
- confidence value, meaning, producer, calibration version, and review threshold;
- tenant, repository, resource, credential, tool, model, and custom-agent identities and revisions;
- base commit, target and working branches, workspace snapshot, and inherited guidance revision;
- authorization decision, policy revision, approval requirement, approver, and decision time;
- state-handle issuer, scope, expiry, replay protection, and parent call;
- ordered steering amendments, cancellation state, retries, and idempotency key;
- applied effect, verification evidence, reviewer correction, rollback, and final disposition.

An agent workflow remains governable when every handoff can answer four questions: what was intended, who could authorize it, which context execution used, and what effect actually occurred.

## Sources

- [GitHub: Agent automation controls in GitHub Issues](https://github.blog/changelog/2026-07-23-agent-automation-controls-in-github-issues-in-public-preview/)
- [GitHub Docs: About Copilot automations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations)
- [GitHub: Copilot cloud agent for Linear is generally available](https://github.blog/changelog/2026-07-23-copilot-cloud-agent-for-linear-is-now-generally-available/)
- [GitHub Docs: Integrating Copilot cloud agent with Linear](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/integrate-cloud-agent-with-linear)
- [GitHub: GitHub MCP Server supports the next MCP specification](https://github.blog/changelog/2026-07-23-github-mcp-server-supports-the-next-mcp-specification/)
- [Model Context Protocol: 2026-07-28 specification release candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- [Model Context Protocol: Conformance test framework](https://github.com/modelcontextprotocol/conformance)

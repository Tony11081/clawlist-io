---
title: "Agent Ops Brief - Put authorization behind confidence"
summary: "GitHub now lets issue agents attach confidence, rationale, and review suggestions to routine actions. The useful pattern is risk-tiered autonomy—but the real control must live at the tool boundary."
published_at: "2026-08-03"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-08-03.png"
tags:
  - agent-ops
  - agent-automation
  - human-in-the-loop
  - authorization
  - github-issues
  - mcp
  - auditability
  - confidence-gating
---

## What changed (high signal)

### 1) Agent actions are becoming reviewable objects

GitHub Issues can now carry three pieces of intent with an automated change: a confidence rating, a rationale, and an optional approval step. Supported actions include changing labels, fields, issue type, assignees, and issue state. High-confidence actions may apply automatically while medium- and low-confidence actions wait as suggestions, depending on the repository's automation level.

This is more important than another triage feature. It makes the proposed action—not the agent transcript—the unit of review. An operator can see what will change, why the agent wants it, and whether it crossed the configured review threshold.

Build the same shape into practical automations: emit a typed intent with the target, proposed mutation, evidence, confidence, reversibility, and expiry before invoking a mutating tool.

### 2) Confidence should route work, not grant permission

GitHub explicitly warns that these approvals are a workflow convenience rather than a security boundary. An agent that already has permission to edit an issue can bypass the suggestion flow and apply the change directly.

That distinction is the central operator lesson. Confidence is model output. It can be poorly calibrated, manipulated by untrusted context, or computed from incomplete evidence. A statement such as `confidence: high` must never expand the caller's authority.

Use confidence to choose a queue: auto-apply, sample for review, require review, or reject. Enforce the allowed action, target scope, field values, rate limits, and credential capabilities independently in the tool gateway. The policy engine—not the agent—decides whether execution is possible.

### 3) Separate uncertainty from impact

A low-confidence label suggestion is not equivalent to a low-confidence account deletion, and a high-confidence destructive action is still destructive. One scalar cannot represent operational risk.

Evaluate at least two axes:

- **epistemic confidence:** how strong is the evidence for the classification or decision?
- **action impact:** how costly, broad, external, or difficult to reverse is the mutation?

Low-impact, reversible metadata changes can tolerate a lower threshold. External messages, deployments, permission changes, financial operations, data deletion, and actions across many records should require stronger evidence plus an independent authorization rule. Irreversible actions should not become automatic merely because the agent sounds certain.

### 4) Rationales need evidence references

A fluent explanation is useful for scanning but weak as an audit artifact. Require the rationale to point to stable evidence: issue fields, commit hashes, log events, policy rules, source URLs, or content-addressed artifacts. Store the evidence snapshot or digest with the proposed action so later edits cannot silently change what the reviewer approved.

For classification tasks, record the candidate alternatives and why they were rejected. For generated changes, record the exact diff. For tool calls, record normalized arguments after defaults and policy transforms. A reviewer should be able to reconstruct the decision without replaying an entire agent session.

### 5) Stateless MCP makes explicit authorization context more valuable

The MCP `2026-07-28` revision removes protocol-level sessions and moves client and protocol metadata onto each request. Application state can remain stateful, but it becomes explicit through handles rather than hidden transport sessions. The release also hardens authorization and adds formal conformance testing; GitHub's MCP Server already supports the revision.

That architecture favors per-action authorization. Send the subject, delegated objective, action class, resource scope, approval reference, and idempotency key with each mutating request. Do not rely on a long-lived session having been approved earlier. A stateless transport is not automatically secure, but explicit request context makes policy decisions easier to reproduce, test, and audit.

## Operator takeaways

### Emit intent before mutation

Represent proposed changes as typed, reviewable records. Keep free-form explanation alongside—not instead of—the exact machine-readable action.

### Gate on impact and confidence

Use a matrix, not one threshold. High-impact actions retain approval and policy checks even when confidence is high.

### Enforce below the agent

Give the execution layer narrow credentials and server-side policy. An agent cannot be allowed to self-certify into broader authority.

### Bind approvals to immutable inputs

Approve the normalized action, target version, evidence digest, policy version, and expiry. Any material change creates a new proposal.

### Measure calibration

Track approval, rejection, correction, rollback, and incident rates by action class and confidence band. Tighten or relax automation only from observed outcomes.

## A minimal action-intent receipt

Persist at least:

- automation, agent session, actor identity, delegated objective, model or policy version, and creation time;
- action type, target resource and version, normalized arguments, expected effect, reversibility, blast radius, and idempotency key;
- confidence band, confidence basis, impact tier, evidence references and digests, alternatives considered, and rationale;
- tool identity, credential scope, destination boundary, rate limit, policy decision, rules evaluated, and denied capabilities;
- review requirement, reviewer, approval decision, approved action digest, approval time, expiry, and segregation-of-duties result;
- execution time, tool response, resulting resource version, verification result, rollback reference, and final disposition.

The durable pattern is not “let confident agents act.” It is “make agent intent inspectable, then let an independent system decide what that intent is allowed to change.”

## Sources

- [GitHub: Agent automation controls in GitHub Issues](https://github.blog/changelog/2026-07-23-agent-automation-controls-in-github-issues-in-public-preview/)
- [Model Context Protocol: 2026-07-28 specification release candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- [GitHub: GitHub MCP Server supports the next MCP specification](https://github.blog/changelog/2026-07-23-github-mcp-server-supports-the-next-mcp-specification/)
- [MCP Go SDK: v1.7.0 support for MCP 2026-07-28](https://github.com/modelcontextprotocol/go-sdk/releases/tag/v1.7.0)

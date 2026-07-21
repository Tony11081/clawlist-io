---
title: "Agent Ops Brief - Findings need an evidence graph"
summary: "Codex Security's latest reporting and repository-policy changes point to a stronger pattern for security agents: preserve one canonical result, derive every report from it, and keep policy, coverage, and proof attached."
published_at: "2026-07-21"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-21.svg"
tags:
  - agent-ops
  - codex
  - security
  - deep-scans
  - evidence
  - orchestration
  - automation
  - governance
---

## What changed (high signal)

### 1) A finding is a graph of evidence, not a paragraph

Codex Security plugin 0.1.11 can generate a source-backed vulnerability report for every reportable finding, include proof-of-concept files when available, and produce a structural hardening portfolio across the complete result set. Its `report.md` is the entry point to derived material under `findings/` and `hardening/`, and the documentation says to keep the full scan directory together when sharing or archiving it.

That directory boundary matters. A severity label without its source locations, validation trail, reachability analysis, coverage record, and scanner context is an assertion that becomes harder to challenge every time it is copied. A polished report should be a view over canonical evidence, not a replacement for it.

Give every scan, finding, proof, and derived report a stable ID. Record which result revision and source commit produced each artifact. When evidence changes, regenerate or mark the derived report stale instead of silently editing one copy. Reviewers should be able to move from executive summary to exact code and back without losing identity.

### 2) Repository policy should be executable context

The update reads threat-model context, security invariants, reportable-finding criteria, exclusions, and severity guidance from root or nested `SECURITY.md` files. The closest applicable file takes precedence.

This turns repository documentation into policy input for an agent, but precedence creates real operational risk. A nested file may correctly refine the threat model for a service; it may also unintentionally suppress a repository-wide invariant or redefine what gets reported.

At scan start, resolve and snapshot the effective policy for every target path. Show the contributing files, precedence order, and content digests in the scan manifest. Treat exclusions as scoped rules with an owner and rationale. If policy changes between discovery and validation, finish against the pinned snapshot or restart the affected phase explicitly.

### 3) Coverage must include what disappeared

Version 0.1.11 adds deleted source files to change scans and expands default repository review coverage before validation. Deleted code is security-relevant because removing a guard, migration, registration, or test can change the reachable system even when no vulnerable line remains in the diff.

Build coverage from the semantic change set: added, modified, renamed, generated, and deleted paths; changed dependencies; configuration; migrations; public interfaces; and tests that encode security behavior. Map every reviewed area to a status such as inspected, delegated, excluded by policy, unavailable, or timed out.

Do not convert incomplete coverage into a clean bill of health. A no-finding result and a complete scan are different facts. Publish confidence and coverage separately, with the commit range and repository state they describe.

### 4) Delegation needs a preflight contract

The deep-scan workflow now checks phase skills, delegated workers, and worker capacity before the scan begins. That is the right place to fail: before a long orchestration run has created partial outputs whose missing pieces are easy to overlook.

Define each phase by required skill version, input schema, output schema, authority, time budget, retry rule, and minimum worker capacity. Preflight availability and compatibility, then pin the resolved plan into the run manifest. A replacement worker must accept the same contract or trigger a visible plan revision.

Track phase completion against expected outputs, not merely worker exit status. A successful process that returned no coverage map or validation record is an incomplete phase. The coordinator should distinguish failed, partial, skipped, and superseded work before it assembles the final report.

### 5) Reports and remediation should remain separate decisions

The plugin can also turn rough findings, disclosure documents, proof files, and source code directly into polished vulnerability write-ups, or develop structural hardening options without first running a full scan. This is useful because reporting and architecture work often start from evidence produced elsewhere.

Preserve that provenance. Label whether an artifact came from a completed scan, imported finding, incident record, or operator-supplied hypothesis. Require validation before a draft report becomes a confirmed finding, and require a separate approval before any remediation changes code, issues, advisories, or external systems.

Hardening portfolios should expose tradeoffs, migration cost, affected boundaries, and residual risk. They are decision support, not an instruction to let the reporting agent choose and implement an architecture autonomously.

## Operator takeaways

### Keep the bundle intact

Archive the manifest, canonical findings, coverage, proofs, reports, and hardening options together. Do not distribute summaries as if they were self-verifying.

### Pin effective policy

Resolve root and nested security guidance per path, record precedence and digests, and make exclusions attributable.

### Measure coverage independently

Include deleted and indirect changes, then report what was inspected, skipped, unavailable, or timed out separately from finding count.

### Preflight the orchestration plan

Verify phase skills, worker capacity, schemas, and authority before starting. Validate expected artifacts when each phase completes.

### Gate state transitions

Keep draft, validated finding, published report, accepted hardening decision, and applied remediation as distinct, auditable states.

## A minimal security-agent manifest

Persist at least:

- repository identity, source commit or commit range, dirty-state digest, and scan ID;
- effective `SECURITY.md` inputs by path, precedence order, policy digests, and exclusions;
- changed and reviewed paths, including deletions, plus explicit coverage gaps;
- phase plan, skill versions, worker identities, capacity decision, budgets, and retries;
- canonical finding IDs with evidence, validation, reachability, confidence, and severity context;
- proof artifacts and their safety constraints;
- derived report IDs, source-result revisions, generation time, and stale status;
- reviewer decisions, remediation links, and verification results.

The goal is not more paperwork. It is to make every security claim reproducible, every omission visible, and every consequential transition attributable.

## Sources

- [Codex Security plugin changelog](https://developers.openai.com/codex/security/plugin/changelog)
- [Run a deep security scan](https://developers.openai.com/codex/security/plugin/deep-scans)
- [Review code changes](https://developers.openai.com/codex/security/plugin/code-changes)
- [Write vulnerability reports](https://developers.openai.com/codex/security/plugin/vulnerability-reports)
- [Propose security hardening](https://developers.openai.com/codex/security/plugin/security-hardening)

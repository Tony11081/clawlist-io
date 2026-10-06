---
title: "Agent Ops Brief - Put the repeatable path in code"
summary: "GitHub's new dynamic workflows separate deterministic orchestration from agent judgment. For repeatable, high-stakes work, encode stages, typed handoffs, review gates, and recovery outside the chat."
published_at: "2026-10-06"
tags:
  - agent-ops
  - agent-orchestration
  - github-copilot
  - workflows
  - automation
  - verification
  - observability
  - governance
---

## What changed (high signal)

### 1) GitHub is previewing code-defined agent workflows

GitHub has introduced **dynamic workflows** in Copilot CLI, the Copilot app, and the Copilot SDK. A workflow is a program inside a Copilot extension: it can run commands, use tools or services, split independent work in parallel, pass structured results between stages, ask agents to verify each other, pause for review, and resume later.

That makes an important boundary visible. A chat or ad-hoc agent run is useful for discovery and one-off changes. A recurring process needs a durable definition of its stages, inputs, limits, and exits. Put the repeatable path in code; reserve agents for the ambiguous portions that genuinely need analysis or judgment.

### 2) Treat the workflow definition as a production artifact

Once an orchestration can make tool calls, fan work out to several agents, and resume after a pause, its definition affects reliability and authority as directly as application code. Version it, review it, test it, and give it an owner.

The definition should name the workflow version, trigger, input schema, approved tools and services, stage dependencies, concurrency ceiling, time and cost limits, output schema, retention policy, and escalation route. Do not hide those controls in a long natural-language prompt. A reviewer should be able to determine what a run may do without reconstructing a conversation.

### 3) Use structured handoffs, not transcript handoffs

Dynamic workflows can pass structured results between stages. Make that the default interface. A research stage should emit claims, evidence links, timestamps, uncertainty, and open questions—not a prose blob that a downstream agent must reinterpret. A code-scanning stage should emit file paths, symbols, findings, confidence, and reproduction or test evidence. An implementation stage should receive an explicit change plan and constraints.

Validate each handoff before downstream tools run. Reject missing required fields, stale inputs, untrusted URLs, schema-version mismatches, and outputs that exceed a defined size or scope. Persist both the validated artifact and the validator result so a later reviewer can distinguish a well-formed handoff from a merely fluent answer.

### 4) Parallelize independent evidence, then converge deliberately

Parallel agents are most useful when their inputs and outputs are independent: examining separate services in an incident, scanning distinct repository areas, or checking a claim against multiple sources. They are not a license to duplicate the same vague request across a fleet.

Write the join rule before starting the fan-out. Specify which outputs must arrive, how disagreement is represented, when a missing result becomes a failure, and who or what may resolve a conflict. GitHub's example of reporting a review finding only when two models agree is one possible rule; high-impact cases should preserve dissenting evidence and route it to a human rather than treating consensus as proof.

### 5) A pause is a control point, not just a user-experience feature

The preview supports checkpoints where an operator can review results and resume later. Use those checkpoints immediately before an irreversible or expensive effect: merging, deployment, data mutation, customer communication, privilege change, broad network access, or a long paid run.

A useful checkpoint displays the workflow version, run ID, resolved inputs, completed-stage artifacts, proposed next effect, policy decision, remaining budget, and rollback or recovery path. Resuming should revalidate freshness, permissions, repository state, and approvals. Time passing can change every one of those conditions.

### 6) Keep a normal prompt for normal work

GitHub explicitly positions dynamic workflows for reusable processes or tasks that need stages, checks, or limits; a standard chat remains appropriate for a quick answer or simple change. That boundary keeps the control plane proportionate.

Start with one workflow that already has a stable, manual checklist and a measurable end state: release readiness, dependency-report production, incident triage, PR evidence gathering, or documentation freshness checks. Run it in shadow mode first, compare its result with a human baseline, then enable limited effects only after its false-positive, latency, cost, and recovery behavior are understood.

## Operator takeaways

### Encode the known path

Version triggers, stages, dependencies, limits, tool policy, outputs, and terminal states. Let agents decide only inside the bounded steps that need judgment.

### Define typed stage contracts

Use small schemas with freshness, evidence, uncertainty, and provenance fields. Validate every handoff before the next stage acts.

### Make fan-out and convergence auditable

Bound concurrency and record each worker's input, output, failure, and dissent. Define the join rule before the work starts.

### Put review before effects

Pause at a named gate before costly or irreversible operations, then revalidate state and authority on resume.

### Graduate by evidence

Shadow a workflow against a human baseline and measure correctness, retries, latency, cost, operator intervention, and recovery—not just completion.

## A minimal workflow-run receipt

Persist at least:

- workflow ID and version, run ID, trigger, requester and owner, input-schema version, resolved inputs, input freshness checks, and start time;
- stage graph, dependencies, concurrency ceiling, model and agent configuration, allowed tools and services, policy decisions, resource budget, and timeout;
- per-stage input and output artifact references, schema-validation result, evidence and provenance links, uncertainty, timestamps, retry count, tool-call results, and failure classification;
- fan-out worker identities, join rule, missing or dissenting outputs, conflict-resolution decision, reviewer, and supporting evidence;
- checkpoint state, proposed next effect, approval identity and expiry, repository or environment revision, resume-time revalidation, and rollback or recovery instructions;
- final artifact, acceptance-test result, human corrections, external effects, cost, latency, terminal state, and linked follow-up or incident.

Agentic automation becomes dependable when the system can repeat the known sequence exactly, surface the uncertain work clearly, and stop at a reviewable boundary before an effect escapes. The workflow code supplies the spine; the agent supplies the judgment.

## Sources

- [GitHub Changelog: Dynamic workflows in Copilot CLI and the Copilot app](https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/)
- [GitHub Docs: Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- [GitHub Docs: Configuring access to AI models in GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models)

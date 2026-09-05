---
title: "Agent Ops Brief - Merge agents need a stop contract"
summary: "VS Code 1.136 adds an iterative Agent Merge loop, hierarchical delegated sessions, and multi-root agent work. Reliable teams need bounded completion criteria, explicit workspace authority, and causal run records."
published_at: "2026-09-05"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-09-05.svg"
tags:
  - agent-ops
  - github-copilot
  - vscode
  - agent-merge
  - orchestration
  - code-review
  - multi-root
---

## What changed (high signal)

### 1) “Ready to merge” is now an agent loop

VS Code 1.136 introduces Agent Merge in public preview. It asks an agent to address review feedback, failed checks, and merge conflicts, reruns workflows, and repeats until the pull request is ready to merge. This moves the agent from producing a patch to operating a convergence loop over several changing systems.

The loop needs a stop contract. Define the required checks, review threads, conflict state, approval policy, retry and cost limits, and conditions that require a human decision. “Green” should mean a named set of current evidence, not the agent's general impression that the branch looks healthy.

Pin each iteration to a head SHA and invalidate earlier evidence when the branch changes. A check result, approval, or conflict scan against an old revision cannot prove the new revision is mergeable.

### 2) Agent approval must remain independent from agent repair

GitHub Copilot code review can now submit an approval that counts toward required approvals when administrators enable it. New commits dismiss that approval, and repositories can restrict which paths Copilot may approve.

An Agent Merge loop can therefore repair a change and encounter an automated reviewer capable of approving it. Keep those roles independent. The actor that writes a revision should not supply the decisive approval for that same revision, even when both actions use different product surfaces or sessions.

Record the patch-producing agent, review agent, model and policy versions, reviewed SHA, allowed paths, findings, disposition, and dismissal event. Require a separate human or independently configured reviewer for sensitive paths, generated policy, security controls, migrations, and deployment logic.

### 3) Session trees are useful only if causality survives

VS Code now displays chats beneath their parent session, gives delegated chats meaningful titles, surfaces status and pending approvals, and links a delegated request back to its source. This is a practical orchestration primitive: operators can see a task tree instead of a flat pile of chats.

Do not mistake a navigable tree for a complete audit trail. Persist immutable parent and child run IDs, delegation time, exact delegated request, inherited context, workspace and revision, granted authority, returned artifacts, and the parent decision that consumed the result. A renamed or moved chat should not break causality.

Treat “needs attention” as a state with an owner and deadline. Pending approvals, ambiguous workspace selection, failed checks, and exhausted retry budgets should route differently instead of sharing one generic notification.

### 4) Multi-root access expands the blast radius unevenly

Copilot and Claude agent sessions can now work across every folder in an experimental multi-root workspace. Session tools preserve all working directories and project URIs, and ambiguous project names are reported rather than selected silently. But agent hooks remain scoped to one primary folder.

That asymmetry matters. An agent may read or change several repositories while guardrails, validation hooks, or local instructions come from only one. Before execution, resolve every root by canonical URI, repository identity, revision, trust level, and allowed operation. Show which root supplies hooks and refuse a cross-root write when required controls are absent or conflicting.

Use per-root diffs and checks, then add integration checks for contracts crossing roots. A passing test suite in the primary folder does not validate a coordinated change to a sibling service, shared schema, or deployment repository.

### 5) Content exclusions create policy-aware blind spots

The Copilot app and CLI now honor enterprise, organization, and repository content exclusions. This protects sensitive files from being used as agent context, but an excluded dependency can also make a merge or review conclusion incomplete.

Expose exclusion effects without revealing excluded content. The run receipt should say that policy withheld relevant paths or symbols, which checks still exercised them, and whether the agent's conclusion is qualified. If a change depends on hidden configuration, generated secrets interfaces, or excluded ownership rules, route the review to an authorized human instead of claiming full coverage.

## Operator takeaways

### Specify convergence

List the exact checks, review states, conflict conditions, revision, retry ceiling, and approval requirements that define merge readiness.

### Separate maker and approver

Do not let the agent that produced the current revision provide its decisive approval. Apply stricter independence rules to sensitive paths.

### Preserve delegation lineage

Store parent-child run IDs, requests, context, authority, outputs, and consumption decisions outside mutable chat labels.

### Authorize every root

Resolve permissions, instructions, hooks, diffs, and validation per workspace root. Treat missing cross-root controls as a preflight failure.

### Report constrained visibility

Honor content exclusions while making coverage gaps visible. Never convert “the agent could not inspect it” into “no issue found.”

## A minimal merge-loop receipt

Persist at least:

- pull request, base and head SHAs, iteration number, initiator, parent and child run IDs, workspace roots, repository identities, branches, and worktrees;
- delegated request, inherited context references, selected model and harness, permission mode, root-specific instructions, primary hook source, and effective content exclusions;
- changed paths per root, review findings and thread states, conflict scan, check names and results, workflow run IDs, artifacts, and evidence timestamps;
- patch-producing identity, reviewing identity, approval policy, allowed approval paths, approval SHA, dismissal event, and required human sign-off;
- retry count, token and compute budget, elapsed time, repeated-failure signature, escalation owner, stop reason, and final merge-readiness decision.

Merge automation is becoming a long-running control loop, not a one-shot coding task. Its reliability depends less on how persistently the agent retries than on whether every iteration has bounded authority, revision-scoped evidence, independent approval, and a clear reason to stop.

## Sources

- [Visual Studio Code 1.136 release notes](https://code.visualstudio.com/updates/v1_136)
- [GitHub Copilot weekly releases - August 31](https://github.blog/changelog/2026-09-04-github-copilot-weekly-releases-august-31/)
- [GitHub Changelog: Copilot code review can now approve pull requests](https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/)
- [GitHub Changelog: Content exclusions generally available in Copilot app and CLI](https://github.blog/changelog/2026-09-02-content-exclusions-generally-available-in-copilot-app-and-cli/)

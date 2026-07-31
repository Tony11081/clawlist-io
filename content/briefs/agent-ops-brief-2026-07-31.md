---
title: "Agent Ops Brief - Multi-agent work needs a session control plane"
summary: "VS Code now makes worktree isolation, peer chats, and live subagent status visible; GitHub review can apply skills and read-only MCP context. The operator challenge is turning those surfaces into enforceable task boundaries."
published_at: "2026-07-31"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-31.png"
tags:
  - agent-ops
  - multi-agent
  - worktrees
  - codex
  - claude-code
  - agent-skills
  - mcp
  - code-review
---

## What changed (high signal)

### 1) Parallel agent work is becoming a first-class workspace

GitHub's July VS Code release summary says the Agents window can start Copilot, Claude, or Codex sessions in Git worktrees, show files and diffs beside the conversation, group sessions, and display each running subagent's model, elapsed time, and active tool call. It also adds peer chats that fork from an existing conversation while retaining the original context.

These are useful interaction improvements, but their larger significance is operational: parallelism, isolation, lineage, and review are becoming visible objects instead of conventions hidden in terminal tabs. That visibility should become the basis for control. Every task should have a named owner, a base revision, an isolated write scope, an explicit merge target, and an observable lifecycle.

A worktree prevents agents from trampling the same checkout. It does not prevent overlapping logical changes, shared external side effects, duplicated migrations, or incompatible assumptions. Treat worktree isolation as one layer in a session control plane, not as proof that concurrent work is safe.

### 2) A fork needs lineage, not just copied context

Peer chats make it cheap to explore competing implementations without restating the problem. That is valuable for architecture comparisons, independent diagnoses, and adversarial review. It also makes provenance easier to blur: two branches may inherit the same stale assumption, use different tools, or produce artifacts that look interchangeable even when their validation conditions differ.

Give every fork a parent session, fork point, hypothesis, allowed tools, write scope, and success test. Record which context was inherited and which evidence was gathered after the split. When one branch is selected, preserve why it won and explicitly close or rebase the others before they continue writing.

Do not merge prose conclusions from one fork with code from another unless the combined result is revalidated. A passing test receipt belongs to the exact code, environment, configuration, and revision that produced it.

### 3) Live subagent status is necessary but not sufficient

Showing a subagent's model, elapsed time, and current tool call improves supervision. Those fields answer what is running now; they do not establish what authority the subagent received or whether its activity remains inside the delegated task.

Add policy state to the operator view: parent task, objective, repository and path scope, external systems, permission class, token and time budgets, last durable artifact, pending approval, and cancellation status. Alert on scope changes, repeated failures, idle credential-bearing sessions, writes outside the declared paths, and tool calls that cross from read-only research into mutation.

Cancellation must propagate. Stopping a parent should revoke child credentials, terminate pending tools, mark partial outputs, and prevent abandoned branches from being merged later without a fresh review.

### 4) Skills and MCP are moving into the review boundary

GitHub also made agent skills and MCP support for Copilot code review generally available. Repository or organization skills can supply internal tools and coding standards from `.github/skills/**/SKILL.md`; MCP connections can bring issue-tracker, documentation, and service-catalog context into review. GitHub says MCP calls made by code review are read-only, existing cloud-agent MCP configuration carries over, and review comments identify when skills or MCP context contributed.

This turns review configuration into production control material. Version skills alongside the code they judge. Pin or attest the effective MCP configuration, inventory every reachable read source, and test skills against known-good and known-bad changes. A reviewer should be able to see which skill revision ran, which context sources were queried, and which rule produced a finding.

Read-only is a strong boundary for review tools, but it is not the same as harmless. A read tool can expose sensitive data, widen prompt-injection surface, return stale policy, or leak cross-tenant context into a comment. Minimize available sources, filter returned fields, classify data before it enters the model, and keep untrusted repository content from selecting arbitrary MCP resources.

### 5) Review evidence should follow the artifact to merge

The new interfaces shorten the path from parallel implementation to review. They can also encourage a false shortcut: accepting the cleanest-looking diff without reconciling session history, skill output, external context, and tests.

Create a merge receipt that binds the chosen commit to its parent session, worktree, child sessions, tool and model identities, skill revisions, MCP sources, review findings, test commands, outputs, and unresolved risks. Invalidate the receipt when the commit, dependency resolution, generated artifacts, or policy configuration changes.

The goal is not to archive every token. Preserve the smallest evidence set that lets another operator answer: what was delegated, what authority was granted, which branch produced this artifact, what independent checks ran, and why this exact revision was allowed to merge.

## Operator takeaways

### Isolate writes and side effects

Use one worktree and write scope per task, then separately coordinate migrations, deployments, issue updates, and other shared external state.

### Give forks explicit hypotheses

Record the parent, fork point, inherited context, allowed tools, and acceptance test before parallel exploration begins.

### Make child authority observable

Display scope, permissions, budgets, pending approvals, and cancellation state alongside model, time, and active tool call.

### Treat review configuration as code

Version and test skills, attest MCP configuration, restrict read sources, and attribute findings to the exact context and rule revision used.

### Bind evidence to the merge commit

Do not reuse validation across divergent branches. Re-run checks whenever code, dependencies, generated assets, or review policy changes.

## A minimal multi-agent merge receipt

Persist at least:

- repository, base revision, target branch, selected commit, worktree path, session ID, parent session, and task owner;
- delegated objective, acceptance criteria, allowed paths, prohibited paths, external systems, permission class, and budget limits;
- child session IDs, fork points, hypotheses, inherited context digest, models, tools, start and stop times, and final states;
- files changed, logical conflict scan, shared-resource conflicts, migrations, generated artifacts, dependencies, and side effects;
- skill names, immutable revisions, instruction digests, test fixtures, rules triggered, and attribution attached to findings;
- MCP server identities, configuration digest, resources queried, read-only enforcement, data classifications, freshness, and filtering applied;
- review comments, dispositions, independent reviewer, test commands, environment digest, outputs, failures, retries, and coverage gaps;
- approval identity, approved commit, receipt digest, merge time, cancellation propagation, closed sibling branches, and rollback reference.

Multi-agent throughput becomes dependable only when every parallel branch remains isolated, observable, attributable, and reviewable as one exact artifact.

## Sources

- [GitHub: GitHub Copilot in Visual Studio Code, July 2026 releases](https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases/)
- [GitHub: Copilot code review - Agent skills and MCP now generally available](https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available/)
- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [GitHub Docs: Extending Copilot coding agent with MCP](https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-coding-agent-with-mcp)

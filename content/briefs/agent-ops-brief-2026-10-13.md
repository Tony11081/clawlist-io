---
title: "Agent Ops Brief - Put each control in the layer that can enforce it"
summary: "Agent instructions, skills, custom agents, hooks, and workflows solve different control problems. Match the mechanism to the scope, trigger, and assurance level you actually need."
published_at: "2026-10-13"
tags:
  - agent-ops
  - skills
  - codex
  - github-copilot
  - agent-orchestration
  - automation
  - governance
  - reliability
---

## What changed (high signal)

### 1) The agent-configuration stack is becoming more explicit

Recent GitHub guidance now draws a practical line between repository instructions, prompt files, custom agents, subagents, skills, hooks, and MCP servers. OpenAI's skills documentation makes the complementary distinction: a skill packages the repeatable workflow around tools; the MCP server provides the live data, authentication, authorization, and controlled action.

That is useful because these controls are frequently collapsed into one giant prompt. They should not be. A control is dependable only when it lives in a layer that can actually enforce its promise. A request for "always run the formatter" belongs in deterministic automation, not a skill an agent may or may not select. A request for "use our deployment checklist when deploying" is a strong skill candidate, because it is contextual, multi-step, and reusable.

### 2) Put universal defaults in instructions, not in every skill

Repository conventions that should apply to nearly every task—naming, test expectations, accessibility baseline, review boundaries, or prohibited files—belong in concise always-on instructions. GitHub specifically positions custom instructions as automatic context for broad standards, while recommending skills for detailed guidance an agent should access only when relevant.

Keep this layer short and testable. Every universal instruction spends context on every run and can conflict with a specialized workflow. State the invariant, its scope, how to verify it, and the escalation path for exceptions. Move lengthy procedures, examples, and optional tools out of the universal layer.

### 3) Use a skill for a recognizable, conditional playbook

A skill is the right layer when a task has a stable sequence but is not invoked on every turn: investigate a production alert, prepare a release, reproduce a customer bug, audit a dependency, or publish a source-backed brief. Its description is the routing interface; the body is the procedure; bundled scripts, templates, and references support the procedure.

Design a skill around an observable entry condition and a verifiable finish. Include inputs, safe tool order, expected artifacts, validation, and stop conditions. Avoid granting authority in the skill text itself: the available tools and credentials must remain independently constrained. A skill can improve consistency; it cannot make an over-privileged runtime safe.

### 4) Use a custom agent when the role needs a different authority envelope

Custom agents fit a distinct job with different tools, context, or a deliberately narrow remit: a read-only architecture reviewer, a migration planner that cannot deploy, or a documentation editor that stays out of application code. GitHub agent profiles can define instructions, tools, and MCP-server configuration, so the role can be both clearer and more bounded than a persona paragraph in a shared chat.

Treat the agent profile as a reviewed interface. Define allowed and disallowed effects, input and output contracts, evidence requirements, and who owns the profile. Prefer a small number of sharply differentiated roles over a menu of near-duplicates with vague names.

### 5) Use hooks and code-defined workflows for guarantees and handoffs

Hooks are for lifecycle effects that must happen deterministically: format after an edit, scan for secrets before a tool call, or block a prohibited command. A versioned workflow is for a process with explicit stages, typed handoffs, gates, retries, budgets, and recovery. Neither should depend on the model remembering an instruction under pressure.

For a consequential flow, make the progression visible: validate inputs, gather evidence, propose a change, run verification, require approval where needed, perform the effect, and retain the receipt. Let agents supply analysis inside those stages, but make the stage transitions and policy decisions inspectable outside the chat transcript.

## Operator takeaways

### Start with the assurance requirement

Ask whether the desired behavior is advisory, conditionally reusable, role-specific, or mandatory. Choose instructions, skills, agents, or deterministic automation accordingly.

### Keep routing separate from execution authority

Skill descriptions and agent prompts decide what is relevant; tool policy, sandboxing, credentials, and approval gates decide what can happen. Review both layers independently.

### Give every layer a tight contract

Write the trigger, permitted scope, inputs, outputs, validation, owner, and rollback or escalation path. If those cannot be stated clearly, the control is probably in the wrong layer.

### Prefer one enforceable guarantee to ten remembered reminders

Promote recurring safety checks and irreversible effects into hooks or workflows. Keep skills focused on structured judgment and reusable playbooks.

## A minimal control-selection record

For each important behavior, retain:

- the invariant or outcome, its risk level, intended trigger, and chosen layer;
- the reason that layer fits, owner, source revision, affected repositories or agents, and review date;
- available tools and credentials, independent technical controls, required approvals, and prohibited effects;
- expected artifacts, validation command or schema, audit location, metrics, failure handling, and rollback path.

This record makes future changes easier to evaluate. If a process becomes high-volume or high-impact, move it down the stack toward deterministic enforcement; if it becomes a rare, contextual procedure, keep it as a discoverable skill rather than permanent prompt baggage.

## Sources

- [OpenAI Developers: Skills](https://developers.openai.com/plugins/concepts/skills)
- [OpenAI Developers: Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills)
- [GitHub Docs: Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
- [GitHub Docs: Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [GitHub Docs: About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)

---
title: "Agent Ops Brief - A policy file is not proof of control"
summary: "GitHub's new cross-client Copilot controls expose the operational gap between declaring agent policy and proving that every surface loaded, enforced, and retained the intended version."
published_at: "2026-07-28"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-07-28.svg"
tags:
  - agent-ops
  - governance
  - github-copilot
  - coding-agents
  - plugins
  - policy-as-code
  - enterprise
  - auditability
---

## What changed (high signal)

### 1) Agent access and agent behavior are separate controls

GitHub gave the Copilot desktop app its own enterprise and organization access policy on July 27. Access previously depended on the Copilot CLI policy; administrators can now enable the app everywhere, disable it everywhere, or delegate the choice to organizations. The new control is enabled everywhere by default.

At the same time, the app and Copilot cloud agent joined CLI and VS Code under enterprise-managed settings. One `managed-settings.json` can govern approved plugins, allowed marketplaces, approval-bypass behavior, and the default use of automatic model selection across supported surfaces.

This separation is healthy, but it creates a two-layer control plane. An identity can be licensed for Copilot yet denied a particular client. A client can be allowed while a plugin is denied. A plugin can be approved while an action still requires confirmation. Treat entitlement, client access, capability, and action permission as distinct decisions; a single “Copilot enabled” flag cannot describe the effective authority of an agent session.

### 2) Central policy still has a distribution lifecycle

Server-managed settings normally reach supported clients within about an hour, or immediately after restart or sign-in. The desktop app loads the policy on startup; cloud-agent changes apply on the next task assignment. GitHub also supports MDM and file-based delivery, and its precedence order is MDM, server-managed, file-based, then user settings.

That means a commit to the policy repository is the start of a rollout, not its completion. During the propagation window, two sessions started minutes apart can have different effective controls. An urgent revocation is especially sensitive: the configuration may be correct at the source while a running or offline client retains an older version.

Assign every policy revision a stable ID and activation time. Record which source won precedence, when each client fetched it, and which revision every task used. For high-risk changes, stop new assignments until targeted clients attest to the new policy; do not infer enforcement from a merged pull request.

### 3) “Same settings” does not mean identical semantics

The managed-settings rollout spans local interactive clients and an asynchronous cloud agent, but the controls do not all apply uniformly. GitHub says plugin and marketplace settings apply to the cloud agent, while bypass-prompt controls apply only to interactive clients. The current configuration guide lists CLI, VS Code, and the Copilot app as supported clients, even as the launch note separately describes cloud-agent support for applicable settings.

Build a capability matrix per surface and key. For each client, mark whether a control is enforced, ignored, unsupported, or implemented differently. Validate the matrix with a harmless denied action and a known-approved action. If a key is irrelevant to a non-interactive worker, replace the missing prompt boundary with an explicit service policy rather than assuming the interactive control carried over.

### 4) Plugin governance needs provenance, not only an allowlist

Managed settings can force-enable or disable plugins and restrict installation to named marketplaces. Marketplace sources may point to GitHub repositories, Git URLs, packages, directories, URLs, host patterns, or path patterns. GitHub's reference also permits a repository source to specify a branch, tag, or commit SHA.

An approved marketplace is a discovery boundary, not a complete supply-chain guarantee. A mutable branch, package version, URL response, or local directory can change after approval while retaining the same policy entry.

Pin installable agent extensions to immutable revisions where the source supports it. Capture the resolved commit or digest, verify signatures or checksums when available, scan the bundled instructions and executable code, and promote reviewed artifacts through a controlled registry. Log both the policy key and the exact artifact loaded into the session.

### 5) Policy repositories turn governance into software delivery

GitHub's server-managed approach stores enterprise agent and plugin settings in `.github-private/copilot/managed-settings.json`. The repository can use pull requests, CODEOWNERS, and rulesets, creating a reviewable history for changes that affect every covered user—even users who cannot read the repository.

Use that repository like production infrastructure. Add schema validation, semantic policy tests, required reviewers from security and developer experience, staged rollout, rollback artifacts, and an expiry date for exceptions. Test precedence conflicts and client-specific behavior before broad deployment. Keep secrets out of the file; references and credentials should be delivered through an appropriate secret system.

The policy commit supplies intent and review history. Client attestations, denied-action probes, session receipts, and drift alerts supply evidence that the intent became reality.

## Operator takeaways

### Split the decisions

Model license, client access, plugin availability, marketplace trust, data access, and action approval separately.

### Version effective policy

Attach the resolved revision, source, precedence result, fetch time, and client version to every agent task.

### Test every surface

Maintain a control matrix and continuously probe both allowed and denied behavior in local, desktop, IDE, and cloud execution.

### Pin extension artifacts

Approve immutable plugin revisions and record the exact digest loaded, not just the marketplace name.

### Prove rollout

Require client attestations and drift monitoring before declaring a high-impact policy change complete.

## A minimal policy receipt

Persist at least:

- enterprise, organization, repository, user or service identity, license source, and billing owner;
- product surface, client version, execution mode, workspace type, session, task, and attempt IDs;
- access-policy decision, decision scope, delegated administrator, and evaluated time;
- declared policy revision, effective policy revision, winning source, precedence chain, fetched time, and activation deadline;
- supported, unsupported, ignored, and overridden keys for that client;
- marketplace policy, plugin key, requested source, resolved source, immutable revision or digest, scan result, and installer identity;
- approval mode, bypass availability, action-level decision, authorizing actor, and denied-action probes;
- model-selection policy, requested model, effective model, and route reason;
- rollout cohort, client attestations, drift status, exception owner, expiry, rollback revision, and incident link;
- acceptance checks showing that the policy was enforced at execution time, not merely present in source control.

Agent policy becomes operational only when the system can show which rules a specific worker actually enforced on a specific task.

## Sources

- [GitHub: Manage GitHub Copilot app access with a dedicated policy](https://github.blog/changelog/2026-07-27-manage-github-copilot-app-access-with-a-dedicated-policy/)
- [GitHub: Enterprise managed settings in the GitHub Copilot app and Copilot cloud agent](https://github.blog/changelog/2026-07-27-enterprise-managed-settings-now-apply-to-the-github-copilot-app/)
- [GitHub Docs: Enterprise managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-managed-settings-reference)
- [GitHub Docs: Configuring enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/configure-enterprise-managed-settings)
- [GitHub Docs: Creating a `.github-private` repository](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo)
- [GitHub Docs: About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)

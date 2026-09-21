---
title: "Agent Ops Brief - Package agents should stage releases, not publish them"
summary: "npm's new stage-only tokens let automation prepare a package without putting it live. The safer design is an agent-built release candidate, a verifiable receipt, and an independent maintainer approval with 2FA."
published_at: "2026-09-21"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-09-21.svg"
tags:
  - agent-ops
  - npm
  - supply-chain
  - release-automation
  - approvals
  - provenance
  - security
  - governance
---

## What changed (high signal)

### 1) npm automation can now prepare a release without making it public

npm has added a **Read and write (stage only)** mode for granular access tokens. A workflow using one of these tokens can run `npm stage publish` to upload a package version into a private pending state, but a direct `npm publish` attempt is rejected with `E_STAGE_REQUIRED`. A maintainer must then inspect and approve the stage with two-factor authentication before the version reaches the registry.

That split is especially useful for agent-operated release workflows. A coding agent can update versions, build artifacts, run checks, assemble provenance, and submit a candidate without also holding the authority to make that candidate public. The irreversible boundary moves out of the autonomous execution path and into a separate human-authenticated step.

Stage-only tokens are an opt-in migration path, not an automatic change to existing credentials. npm is targeting January 2027 to remove direct publishing through bypass-2FA tokens, so teams with token-based pipelines should inventory and migrate them before the deadline.

### 2) Separate preparation authority from release authority

Do not give a build agent more authority merely because the workflow is mature. Its job should end when it has produced a reviewable candidate and evidence that the candidate matches an approved source state.

Give the agent permission to read the repository, install dependencies, run the declared build and test commands, create the package archive, generate a software bill of materials or provenance where supported, and stage the exact version. Reserve promotion or rejection for a maintainer who was not the agent that prepared the release.

The approval should bind to immutable facts: package name, version, stage ID, source commit, workflow identity, archive digest, test results, dependency lockfile digest, provenance status, and the intended dist-tag. If the source or artifact changes, discard the stage and prepare a new one instead of approving on the strength of an earlier review.

### 3) Prefer short-lived trust over another stored secret

Stage-only granular tokens reduce one important risk, but npm recommends trusted publishing for CI/CD when the provider is supported. Trusted publishing uses short-lived OpenID Connect credentials tied to a configured workflow rather than a long-lived registry secret. It can also generate provenance automatically for supported CI systems.

The strongest supported pattern combines both controls: configure the trusted publisher to allow `npm stage publish` but not direct `npm publish`, and configure the package to disallow traditional token publishing. The workflow can then create a pending release with a short-lived credential, while promotion still requires an interactive maintainer action with 2FA.

Migration order matters. Configure and test trusted publishing first, restrict it to stage-only, verify that a candidate can be inspected and approved, then disallow and revoke old publishing tokens. Keep dependency installation on a separate read-only credential if private packages require authentication.

### 4) Stage-only is not read-only

A stage-only token cannot publish a new package version directly, but it retains other package write permissions. npm documents that it can move dist-tags and deprecate package versions. Those actions can still disrupt consumers, redirect installs, or create incident noise.

Treat the token like a write credential: scope it to the smallest package set, apply an expiration and IP restriction where practical, prevent it from reaching untrusted pull-request jobs, mask it in logs, and rotate or revoke it after suspected exposure. Alert on dist-tag changes and deprecations initiated outside the expected release path.

This limitation is another reason to prefer a narrowly configured trusted publisher. Short-lived identity reduces persistence after compromise, while workflow and environment restrictions reduce where the credential can be minted. Neither mechanism replaces branch protection, dependency review, isolated builds, or artifact verification.

### 5) Approval needs a release receipt, not a green badge

A passing workflow says that declared checks ran; it does not prove that the pending package contains the reviewed files or that the source used for approval matches the staged artifact. Before promotion, retrieve or inspect the stage with `npm stage view` or `npm stage download` and compare it with the expected release manifest.

Automate the mechanical comparison, but make the evidence legible to the approver. Show unexpected files, lifecycle scripts, executable additions, dependency changes, permission-sensitive configuration, bundle-size deltas, generated-code changes, and archive digests. Fail closed when the provenance is missing, the source commit is not protected, the version already exists, or the stage cannot be matched to a single workflow run.

The maintainer's 2FA approval should mean “I reviewed this exact candidate and its evidence,” not “the release bot usually works.” Record the decision, actor, timestamp, evidence digest, and stage outcome for later audit.

### 6) Design expiry and recovery before enabling the agent

Pending stages need owners and time limits. Record who requested the release, who can approve it, when the stage expires, and which incident channel receives a stalled or suspicious candidate. Reject superseded stages so operators do not accidentally approve an older version after a retry.

Test the negative paths: direct publish with the stage-only credential must fail; a changed artifact must invalidate approval; an unauthorized workflow must not mint a trusted credential; and a rejected stage must not be reusable. Also rehearse revoking credentials, disabling the trusted publisher, restoring a dist-tag, and communicating a deprecation mistake.

The point is not to add a ceremonial click. It is to make autonomous preparation fast while keeping public release attributable, inspectable, and recoverable.

## Operator takeaways

### Make staging the agent's terminal action

Let automation submit a candidate, then stop at a durable approval boundary.

### Use trusted publishing with stage-only permission

Prefer short-lived workflow identity and disallow direct publishing where your CI provider supports it.

### Bind approval to an immutable receipt

Verify the source commit, stage ID, archive digest, provenance, checks, manifest, and intended dist-tag together.

### Guard the remaining write surface

Stage-only tokens can still move dist-tags and deprecate versions; scope, monitor, expire, and protect them accordingly.

### Rehearse rejection and recovery

Prove that direct publish fails, stale stages are rejected, credentials can be revoked, and package metadata can be repaired.

## A minimal staged-release receipt

Persist at least:

- package name, version, stage ID, registry, requested dist-tag, stage status, creation time, expiry, and superseded-stage links;
- source repository, protected branch, commit SHA, signed-tag status, workflow file and revision, run ID, triggering actor, and release request or change ticket;
- authentication method, trusted-publisher identity or token ID, allowed action, package scope, credential expiry, and proof that direct publishing is disabled;
- archive digest, file manifest, unpacked size, lifecycle scripts, executable files, dependency and lockfile digests, generated-code delta, SBOM, and provenance statement;
- test, lint, build, vulnerability, license, and policy results with tool versions, timestamps, logs, waivers, and evidence digests;
- reviewer, review time, 2FA-backed approval or rejection, downloaded-stage digest, decision notes, promotion result, registry verification, rollback owner, and incident reference.

Stage-only publishing gives release agents a better capability boundary: they can do the expensive preparation work without holding the final public-release authority. It becomes a dependable control only when the staged artifact is independently verified, the approver sees an immutable receipt, and the credential's remaining write powers are governed as carefully as publishing itself.

## Sources

- [GitHub Changelog: Stage-only npm tokens for safer automation](https://github.blog/changelog/2026-09-18-stage-only-npm-tokens-for-safer-automation/)
- [npm Docs: About access tokens and stage-only permissions](https://docs.npmjs.com/about-access-tokens/)
- [npm Docs: `npm stage` command, permissions, and best practices](https://docs.npmjs.com/cli/v11/commands/npm-stage/)
- [npm Docs: Trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers/)

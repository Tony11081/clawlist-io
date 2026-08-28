---
title: "Agent Ops Brief - Persistent sessions need a host contract"
summary: "VS Code's Agent Host and open AHP separate long-running agent sessions from editor windows. That enables remote, multi-client, multi-harness work—and makes host authority, tool availability, isolation, and recovery explicit operating concerns."
published_at: "2026-08-28"
cover_image: "/blog-images/briefs/agent-ops-brief-2026-08-28.png"
tags:
  - agent-ops
  - agent-host
  - ahp
  - vscode
  - codex
  - claude-code
  - agent-orchestration
---

## What changed (high signal)

### 1) The agent session is becoming infrastructure

VS Code has introduced a dedicated Agent Host process and the open Agent Host Protocol (AHP). Instead of tying an agent runtime to the extension host of one editor window, the host owns the session independently. A session can keep running after its folder closes, remain synchronized across the editor and Agents window, and run next to a remote workspace while a desktop or browser acts as the client.

This is more than background execution. It establishes a durable control-plane boundary: the host owns authoritative session state and baseline workspace capability; clients observe, steer, approve, cancel, and optionally contribute tools.

The first operating question is no longer only “which model is running?” Record which host owns the session, where that host runs, which workspace or worktree it can modify, which harness adapter it loaded, and which clients are currently attached.

### 2) AHP standardizes the session surface, not agent behavior

AHP uses JSON-RPC and a state-first model. Clients subscribe to URI-addressed channels for resources such as sessions, chats, terminals, and changesets. They receive a state snapshot followed by ordered actions; after a disconnect, they can replay missed actions or accept a fresh snapshot.

That gives multiple clients a convergent view without forcing each client to understand Copilot, Claude, or Codex internals. But the protocol deliberately does not standardize how a harness reasons, compacts context, selects tools, asks for permission, or applies provider-specific features. The Copilot adapter uses the Copilot SDK; the Claude adapter maps Claude Agent SDK concepts such as hooks, permissions, and subagents into AHP; Codex remains its own harness.

Treat portability as a presentation and coordination guarantee—not behavioral equivalence. A handoff between harnesses needs an explicit compatibility check for tools, permissions, instructions, context limits, and unresolved work.

### 3) Persistent execution changes the failure model

When the editor window is no longer the runtime boundary, “I closed the UI” does not necessarily mean “the agent stopped.” Local sessions can continue while VS Code manages the local host; remote hosts can keep working beside the repository while clients disconnect and reconnect.

Operators need lifecycle controls that survive the UI:

- a stable session and host identity;
- a visible running, waiting, denied, cancelled, failed, and completed state;
- heartbeats and last-action timestamps;
- reconnect and replay evidence;
- hard runtime, tool-call, token, and cost budgets;
- an out-of-band stop mechanism at the host;
- a recovery rule for ambiguous work after host or network failure.

Never infer completion from a disconnected client. Reconcile the host's authoritative state, current process activity, working-tree diff, terminal output, and pending approvals before resuming or retrying.

### 4) Client-contributed tools are conditional capabilities

The Agent Host includes baseline capabilities so it can run without a client, but a connected client may advertise additional tools, including browser or extension-provided tools. Those calls route back to the client that contributed them. By default, extension tools are available only while the relevant editor window and extension are running.

This creates a capability set that can change during one session. An agent that planned around a browser tool may lose it when the laptop disconnects; a newly attached client may add a tool that was absent at start.

Snapshot the effective tool inventory at turn start and record capability changes as events. Plans should mark which steps require host-native tools, MCP servers, or an attached client. For unattended work, depend only on host-resident capabilities or define a clean waiting state instead of silently substituting another tool.

### 5) Worktrees isolate changes, not the machine

Agent Host sessions can apply edits directly to a folder or worktree. Multiple chats inside one session share that same code-isolation boundary, while separate worktree sessions are recommended for parallel tasks that must not modify the same files.

A Git worktree is not a security sandbox. It separates branches and working directories, but it does not restrict filesystem access outside the worktree, network access, subprocesses, or credentials. Remote placement also means commands and edits execute on the remote host next to the workspace—not on the viewing client.

Use separate controls for separate risks:

- worktrees for change collision and review boundaries;
- OS or container sandboxing for filesystem and process boundaries;
- network policy for destinations and data movement;
- secret scoping for credentials;
- host authentication and transport protection for remote control;
- approval policy for mutating or high-impact actions.

## Operator takeaways

### Make the host the source of operational truth

Track session state, changesets, terminal activity, approvals, budgets, and attached clients against the host identity—not against an editor tab.

### Design for capability loss

Assume client-contributed tools can disappear. Keep unattended workflows on host-native tools and make dependency waits visible.

### Test reconnect before trusting persistence

Exercise client disconnect, host restart, network partition, missed-action replay, duplicate commands, and cancellation races. Verify that the recovered diff and session state agree.

### Audit every handoff

Before moving a session from Copilot to Claude or Codex, capture the outgoing harness, effective instructions, tool inventory, permissions, unresolved approvals, changed files, checkpoints, and the exact context transferred.

### Keep code isolation and security isolation separate

Use a worktree to prevent edit collisions. Use a sandbox and explicit network and secret policy to contain execution.

## A minimal persistent-session receipt

Persist at least:

- host ID, host version, local or remote location, start time, connection token policy, transport, and authenticated clients;
- session and chat IDs, harness and adapter version, model, role, workspace path, repository revision, folder or worktree isolation, and handoff history;
- baseline host tools, client-contributed tools, MCP servers, capability additions and removals, permissions, approvals, and denied actions;
- state snapshots, ordered-action cursor, reconnects, replay ranges, checkpoints, compactions, cancellations, retries, and terminal status;
- files changed, changeset or diff digest, commands run, tests performed, network destinations, secrets granted, and artifacts produced;
- token, cost, time, tool-call, and fan-out budgets with current consumption and stop reason.

Persistent sessions make agents easier to delegate and supervise across surfaces. The durable operating model is to treat the host as a real runtime: identify it, constrain it, observe it, test its recovery paths, and never confuse a portable session view with portable behavior or a worktree with a sandbox.

## Sources

- [Visual Studio Code: Introducing the Agent Host for persistent, portable agent sessions](https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture)
- [Visual Studio Code: Agent Host architecture](https://code.visualstudio.com/docs/agents/concepts/agent-host)
- [Visual Studio Code: Sessions and handoff](https://code.visualstudio.com/docs/agents/concepts/sessions)
- [Visual Studio Code: Agent harnesses and code isolation](https://code.visualstudio.com/docs/agents/concepts/agent-harnesses)
- [Visual Studio Code: Remote agent sessions](https://code.visualstudio.com/docs/agents/run/remote-agent-sessions)

# Autonomous Agent Workflow

This repository now includes a staged multi-agent workflow for continued site improvement.

## Roles

- `product-owner`: invents beginner-friendly product ideas and creates GitHub issues
- `developer`: implements GitHub issues and responds to review feedback
- `reviewer`: reviews the implementation and either approves it or requests changes

## Skills Used

- `requirements-thinker`
- `feature-implementer`
- `change-reviewer`

## Local Files

- `.opencode/agents/product-owner.md`
- `.opencode/agents/developer.md`
- `.opencode/agents/reviewer.md`
- `.opencode/commands/start-dev-loop.md`
- `scripts/nightly-agent-loop.ps1`
- `scripts/start-dev-loop.ps1`

## Runtime Flow

1. The product owner proposes a new improvement and creates a GitHub issue.
2. The developer reads that issue and implements it.
3. The reviewer checks the result.
4. If the reviewer requests changes, the developer gets one more pass before the workflow ends.

## Cost Safety

The script is safe by default.

It exits without starting real agent work unless both of these environment variables are set:

- `OPENCODE_AUTONOMOUS_ENABLED=1`
- `OPENCODE_ALLOW_COSTS=1`

This is intentional because the current OpenCode setup on this machine uses an authenticated `OpenAI` provider, which can incur model usage costs during autonomous runs.

## Current Scheduling Target

The workflow is designed for a window that starts at `21:25` and stops agent work by `22:00`.

## Start It Manually

You can start the loop on demand in two ways.

### In OpenCode

Run:

```text
/start-dev-loop
```

This uses the project command in `.opencode/commands/start-dev-loop.md`.

### In PowerShell

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-dev-loop.ps1
```

## What Happens On Manual Start

1. The product-owner agent proposes a new improvement and tries to create a GitHub issue.
2. The developer agent implements the issue.
3. The reviewer agent either approves the work or requests changes.
4. If changes are requested and time remains, the developer and reviewer get one more pass.
5. Runtime files are written under `.opencode/runtime/`.

## Important Reality Check

The current machine does not yet have a no-cost local OpenCode model runtime configured.

That means:

- the workflow structure is ready
- the scheduler is ready
- the manual command is ready
- but real autonomous work is still blocked by the no-cost safety guard unless you explicitly allow provider-backed runs

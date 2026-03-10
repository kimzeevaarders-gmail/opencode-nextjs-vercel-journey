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
- `scripts/autonomous-dev-loop.ps1`
- `scripts/start-dev-loop.ps1`

## Runtime Flow

1. The product owner proposes a new improvement and creates a GitHub issue.
2. The developer reads that issue and implements it.
3. The reviewer checks the result.
4. If the reviewer requests changes, the developer gets one more pass before the workflow ends.

## Runtime

This workflow now uses `OpenAI Codex` by default for `/start-dev-loop`.

The manual loop no longer depends on Ollama.

## Current Scheduling Target

The scheduled run was removed. The recommended path is now manual start on demand with `/start-dev-loop`.

## Start It Manually

You can start the loop on demand in two ways.

### In OpenCode (recommended)

Run:

```text
/start-dev-loop
```

This uses the project command in `.opencode/commands/start-dev-loop.md` and runs the product-owner -> developer -> reviewer loop directly inside OpenCode.

### In PowerShell (script path)

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-dev-loop.ps1
```

## What Happens On Manual Start

1. The product-owner agent proposes a new improvement and creates a GitHub issue.
2. The developer agent implements the issue.
3. The reviewer agent either approves the work or requests changes.
4. If changes are requested and time remains, the developer and reviewer get one more pass.
5. If the review ends in `APPROVED`, the script commits and pushes `main`.
6. Vercel then deploys production from GitHub.
7. Runtime files are written under `.opencode/runtime/`.

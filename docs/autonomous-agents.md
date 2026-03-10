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

1. The loop checks GitHub for existing open issues and continues one of them first.
2. If no open issue exists, the product owner proposes a new improvement and creates a GitHub issue.
3. The developer reads the chosen issue and asks the product owner follow-up questions if anything is unclear.
4. The product owner answers those questions and the developer resumes until the implementation is no longer blocked.
5. The reviewer checks the result.
6. If the reviewer requests changes, the developer fixes them and the reviewer checks again until the work is approved or clearly blocked.

When clarification is needed, the runtime can temporarily record:

- `.opencode/runtime/developer-questions.md`
- `.opencode/runtime/product-owner-answers.md`

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

For a safe rehearsal that skips commit, push, issue closure, and production deployment, run:

```text
/start-dev-loop dry-run
```

This uses the project command in `.opencode/commands/start-dev-loop.md` and runs the product-owner -> developer -> reviewer loop directly inside OpenCode.

### In PowerShell (script path)

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-dev-loop.ps1
```

## What Happens On Manual Start

1. The loop checks GitHub for an open issue and prefers finishing that work first.
2. If no open issue exists, the product-owner agent proposes a new improvement and creates a GitHub issue.
3. The developer agent implements the chosen issue, or writes clarification questions if the ticket still leaves blocking gaps.
4. The product-owner agent answers those questions, and the developer agent runs again until there are no blocking questions left.
5. The reviewer agent either approves the work or requests changes.
6. If changes are requested, the developer and reviewer keep cycling until the work is approved or clearly blocked.
7. If the review ends in `APPROVED`, the script commits and pushes `main`, posts the reviewer approval note to the GitHub issue, and closes the issue.
8. Vercel then deploys production from GitHub.
9. Runtime files are written under `.opencode/runtime/`, including clarification files when the developer needs product-owner answers.

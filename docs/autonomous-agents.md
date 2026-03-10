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
- `scripts/nightly-agent-loop.ps1`

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

The workflow is designed for a window that starts at `21:15` and stops agent work by `22:00`.

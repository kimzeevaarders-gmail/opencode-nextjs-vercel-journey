---
description: Start the autonomous product-owner -> developer -> reviewer loop for this project
agent: build
---
Start the repository's development loop now using the Codex model configured in `opencode.json`.

Arguments:
- no argument: run the full live loop
- `dry-run`: run the loop but skip commit, push, and production deployment after approval

Workflow:
1. Ask the `product-owner` agent to propose one high-value improvement for beginners and create a GitHub issue for it.
2. Ask the `developer` agent to implement that issue in the repository.
3. Ask the `reviewer` agent to review the implementation.
4. If the reviewer requests changes, send the feedback back to the `developer` agent and repeat once more.
5. If the reviewer approves, commit the changes, push `main`, and verify that Vercel starts a production deployment.
6. Summarize the issue number, files changed, review result, commit SHA, and deploy status.

Important:
- Use the project's configured Codex runtime.
- Keep the improvement aligned with the site's purpose: helping beginners learn OpenCode, coding, Next.js, GitHub, and Vercel.
- Do not stop after issue creation; continue until the issue is either in production or blocked by a concrete error.
- If the command is called as `/start-dev-loop dry-run`, simulate the approval path without shipping to production.

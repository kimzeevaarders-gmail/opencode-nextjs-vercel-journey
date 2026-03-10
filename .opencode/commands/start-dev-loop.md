---
description: Start the autonomous product-owner -> developer -> reviewer loop for this project
agent: build
---
Start the repository's development loop now using the Codex model configured in `opencode.json`.

Arguments:
- no argument: run the full live loop
- `dry-run`: run the loop but skip commit, push, issue closure, and production deployment after approval

Workflow:
1. Check GitHub for existing open issues and continue one of them before creating a new ticket.
2. Only if no open issue exists, ask the `product-owner` agent to propose one high-value improvement for beginners and create a GitHub issue for it.
3. Ask the `developer` agent to implement the chosen issue in the repository.
4. If the `developer` agent has clarification questions, send them to the `product-owner` agent, return the answers to the `developer`, and repeat until implementation can continue without blocking questions.
5. Ask the `reviewer` agent to review the implementation.
6. If the reviewer requests changes, send the feedback back to the `developer` agent, then re-run the `reviewer` agent until the work is approved or concretely blocked.
7. As product-owner, developer, and reviewer learn useful reusable lessons, update the relevant local skill or agent files during the loop so the workflow keeps improving.
8. If the reviewer approves, commit the changes, push `main`, post the reviewer approval note to the GitHub issue, close the issue, and verify that Vercel starts a production deployment.
9. Summarize the issue number, files changed, review result, commit SHA, issue-close status, deploy status, and any skill-file improvements captured during the run.

Important:
- Use the project's configured Codex runtime.
- Keep the improvement aligned with the site's purpose: helping beginners learn OpenCode, coding, Next.js, GitHub, and Vercel.
- Prefer finishing existing open GitHub tickets before the loop creates more backlog.
- Keep clarification and re-review loops running until there are no blocking product questions or review findings left.
- Auto-update the relevant local skill or agent files whenever an agent discovers a reusable improvement that would help future runs.
- Do not stop after issue creation; continue until the issue is either in production or blocked by a concrete error.
- If the command is called as `/start-dev-loop dry-run`, simulate the approval path without commit, push, issue closure, or shipping to production.

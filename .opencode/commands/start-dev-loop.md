---
description: Start the autonomous product-owner -> developer -> reviewer loop for this project
agent: build
---
Start the repository's manual development loop now.

Steps:
1. Explain whether the run will be a real autonomous run or a safe no-cost dry run based on the current environment variables.
2. Run `powershell -ExecutionPolicy Bypass -File scripts/start-dev-loop.ps1`.
3. Summarize what started, where logs/runtime files are stored, and whether real agent work was blocked by the cost-safety guard.

Important:
- Do not claim that real autonomous work happened if the script exited because cost safety is still enabled.
- Mention `.opencode/runtime/logs/` and the latest issue/review handoff files if they were created.

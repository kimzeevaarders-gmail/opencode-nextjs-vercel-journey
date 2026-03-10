# Ollama Setup For Autonomous OpenCode Runs

This project is now configured to use a free local model path for the autonomous dev loop.

## What Was Installed

- Ollama runtime on Windows
- local model: `qwen2.5-coder:3b`
- project config: `opencode.json`

## Why This Was Chosen

- it avoids provider API charges
- it gives OpenCode a local coding model for the agent loop
- it is a better fit for `/start-dev-loop` than paid OpenAI Codex models if the goal is zero extra cost

## Important Note About Codex

OpenAI Codex-family models are not the free option here.

This project now uses a free local Ollama model instead, and `openai` is disabled in `opencode.json` so the repository does not accidentally use the paid provider during the dev loop.

## Project Config

`opencode.json` configures:

- provider: `ollama`
- model: `ollama/qwen2.5-coder:3b`
- small model: `ollama/qwen2.5-coder:3b`
- disabled provider: `openai`

## Verify The Setup

Run:

```powershell
"C:\Users\Gebruiker\AppData\Local\Programs\Ollama\ollama.exe" list
npx opencode-ai models ollama
```

You should see `qwen2.5-coder:3b`.

## Start The Dev Loop

### In OpenCode

```text
/start-dev-loop
```

### In PowerShell

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-dev-loop.ps1
```

## What The Command Does

1. starts the product-owner agent
2. creates a GitHub issue for one useful new site improvement
3. starts the developer agent to implement it
4. starts the reviewer agent to approve it or request changes
5. if approved, commits the changes and pushes `main`
6. relies on Vercel's GitHub connection to deploy production

## Runtime Files

The workflow writes state under `.opencode/runtime/`:

- `latest-issue.txt`
- `developer-handoff.md`
- `latest-review.md`
- `latest-deploy.txt`
- `logs/`

# OpenCode Next.js Journey

This repository contains a server-rendered `Next.js` website that documents the full path from local setup to a live deployment.

Live site: `https://opencodejourney.vercel.app`

## Stack

- `Next.js` 16
- `React` 19
- `TypeScript`
- `Tailwind CSS` 4
- primary deployment target: `Vercel`

## Purpose

The site is meant to teach other people how to:

1. set up OpenCode and the required tooling
2. create a modern React and Next.js project
3. publish the app to GitHub
4. deploy it with a custom domain
5. understand where AWS fits as an advanced alternative

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

The production deployment currently lives on the free Vercel subdomain `opencodejourney.vercel.app`.

## What This Repo Now Documents

- the prompts and tasks used in each major step of the build
- the GitHub-to-Vercel deployment path that was actually used
- the Vercel environment variable needed for production: `NEXT_PUBLIC_SITE_URL`
- the generated `robots.txt` and `sitemap.xml` endpoints used for production verification
- the extra Vercel account step of connecting GitHub before trying to link the repository inside Vercel

## Important Docs

- implementation plan: `docs/implementation-plan.md`
- Vercel deployment: `docs/deployment-vercel.md`
- AWS alternative: `docs/deployment-aws.md`
- cost notes: `docs/costs.md`
- OpenCode skills: `docs/opencode-skills.md`
- autonomous workflow: `docs/autonomous-agents.md`
- Ollama setup: `docs/ollama-setup.md`

Manual OpenCode command:

- `/start-dev-loop` starts the repository's autonomous dev-loop wrapper

## Repository

GitHub: `https://github.com/kimzeevaarders-gmail/opencode-nextjs-vercel-journey`

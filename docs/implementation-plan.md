# Implementation Plan

## Goal

Build a full server-rendered website with the latest stable `Next.js`, `React`, `TypeScript`, and current Node.js LTS. The site explains the complete journey from zero to a live production deployment so other people can repeat the process with OpenCode.

## Recommended Hosting Path

Primary deployment target: `Vercel`

Why:
- best fit for server-rendered `Next.js`
- lowest setup friction
- built-in previews, HTTPS, and domain support
- easier and usually cheaper in time and maintenance than AWS SSR hosting

AWS remains an optional advanced deployment track documented inside the site.

## Delivery Phases

### Phase 1 - Repository and Tooling

1. Create a GitHub repository for the project.
2. Scaffold a fresh `Next.js` app with `TypeScript` using the latest stable release.
3. Use current Node.js LTS locally and in deployment settings.
4. Configure linting, formatting, and a clean content-first structure.

### Phase 2 - Website Structure

1. Build a documentation-style marketing and tutorial site.
2. Create pages for:
   - homepage
   - prerequisites
   - GitHub setup
   - OpenCode setup
   - project creation
   - local development
   - Vercel deployment
   - custom domain setup
   - environment variables and secrets
   - monitoring, maintenance, and costs
   - optional AWS path
3. Add navigation, metadata, and responsive layout.

### Phase 3 - Core Content

1. Write clear step-by-step instructions.
2. Include copy-paste commands.
3. Include OpenCode-ready prompts where useful.
4. Explain decisions, tradeoffs, and likely failure points.
5. Add a low-cost hosting section comparing Vercel and AWS.

### Phase 4 - Deployment

1. Push the code to GitHub.
2. Connect the repo to Vercel.
3. Configure production deployment from the default branch.
4. Attach a custom domain and verify HTTPS.
5. Test preview deployments on pull requests.

### Phase 5 - Optional AWS Track

1. Document a separate advanced AWS SSR route.
2. Compare likely options such as OpenNext or container-based hosting.
3. Explain when AWS makes sense and when Vercel is simpler.
4. Keep the main path focused on Vercel for speed and clarity.

## Initial Technical Choices

- `Next.js` App Router
- `React` latest stable
- `TypeScript`
- server-rendered pages where useful, with caching where sensible
- content-driven pages stored in-repo
- simple reusable component system
- SEO metadata on every major route

## First Deliverable

An initial repo containing:
- fresh `Next.js` app
- saved implementation plan
- starter homepage
- starter journey pages
- documentation for Vercel deployment

## Next Steps

1. Create the GitHub repository.
2. Scaffold the app.
3. Build the first version of the website structure.
4. Commit the initial project.
5. Deploy to Vercel.

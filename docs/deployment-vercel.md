# Vercel Deployment Notes

Current live deployment: `https://opencodejourney.vercel.app`

## Recommended Path

1. Push the repository to GitHub.
2. Make sure your Vercel account has a GitHub login connection.
3. Import the repo into Vercel.
4. Accept the default `Next.js` framework detection.
5. Add `NEXT_PUBLIC_SITE_URL=https://opencodejourney.vercel.app`.
6. Deploy the default branch.
7. Verify the production URL, `robots.txt`, and `sitemap.xml`.

## What Was Actually Done For This Project

1. Prepared metadata so production uses the correct public origin.
2. Added `src/app/robots.ts` and `src/app/sitemap.ts`.
3. Added `.env.example` with the public site URL.
4. Ran `npm run lint` and `npm run build` locally.
5. Created and linked the Vercel project `opencodejourney`.
6. Added the production environment variable in Vercel.
7. Deployed with `vercel --prod`.
8. Verified the homepage returned `200`.
9. Verified `robots.txt` returned `200`.
10. Verified `sitemap.xml` returned `200`.

## Commands Used

```bash
npm run lint
npm run build
npx vercel link --yes --project opencodejourney
npx vercel env add NEXT_PUBLIC_SITE_URL production
npx vercel deploy --prod --yes
```

## Repo Connection Note

If Vercel refuses to connect the GitHub repository, add the GitHub Login Connection in your Vercel account settings first. That happened during this project, so it is now part of the documented workflow.

## Why Vercel First

- native fit for server-rendered `Next.js`
- simple previews for pull requests
- minimal infrastructure overhead
- fast path to a working public deployment

## AWS Positioning

AWS remains a documented advanced alternative, but not the default route for this project because it adds more deployment and operations complexity for SSR.

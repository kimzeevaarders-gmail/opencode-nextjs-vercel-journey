# Vercel Deployment Notes

## Recommended Path

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Accept the default `Next.js` framework detection.
4. Deploy the default branch.
5. Add your custom domain in the Vercel dashboard.
6. Update DNS at your registrar if needed.
7. Verify HTTPS and production routing.

## Why Vercel First

- native fit for server-rendered `Next.js`
- simple previews for pull requests
- minimal infrastructure overhead
- fast path to a working custom-domain setup

## AWS Positioning

AWS remains a documented advanced alternative, but not the default route for this project because it adds more deployment and operations complexity for SSR.

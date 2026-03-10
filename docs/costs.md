# Cost Notes

## Recommended Starting Point

For a small server-rendered tutorial site, start on `Vercel`.

Why:

- less setup time
- fewer infrastructure choices to get wrong
- built-in previews and HTTPS
- simpler ongoing maintenance

## Cost Mindset

The cheapest setup is not only about monthly hosting cost. It is also about how much time you spend maintaining it.

For this project, operational simplicity matters as much as raw hosting price.

## Low-Cost Habits

- avoid databases unless the site truly needs one
- keep media lightweight
- use preview deployments instead of extra staging infrastructure
- keep the app content-driven and mostly read-heavy
- document every environment variable and deployment step

## AWS vs Vercel

### Vercel

- better first choice for this exact SSR tutorial
- less effort to reach production
- easier for others to copy

### AWS

- stronger infrastructure control
- better fit for teams already invested in AWS
- higher complexity for a beginner-friendly guide

## Practical Recommendation

If your main goal is to publish the guide and help other people repeat the process, choose the platform that keeps the journey shortest and clearest.

That is why this project recommends `Vercel` first.

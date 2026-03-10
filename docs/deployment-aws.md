# AWS SSR Alternative

## When AWS Makes Sense

Use AWS when you specifically need deeper infrastructure control, tighter integration with existing AWS systems, or organization requirements that rule out Vercel.

## Honest Tradeoff

For this exact project, AWS is not the easiest first deployment path.

- more moving parts
- more deployment decisions
- more room for configuration mistakes
- more maintenance over time

That does not make AWS a bad option. It just makes it the advanced option.

## Common AWS Paths for Next.js SSR

### OpenNext on AWS

- good fit when you want a more Next.js-aware deployment path on AWS
- useful when you want CloudFront and AWS-native infrastructure around the app

### Containerized Next.js

- package the app and run it on `App Runner`, `ECS`, or a similar service
- more flexible, but also more operational work

## Recommendation for This Guide

Teach Vercel first.

Then add AWS as a separate chapter for readers who already know they need it.

That keeps the main tutorial easy to follow while still respecting advanced users.

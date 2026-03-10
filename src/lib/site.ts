export type GuideSection = {
  slug: string;
  shortTitle: string;
  title: string;
  intro: string;
  summary: string;
  whyItMatters: string;
  checklist: string[];
  commands?: string[];
  prompt?: string;
};

export const guideSections: GuideSection[] = [
  {
    slug: "prerequisites",
    shortTitle: "Prerequisites",
    title: "Prepare the foundation before you generate code.",
    intro:
      "A clean setup prevents the rest of the workflow from turning into troubleshooting. Install the core tools first, then confirm account access.",
    summary:
      "This phase covers OpenCode, Node.js LTS, Git, GitHub authentication, Vercel access, and the habit of checking versions before building.",
    whyItMatters:
      "This is the quiet part that decides whether the rest of the project feels smooth or frustrating. A beginner should leave this page feeling calm, not intimidated.",
    checklist: [
      "Install OpenCode and confirm it launches correctly.",
      "Install Node.js LTS, Git, and GitHub CLI.",
      "Authenticate GitHub before creating the repo.",
      "Create or verify your Vercel account before deployment day.",
    ],
    commands: ["node -v", "git --version", "gh auth status"],
    prompt:
      "Audit this machine for Node.js, Git, GitHub CLI, and OpenCode. Tell me what is missing, install what is safe to install, and verify the versions.",
  },
  {
    slug: "github-repo",
    shortTitle: "GitHub Repo",
    title: "Create the repository and save the plan immediately.",
    intro:
      "The repo is not just for code. It becomes the public source of truth for the tutorial, deployment path, and decisions made along the way.",
    summary:
      "Start with a public repository, connect the local folder, add the implementation plan, and keep docs in version control from the first commit.",
    whyItMatters:
      "The moment you save the plan in GitHub, the project becomes real. Anyone following later can see not just the result, but the logic behind the result.",
    checklist: [
      "Pick a clear public repository name.",
      "Initialize Git locally and connect the remote.",
      "Add `README.md` and a saved implementation plan under `docs/`.",
      "Push the first working commit so Vercel can import it later.",
    ],
    commands: ["git init", "gh repo create <name> --public --source . --remote origin", "git push -u origin main"],
    prompt:
      "Create a public GitHub repository for this project, connect the local folder to it, and save the implementation plan in the repo before scaffolding the rest of the app.",
  },
  {
    slug: "opencode-workflow",
    shortTitle: "OpenCode",
    title: "Use OpenCode as the repeatable operator, not just a code generator.",
    intro:
      "The tutorial should teach people how to drive the project with prompts, edits, verification, and follow-up actions that stay grounded in the repo.",
    summary:
      "Describe how OpenCode explores the codebase, updates files, runs verification commands, and helps manage the GitHub and deployment workflow.",
    whyItMatters:
      "People are not just copying code here. They are learning a workflow they can reuse on the next project, and the next one after that.",
    checklist: [
      "Keep prompts specific and outcome-focused.",
      "Ask OpenCode to save plans and docs directly in the repo.",
      "Always verify with lint and build after major edits.",
      "Use commits to checkpoint meaningful progress.",
    ],
    prompt:
      "Turn this project into a documentation site that explains each build step, includes reusable prompts, and stays aligned with the actual repository structure.",
  },
  {
    slug: "project-setup",
    shortTitle: "Project Setup",
    title: "Scaffold the latest stable Next.js stack with TypeScript.",
    intro:
      "Keep the technical base current, but avoid adding complexity that does not help the tutorial. The site should stay approachable and production-ready.",
    summary:
      "Use the newest stable `create-next-app` flow with App Router, Tailwind, and TypeScript, then shape the project around content and reusable layout pieces.",
    whyItMatters:
      "This is where the blank folder finally becomes a real app. It should feel like momentum, not ceremony.",
    checklist: [
      "Use the latest stable Next.js and React releases.",
      "Prefer App Router and typed components.",
      "Keep the project content-first and easy to extend.",
      "Make the app look intentional on mobile and desktop.",
    ],
    commands: [
      "npm create next-app@latest . -- --ts --eslint --app --src-dir --use-npm --tailwind",
      "npm run dev",
    ],
    prompt:
      "Scaffold a fresh Next.js app with TypeScript, App Router, and Tailwind. Then replace the starter screen with a polished, responsive documentation homepage.",
  },
  {
    slug: "local-development",
    shortTitle: "Local Dev",
    title: "Develop locally with fast feedback and strict verification.",
    intro:
      "A guide site should be easy to iterate on. Local development needs obvious commands, predictable structure, and clear verification rules.",
    summary:
      "Explain how to run the app, where pages live, how content is structured, and why lint and production builds are required before every deploy.",
    whyItMatters:
      "When local development is clear, beginners gain confidence quickly. They stop feeling like they are guessing and start feeling in control.",
    checklist: [
      "Run `npm run dev` during active edits.",
      "Use `npm run lint` for code quality checks.",
      "Use `npm run build` to catch production-only issues.",
      "Keep file names and routes easy to follow.",
    ],
    commands: ["npm run dev", "npm run lint", "npm run build"],
    prompt:
      "Review this codebase for clarity and developer ergonomics. Make the route structure and content organization easier to understand for a first-time contributor.",
  },
  {
    slug: "vercel-deploy",
    shortTitle: "Vercel",
    title: "Deploy the server-rendered app on Vercel with minimal friction.",
    intro:
      "For a full server-rendered Next.js site, Vercel is the shortest path to a reliable production setup and preview workflow.",
    summary:
      "Import the GitHub repo into Vercel, accept framework detection, deploy the default branch, and use previews to validate changes before they reach production.",
    whyItMatters:
      "This is the payoff chapter. A good deployment guide makes shipping feel achievable the first time someone tries it.",
    checklist: [
      "Import the repository from GitHub into Vercel.",
      "Keep the default Next.js build settings unless the app truly needs changes.",
      "Deploy the primary branch to production.",
      "Use preview deployments for every meaningful update.",
    ],
    commands: ["vercel", "vercel --prod"],
    prompt:
      "Prepare this repository for Vercel deployment, document the exact import steps, and keep the setup friendly for someone shipping their first server-rendered Next.js app.",
  },
  {
    slug: "domain-and-dns",
    shortTitle: "Domain",
    title: "Connect the custom domain and verify the public experience.",
    intro:
      "A project only feels finished when the production URL works cleanly. DNS and HTTPS need to be part of the published journey.",
    summary:
      "Add the domain in Vercel, update the registrar records, verify certificate issuance, and test the live site on mobile and desktop after propagation.",
    whyItMatters:
      "This is the step where the project stops looking like a demo and starts looking like a product with a real home on the web.",
    checklist: [
      "Add the root domain and `www` variant in Vercel.",
      "Point DNS to the records Vercel provides.",
      "Wait for HTTPS to provision automatically.",
      "Re-test live navigation, metadata, and responsive layout.",
    ],
    prompt:
      "Write a beginner-friendly domain setup guide for Vercel, including what to change at the registrar and how to verify HTTPS after DNS propagation.",
  },
  {
    slug: "env-and-ops",
    shortTitle: "Env & Ops",
    title: "Handle secrets, previews, and production hygiene properly.",
    intro:
      "Even a small site needs a clear rule for environment variables, deployment checks, and what should never be committed.",
    summary:
      "Document where secrets go, how environment variables differ between local and hosted environments, and why previews and branch-based workflows matter.",
    whyItMatters:
      "This page helps people avoid the kind of mistakes that are easy to make once and annoying to clean up later.",
    checklist: [
      "Never commit secrets or tokens.",
      "Use Vercel project settings for hosted environment variables.",
      "Keep `.env.local` out of version control.",
      "Test previews before merging to production.",
    ],
    prompt:
      "Create a practical environment and deployment hygiene guide for this project, with examples of what belongs in local env files versus hosted settings.",
  },
  {
    slug: "costs-and-maintenance",
    shortTitle: "Costs",
    title: "Keep the project cheap to run and easy to maintain.",
    intro:
      "The guide should help people ship without accidentally creating ongoing cost or maintenance surprises.",
    summary:
      "Explain why the recommended path starts on Vercel, when AWS becomes justified, and what habits keep hosting and support effort low over time.",
    whyItMatters:
      "A cheap and understandable setup is often the difference between a site that survives and a site that gets abandoned.",
    checklist: [
      "Avoid unnecessary databases and background jobs.",
      "Use Vercel previews instead of extra staging infrastructure.",
      "Track domain and hosting costs separately.",
      "Prefer simple content and clear deployment rules.",
    ],
    prompt:
      "Add a cost section that compares the practical operational overhead of Vercel and AWS for a small SSR Next.js documentation site.",
  },
  {
    slug: "aws-alternative",
    shortTitle: "AWS Alt",
    title: "Document AWS as the advanced alternative, not the default path.",
    intro:
      "AWS can host server-rendered Next.js apps, but it should be framed honestly: more flexible, more involved, and usually more work for this kind of project.",
    summary:
      "Explain where AWS fits, mention routes like OpenNext or container-based hosting, and keep the core tutorial focused on the faster Vercel path.",
    whyItMatters:
      "The most helpful guide is honest about tradeoffs. AWS is powerful, but beginners deserve to know when the extra complexity is worth it and when it is not.",
    checklist: [
      "Present AWS as a separate advanced track.",
      "Explain the extra operational cost and complexity.",
      "Mention infrastructure choices without overwhelming beginners.",
      "Keep the main tutorial optimized for shipping quickly.",
    ],
    prompt:
      "Write an honest AWS alternative section for a server-rendered Next.js app, including tradeoffs versus Vercel and when the extra complexity is worth it.",
  },
];

export const quickLinks = guideSections.map(({ slug, shortTitle }) => ({
  href: `/guide/${slug}`,
  label: shortTitle,
}));

export const journeySteps = [
  {
    label: "Plan",
    title: "Pick the primary hosting path and save the plan in the repo.",
  },
  {
    label: "Build",
    title: "Create the latest Next.js app and turn it into a guide site.",
  },
  {
    label: "Ship",
    title: "Deploy to Vercel, connect a domain, and keep AWS as the advanced branch.",
  },
];

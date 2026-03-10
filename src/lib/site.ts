export type GuideStep = {
  title: string;
  detail: string;
};

export type ExecutionGuide = {
  prompts: string[];
  tasks: string[];
};

export type GuideSection = {
  slug: string;
  shortTitle: string;
  title: string;
  intro: string;
  summary: string;
  whyItMatters: string;
  checklist: string[];
  steps: GuideStep[];
  deliverables: string[];
  pitfalls: string[];
  executionGuide: ExecutionGuide;
  commands?: string[];
  prompt?: string;
};

export const siteConfig = {
  name: "OpenCode Next.js Journey",
  description:
    "A practical guide site for building a modern Next.js project, deploying it to Vercel, and attaching a real custom domain.",
  repoUrl: "https://github.com/kimzeevaarders-gmail/opencode-nextjs-vercel-journey",
  defaultUrl: "https://opencodejourney.vercel.app",
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || siteConfig.defaultUrl;
}

export const guideSections: GuideSection[] = [
  {
    slug: "prerequisites",
    shortTitle: "Prerequisites",
    title: "Prepare the machine, accounts, and tools before writing the site.",
    intro:
      "The fastest way to reach a live domain is to remove avoidable friction first. Install the required tools, verify access, and make sure the deployment accounts already work.",
    summary:
      "Set up OpenCode, Node.js LTS, Git, GitHub CLI, and Vercel access before touching the app. A clean environment makes the rest of the guide feel linear instead of chaotic.",
    whyItMatters:
      "This is the difference between a project that ships in one pass and a project that gets stuck in setup debt. If the machine and accounts are ready, every later step becomes easier to trust.",
    checklist: [
      "Install OpenCode and confirm it can inspect and edit the repository.",
      "Install current Node.js LTS, npm, Git, and GitHub CLI.",
      "Sign in to GitHub and Vercel before deployment day.",
      "Verify local terminal commands work without permission or PATH issues.",
    ],
    steps: [
      {
        title: "Verify local versions",
        detail:
          "Check Node.js, npm, Git, and GitHub CLI before creating or updating the project so you know the machine is in a good state.",
      },
      {
        title: "Authenticate services",
        detail:
          "Make sure GitHub CLI and Vercel both recognize your account so repo creation, imports, and later deployments do not get blocked by login prompts.",
      },
      {
        title: "Confirm working directory hygiene",
        detail:
          "Keep the project in a predictable folder, avoid spaces in the repo name, and make sure you have normal read and write access.",
      },
      {
        title: "Decide the production URL shape early",
        detail:
          "Know whether you want `example.com`, `www.example.com`, or both. That choice affects DNS, Vercel domain settings, and canonical metadata later.",
      },
    ],
    deliverables: [
      "A machine that can run `npm`, `git`, `gh`, and `vercel` reliably.",
      "Working GitHub and Vercel accounts.",
      "A clear decision about the final root domain and optional `www` redirect.",
    ],
    pitfalls: [
      "Starting app work before logging in to GitHub or Vercel.",
      "Using an outdated Node.js version and hitting build-only errors later.",
      "Waiting until launch day to decide which domain should be canonical.",
    ],
    executionGuide: {
      prompts: [
        "Audit this machine for Node.js LTS, npm, Git, GitHub CLI, Vercel CLI, and OpenCode.",
        "Verify account access for GitHub and Vercel before project work starts.",
      ],
      tasks: [
        "Check installed tooling and version output.",
        "Confirm GitHub authentication and Vercel account access.",
        "Decide the final domain format so deployment metadata can match it later.",
      ],
    },
    commands: ["node -v", "npm -v", "git --version", "gh auth status", "vercel whoami"],
    prompt:
      "Audit this machine for Node.js LTS, npm, Git, GitHub CLI, Vercel CLI, and OpenCode. Verify versions, note anything missing, and recommend the cleanest path to get launch-ready.",
  },
  {
    slug: "github-repo",
    shortTitle: "GitHub Repo",
    title: "Create the repository early so the deployment path exists from day one.",
    intro:
      "GitHub is not just where the code lives. It is the source that Vercel imports, the place preview deployments start from, and the public record of how the project evolved.",
    summary:
      "Create a public repository, connect the local project, commit the docs and starter app, and push a stable default branch so Vercel has something clean to deploy.",
    whyItMatters:
      "If GitHub is set up properly, deployment becomes mostly configuration. If it is skipped or sloppy, the release flow stays fragile.",
    checklist: [
      "Use a clear repository name that matches the project goal.",
      "Push the plan and docs into version control immediately.",
      "Keep the default branch stable enough for production deployment.",
      "Use descriptive commits so the journey remains teachable.",
    ],
    steps: [
      {
        title: "Initialize and connect the repo",
        detail:
          "Make the local project a Git repository, create the remote on GitHub, and link `origin` before larger changes accumulate.",
      },
      {
        title: "Commit the documented plan",
        detail:
          "Treat the implementation plan and deployment notes as first-class project assets, not afterthoughts.",
      },
      {
        title: "Push the default branch",
        detail:
          "Vercel imports a branch, so the repository needs at least one healthy branch with enough code and docs to build from.",
      },
      {
        title: "Preserve a clean preview workflow",
        detail:
          "Keep future work on branches so GitHub pull requests can generate preview deployments automatically in Vercel.",
      },
    ],
    deliverables: [
      "A public GitHub repository with the project source and docs.",
      "A pushed default branch that Vercel can import.",
      "A commit history that explains the project instead of hiding it.",
    ],
    pitfalls: [
      "Delaying the first push until after many unrelated edits.",
      "Keeping docs outside the repo where Vercel followers cannot see them.",
      "Treating the default branch like a scratchpad instead of the production source.",
    ],
    commands: [
      "git init",
      "gh repo create <name> --public --source . --remote origin",
      "git add .",
      "git commit -m \"Create the initial guide site\"",
      "git push -u origin main",
    ],
    executionGuide: {
      prompts: [
        "Create a clean public GitHub repository for this project and connect the local folder.",
        "Make sure the default branch is ready for Vercel import and preview deployments.",
      ],
      tasks: [
        "Initialize Git and connect the remote repository.",
        "Commit the docs, app files, and deployment notes.",
        "Push the default branch so Vercel has a stable source to import.",
      ],
    },
    prompt:
      "Create a clean public GitHub repository for this project, connect the local folder, and make sure the default branch is ready for Vercel import and later preview deployments.",
  },
  {
    slug: "opencode-workflow",
    shortTitle: "OpenCode",
    title: "Use OpenCode as the operator that plans, edits, verifies, and documents each step.",
    intro:
      "The project is not only about a final website. It is also about showing a repeatable human-and-agent workflow that other builders can reuse on their own projects.",
    summary:
      "Use OpenCode to explore the repository, make focused edits, save docs, run verification commands, and keep the tutorial aligned with the real state of the app. The current direction now uses a three-agent path for requirements, implementation, and review.",
    whyItMatters:
      "Readers learn faster when the prompts match reality. OpenCode becomes most useful when it updates the actual repo and verifies the actual build instead of generating disconnected snippets.",
    checklist: [
      "Keep prompts specific about outcome, files, and verification.",
      "Ask for docs and code updates in the same workflow when the change affects both.",
      "Run lint and build after meaningful edits.",
      "Use OpenCode to explain tradeoffs, not just produce code.",
      "Route new work through the requirements-thinker, feature-implementer, and change-reviewer skills.",
    ],
    steps: [
      {
        title: "Anchor every request in the repo",
        detail:
          "Start from the current working tree so OpenCode reads the live files, not a remembered or imaginary project structure.",
      },
      {
        title: "Make changes in small verified passes",
        detail:
          "Ask OpenCode to inspect, edit, then validate with lint and build rather than trying to do everything blindly in one shot.",
      },
      {
        title: "Save operational knowledge as content",
        detail:
          "When a deployment or domain decision matters, record it in the site or docs immediately so the knowledge survives the session.",
      },
      {
        title: "Use the agent for launch polish",
        detail:
          "OpenCode is especially useful for metadata, routing, deployment checks, domain instructions, and identifying missing production details before shipping.",
      },
      {
        title: "Split future work across three skills",
        detail:
          "Use `requirements-thinker` to clarify the ask, `feature-implementer` to build it, and `change-reviewer` to check correctness before calling the task done.",
      },
    ],
    deliverables: [
      "A site whose content matches the real repository.",
      "Reusable prompts that help another person repeat the build.",
      "A documented verification habit for code and deployment work.",
    ],
    pitfalls: [
      "Using vague prompts that never specify what success looks like.",
      "Generating docs that drift away from the actual project files.",
      "Skipping verification after structural edits.",
    ],
    executionGuide: {
      prompts: [
        "Turn this repository into a real launch guide and keep the content aligned with the actual codebase.",
        "Inspect the current project, fill in missing deployment details, and verify what still blocks launch.",
      ],
      tasks: [
        "Read the existing repo structure and docs before editing.",
        "Turn rough requests into reviewed requirements before starting implementation.",
        "Make code and content changes in the same pass when both are affected.",
        "Run verification commands after meaningful edits and finish with a review pass.",
      ],
    },
    prompt:
      "Turn this repository into a real launch guide. Inspect the current project, fill in missing pages and deployment details, and verify everything needed for a Vercel deployment with a custom domain.",
  },
  {
    slug: "project-setup",
    shortTitle: "Project Setup",
    title: "Use a current, production-friendly Next.js stack without unnecessary complexity.",
    intro:
      "The app should feel modern, typed, and easy to deploy. Keep the stack current, but do not add infrastructure or dependencies that do not improve the guide.",
    summary:
      "Use App Router, TypeScript, and Tailwind. Keep the project content-first, add reusable layout structure, and prepare the app for SEO, deployment, and responsive presentation.",
    whyItMatters:
      "A good base makes every later chapter easier. A bloated base turns every deployment and maintenance step into extra work.",
    checklist: [
      "Stay on current stable Next.js and React versions.",
      "Use App Router and typed code paths.",
      "Favor reusable content models over one-off page markup.",
      "Make the site look deliberate on desktop and mobile.",
    ],
    steps: [
      {
        title: "Create the app with modern defaults",
        detail:
          "Start from `create-next-app` using TypeScript, App Router, ESLint, and Tailwind so the project already matches a current production baseline.",
      },
      {
        title: "Replace the starter screen quickly",
        detail:
          "Turn the blank scaffold into a structured tutorial site early so the project begins resembling its real purpose.",
      },
      {
        title: "Centralize guide content",
        detail:
          "Store repeated content in a shared data file so pages stay consistent and easier to expand.",
      },
      {
        title: "Add production signals",
        detail:
          "Prepare metadata, sitemap, robots, and canonical URL support so the site is ready for a real public domain.",
      },
    ],
    deliverables: [
      "A server-rendered Next.js app with typed routes and shared content.",
      "A homepage and guide pages that look intentional.",
      "A base that can build cleanly on Vercel.",
    ],
    pitfalls: [
      "Leaving the starter app mostly untouched and calling it production-ready.",
      "Scattering tutorial content across unrelated page files.",
      "Ignoring metadata until after the domain is live.",
    ],
    commands: [
      "npm create next-app@latest . -- --ts --eslint --app --src-dir --use-npm --tailwind",
      "npm run dev",
    ],
    executionGuide: {
      prompts: [
        "Scaffold a current Next.js app and replace the starter screen with a polished guide site.",
        "Add the production details needed for a real Vercel deployment and custom domain launch.",
      ],
      tasks: [
        "Use the modern App Router, TypeScript, and Tailwind stack.",
        "Replace placeholder content with reusable guide-driven structure.",
        "Prepare metadata and public-site settings so the app can ship cleanly.",
      ],
    },
    prompt:
      "Scaffold a current Next.js app, replace the default screen with a polished guide site, and add the production details needed for a real Vercel deployment and custom domain launch.",
  },
  {
    slug: "local-development",
    shortTitle: "Local Dev",
    title: "Keep local development predictable so production issues are caught before deploys.",
    intro:
      "Local development is where the project earns trust. The commands should be obvious, the route structure should be easy to follow, and production checks should run before every release.",
    summary:
      "Use `npm run dev` for iteration, `npm run lint` for quality, and `npm run build` for production validation. Teach contributors where content lives and what must pass before merging.",
    whyItMatters:
      "Most deployment pain is really local feedback pain that nobody noticed soon enough. Tight local checks save launch-day stress.",
    checklist: [
      "Run the dev server during content and layout work.",
      "Use lint to catch mistakes before they reach GitHub.",
      "Use the production build as the release gate.",
      "Keep routing and shared content files discoverable.",
    ],
    steps: [
      {
        title: "Use the dev server for feedback",
        detail:
          "Run the local app while editing so layout, navigation, typography, and mobile behavior are visible immediately.",
      },
      {
        title: "Verify static and typed behavior",
        detail:
          "Lint catches many code quality issues, while Next.js production build checks surface route and metadata problems that only matter at deploy time.",
      },
      {
        title: "Review route coverage",
        detail:
          "Open the homepage, journey page, and each guide route locally so broken links or missing sections do not escape into production.",
      },
      {
        title: "Keep env handling explicit",
        detail:
          "Use a checked-in `.env.example` for public variables and never depend on hidden local values that Vercel will not have.",
      },
    ],
    deliverables: [
      "A local workflow another person can reproduce instantly.",
      "A production build that passes before deployment.",
      "Clear file organization for routes, content, and shared components.",
    ],
    pitfalls: [
      "Only testing with `npm run dev` and never running a production build.",
      "Depending on local environment variables that are absent in Vercel.",
      "Forgetting to check mobile layout before launch.",
    ],
    executionGuide: {
      prompts: [
        "Review this Next.js repository for local developer clarity and release safety.",
        "Improve the structure if needed, then verify lint and build before deployment.",
      ],
      tasks: [
        "Run the app locally and inspect the important routes.",
        "Use lint to catch code-quality issues.",
        "Use the production build as the final local release gate.",
      ],
    },
    commands: ["npm install", "npm run dev", "npm run lint", "npm run build"],
    prompt:
      "Review this Next.js repository for local developer clarity. Improve the structure if needed, then verify lint and build so the project is safe to ship.",
  },
  {
    slug: "vercel-deploy",
    shortTitle: "Vercel",
    title: "Deploy to Vercel in the way that best fits a server-rendered Next.js app.",
    intro:
      "For this project, Vercel is the shortest path from repository to public production URL. The goal is to keep configuration light and lean on the platform defaults that Next.js is built to use.",
    summary:
      "Push the repository to GitHub, import it into Vercel, accept Next.js detection, configure environment variables, and let the default branch power production while pull requests create previews. This project is now live at `opencodejourney.vercel.app`.",
    whyItMatters:
      "A great deployment chapter makes the reader feel like shipping is normal, not advanced. Vercel works best here because it removes most of the infrastructure choices from the first release.",
    checklist: [
      "Import the GitHub repository into Vercel.",
      "Keep the default Next.js build settings unless the app truly needs overrides.",
      "Set production environment variables before the first real launch.",
      "Use preview deployments for branch and pull request review.",
    ],
    steps: [
      {
        title: "Import from GitHub",
        detail:
          "In the Vercel dashboard, create a new project from the connected GitHub repository and let Vercel detect that it is a Next.js app. If GitHub import fails, add the GitHub Login Connection in Vercel account settings first.",
      },
      {
        title: "Review project settings",
        detail:
          "Confirm the framework preset, build command, install command, and output directory are all left at their Next.js defaults unless you have a specific reason to change them.",
      },
      {
        title: "Add public metadata variables",
        detail:
          "Set `NEXT_PUBLIC_SITE_URL` to the final production origin so canonical metadata, sitemap output, and robots rules point at the correct domain.",
      },
      {
        title: "Deploy and test previews",
        detail:
          "Let Vercel build the default branch for production and use branch or pull request previews to test content and layout before merging changes.",
      },
    ],
    deliverables: [
      "A live Vercel project connected to GitHub.",
      "A production deployment at `https://opencodejourney.vercel.app`.",
      "Preview deployments for future changes.",
    ],
    pitfalls: [
      "Changing Vercel defaults without a real technical need.",
      "Forgetting to add `NEXT_PUBLIC_SITE_URL` after the domain is known.",
      "Treating the first successful build as enough without clicking through the live site.",
    ],
    executionGuide: {
      prompts: [
        "Prepare this repository for Vercel deployment and keep the settings beginner-friendly.",
        "Document every step from GitHub import to a stable production release.",
      ],
      tasks: [
        "Import the GitHub repo into Vercel and review the detected settings.",
        "Add required environment variables such as `NEXT_PUBLIC_SITE_URL`.",
        "Deploy production from the default branch, verify `opencodejourney.vercel.app`, and use previews for future changes.",
      ],
    },
    commands: ["vercel", "vercel env add NEXT_PUBLIC_SITE_URL", "vercel --prod"],
    prompt:
      "Prepare this repository for Vercel deployment, keep the platform settings beginner-friendly, and document every step required to go from GitHub import to a stable production release.",
  },
  {
    slug: "domain-and-dns",
    shortTitle: "Domain",
    title: "Attach the real domain, configure DNS correctly, and verify HTTPS end to end.",
    intro:
      "A deployment is not truly finished when it only works on a generated Vercel URL. The final step is connecting the real domain, deciding the canonical host, and making sure HTTPS and redirects behave correctly.",
    summary:
      "Add both the apex domain and the `www` variant in Vercel, choose the canonical production domain, update DNS at the registrar, wait for propagation, and verify that certificates and redirects settle correctly.",
    whyItMatters:
      "This is the launch step people remember. If the domain is clean, secure, and consistent, the project feels finished and trustworthy.",
    checklist: [
      "Add the root domain and optional `www` domain in Vercel.",
      "Pick a canonical host and redirect the other variant to it.",
      "Copy the exact DNS records Vercel asks for into the registrar dashboard.",
      "Wait for DNS and HTTPS provisioning, then test the real URL on multiple devices.",
    ],
    steps: [
      {
        title: "Add the domain in Vercel",
        detail:
          "Open the project in Vercel, go to Settings -> Domains, add your apex domain such as `example.com`, then add `www.example.com` if you want both variants to work.",
      },
      {
        title: "Choose the canonical domain",
        detail:
          "Set the preferred production domain in Vercel so all traffic resolves to either the apex or the `www` host instead of splitting SEO and link equity across both.",
      },
      {
        title: "Update registrar DNS",
        detail:
          "At the company where you bought the domain, add the exact A, ALIAS, or CNAME records Vercel shows. Remove conflicting old records that point somewhere else.",
      },
      {
        title: "Verify propagation and HTTPS",
        detail:
          "After DNS updates propagate, Vercel will provision the certificate. Check that the browser shows HTTPS, redirects are correct, and the sitemap and robots file load from the real domain.",
      },
    ],
    deliverables: [
      "A production deployment reachable at the real domain.",
      "Correct redirects between apex and `www`.",
      "Automatic HTTPS on the final public URL.",
    ],
    pitfalls: [
      "Leaving old DNS records in place and sending traffic to the wrong host.",
      "Forgetting to choose one canonical domain.",
      "Testing the Vercel URL only and never validating the actual domain.",
    ],
    executionGuide: {
      prompts: [
        "Write a complete beginner-friendly Vercel domain guide.",
        "Cover registrar DNS changes, canonical host selection, HTTPS verification, and post-propagation checks.",
      ],
      tasks: [
        "Add both the apex domain and `www` variant in Vercel.",
        "Copy the required DNS records into the registrar dashboard.",
        "Verify redirects, HTTPS, and the final public browsing experience.",
      ],
    },
    commands: ["nslookup <your-domain>", "nslookup www.<your-domain>", "curl -I https://<your-domain>"],
    prompt:
      "Write a complete beginner-friendly Vercel domain guide that covers adding the domain, updating registrar DNS, choosing the canonical host, verifying HTTPS, and rechecking the live site after propagation.",
  },
  {
    slug: "env-and-ops",
    shortTitle: "Env & Ops",
    title: "Treat environment variables, previews, and production hygiene as part of the product.",
    intro:
      "A small site still needs clear rules for secrets, environment variables, previews, and what should never be committed to Git. These are the habits that keep the launch clean.",
    summary:
      "Store secrets locally in `.env.local`, store hosted values in Vercel project settings, keep `.env*` ignored by Git, and use preview deployments as the safe review layer before production merges.",
    whyItMatters:
      "Operational mistakes are usually simple mistakes repeated quietly. Good env and preview rules prevent them before they become public problems.",
    checklist: [
      "Never commit secrets, tokens, or private keys.",
      "Use `.env.local` only for local development.",
      "Use Vercel project settings for deployed environment variables.",
      "Treat preview deployments as the final review step before production.",
    ],
    steps: [
      {
        title: "Separate local from hosted configuration",
        detail:
          "Keep local-only values in `.env.local` and set the matching deployed variables in Vercel for Preview and Production environments.",
      },
      {
        title: "Document public variables",
        detail:
          "Check in `.env.example` with safe placeholders so collaborators know which variables must exist without exposing secrets.",
      },
      {
        title: "Use previews as a release gate",
        detail:
          "Review content, links, metadata, and responsive layout in the preview URL before merging to the default branch.",
      },
      {
        title: "Protect the production branch socially",
        detail:
          "Even if the project is small, treat the default branch like the source of production and do not merge unverified changes casually.",
      },
    ],
    deliverables: [
      "A clear env-variable story for local, preview, and production.",
      "A checked-in `.env.example` file with safe placeholders.",
      "A repeatable review flow using Vercel previews.",
    ],
    pitfalls: [
      "Committing a real `.env.local` file.",
      "Assuming local values automatically exist in Vercel.",
      "Merging without checking the preview deployment.",
    ],
    executionGuide: {
      prompts: [
        "Create a practical environment-variable and deployment-hygiene guide for this repository.",
        "Explain what belongs in local env files, what belongs in Vercel settings, and how previews fit into release flow.",
      ],
      tasks: [
        "Define which variables stay local and which are configured in Vercel.",
        "Keep secrets out of Git and provide safe placeholders for collaborators.",
        "Use preview deployments as the final review step before production merges.",
      ],
    },
    commands: ["vercel env ls", "vercel env add NEXT_PUBLIC_SITE_URL production", "vercel env pull .env.local"],
    prompt:
      "Create a practical environment-variable and deployment-hygiene guide for this repository, including what belongs in local env files, what belongs in Vercel settings, and how previews fit into the release flow.",
  },
  {
    slug: "costs-and-maintenance",
    shortTitle: "Costs",
    title: "Keep the project inexpensive to host and simple to maintain after launch.",
    intro:
      "The best deployment is not only the one with the lowest monthly bill. It is the one you can still understand and maintain a few months later.",
    summary:
      "Use Vercel for the default path, avoid unnecessary infrastructure, keep the site mostly content-driven, and track the domain and hosting costs separately so maintenance stays obvious.",
    whyItMatters:
      "A simple site survives because it is easy to keep alive. A needlessly complex site becomes work nobody wants to repeat.",
    checklist: [
      "Prefer Vercel for the primary SSR path.",
      "Avoid databases and background jobs unless the site truly needs them.",
      "Track domain renewals separately from hosting costs.",
      "Keep content updates lightweight and easy to preview.",
    ],
    steps: [
      {
        title: "Minimize moving parts",
        detail:
          "A tutorial site usually does not need a database, worker queue, or separate staging stack. Each extra component adds cost and maintenance effort.",
      },
      {
        title: "Use the platform features you already get",
        detail:
          "Preview deployments, HTTPS, and managed hosting are part of why Vercel is the recommended first step for this project.",
      },
      {
        title: "Treat content edits as the common case",
        detail:
          "A content-first structure means future changes are usually text and layout changes, not infrastructure changes.",
      },
      {
        title: "Review costs with operational time in mind",
        detail:
          "Even if another platform is slightly cheaper on paper, it may be more expensive in setup time, debugging time, and ongoing attention.",
      },
    ],
    deliverables: [
      "A hosting choice that favors simplicity.",
      "A site that is easy to update without new infrastructure.",
      "A clear explanation of why Vercel is the default and AWS is the advanced option.",
    ],
    pitfalls: [
      "Optimizing only for raw hosting cost and ignoring maintenance time.",
      "Adding infrastructure before the tutorial actually needs it.",
      "Blurring the difference between a beginner path and an enterprise path.",
    ],
    executionGuide: {
      prompts: [
        "Add a cost and maintenance section that compares Vercel and AWS honestly.",
        "Explain why the simpler path is the recommended path for this specific site.",
      ],
      tasks: [
        "Compare hosting cost with setup and maintenance effort.",
        "Keep the site content-first so future updates stay cheap.",
        "Show why Vercel is the practical default for this launch.",
      ],
    },
    prompt:
      "Add a cost and maintenance section that compares Vercel and AWS honestly for a small server-rendered Next.js documentation site and explains why the simple path is the recommended path.",
  },
  {
    slug: "aws-alternative",
    shortTitle: "AWS Alt",
    title: "Explain AWS as the advanced path without diluting the main Vercel story.",
    intro:
      "AWS can absolutely host a server-rendered Next.js app, but it should be framed honestly. It gives more control and more possible integrations, while also requiring more decisions and more operational care.",
    summary:
      "Present AWS as the follow-up track for teams that already need it. Mention routes like OpenNext and containerized hosting, but keep the main tutorial focused on getting shipped on Vercel first.",
    whyItMatters:
      "Good guides respect advanced users without forcing every beginner to learn enterprise infrastructure on day one.",
    checklist: [
      "Keep Vercel as the default path.",
      "Position AWS as optional and advanced.",
      "Mention likely AWS SSR routes without overwhelming detail.",
      "Explain clearly when the extra complexity is justified.",
    ],
    steps: [
      {
        title: "State the tradeoff clearly",
        detail:
          "AWS provides deeper control and integration potential, but it usually introduces more architecture, deployment, and maintenance work for a small guide site.",
      },
      {
        title: "Mention OpenNext",
        detail:
          "OpenNext is useful when you want a Next.js-aware deployment path on AWS and are comfortable managing AWS-native infrastructure around it.",
      },
      {
        title: "Mention container hosting",
        detail:
          "Running the app in `App Runner` or `ECS` can work well for teams already operating containers, but it shifts more responsibility onto the team.",
      },
      {
        title: "Protect the main tutorial",
        detail:
          "Do not let the advanced option confuse the default path. The fastest route to a finished public site for this project remains GitHub plus Vercel plus a domain.",
      },
    ],
    deliverables: [
      "An honest AWS chapter for advanced readers.",
      "A tutorial that still stays easy to follow.",
      "A clear boundary between the default and advanced deployment tracks.",
    ],
    pitfalls: [
      "Presenting AWS as equally simple for this exact project.",
      "Adding too much infrastructure detail to the main path.",
      "Confusing flexibility with a better beginner experience.",
    ],
    executionGuide: {
      prompts: [
        "Write an honest AWS alternative section for a server-rendered Next.js guide site.",
        "Cover tradeoffs versus Vercel and explain when the added complexity is actually worth it.",
      ],
      tasks: [
        "Position AWS as the advanced track, not the default launch path.",
        "Mention realistic AWS SSR options such as OpenNext and container hosting.",
        "Keep the main tutorial focused on shipping quickly with GitHub, Vercel, and a domain.",
      ],
    },
    prompt:
      "Write an honest AWS alternative section for a server-rendered Next.js guide site, covering the tradeoffs versus Vercel and when the additional complexity becomes worth it.",
  },
];

export const quickLinks = guideSections.map(({ slug, shortTitle }) => ({
  href: `/guide/${slug}`,
  label: shortTitle,
}));

export const journeySteps = [
  {
    label: "Plan",
    title: "Decide the hosting path, domain shape, and launch requirements before building.",
  },
  {
    label: "Build",
    title: "Create the Next.js guide site, centralize content, and validate it locally.",
  },
  {
    label: "Ship",
    title: "Import the repo into Vercel, connect the real domain, and verify HTTPS and redirects.",
  },
];

export const launchChecklist = [
  "GitHub repository pushed and connected to Vercel.",
  "`npm run lint` and `npm run build` both pass locally.",
  "`NEXT_PUBLIC_SITE_URL` points to `https://opencodejourney.vercel.app`.",
  "Production is live on the free Vercel subdomain with HTTPS enabled.",
  "`robots.txt` and `sitemap.xml` both respond successfully in production.",
  "GitHub can now be connected in Vercel for smoother repo imports and previews.",
];

export const deploymentTimeline = [
  {
    title: "Before import",
    detail: "Push a working default branch to GitHub and make sure the app already builds locally.",
  },
  {
    title: "First deploy",
    detail: "Import the repository into Vercel and let Next.js defaults drive the first production build.",
  },
  {
    title: "Domain attach",
    detail: "Add the apex and optional `www` domain, then update DNS at the registrar.",
  },
  {
    title: "Launch verify",
    detail: "Open `opencodejourney.vercel.app`, confirm HTTPS, metadata, sitemap, robots, mobile layout, and the future preview workflow.",
  },
];

export const multiAgentWorkflow = [
  {
    skill: "requirements-thinker",
    title: "Clarify the request",
    detail: "Turn a rough ask into requirements, assumptions, risks, and acceptance criteria before code changes start.",
  },
  {
    skill: "feature-implementer",
    title: "Build the approved work",
    detail: "Implement the feature in small verified steps that match the repo structure and the accepted requirements.",
  },
  {
    skill: "change-reviewer",
    title: "Review before shipping",
    detail: "Compare the final changes against the request, look for gaps or regressions, and give a ship recommendation.",
  },
];

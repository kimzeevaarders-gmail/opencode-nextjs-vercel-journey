import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { deploymentTimeline, guideSections, journeySteps, launchChecklist, siteConfig } from "@/lib/site";

const checkpoints = [
  "Use current Node.js LTS and the latest stable Next.js + React.",
  "Keep the main deployment path on Vercel for the lowest operational friction.",
  "Document the repo, the prompts, and the exact deployment commands together.",
  "Verify the production URL, sitemap, robots, and responsive layout after launch.",
];

export default function Home() {
  return (
    <SiteShell>
      <main className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-14">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-black/10 bg-white/70 px-5 py-3 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-600">
            OpenCode x Next.js x Vercel
          </p>
          <div className="flex gap-3 text-sm font-medium">
            <Link className="rounded-full border border-black/10 px-4 py-2 hover:bg-black/5" href="/journey">
              View journey
            </Link>
            <a
              className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
              href="https://github.com/kimzeevaarders-gmail/opencode-nextjs-vercel-journey"
              target="_blank"
              rel="noreferrer"
            >
              GitHub repo
            </a>
          </div>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-600">
              From zero to live site
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
              Build a server-rendered Next.js site and publish the full journey so others can follow it.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-700 sm:text-xl">
              This project is the working blueprint: latest React, latest Next.js, TypeScript, GitHub, Vercel, a live production deployment at `opencodejourney.vercel.app`, custom domain guidance, cost notes, and an optional AWS path.
            </p>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-slate-900 p-6 text-slate-100 shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Primary recommendation</p>
            <h2 className="mt-3 text-2xl font-semibold">Deploy on Vercel first</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              You want full server rendering with the least operational overhead. Vercel is the cleanest default, and this exact project is already live on the free subdomain at `opencodejourney.vercel.app`.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Live status</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">The tutorial is live and documented.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              The repository is pushed, the Vercel project is deployed, the production URL is active, and the guide now includes the prompts, tasks, and verification steps used to reach launch.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
              <a className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-700" href={siteConfig.defaultUrl} target="_blank" rel="noreferrer">
                Open live site
              </a>
              <Link className="rounded-full border border-black/10 px-4 py-2 hover:bg-black/5" href="/guide/vercel-deploy">
                Read deploy guide
              </Link>
            </div>
          </article>

          <article className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Launch checklist</p>
            <div className="mt-4 grid gap-3">
              {launchChecklist.map((item) => (
                <div key={item} className="rounded-2xl border border-black/8 bg-[#f7f2e7] px-4 py-4 text-sm leading-6 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {journeySteps.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.07)] backdrop-blur"
            >
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">0{index + 1}</p>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.label}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {guideSections.slice(0, 6).map((section) => (
            <article key={section.slug} className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{section.shortTitle}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{section.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{section.summary}</p>
              <Link
                href={`/guide/${section.slug}`}
                className="mt-6 inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                Open section
              </Link>
            </article>
          ))}
        </section>

        <section className="grid gap-8 rounded-[2rem] border border-black/10 bg-white/70 p-8 backdrop-blur lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">What changed most recently</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">The repo, deployment, and verification trail now exist.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
              The implementation plan is saved in the repository, the app is live on Vercel, and the site content now reflects the real prompts, tasks, environment setup, GitHub connection work, and deployment verification used to get here.
            </p>
          </div>
          <div className="grid gap-4">
            {checkpoints.map((item) => (
              <div key={item} className="rounded-2xl border border-black/8 bg-[#f7f2e7] px-5 py-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Deployment timeline</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {deploymentTimeline.map((item) => (
              <article key={item.title} className="rounded-2xl border border-black/8 bg-[#e6efe7] px-5 py-5">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
        </section>
      </main>
    </SiteShell>
  );
}

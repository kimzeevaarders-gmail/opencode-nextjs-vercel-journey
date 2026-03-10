import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { guideSections, journeySteps } from "@/lib/site";

const checkpoints = [
  "Use current Node.js LTS and the latest stable Next.js + React.",
  "Keep the main deployment path on Vercel for the lowest operational friction.",
  "Document each command so other people can repeat the same journey with OpenCode.",
  "Make the site responsive before you call it ready.",
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
              This project is the working blueprint: latest React, latest Next.js, TypeScript, GitHub, Vercel, custom domain setup, cost guidance, and an optional AWS path.
            </p>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-slate-900 p-6 text-slate-100 shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Primary recommendation</p>
            <h2 className="mt-3 text-2xl font-semibold">Deploy on Vercel first</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              You want full server rendering with the least operational overhead. Vercel is the cleanest default, while AWS stays available as an advanced follow-up track.
            </p>
          </div>
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
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">What is already in motion</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">The repo and plan now exist.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
              The implementation plan is saved in the repository and the app is scaffolded with the current stable stack, so the next passes can focus on writing the journey content and polishing deployment.
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
        </section>
      </main>
    </SiteShell>
  );
}

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { guideSections, siteConfig } from "@/lib/site";

export default function JourneyPage() {
  return (
    <SiteShell>
      <main className="px-4 py-8 text-slate-900 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Journey</p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            The path from a blank folder to a live production website.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700">
            This project documents the exact order of operations so someone else can repeat the same build with OpenCode and arrive at the same result. The current public deployment is live at `{siteConfig.defaultUrl}`, and the next phase uses a product-owner, developer, and reviewer workflow running on a local Ollama coding model to keep improving the site.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <a className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-700" href={siteConfig.defaultUrl} target="_blank" rel="noreferrer">
              Open deployed site
            </a>
            <Link className="rounded-full border border-black/10 px-4 py-2 hover:bg-black/5" href="/guide/vercel-deploy">
              Deployment section
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guideSections.map((step, index) => (
            <article key={step.slug} className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">0{index + 1}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{step.shortTitle}</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">{step.summary}</p>
              <Link
                href={`/guide/${step.slug}`}
                className="mt-6 inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                Read section
              </Link>
            </article>
          ))}
        </div>
        </div>
      </main>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { guideSections } from "@/lib/site";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return guideSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = guideSections.find((item) => item.slug === slug);

  if (!section) {
    return {};
  }

  return {
    title: `${section.shortTitle} | OpenCode Next.js Journey`,
    description: section.summary,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const section = guideSections.find((item) => item.slug === slug);

  if (!section) {
    notFound();
  }

  return (
    <SiteShell>
      <main className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur sm:p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{section.shortTitle}</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
                {section.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{section.intro}</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">{section.summary}</p>
              <div className="mt-6 rounded-[1.5rem] border border-black/8 bg-[#f7f2e7] px-5 py-5 text-sm leading-7 text-slate-800 sm:text-base">
                {section.whyItMatters}
              </div>
            </section>
            <aside className="rounded-[2rem] border border-black/10 bg-slate-900 p-6 text-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Use this page for</p>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                Walking someone through one stage of the build with concrete actions, safe defaults, and copy-paste prompts.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/journey" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200">
                  Back to journey
                </Link>
                <a
                  href="https://github.com/kimzeevaarders-gmail/opencode-nextjs-vercel-journey"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
                >
                  Open repo
                </a>
              </div>
            </aside>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-black/10 bg-white/80 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">Checklist</h2>
              <div className="mt-5 grid gap-4">
                {section.checklist.map((item) => (
                  <div key={item} className="rounded-2xl border border-black/8 bg-[#f7f2e7] px-4 py-4 text-sm leading-6 text-slate-700 sm:px-5">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6">
              {section.commands ? (
                <article className="rounded-[2rem] border border-black/10 bg-white/80 p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-[-0.03em]">Commands</h2>
                  <div className="mt-5 grid gap-3">
                    {section.commands.map((command) => (
                      <code key={command} className="overflow-x-auto rounded-2xl bg-slate-950 px-4 py-4 font-mono text-sm text-slate-100">
                        {command}
                      </code>
                    ))}
                  </div>
                </article>
              ) : null}

              {section.prompt ? (
                <article className="rounded-[2rem] border border-black/10 bg-white/80 p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-[-0.03em]">OpenCode Prompt</h2>
                  <div className="mt-5 rounded-2xl border border-black/10 bg-[#e6efe7] px-4 py-5 text-sm leading-7 text-slate-800 sm:px-5">
                    {section.prompt}
                  </div>
                </article>
              ) : null}
            </section>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

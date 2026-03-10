import Link from "next/link";
import { quickLinks } from "@/lib/site";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f5efe4_0%,#efe6d2_28%,#d8e4dd_72%,#f8f5ee_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-black/8 bg-[#f8f5ee]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-700">
              OpenCode Journey
            </Link>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link className="rounded-full border border-black/10 px-3 py-2 hover:bg-black/5" href="/journey">
                Full journey
              </Link>
              <a
                className="rounded-full bg-slate-900 px-3 py-2 text-white hover:bg-slate-700"
                href="https://github.com/kimzeevaarders-gmail/opencode-nextjs-vercel-journey"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-700 transition hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-black/8 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <p>Built as a repeatable OpenCode-to-production guide.</p>
          <p>Primary path: Vercel. Advanced path: AWS.</p>
        </div>
      </footer>
    </div>
  );
}

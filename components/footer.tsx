import Link from "next/link";

const footerLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/quiz", label: "Quiz" },
  { href: "/polls", label: "Polls" },
  { href: "/stories", label: "Stories" },
  { href: "/laws", label: "Laws" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-violet-200">
              E
            </div>
            <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">EqualSpace</div>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
            Challenge the stereotype. Understand the issue. Create change.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-violet-600 dark:hover:text-violet-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="mailto:hello@equalspace.org" className="transition hover:text-violet-600 dark:hover:text-violet-300">hello@equalspace.org</a></li>
            <li>Education & inclusion</li>
            <li>Philippines</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © 2026 EqualSpace. Built for awareness, dignity, and opportunity.
      </div>
    </footer>
  );
}

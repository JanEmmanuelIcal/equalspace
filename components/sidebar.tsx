import Link from "next/link";
import { Gauge, Files, Sparkles, Users, ShieldCheck, BookText, NotebookText, BarChart3, Settings } from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: Gauge },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/stories", label: "Stories", icon: Files },
  { href: "/admin/polls", label: "Polls", icon: BarChart3 },
  { href: "/admin/questions", label: "Quiz Questions", icon: Sparkles },
  { href: "/admin/lessons", label: "Lessons", icon: BookText },
  { href: "/admin/laws", label: "Laws", icon: NotebookText },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-slate-50 p-5 lg:block dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white">E</div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Admin</p>
          <p className="text-lg font-black text-slate-900 dark:text-white">EqualSpace</p>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-10 rounded-[24px] border border-violet-200 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/30">
        <div className="mb-2 flex items-center gap-2 text-violet-700 dark:text-violet-200">
          <ShieldCheck size={16} />
          <span className="text-sm font-semibold">Security</span>
        </div>
        <p className="text-sm leading-6 text-violet-800/80 dark:text-violet-100/80">
          Role-based access is enforced and admin-only views remain protected.
        </p>
      </div>
    </aside>
  );
}

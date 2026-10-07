import { ArrowRight, Building2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About | EqualSpace",
  description: "Learn about EqualSpace, its mission, and the approach behind the platform."
};

const pillars = [
  { icon: Sparkles, title: "Awareness", text: "Helping people recognize how stereotypes shape everyday decisions and expectations." },
  { icon: HeartHandshake, title: "Education", text: "Providing accessible, evidence-based resources for understanding gender roles and equality." },
  { icon: ShieldCheck, title: "Protection", text: "Supporting respectful dialogue and access to reliable information and legal resources." },
  { icon: Building2, title: "Action", text: "Turning reflection into practical conversations, decisions, and community change." }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">About EqualSpace</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">Challenge the stereotype. Understand the issue. Create change.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            EqualSpace is a gender-awareness and equality platform designed to help people question harmful assumptions, learn from evidence and lived experience, and take part in a more inclusive society.
          </p>

          <Link href="/learn" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 dark:shadow-violet-950/40">
            Explore the learning center <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-violet-50 to-sky-50 p-6 dark:border-slate-800 dark:from-violet-950/20 dark:to-sky-950/20">
          <div className="space-y-4">
            {[
              "Accessible, evidence-informed education",
              "Open reflection on gender roles and social norms",
              "Responsible storytelling and moderation",
              "Legal and advocacy resources for informed action"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white/75 p-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-200">
              <Icon size={18} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

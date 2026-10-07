import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
};

export function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <article className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(148,163,184,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition group-hover:gap-3 dark:text-violet-300">
        Explore <ArrowRight size={16} />
      </Link>
    </article>
  );
}

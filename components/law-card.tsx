import { ArrowUpRight, Landmark } from "lucide-react";
import type { LawResource } from "@/lib/data";

export function LawCard({ law }: { law: LawResource }) {
  return (
    <article className="group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(35,26,76,0.04)] transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_22px_55px_rgba(79,70,229,0.11)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-900">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-200">
          <Landmark size={22} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-700 dark:text-slate-400">{law.category}</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{law.year}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-bold leading-snug text-slate-900 dark:text-white">{law.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{law.explanation}</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{law.source}</span>
        <a href={law.url} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-violet-700 transition group-hover:gap-2.5 dark:text-violet-300">
          Read act <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

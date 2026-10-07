import { ArrowUpRight } from "lucide-react";
import type { LawResource } from "@/lib/data";

export function LawCard({ law }: { law: LawResource }) {
  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-700 dark:bg-violet-950/30 dark:text-violet-200">
          {law.category}
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{law.year}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{law.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{law.explanation}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>{law.source}</span>
        <a href={law.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-violet-600 dark:text-violet-300">
          View source <ArrowUpRight size={13} />
        </a>
      </div>
    </article>
  );
}

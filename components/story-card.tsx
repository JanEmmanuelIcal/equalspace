import type { StoryItem } from "@/lib/data";

export function StoryCard({ story }: { story: StoryItem }) {
  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-700 dark:bg-violet-950/30 dark:text-violet-200">
          {story.category}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{story.date}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{story.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{story.body}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
        <span className="font-medium text-slate-700 dark:text-slate-200">{story.author}</span>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
          {story.status}
        </span>
      </div>
    </article>
  );
}

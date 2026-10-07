import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import type { Lesson } from "@/lib/data";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link href={`/learn/${lesson.slug}`} className="group block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-violet-100 via-sky-100 to-emerald-100 p-5 dark:from-violet-950/40 dark:via-sky-950/40 dark:to-emerald-950/40">
        <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-violet-200/70 blur-2xl" />
        <div className="absolute bottom-5 left-5 h-12 w-12 rounded-2xl bg-white/70 shadow-sm" />
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
          {lesson.category}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1"><BookOpen size={14} /> {lesson.difficulty}</span>
          <span className="inline-flex items-center gap-1"><Clock3 size={14} /> {lesson.readTime}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{lesson.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{lesson.excerpt}</p>
        </div>
        <div className="flex items-center justify-between pt-3">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-violet-600 dark:text-violet-300">{lesson.source}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-white">
            Read <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}

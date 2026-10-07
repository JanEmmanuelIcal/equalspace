import Link from "next/link";
import { ArrowUpRight, BookOpen, BriefcaseBusiness, Clock3, ListChecks, MessageSquareText, Scale, Sparkles, Users } from "lucide-react";
import type { Lesson } from "@/lib/data";

const lessonArt: Record<string, { icon: typeof BookOpen; background: string; tint: string; motif: string }> = {
  "Gender Stereotypes": { icon: Sparkles, background: "from-violet-100 via-fuchsia-50 to-indigo-100 dark:from-violet-950/60 dark:via-slate-900 dark:to-indigo-950/50", tint: "text-violet-700 dark:text-violet-200", motif: "Notice · Question · Choose" },
  "Gender Roles": { icon: Users, background: "from-sky-100 via-cyan-50 to-indigo-100 dark:from-sky-950/60 dark:via-slate-900 dark:to-indigo-950/50", tint: "text-sky-700 dark:text-sky-200", motif: "Roles can be shared" },
  "Gender Equality": { icon: Scale, background: "from-emerald-100 via-teal-50 to-sky-100 dark:from-emerald-950/50 dark:via-slate-900 dark:to-sky-950/50", tint: "text-emerald-700 dark:text-emerald-200", motif: "Fairness · Access · Respect" },
  "Education": { icon: BookOpen, background: "from-amber-100 via-orange-50 to-rose-100 dark:from-amber-950/45 dark:via-slate-900 dark:to-rose-950/45", tint: "text-amber-800 dark:text-amber-200", motif: "Room to learn" },
  "Inclusive Communication": { icon: MessageSquareText, background: "from-rose-100 via-pink-50 to-violet-100 dark:from-rose-950/45 dark:via-slate-900 dark:to-violet-950/50", tint: "text-rose-700 dark:text-rose-200", motif: "Words make space" },
  "Workplace": { icon: BriefcaseBusiness, background: "from-indigo-100 via-blue-50 to-cyan-100 dark:from-indigo-950/55 dark:via-slate-900 dark:to-cyan-950/45", tint: "text-indigo-700 dark:text-indigo-200", motif: "Potential has no template" }
};

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const art = lessonArt[lesson.category] || lessonArt["Gender Stereotypes"];
  const ArtIcon = art.icon;

  return (
    <Link href={`/learn/${lesson.slug}`} className="group block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className={`relative h-40 overflow-hidden bg-linear-to-br ${art.background} p-5`}>
        <div aria-hidden="true" className="absolute -right-6 -top-12 h-40 w-40 rounded-full border border-white/50 bg-white/20" />
        <div aria-hidden="true" className="absolute -bottom-14 left-20 h-36 w-36 rounded-full border border-white/50 bg-white/25" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 h-16 w-full bg-linear-to-t from-white/25 to-transparent dark:from-white/5" />
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-200">
          {lesson.category}
        </div>
        <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
          <div className={`flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/70 bg-white/70 shadow-lg shadow-slate-900/10 backdrop-blur ${art.tint} dark:border-white/10 dark:bg-slate-950/55`}>
            <ArtIcon size={30} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <div className="rounded-full border border-white/60 bg-white/65 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-200">
            {art.motif}
          </div>
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
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-800 dark:bg-violet-950/40 dark:text-violet-200">
          <ListChecks size={14} /> 5 stages · 10 review questions
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

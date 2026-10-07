"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, LoaderCircle } from "lucide-react";
import { lessons } from "@/lib/data";
import { getCompletedLessons, getLessonQuizScores } from "@/lib/supabase";

export function ProgressTracker() {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getCompletedLessons(), getLessonQuizScores()]).then(([slugs, scores]) => {
      if (active) {
        setCompletedSlugs(slugs);
        setQuizScores(scores);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  const completedCount = lessons.filter((lesson) => completedSlugs.includes(lesson.slug)).length;
  const percentage = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <>
      <div className="mt-6 rounded-2xl bg-violet-50 p-5 dark:bg-violet-950/25">
        <div className="flex items-end justify-between gap-3">
          <div><p className="text-sm font-medium text-slate-600 dark:text-slate-300">Course completion</p><p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">{isLoading ? "—" : `${percentage}%`}</p></div>
          <p className="text-sm font-semibold text-violet-700 dark:text-violet-200">{completedCount} / {lessons.length} lessons</p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white dark:bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all" style={{ width: `${percentage}%` }} /></div>
      </div>

      <div className="mt-8 space-y-3">
        {isLoading ? <p role="status" className="flex items-center gap-2 text-sm text-slate-500"><LoaderCircle size={16} className="animate-spin" /> Loading your progress...</p> : lessons.map((lesson) => {
          const complete = completedSlugs.includes(lesson.slug);
          return (
            <Link key={lesson.slug} href={`/learn/${lesson.slug}`} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-violet-200 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-violet-800">
              <span className="flex min-w-0 items-center gap-3">
                {complete ? <CheckCircle2 size={19} className="shrink-0 text-emerald-600" /> : <Circle size={19} className="shrink-0 text-slate-400" />}
                <span className="truncate font-medium text-slate-700 dark:text-slate-200">{lesson.title}</span>
              </span>
              <span className="shrink-0 text-right">
                <span className={`block text-xs font-semibold uppercase tracking-widest ${complete ? "text-emerald-700 dark:text-emerald-300" : "text-slate-500 dark:text-slate-400"}`}>{complete ? "Completed" : "Not started"}</span>
                {typeof quizScores[lesson.slug] === "number" && <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Quiz {quizScores[lesson.slug]}/10</span>}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

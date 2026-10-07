"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpenText, CircleHelp, Target } from "lucide-react";
import { DashboardCard } from "@/components/dashboard-card";
import { ProgressTracker } from "@/components/progress-tracker";
import { lessons } from "@/lib/data";
import { getCompletedLessons, getProfile, getQuizAttempts, ProfileData, QuizAttempt } from "@/lib/supabase";

export default function DashboardPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getQuizAttempts(), getCompletedLessons(), getProfile()]).then(([quizResults, completed, userProfile]) => {
      if (!active) return;
      setAttempts(quizResults);
      setCompletedSlugs(completed);
      setProfile(userProfile);
      setIsLoading(false);
    }).catch(() => {
      if (active) setIsLoading(false);
    });
    return () => { active = false; };
  }, []);

  const completedCount = useMemo(() => lessons.filter((lesson) => completedSlugs.includes(lesson.slug)).length, [completedSlugs]);
  const completion = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;
  const averageScore = attempts.length
    ? Math.round(attempts.reduce((sum, attempt) => sum + (attempt.total ? attempt.score / attempt.total : 0), 0) / attempts.length * 100)
    : 0;
  const displayName = profile?.full_name.trim().split(/\s+/)[0] || "there";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Your dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Welcome back, {displayName}</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your learning journey, all in one place.</p>
        </div>
        <Link href="/learn" className="inline-flex items-center gap-2 self-start rounded-full bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 sm:self-auto">Explore lessons <ArrowRight size={16} /></Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Quizzes completed" value={isLoading ? "—" : String(attempts.length)} detail={attempts.length ? "Saved quiz attempts" : "Take a quiz to begin"} tone="violet" />
        <DashboardCard title="Lessons completed" value={isLoading ? "—" : String(completedCount)} detail={`${lessons.length} lessons in the library`} tone="emerald" />
        <DashboardCard title="Learning progress" value={isLoading ? "—" : `${completion}%`} detail="Based on completed lessons" tone="sky" />
        <DashboardCard title="Average quiz score" value={isLoading ? "—" : `${averageScore}%`} detail={attempts.length ? "Across saved attempts" : "Your first score is waiting"} tone="amber" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent quiz results</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your latest saved attempts.</p></div>
            <CircleHelp className="text-violet-500" size={21} />
          </div>
          {isLoading ? <p role="status" className="text-sm text-slate-500">Loading your activity...</p> : attempts.length ? <div className="space-y-3">
            {attempts.slice(0, 5).map((attempt, index) => {
              const percent = attempt.total ? Math.round(attempt.score / attempt.total * 100) : 0;
              return <div key={`${attempt.created_at}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4"><span className="font-semibold text-slate-800 dark:text-slate-100">{attempt.score} / {attempt.total} correct</span><span className="text-sm font-bold text-violet-700 dark:text-violet-200">{percent}%</span></div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500" style={{ width: `${percent}%` }} /></div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{new Date(attempt.created_at).toLocaleDateString()}</p>
              </div>;
            })}
          </div> : <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700"><p className="text-sm text-slate-600 dark:text-slate-300">No quiz results yet. Take a quick quiz and your score will appear here.</p><Link href="/quiz" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-300">Start a quiz <ArrowRight size={15} /></Link></div>}
        </section>

        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Your learning path</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Pick up where you left off.</p></div><BookOpenText className="text-emerald-500" size={21} /></div>
          <ProgressTracker />
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Target size={15} /> {completedCount} of {lessons.length} lessons complete</div>
        </section>
      </div>
    </div>
  );
}

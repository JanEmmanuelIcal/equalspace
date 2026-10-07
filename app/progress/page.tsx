import { ProgressTracker } from "@/components/progress-tracker";

export const metadata = {
  title: "Progress | EqualSpace",
  description: "Track your completed lessons and learning progress on EqualSpace."
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Your learning progress</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Progress tracker</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Every lesson you complete is saved to your learning path.</p>
        <ProgressTracker />
      </div>
    </div>
  );
}

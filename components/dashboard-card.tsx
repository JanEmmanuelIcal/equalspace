import { ArrowUpRight } from "lucide-react";

type CardProps = {
  title: string;
  value: string;
  detail: string;
  tone?: "violet" | "emerald" | "sky" | "amber";
};

const tones = {
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-200",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-200",
  sky: "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-200",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-200"
};

export function DashboardCard({ title, value, detail, tone = "violet" }: CardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-2 ${tones[tone]}`}>
          <ArrowUpRight size={16} />
        </div>
        <span className="text-xs uppercase tracking-[0.12em] text-slate-400">Overview</span>
      </div>
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p>
      <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">{detail}</p>
    </div>
  );
}

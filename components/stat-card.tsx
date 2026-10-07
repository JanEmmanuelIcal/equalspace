type StatProps = {
  label: string;
  value: string;
  note: string;
};

export function StatCard({ label, value, note }: StatProps) {
  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p>
      <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300">{note}</p>
    </div>
  );
}

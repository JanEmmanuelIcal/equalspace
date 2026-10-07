export default function AdminLawsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Resources</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Laws & resources</h1>
        <div className="mt-6 space-y-3">
          {[
            "Magna Carta of Women",
            "Anti-Sexual Harassment Act",
            "Safe Spaces Act",
            "Labor Code principles"
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

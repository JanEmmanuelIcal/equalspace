import { LawCard } from "@/components/law-card";
import { lawResources } from "@/lib/data";

export const metadata = {
  title: "Laws & Resources | EqualSpace",
  description: "Official Philippine legal and institutional resources related to gender equality, discrimination, and protection."
};

export default function LawsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Know your rights</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Laws, policies, and official resources</h1>
          </div>
          <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            Educational information only. This section is not a substitute for professional legal advice.
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {lawResources.map((law) => (
            <LawCard key={law.id} law={law} />
          ))}
        </div>
      </div>
    </div>
  );
}

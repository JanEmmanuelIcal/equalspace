import { LawCard } from "@/components/law-card";
import { lawResources } from "@/lib/data";
import { ArrowUpRight, Landmark, Scale } from "lucide-react";

export const metadata = {
  title: "Laws & Resources | EqualSpace",
  description: "Official Philippine legal and institutional resources related to gender equality, discrimination, and protection."
};

export default function LawsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[36px] bg-[#171329] px-6 py-9 text-white shadow-[0_28px_80px_rgba(35,26,76,0.18)] sm:px-10 sm:py-12">
        <div aria-hidden="true" className="absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/10 bg-violet-400/10" />
        <div aria-hidden="true" className="absolute -bottom-44 right-36 h-96 w-96 rounded-full border border-white/10" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-200">
              <Scale size={14} aria-hidden="true" /> Know your rights
            </p>
            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">Laws that make room for equality.</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Explore Philippine laws and primary legal texts on women&apos;s rights, safer spaces, harassment, and fair work.
            </p>
            <a href="#resources" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-violet-950 transition hover:bg-violet-100">
              Explore legal resources <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hidden h-40 w-40 items-center justify-center rounded-[42px] border border-white/10 bg-white/5 text-violet-200 shadow-inner lg:flex">
            <Landmark size={76} strokeWidth={1.1} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="resources" className="mt-10 scroll-mt-24">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">Primary references</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Philippine legal resources</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">
            Links open the law text at The LawPhil Project. This is educational information, not legal advice.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {lawResources.map((law) => (
            <LawCard key={law.id} law={law} />
          ))}
        </div>
      </section>
    </div>
  );
}

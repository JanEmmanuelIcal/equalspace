"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { stereotypeCategories, stereotypeExamples } from "@/lib/stereotypes";

const cardAccents = [
  "from-violet-50 to-white dark:from-violet-950/35 dark:to-slate-900",
  "from-sky-50 to-white dark:from-sky-950/30 dark:to-slate-900",
  "from-rose-50 to-white dark:from-rose-950/25 dark:to-slate-900",
  "from-emerald-50 to-white dark:from-emerald-950/25 dark:to-slate-900"
];

export function StereotypeLibrary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All examples");
  const filteredExamples = useMemo(() => {
    const query = search.trim().toLowerCase();
    return stereotypeExamples.filter((example) => {
      const categoryMatches = activeCategory === "All examples" || example.category === activeCategory;
      const queryMatches = !query || `${example.statement} ${example.perspective} ${example.category}`.toLowerCase().includes(query);
      return categoryMatches && queryMatches;
    });
  }, [activeCategory, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[36px] border border-violet-200/80 bg-linear-to-br from-violet-700 via-indigo-700 to-slate-900 px-6 py-10 text-white shadow-[0_24px_80px_rgba(79,70,229,0.24)] sm:px-10 sm:py-14 dark:border-violet-900">
        <div aria-hidden="true" className="absolute -right-16 -top-24 h-80 w-80 rounded-full border border-white/10 bg-white/5 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-violet-100"><Sparkles size={14} /> A collection of common assumptions</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">Explore stereotypes.<br /><span className="text-violet-200">Question the script.</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">Browse {stereotypeExamples.length} examples of gender stereotypes across school, work, family, interests, and everyday life. These statements are examples of biased assumptions—not facts.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{stereotypeCategories.length} topics</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{stereotypeExamples.length} examples</span>
            <Link href="/learn/what-are-gender-stereotypes" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-violet-800 transition hover:-translate-y-0.5">Learn the basics <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section aria-label="Browse stereotype examples" className="mt-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">Browse the collection</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Everyday assumptions, unpacked</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Choose a topic or search for a phrase. Each card pairs a familiar stereotype with a more thoughtful perspective.</p>
          </div>
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search stereotype examples</span>
            <Search aria-hidden="true" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search examples or topics" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
          </label>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter examples by topic">
          {["All examples", ...stereotypeCategories].map((category) => (
            <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-950/40" : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-violet-200"}`}>
              {category}
            </button>
          ))}
        </div>

        <p role="status" aria-live="polite" className="mt-3 text-sm text-slate-500 dark:text-slate-400">Showing {filteredExamples.length} of {stereotypeExamples.length} examples</p>

        {filteredExamples.length ? <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredExamples.map((example, index) => (
            <article key={example.id} className={`group relative flex min-h-64 flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-linear-to-br ${cardAccents[index % cardAccents.length]} p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800`}>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-800 shadow-sm dark:border-white/10 dark:bg-slate-950/50 dark:text-violet-200">{example.category}</span>
              <div className="mt-5 flex flex-1 flex-col">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-rose-700 dark:text-rose-300">The stereotype</p>
                <h3 className="mt-2 text-lg font-bold leading-7 text-slate-900 dark:text-white">“{example.statement}”</h3>
                <div className="mt-5 border-t border-slate-200/80 pt-4 dark:border-slate-700">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">A wider perspective</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{example.perspective}</p>
                </div>
              </div>
            </article>
          ))}
        </div> : <div className="mt-5 rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/70">
          <p className="text-lg font-bold text-slate-800 dark:text-white">No examples found</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Try another phrase or select a different topic.</p>
          <button type="button" onClick={() => { setSearch(""); setActiveCategory("All examples"); }} className="mt-5 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white">Show all examples</button>
        </div>}
      </section>
    </div>
  );
}

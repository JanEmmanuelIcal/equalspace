"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpenText, CircleHelp, Landmark, MessageSquareText, ShieldCheck, Users } from "lucide-react";
import { FeatureCard } from "@/components/feature-card";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { lawResources, lessons } from "@/lib/data";
import { stereotypeCategories, stereotypeExamples } from "@/lib/stereotypes";
import { useState } from "react";

const featureCards = [
  { icon: <CircleHelp size={18} />, title: "Spot the Stereotype", description: "Test your knowledge and notice how assumptions shape everyday decisions.", href: "/quiz" },
  { icon: <Users size={18} />, title: "What Do People Think?", description: "Explore public perception and learn how opinions change across communities.", href: "/polls" },
  { icon: <MessageSquareText size={18} />, title: "Real Experiences", description: "Read stories about how stereotypes show up in real life and relationships.", href: "/stories" },
  { icon: <BookOpenText size={18} />, title: "Learn", description: "Understand the roots of stereotypes and the power of inclusive thinking.", href: "/learn" },
  { icon: <Landmark size={18} />, title: "Know Your Rights", description: "Explore legal resources and official guidance on fairness, protection, and equality.", href: "/laws" }
];

const statBlocks = [
  { label: "Learning modules", value: String(lessons.length), note: "Short lessons covering equality, roles, work, and communication." },
  { label: "Legal resources", value: String(lawResources.length), note: "References for exploring rights and protections." },
  { label: "Stereotype examples", value: String(stereotypeExamples.length), note: `Across ${stereotypeCategories.length} parts of everyday life.` },
  { label: "Start anywhere", value: "1 step", note: "Small shifts in thinking can create larger social change." }
];

const previewOptions = ["Stereotype", "Fact", "Not sure"] as const;

export default function HomePage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-linear-to-b from-[#faf9ff] via-[#f7f4ff] to-[#f1edff] dark:from-[#100e1b] dark:via-[#12101f] dark:to-[#171325]">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative isolate grid items-center gap-8 overflow-hidden rounded-[36px] border border-violet-950 bg-[#171329] p-6 text-white shadow-[0_28px_90px_rgba(35,26,76,0.2)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12"
        >
          <div aria-hidden="true" className="absolute -right-28 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full border border-white/10 bg-violet-500/10 blur-[1px]" />
          <div aria-hidden="true" className="absolute -bottom-72 left-[38%] -z-10 h-[34rem] w-[34rem] rounded-full border border-fuchsia-200/10" />
          <div className="relative z-10">
            <p className="mb-5 inline-flex items-center rounded-full border border-violet-200/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200">
              Learn with clarity and empathy
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl lg:text-[4.4rem]">
              Make room for
              <span className="block bg-gradient-to-r from-violet-200 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent">every possibility.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Challenge stereotypes, explore lived experiences, and learn how fairness can shape a more inclusive everyday life.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/learn" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-bold text-violet-950 shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-violet-100">
                Start learning <ArrowRight size={18} />
              </Link>
              <Link href="/stereotypes" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-white/30 hover:bg-white/10">
                Explore stereotypes
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs font-medium text-slate-300">
              <span className="inline-flex items-center gap-2"><BookOpenText size={15} className="text-violet-300" /> {lessons.length} guided lessons</span>
              <span className="inline-flex items-center gap-2"><CircleHelp size={15} className="text-sky-300" /> Quick, thoughtful quizzes</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-emerald-300" /> Trusted resources</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10"
          >
            <div className="relative rounded-[32px] border border-white/50 bg-gradient-to-br from-violet-100 via-sky-50 to-emerald-50 p-3 shadow-[0_25px_70px_rgba(5,4,20,0.35)] sm:p-4">
              <Image src="/images/hero/group-learning.svg" width={640} height={480} alt="A diverse group learning together" className="relative mx-auto h-auto w-full rounded-[24px] drop-shadow-sm" priority />
              <div className="absolute -bottom-4 -left-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">A better perspective</p>
                <p className="mt-1 text-sm font-bold text-slate-900">Starts with a question.</p>
              </div>
              <div className="absolute -right-2 top-5 rounded-full border border-white/70 bg-white/90 px-3 py-2 text-xs font-bold text-emerald-800 shadow-lg sm:-right-5">
                Built on respect <span aria-hidden="true">✦</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Our approach"
            title="Explore our features"
            description="From reflection to action, EqualSpace helps people recognize bias, learn new perspectives, and build healthier communities."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <FeatureCard {...card} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-center rounded-[30px] bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 p-6 dark:from-violet-950/30 dark:via-slate-900 dark:to-emerald-950/20">
            <Image src="/images/illustrations/community.svg" width={560} height={420} alt="People connecting and supporting their community" className="h-auto w-full max-w-[420px] drop-shadow-sm" />
          </div>

          <div>
            <SectionHeading
              eyebrow="Why this matters"
              title="Gender stereotypes quietly shape what people believe is possible."
              description="When we treat traits, roles, and ambitions as if they are naturally tied to gender, we can limit opportunities, reinforce unfair expectations, and silence the potential of individuals and communities."
            />
            <div className="mt-8 space-y-4">
              {[
                "Stereotypes can influence how people are encouraged in school and at work.",
                "They can discourage expression, confidence, and leadership.",
                "Recognizing them helps create more respectful, open, and inclusive spaces."
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-200">
                    <ShieldCheck size={14} />
                  </div>
                  <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SectionHeading eyebrow="Interactive preview" title="Spot the stereotype" />
            <div className="mt-6 rounded-[24px] border border-violet-100 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/20">
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                “Girls are naturally better at taking care of children.”
              </p>
              <div className="mt-5 grid gap-3">
                {previewOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelected(option)}
                    className={`rounded-full border px-4 py-3 text-left text-sm font-medium transition ${
                      selected === option
                        ? "border-violet-500 bg-violet-600 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {selected
                ? "This is a stereotype because caregiving is a role people can learn and share, not an innate trait assigned by gender."
                : "Choose an answer to explore the reasoning behind the statement."}
            </p>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SectionHeading eyebrow="What you can explore" title="A thoughtful place to start" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {statBlocks.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} note={stat.note} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[36px] border border-violet-200 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-500 p-8 text-white shadow-[0_25px_80px_rgba(79,70,229,0.35)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-100">Take action</p>
              <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
                Small changes in thinking can create bigger changes in society.
              </h2>
            </div>
            <Link href="/learn" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-semibold text-violet-700 transition hover:-translate-y-0.5">
              Start Exploring
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

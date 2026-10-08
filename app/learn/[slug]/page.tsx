import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenText, CheckCircle2, Quote } from "lucide-react";
import { lessons, lessonQuizQuestions } from "@/lib/data";
import { LessonProgressButton } from "@/components/lesson-progress-button";
import { LessonQuiz } from "@/components/lesson-quiz";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons.find((item) => item.slug === slug);

  if (!lesson) {
    return { title: "Lesson Not Found | EqualSpace" };
  }

  return {
    title: `${lesson.title} | EqualSpace`,
    description: lesson.excerpt
  };
}

export default async function LessonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons.find((item) => item.slug === slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/learn" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-300">
        <ArrowLeft size={16} /> Back to learning center
      </Link>

      <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-violet-100 via-sky-100 to-emerald-100 dark:from-violet-950/40 dark:via-sky-950/40 dark:to-emerald-950/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.8),_transparent_32%)]" />
          <div className="absolute left-8 top-8 rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
            {lesson.category}
          </div>
          <div className="absolute bottom-8 left-8 h-16 w-16 rounded-2xl bg-white/70 shadow-sm" />
          <div className="absolute bottom-10 right-12 h-20 w-20 rounded-full bg-violet-200/70 blur-2xl" />
        </div>

        <div className="space-y-6 p-5 lg:p-8">
          <header>
            <div className="mb-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2"><BookOpenText size={14} /> {lesson.difficulty}</span>
              <span>{lesson.readTime}</span>
              <span>{lesson.source}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">{lesson.title}</h1>
          </header>

          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{lesson.excerpt}</p>

          <Link href="#lesson-quiz" className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-800 transition hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-200 dark:hover:bg-violet-950/70">
            Finish with a 10-question, 5-stage quiz <span aria-hidden="true">↓</span>
          </Link>

          <div className="space-y-6">
            {lesson.content.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{section.heading}</h2>
                <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{section.text}</p>
                {section.bullets && (
                  <ul className="space-y-2 text-base leading-7 text-slate-600 dark:text-slate-300">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <CheckCircle2 size={18} className="mt-1 shrink-0 text-violet-600 dark:text-violet-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="rounded-[24px] border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/20">
            <div className="mb-2 flex items-center gap-2 text-violet-700 dark:text-violet-200">
              <Quote size={18} />
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">Think about it</span>
            </div>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-200">
              What beliefs about gender do we pass on without questioning them? Which expectations are shaped by culture, media, or family—and which of them should be challenged?
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Key facts</h3>
            <ul className="space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {lesson.facts.map((fact) => (
                <li key={fact} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-500" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          <LessonQuiz lessonTitle={lesson.title} lessonSlug={lesson.slug} questions={lessonQuizQuestions[lesson.slug] || []} />

          <div>
            <LessonProgressButton slug={lesson.slug} />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Related lessons</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {lesson.related.map((slugName) => {
                const related = lessons.find((item) => item.slug === slugName);
                if (!related) return null;
                return (
                  <Link key={related.slug} href={`/learn/${related.slug}`} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-violet-300 hover:text-violet-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-800">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{related.category}</p>
                    <p className="mt-2 font-semibold text-slate-800 dark:text-white">{related.title}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

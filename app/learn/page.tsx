import { lessons } from "@/lib/data";
import { LessonCard } from "@/components/lesson-card";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";

export const metadata = {
  title: "Learn | EqualSpace",
  description: "Explore lessons on gender stereotypes, equality, roles, education, workplace bias, and inclusive communication."
};

export default async function LearnPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const search = (await searchParams).search?.trim() || "";
  const query = search.toLowerCase();
  const filteredLessons = query
    ? lessons.filter((lesson) => `${lesson.title} ${lesson.category} ${lesson.excerpt}`.toLowerCase().includes(query))
    : lessons;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <SectionHeading
          eyebrow="Learning center"
          title="Learn with clarity and empathy"
          description="Explore accessible lessons on stereotypes, equality, inclusion, and the social systems that shape everyday life."
        />

        {search && <div role="status" className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-violet-50 px-4 py-3 text-sm text-violet-800 dark:bg-violet-950/30 dark:text-violet-200">
          <span>{filteredLessons.length} {filteredLessons.length === 1 ? "lesson" : "lessons"} matching “{search}”</span>
          <Link href="/learn" className="font-semibold underline underline-offset-4">Clear search</Link>
        </div>}

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          {[
            "Gender Stereotypes",
            "Gender Equality",
            "Gender Roles",
            "Education",
            "Workplace",
            "Inclusive Communication"
          ].map((category) => (
            <span key={category} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredLessons.map((lesson) => (
          <LessonCard key={lesson.slug} lesson={lesson} />
        ))}
        {filteredLessons.length === 0 && <p className="rounded-3xl border border-dashed border-slate-300 p-8 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">No lessons matched that search. Try a broader topic such as equality, education, or workplace.</p>}
      </div>
    </div>
  );
}

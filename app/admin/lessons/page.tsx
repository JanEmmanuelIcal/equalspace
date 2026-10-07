export default function AdminLessonsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Content management</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Lessons</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "What Are Gender Stereotypes?",
            "How Are Gender Roles Formed?",
            "What Does Gender Equality Mean?",
            "Inclusive Language"
          ].map((lesson) => (
            <div key={lesson} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              {lesson}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

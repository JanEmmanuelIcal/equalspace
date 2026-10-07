"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { getCompletedLessons, markLessonComplete } from "@/lib/supabase";

export function LessonProgressButton({ slug }: { slug: string }) {
  const [completed, setCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    getCompletedLessons().then((lessons) => {
      if (active) setCompleted(lessons.includes(slug));
    });
    return () => { active = false; };
  }, [slug]);

  const handleComplete = async () => {
    if (completed || isSaving) return;
    setIsSaving(true);
    setMessage("");
    try {
      const result = await markLessonComplete(slug);
      setMessage(result.message);
      if (result.ok) setCompleted(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={handleComplete} disabled={completed || isSaving} className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-default disabled:opacity-75 dark:shadow-violet-950/40">
        {completed ? <CheckCircle2 size={17} /> : <Circle size={17} />}
        {isSaving ? "Saving..." : completed ? "Lesson completed" : "Mark lesson complete"}
      </button>
      {message && <span role="status" className="text-sm text-slate-500 dark:text-slate-400">{message}</span>}
    </div>
  );
}

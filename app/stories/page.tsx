"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { stories, StoryItem } from "@/lib/data";
import { StoryCard } from "@/components/story-card";
import { getApprovedStories, isSupabaseConfigured, StoryEntry, submitStoryEntry } from "@/lib/supabase";

export default function StoriesPage() {
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Education");
  const [author, setAuthor] = useState("Anonymous");
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingStories, setIsLoadingStories] = useState(true);
  const [publicStories, setPublicStories] = useState<StoryItem[]>([]);

  const fetchStories = useCallback(async (): Promise<StoryItem[]> => {
    const entries = await getApprovedStories();
    if (entries) {
      return entries.map((story: StoryEntry) => ({
        id: story.id,
        title: story.title,
        category: story.category,
        body: story.body,
        author: story.author,
        status: story.status,
        date: new Date(story.created_at).toLocaleDateString()
      }));
    }
    return stories.filter((story) => story.status === "Approved");
  }, []);

  useEffect(() => {
    let active = true;
    fetchStories().then((loadedStories) => {
      if (!active) return;
      setPublicStories(loadedStories);
      setIsLoadingStories(false);
    });
    return () => { active = false; };
  }, [fetchStories]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await submitStoryEntry({ title: `Story: ${category}`, body, category, author });
      setStatus({ ok: result.ok, message: result.message });
      if (result.ok) {
        setBody("");
        setCategory("Education");
        setAuthor("Anonymous");
        setPublicStories(await fetchStories());
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Anonymous experiences</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Share your story, safely and respectfully</h1>
          </div>
          <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            Please do not include personally identifying information.
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <form onSubmit={handleSubmit} className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <label htmlFor="story-body" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Story</label>
            <textarea
              id="story-body"
              rows={6}
              maxLength={5000}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              placeholder="I was told that..."
              required
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="story-category" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Category</label>
                <select
                  id="story-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option>Education</option>
                  <option>Workplace</option>
                  <option>Family</option>
                  <option>Sports</option>
                  <option>Media</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="story-author" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Display name</label>
                <input
                  id="story-author"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  placeholder="Anonymous"
                  maxLength={80}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                />
              </div>
            </div>

            {status && (
              <p className={`mt-4 text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-violet-950/40"
            >
              {isSubmitting ? "Submitting..." : "Submit experience"}
            </button>
          </form>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {isSupabaseConfigured ? "Community stories" : "Community stories · sample preview"}
            </p>
            {isLoadingStories ? <p role="status" className="text-sm text-slate-500">Loading stories...</p> : publicStories.length ? publicStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            )) : <p className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm text-slate-500 dark:border-slate-700">No approved stories yet. Be the first to share an experience.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

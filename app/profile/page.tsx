"use client";

import { FormEvent, useEffect, useState } from "react";
import { getProfile, ProfileData, saveProfile } from "@/lib/supabase";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({ full_name: "", bio: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    let active = true;
    getProfile().then((result) => {
      if (active && result) setProfile(result);
      if (active) setIsLoading(false);
    });
    return () => { active = false; };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus(null);
    try {
      const result = await saveProfile(profile);
      setStatus(result);
    } finally {
      setIsSaving(false);
    }
  };

  const initial = profile.full_name.trim().charAt(0).toUpperCase() || "E";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <div className="mb-8 flex items-center gap-4">
          <div aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-xl font-black text-white">{initial}</div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Account profile</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Update your personal settings and preferences.</p>
          </div>
        </div>

        {isLoading ? <p role="status" className="text-sm text-slate-500">Loading your profile...</p> : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="profile-name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Display name</label>
              <input id="profile-name" value={profile.full_name} onChange={(event) => setProfile((value) => ({ ...value, full_name: event.target.value }))} maxLength={80} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950" />
            </div>
            <div>
              <label htmlFor="profile-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
              <input id="profile-email" value={profile.email} type="email" readOnly className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-3 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400" />
              <p className="mt-1 text-xs text-slate-500">Email changes are managed by your sign-in provider.</p>
            </div>
            <div>
              <label htmlFor="profile-bio" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">About you</label>
              <textarea id="profile-bio" rows={4} maxLength={500} value={profile.bio} onChange={(event) => setProfile((value) => ({ ...value, bio: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950" placeholder="What topics are you interested in?" />
              <p className="mt-1 text-right text-xs text-slate-500">{profile.bio.length}/500</p>
            </div>
            {status && <p role="status" className={`text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>{status.message}</p>}
            <button disabled={isSaving} className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-violet-950/40">
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

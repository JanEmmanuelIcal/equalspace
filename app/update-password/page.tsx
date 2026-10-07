"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { updatePassword } from "@/lib/supabase";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmation) {
      setStatus({ ok: false, message: "Your passwords do not match." });
      return;
    }
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await updatePassword(password);
      setStatus(result);
      if (result.ok) {
        setPassword("");
        setConfirmation("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-center text-3xl font-black text-slate-900 dark:text-white">Choose a new password</h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">Use at least 8 characters to secure your account.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="new-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">New password</label>
            <input id="new-password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950" />
          </div>
          <div>
            <label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Confirm password</label>
            <input id="confirm-password" type="password" autoComplete="new-password" minLength={8} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950" />
          </div>
          {status && <p role="status" className={`text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>{status.message}</p>}
          <button disabled={isSubmitting} className="w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 disabled:opacity-60 dark:shadow-violet-950/40">
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">Back to <Link href="/login" className="font-semibold text-violet-600 dark:text-violet-300">log in</Link></p>
      </div>
    </div>
  );
}

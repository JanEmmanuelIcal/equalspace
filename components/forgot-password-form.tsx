"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { requestPasswordReset } from "@/lib/supabase";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await requestPasswordReset(email);
      setStatus(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-center text-3xl font-black text-slate-900 dark:text-white">Reset password</h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">Enter your email and we will send a password reset link.</p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="reset-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
            <input id="reset-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950" placeholder="you@example.com" />
          </div>
          {status && <p role={status.ok ? "status" : "alert"} className={`text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>{status.message}</p>}
          <button disabled={isSubmitting} className="w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 disabled:opacity-60 dark:shadow-violet-950/40">
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
          Remembered your password? <Link href="/login" className="font-semibold text-violet-600 dark:text-violet-300">Log in</Link>
        </p>
      </div>
    </div>
  );
}

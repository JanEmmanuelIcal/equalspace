"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { registerWithEmail } from "@/lib/supabase";

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!fullName.trim() || !email.trim() || !password || !confirmation) {
      setStatus({ ok: false, message: "Complete all fields to create your account." });
      return;
    }
    if (password !== confirmation) {
      setStatus({ ok: false, message: "Your passwords do not match." });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerWithEmail(email, password, fullName);
      setStatus(result);
      if (result.ok) {
        setPassword("");
        setConfirmation("");
        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-black text-white">E</div>
        </div>
        <h1 className="text-center text-3xl font-black text-slate-900 dark:text-white">Create your account</h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">Join EqualSpace with your email and password.</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="register-name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Full name</label>
            <input
              id="register-name"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="register-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</label>
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
              placeholder="At least 8 characters"
              required
            />
          </div>
          <div>
            <label htmlFor="register-confirm-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Confirm password</label>
            <input
              id="register-confirm-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Re-enter your password"
              required
            />
          </div>

          {status && (
            <p role={status.ok ? "status" : "alert"} className={`text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-violet-950/40"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-violet-600 dark:text-violet-300">Log in</Link>
        </p>
      </div>
    </div>
  );
}

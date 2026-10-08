"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { requestAccountCreationOtp, resendAccountCreationOtp, verifyAccountCreationOtp } from "@/lib/supabase";

export function EmailOtpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await requestAccountCreationOtp(email, password, fullName);
      setStatus(result);
      if (result.ok) {
        setCodeSent(true);
        setToken("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await verifyAccountCreationOtp(email, token);
      setStatus(result);
      if (result.ok) {
        setPassword("");
        setAccountCreated(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await resendAccountCreationOtp(email);
      setStatus(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeEmail = () => {
    setCodeSent(false);
    setToken("");
    setAccountCreated(false);
    setStatus(null);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-black text-white">E</div>
        </div>
        <h1 className="text-center text-3xl font-black text-slate-900 dark:text-white">
          {accountCreated ? "Your account is ready" : codeSent ? "Check your email" : "Create your account"}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
          {accountCreated
            ? "Your email is confirmed. Log in with your email and password."
            : codeSent
            ? `Enter the 6-digit code sent to ${email.trim()}.`
            : "Join EqualSpace. You’ll use your password to log in after confirming your email."}
        </p>

        {accountCreated ? (
          <div className="mt-5 space-y-4">
            {status && <p role="status" className="text-center text-sm text-emerald-600 dark:text-emerald-300">{status.message}</p>}
            <Link href="/login" className="block w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-center font-semibold text-white shadow-lg shadow-violet-200 dark:shadow-violet-950/40">
              Log in
            </Link>
          </div>
        ) : codeSent ? (
          <form onSubmit={handleVerifyCode} className="mt-5 space-y-4">
            <div>
              <label htmlFor="email-otp" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email code</label>
              <input
                id="email-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={token}
                onChange={(event) => setToken(event.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-lg tracking-[0.35em] outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
                placeholder="123456"
                aria-describedby="email-otp-help"
                required
              />
              <p id="email-otp-help" className="mt-2 text-xs text-slate-500 dark:text-slate-400">The code is valid for a limited time.</p>
            </div>

            {status && (
              <p role="status" className={`text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || token.length !== 6}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-violet-950/40"
            >
              {isSubmitting ? "Verifying..." : "Confirm email"}
            </button>

            <div className="flex items-center justify-between text-sm">
              <button type="button" onClick={handleChangeEmail} className="text-violet-600 dark:text-violet-300">Change email</button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleResendCode}
                className="text-violet-600 disabled:cursor-not-allowed disabled:opacity-60 dark:text-violet-300"
              >
                Resend code
              </button>
            </div>
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              No email? Check spam. Supabase&apos;s default mail service only sends to project team addresses; use custom SMTP for other recipients.
            </p>
          </form>
        ) : (
          <form onSubmit={handleRequestCode} className="mt-5 space-y-4">
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
              <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Create password</label>
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
              <label htmlFor="email-otp-address" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
              <input
                id="email-otp-address"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
                placeholder="you@example.com"
                required
              />
            </div>

            {status && (
              <p role="status" className={`text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-violet-950/40"
            >
              {isSubmitting ? "Creating account..." : "Create account and send code"}
            </button>
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              Confirmation emails require Supabase&apos;s Confirm signup template to include <code>{"{{ .Token }}"}</code>. The default mail service only sends to project team addresses.
            </p>
          </form>
        )}

        {!codeSent && !accountCreated && (
          <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-violet-600 dark:text-violet-300">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

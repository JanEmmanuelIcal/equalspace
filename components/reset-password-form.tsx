"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { supabase, updatePassword } from "@/lib/supabase";

type RecoveryState = "checking" | "ready" | "invalid";

function hasRecoveryCallback() {
  const query = new URLSearchParams(window.location.search);
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  return Boolean(query.get("code") || query.get("token_hash") || query.get("type") === "recovery" || fragment.get("type") === "recovery");
}

const recoveryCallbackAtModuleLoad = typeof window !== "undefined" && hasRecoveryCallback();

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoveryState, setRecoveryState] = useState<RecoveryState>(supabase ? "checking" : "invalid");

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    let recoveryDetected = false;
    const recoveryCallbackPresent = recoveryCallbackAtModuleLoad || hasRecoveryCallback();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        recoveryDetected = true;
        if (active) setRecoveryState("ready");
      } else if (event === "INITIAL_SESSION" && session && recoveryCallbackPresent) {
        recoveryDetected = true;
        if (active) setRecoveryState("ready");
      }
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      const isValidRecoverySession = !error && Boolean(data.session) && (recoveryDetected || recoveryCallbackPresent);
      setRecoveryState(isValidRecoverySession ? "ready" : "invalid");
    }).catch(() => {
      if (active) setRecoveryState("invalid");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!password || !confirmation) {
      setStatus({ ok: false, message: "Enter and confirm your new password." });
      return;
    }
    if (password.length < 8) {
      setStatus({ ok: false, message: "Choose a password with at least 8 characters." });
      return;
    }
    if (password !== confirmation) {
      setStatus({ ok: false, message: "Your passwords do not match." });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updatePassword(password);
      if (!result.ok) {
        setStatus(result);
        return;
      }

      setPassword("");
      setConfirmation("");
      setStatus({ ok: true, message: "Password updated successfully. Redirecting to login..." });
      if (supabase) {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) setStatus({ ok: true, message: "Password updated successfully. You can now log in with your new password." });
      }
      window.setTimeout(() => {
        router.replace("/login");
        router.refresh();
      }, 1600);
    } catch {
      setStatus({ ok: false, message: "We could not update your password. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-center text-3xl font-black text-slate-900 dark:text-white">Reset Password</h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
          {recoveryState === "ready"
            ? "Choose a new password for your account."
            : recoveryState === "checking"
              ? "Verifying your password reset link..."
              : "This password reset link is invalid or has expired. Request a new link to continue."}
        </p>

        {recoveryState === "ready" ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="new-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">New Password</label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
            <div>
              <label htmlFor="confirm-new-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Confirm New Password</label>
              <input
                id="confirm-new-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
            {status && <p role={status.ok ? "status" : "alert"} className={`text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>{status.message}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-violet-950/40">
              {isSubmitting ? "Changing password..." : "Change Password"}
            </button>
          </form>
        ) : (
          <div className="mt-5 space-y-4">
            {recoveryState === "invalid" && <p role="alert" className="text-center text-sm text-rose-600 dark:text-rose-300">Open the latest reset email on this device, or request a new link.</p>}
            <Link href={recoveryState === "invalid" ? "/forgot-password" : "/login"} className="block w-full rounded-full border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              {recoveryState === "invalid" ? "Request a new link" : "Back to login"}
            </Link>
          </div>
        )}

        {recoveryState === "ready" && <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">Back to <Link href="/login" className="font-semibold text-violet-600 dark:text-violet-300">log in</Link></p>}
      </div>
    </div>
  );
}

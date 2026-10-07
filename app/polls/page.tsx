"use client";

import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { pollResults as initialPollResults } from "@/lib/data";
import { getLocalPollCountsSnapshot, subscribeToLocalPollCounts, submitPollResponse } from "@/lib/supabase";

const colors = ["#8b5cf6", "#34d399", "#38bdf8"];

export default function PollsPage() {
  const [selectedChoice, setSelectedChoice] = useState("Yes");
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const localCountsSnapshot = useSyncExternalStore(subscribeToLocalPollCounts, getLocalPollCountsSnapshot, () => "{}");
  const [sessionVotes, setSessionVotes] = useState<Record<string, number>>({});
  const localCounts = useMemo(() => {
    try { return JSON.parse(localCountsSnapshot) as Record<string, number>; } catch { return {}; }
  }, [localCountsSnapshot]);
  const pollData = useMemo(() => initialPollResults.map((item) => ({
    ...item,
    value: item.value + (localCounts[item.label] || 0) + (sessionVotes[item.label] || 0)
  })), [localCounts, sessionVotes]);

  const total = useMemo(() => pollData.reduce((sum, item) => sum + item.value, 0), [pollData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await submitPollResponse(selectedChoice);
      setStatus({ ok: result.ok, message: result.message });

      if (result.ok) {
        if (result.mode === "supabase") setSessionVotes((current) => ({ ...current, [selectedChoice]: (current[selectedChoice] || 0) + 1 }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Gender perception poll</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Have you ever been told that a certain activity is not appropriate for your gender?</h1>

          <div className="mt-6 space-y-3">
            {["Yes", "No", "Not sure"].map((option) => (
              <label key={option} className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                <span className="text-base font-medium text-slate-700 dark:text-slate-200">{option}</span>
                <input
                  type="radio"
                  name="response"
                  value={option}
                  checked={selectedChoice === option}
                  onChange={() => setSelectedChoice(option)}
                  className="h-4 w-4 accent-violet-600"
                  aria-label={`Choose ${option}`}
                />
              </label>
            ))}
          </div>

          {status && (
            <p className={`mt-5 text-sm ${status.ok ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-violet-950/40"
          >
            {isSubmitting ? "Submitting..." : "Submit response"}
          </button>
        </form>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Current results</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pollData} dataKey="value" nameKey="label" innerRadius={50} outerRadius={90} paddingAngle={4}>
                  {pollData.map((entry, index) => (
                    <Cell key={entry.label} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 space-y-3">
            {pollData.map((item, index) => (
              <div key={item.label} className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                  {item.label}
                </div>
                <span className="font-semibold">{Math.round((item.value / total) * 100)}%</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Community snapshot · {total} responses shown</p>
        </div>
      </div>
    </div>
  );
}

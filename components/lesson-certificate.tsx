"use client";

import { Award, Printer, Sparkles } from "lucide-react";

export function LessonCertificate({
  lessonTitle,
  questionCount,
  learnerName,
  onLearnerNameChange
}: {
  lessonTitle: string;
  questionCount: number;
  learnerName: string;
  onLearnerNameChange: (name: string) => void;
}) {
  return (
    <div className="mt-7 rounded-[28px] border border-amber-200 bg-linear-to-br from-amber-50 via-white to-violet-50 p-4 text-left dark:border-amber-900/60 dark:from-amber-950/20 dark:via-slate-900 dark:to-violet-950/20 sm:p-6">
      <div className="certificate-screen-controls mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
            <Sparkles size={14} aria-hidden="true" /> A perfect score deserves a keepsake
          </p>
          <h4 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">Your topic certificate is ready</h4>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Personalize the name, then print or save it as a PDF.</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-60">
          <label htmlFor="certificate-name" className="text-xs font-semibold text-slate-700 dark:text-slate-200">Name on certificate</label>
          <input
            id="certificate-name"
            value={learnerName}
            maxLength={80}
            onChange={(event) => onLearnerNameChange(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
      </div>

      <article className="certificate-print-area" aria-label={`Certificate of mastery for ${lessonTitle}`}>
        <div className="certificate-paper">
          <div className="certificate-inner-border">
            <div className="certificate-emblem"><Award size={38} strokeWidth={1.5} aria-hidden="true" /></div>
            <p className="certificate-overline">EqualSpace learning series</p>
            <h3 className="certificate-title">Certificate of mastery</h3>
            <p className="certificate-copy">This certificate is proudly presented to</p>
            <p className="certificate-recipient">{learnerName.trim() || "EqualSpace Learner"}</p>
            <div className="certificate-rule" />
            <p className="certificate-copy">for achieving a perfect score and completing the topic</p>
            <p className="certificate-course">{lessonTitle}</p>
            <div className="certificate-details">
              <span>{questionCount} of {questionCount} correct · 100%</span>
              <span>{new Date().toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <div className="certificate-footer">
              <span className="certificate-signature">EqualSpace</span>
              <span className="certificate-seal">LEARN<br />WITH EMPATHY</span>
              <span className="certificate-signature">Keep growing</span>
            </div>
            <p className="certificate-note">Recognition of learning achievement · Not an accredited credential</p>
          </div>
        </div>
      </article>

      <div className="certificate-screen-controls mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Tip: choose “Save as PDF” in your print dialog to keep a digital copy.</p>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-800 dark:bg-white dark:text-slate-900 dark:hover:bg-violet-100"
        >
          <Printer size={16} aria-hidden="true" /> Print certificate
        </button>
      </div>
    </div>
  );
}

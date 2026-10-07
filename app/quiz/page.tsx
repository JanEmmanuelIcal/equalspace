"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { quizQuestions } from "@/lib/data";
import { saveQuizAttempt } from "@/lib/supabase";

export default function QuizPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isSavingResult, setIsSavingResult] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const currentQuestion = quizQuestions[questionIndex];
  const progress = ((questionIndex + (completed ? 1 : 0)) / quizQuestions.length) * 100;

  const answerState = useMemo(() => {
    if (!selected) return null;
    return selected === currentQuestion.answer ? "correct" : "incorrect";
  }, [currentQuestion.answer, selected]);

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === currentQuestion.answer) {
      setScore((value) => value + 1);
    }
  };

  const handleNext = async () => {
    if (questionIndex === quizQuestions.length - 1) {
      setIsSavingResult(true);
      try {
        const result = await saveQuizAttempt(score, quizQuestions.length);
        setSaveMessage(result.message);
      } finally {
        setIsSavingResult(false);
      }
      setCompleted(true);
      return;
    }

    setQuestionIndex((value) => value + 1);
    setSelected(null);
  };

  const handleReset = () => {
    setQuestionIndex(0);
    setSelected(null);
    setCompleted(false);
    setScore(0);
    setSaveMessage(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        {!completed ? (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Gender equality quiz</p>
                <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Question {questionIndex + 1}</h1>
              </div>
              <div className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700 dark:bg-violet-950/40 dark:text-violet-200">
                {questionIndex + 1} / {quizQuestions.length}
              </div>
            </div>

            <div className="mb-6 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all" style={{ width: `${progress}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.question}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {currentQuestion.category}
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-relaxed text-slate-900 dark:text-white">{currentQuestion.question}</h2>

                <div className="mt-6 grid gap-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selected === option;
                    const isCorrect = option === currentQuestion.answer;
                    const showCorrect = selected && isCorrect;
                    const showIncorrect = selected && isSelected && !isCorrect;

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        disabled={Boolean(selected)}
                        className={`rounded-2xl border px-4 py-3 text-left text-base font-medium transition ${
                          showCorrect
                            ? "border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
                            : showIncorrect
                              ? "border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950/30 dark:text-rose-100"
                              : isSelected
                                ? "border-violet-400 bg-violet-50 text-violet-800 dark:bg-violet-950/30 dark:text-violet-100"
                                : "border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {selected && (
                  <div className="mt-6 rounded-[20px] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                    <p className={`text-sm font-semibold ${answerState === "correct" ? "text-emerald-600" : "text-rose-600"}`}>
                      {answerState === "correct" ? "Correct answer" : "Not quite"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{currentQuestion.explanation}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Source: {currentQuestion.source}</p>
                  </div>
                )}

                {selected && (
                  <button
                    onClick={handleNext}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 dark:shadow-violet-950/40"
                  >
                    {isSavingResult ? "Saving result..." : questionIndex === quizQuestions.length - 1 ? "See results" : "Next question"}
                    <ArrowRight size={16} />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-200">
              <CheckCircle2 size={40} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Results</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">{score} / {quizQuestions.length}</h2>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
                You identified {score} out of {quizQuestions.length} scenarios correctly.
              </p>
            </div>

            {saveMessage && <p role="status" className="text-sm text-slate-500 dark:text-slate-400">{saveMessage}</p>}

            <div className="mx-auto h-28 w-28 rounded-full border-[10px] border-violet-100 border-t-violet-500 p-4 dark:border-violet-950 dark:border-t-violet-300">
              <div className="flex h-full items-center justify-center text-2xl font-black text-slate-900 dark:text-white">
                {Math.round((score / quizQuestions.length) * 100)}%
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={handleReset} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <RotateCcw size={16} /> Retry quiz
              </button>
              <Link href="/learn" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 dark:shadow-violet-950/40">
                <Sparkles size={16} /> Continue learning
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

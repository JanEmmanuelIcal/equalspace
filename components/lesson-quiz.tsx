"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { type LessonQuizQuestion, lessonQuizStagesCount } from "@/lib/data";
import { getLessonQuizScores, getProfile, markLessonComplete, saveQuizAttempt } from "@/lib/supabase";
import { LessonCertificate } from "@/components/lesson-certificate";

const QUESTIONS_PER_STAGE = 2;

export function LessonQuiz({ lessonTitle, lessonSlug, questions }: {
  lessonTitle: string;
  lessonSlug: string;
  questions: LessonQuizQuestion[];
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [hasCertificate, setHasCertificate] = useState(false);
  const [learnerName, setLearnerName] = useState("EqualSpace Learner");

  useEffect(() => {
    let active = true;
    void Promise.all([getLessonQuizScores(), getProfile()]).then(([scores, profile]) => {
      if (!active) return;
      setHasCertificate(scores[lessonSlug] === questions.length);
      if (profile?.full_name.trim()) setLearnerName(profile.full_name.trim());
    });
    return () => { active = false; };
  }, [lessonSlug, questions.length]);

  const currentQuestion = questions[questionIndex];
  const stage = Math.floor(questionIndex / QUESTIONS_PER_STAGE) + 1;
  const questionInStage = questionIndex % QUESTIONS_PER_STAGE + 1;
  const stageQuestions = questions.slice((stage - 1) * QUESTIONS_PER_STAGE, stage * QUESTIONS_PER_STAGE);
  const progress = (questionIndex / questions.length) * 100;
  const stageResults = useMemo(() => Array.from({ length: lessonQuizStagesCount }, (_, index) => {
    const stageQuestions = questions.slice(index * QUESTIONS_PER_STAGE, (index + 1) * QUESTIONS_PER_STAGE);
    const answeredCount = stageQuestions.filter((question) => questions.indexOf(question) < questionIndex).length;
    return { title: stageQuestions[0]?.stageTitle || `Stage ${index + 1}`, complete: answeredCount === stageQuestions.length };
  }), [questionIndex, questions]);

  const resetQuiz = () => {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setIsComplete(false);
    setSaveMessage("");
  };

  const answerQuestion = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === currentQuestion.answer) setScore((value) => value + 1);
  };

  const continueStage = async () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((value) => value + 1);
      setSelected(null);
      return;
    }

    setIsSaving(true);
    const finalScore = score;
    setHasCertificate((earned) => earned || finalScore === questions.length);
    try {
      const [attemptResult, progressResult] = await Promise.all([
        saveQuizAttempt(finalScore, questions.length),
        markLessonComplete(lessonSlug, finalScore)
      ]);
      const messages = [attemptResult.message, progressResult.message];
      setSaveMessage(messages.filter((message, index) => index === 0 || message !== messages[0]).join(" "));
    } catch {
      setSaveMessage("Your quiz is complete, but we could not sync the result. Check your connection and review your progress later.");
    } finally {
      setIsSaving(false);
      setIsComplete(true);
    }
  };

  if (!currentQuestion) return null;

  return (
    <section id="lesson-quiz" aria-labelledby="lesson-quiz-title" className="scroll-mt-24 overflow-hidden rounded-4xl border border-violet-200 bg-white shadow-[0_20px_70px_rgba(79,70,229,0.09)] dark:border-violet-900/70 dark:bg-slate-900">
      <div className="bg-linear-to-br from-violet-700 via-indigo-700 to-indigo-800 px-6 py-7 text-white sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">Lesson mastery · 5 stages · 10 questions</p>
        <h2 id="lesson-quiz-title" className="mt-2 text-2xl font-black sm:text-3xl">Check your understanding</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">Move through five short stages for “{lessonTitle}.” Each stage has two questions and explains the reasoning as you go.</p>
      </div>

      <div className="p-5 sm:p-8">
        {!isComplete ? <>
          {hasCertificate && <LessonCertificate lessonTitle={lessonTitle} questionCount={questions.length} learnerName={learnerName} onLearnerNameChange={setLearnerName} />}
          <ol aria-label="Quiz stages" className="grid grid-cols-5 gap-2">
            {stageResults.map((item, index) => {
              const isCurrent = index + 1 === stage;
              return <li key={item.title} className="min-w-0">
                <div className={`mb-2 flex h-8 items-center justify-center rounded-full text-xs font-bold ${item.complete ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" : isCurrent ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                  {item.complete ? <CheckCircle2 size={16} /> : `0${index + 1}`}
                </div>
                <p className={`hidden truncate text-center text-[10px] font-semibold sm:block ${isCurrent ? "text-violet-700 dark:text-violet-200" : "text-slate-500 dark:text-slate-400"}`}>{item.title}</p>
              </li>;
            })}
          </ol>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-linear-to-r from-violet-600 to-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-violet-800 dark:bg-violet-950/50 dark:text-violet-200">Stage {stage}: {currentQuestion.stageTitle}</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Question {questionIndex + 1} of {questions.length} · {questionInStage} of {stageQuestions.length} in this stage</span>
            </div>
            <h3 className="mt-5 text-xl font-bold leading-relaxed text-slate-900 sm:text-2xl dark:text-white">{currentQuestion.question}</h3>

            <div className="mt-5 grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selected === option;
                const isCorrect = option === currentQuestion.answer;
                const resultStyle = selected && isCorrect
                  ? "border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-100"
                  : selected && isSelected
                    ? "border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/35 dark:text-rose-100"
                    : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-violet-700";
                return <button key={option} type="button" onClick={() => answerQuestion(option)} disabled={Boolean(selected)} className={`flex items-start gap-3 rounded-2xl border p-4 text-left text-sm font-medium transition ${resultStyle}`}>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                </button>;
              })}
            </div>

            {selected && <div role="status" className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className={`text-sm font-bold ${selected === currentQuestion.answer ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>{selected === currentQuestion.answer ? "That’s right" : "Good try — here’s the key idea"}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{currentQuestion.explanation}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Lesson reference: {currentQuestion.source}</p>
            </div>}

            {selected && <div className="mt-5 flex justify-end">
              <button type="button" onClick={continueStage} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:opacity-60 dark:shadow-violet-950/40">
                {isSaving ? "Saving your result..." : questionIndex === questions.length - 1 ? "Finish course quiz" : questionInStage === stageQuestions.length ? `Complete stage ${stage}` : "Next question"}
                <ArrowRight size={16} />
              </button>
            </div>}
          </div>
        </> : <div className="py-5 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"><CheckCircle2 size={32} /></div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-200">Lesson quiz complete</p>
          <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">{score} / {questions.length}</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">You made it through all five stages. Your score is saved with this lesson’s progress when storage is available.</p>
          {saveMessage && <p role="status" className="mx-auto mt-4 max-w-xl text-sm text-slate-500 dark:text-slate-400">{saveMessage}</p>}
          {hasCertificate && <LessonCertificate lessonTitle={lessonTitle} questionCount={questions.length} learnerName={learnerName} onLearnerNameChange={setLearnerName} />}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={resetQuiz} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"><RotateCcw size={16} /> Try again</button>
            <Link href="/learn" className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"><Sparkles size={16} /> Choose another lesson</Link>
          </div>
        </div>}
      </div>
    </section>
  );
}

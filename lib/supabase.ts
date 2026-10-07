import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey
  ? createBrowserClient(supabaseUrl, supabaseKey)
  : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export type ServiceResponse = {
  ok: boolean;
  mode: "demo" | "supabase";
  message: string;
};

export type StoryEntry = {
  id: string;
  title: string;
  body: string;
  category: string;
  author: string;
  status: "Approved" | "Pending" | "Rejected";
  created_at: string;
};

export type ProfileData = { full_name: string; bio: string; email: string };
export type QuizAttempt = { score: number; total: number; created_at: string };

const readLocal = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeLocal = (key: string, value: unknown): boolean => {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("equalspace-local-data", { detail: key }));
    return true;
  } catch {
    return false;
  }
};

const unavailable = (message: string): ServiceResponse => ({ ok: false, mode: "demo", message });

const generateId = () => {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis && typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export async function signInWithEmail(email: string, password: string): Promise<ServiceResponse> {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { ok: false, mode: "demo", message: "Please enter both email and password." };
  }

  if (!supabase) return unavailable("Sign-in is unavailable until Supabase is configured. Your credentials were not sent anywhere.");

  try {
    const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password: trimmedPassword });

    if (error) return { ok: false, mode: "supabase", message: error.message };
    return { ok: true, mode: "supabase", message: "Signed in successfully." };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not connect. Check your connection and try again." };
  }
}

export async function signUpWithEmail(email: string, password: string, fullName?: string): Promise<ServiceResponse> {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { ok: false, mode: "demo", message: "Please provide an email and password." };
  }

  if (!supabase) return unavailable("Account creation is unavailable until Supabase is configured.");

  try {
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password: trimmedPassword,
      options: {
        data: { full_name: fullName?.trim() || "EqualSpace member" },
        emailRedirectTo: `${window.location.origin}/login`
      }
    });

    if (error) return { ok: false, mode: "supabase", message: error.message };
    return {
      ok: true,
      mode: "supabase",
      message: data.session ? "Account created and signed in." : "Account created. Check your email to confirm your address before signing in."
    };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not connect. Check your connection and try again." };
  }
}

export async function requestPasswordReset(email: string): Promise<ServiceResponse> {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) return unavailable("Please enter your email address.");
  if (!supabase) return unavailable("Password recovery is unavailable until Supabase is configured.");
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: `${window.location.origin}/update-password`
    });
    if (error) return { ok: false, mode: "supabase", message: error.message };
    return { ok: true, mode: "supabase", message: "If an account exists for that address, a reset link is on its way." };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not connect. Check your connection and try again." };
  }
}

export async function updatePassword(password: string): Promise<ServiceResponse> {
  if (!supabase) return unavailable("Password recovery is unavailable until Supabase is configured.");
  try {
    const { error } = await supabase.auth.updateUser({ password });
    return error
      ? { ok: false, mode: "supabase", message: error.message }
      : { ok: true, mode: "supabase", message: "Your password has been updated." };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not update your password. Request a new reset link and try again." };
  }
}

export async function getProfile(): Promise<ProfileData | null> {
  if (!supabase) return readLocal<ProfileData | null>("equalspace-profile", null);
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return null;
    const { data } = await supabase.from("profiles").select("full_name, bio").eq("id", user.id).maybeSingle();
    return {
      full_name: data?.full_name || String(user.user_metadata.full_name || ""),
      bio: data?.bio || "",
      email: user.email || ""
    };
  } catch {
    return null;
  }
}

export async function saveProfile(profile: ProfileData): Promise<ServiceResponse> {
  if (!supabase) {
    if (!writeLocal("equalspace-profile", profile)) return unavailable("Your browser could not save the profile. Check its storage settings and try again.");
    return { ok: true, mode: "demo", message: "Profile saved on this device. Configure Supabase to sync it across devices." };
  }
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return { ok: false, mode: "supabase", message: "Please sign in to update your profile." };
    const { error } = await supabase.from("profiles").update({ full_name: profile.full_name, bio: profile.bio }).eq("id", user.id);
    if (error) return { ok: false, mode: "supabase", message: error.message };
    await supabase.auth.updateUser({ data: { full_name: profile.full_name } });
    return { ok: true, mode: "supabase", message: "Your profile has been saved." };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not save your profile. Check your connection and try again." };
  }
}

export async function getApprovedStories(): Promise<StoryEntry[] | null> {
  if (!supabase) return readLocal<StoryEntry[]>("equalspace-stories", []).filter((story) => story.status === "Approved");
  try {
    const { data, error } = await supabase.from("stories").select("id,title,body,category,author,status,created_at").eq("status", "Approved").order("created_at", { ascending: false });
    return error ? null : (data as StoryEntry[]);
  } catch {
    return null;
  }
}

export async function submitStoryEntry(payload: {
  title?: string;
  body: string;
  category: string;
  author?: string;
  status?: "Approved" | "Pending" | "Rejected";
}): Promise<ServiceResponse> {
  const trimmedTitle = (payload.title || "Anonymous story").trim();
  const trimmedBody = payload.body.trim();
  const trimmedAuthor = (payload.author || "Anonymous").trim();

  if (!trimmedBody) {
    return { ok: false, mode: "demo", message: "Please write a short story before submitting." };
  }

  if (!supabase) {
    const entry: StoryEntry = {
      id: generateId(), title: trimmedTitle.length > 80 ? `${trimmedTitle.slice(0, 77)}...` : trimmedTitle,
      body: trimmedBody, category: payload.category, author: trimmedAuthor,
      status: "Pending", created_at: new Date().toISOString()
    };
    if (!writeLocal("equalspace-stories", [...readLocal<StoryEntry[]>("equalspace-stories", []), entry])) {
      return unavailable("Your browser could not save this story. Check its storage settings and try again.");
    }
    return {
      ok: true,
      mode: "demo",
      message: "Your story is saved on this device and is pending moderation. Configure Supabase to share it with the community."
    };
  }

  try {
    const { error } = await supabase.from("stories").insert([{
      id: generateId(), title: trimmedTitle.length > 80 ? `${trimmedTitle.slice(0, 77)}...` : trimmedTitle,
      body: trimmedBody, category: payload.category, author: trimmedAuthor,
      status: "Pending", created_at: new Date().toISOString()
    }]);

    if (error) return { ok: false, mode: "supabase", message: error.message };
    return { ok: true, mode: "supabase", message: "Your story was submitted for moderation." };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not submit your story. Check your connection and try again." };
  }
}

export async function submitPollResponse(choice: string): Promise<ServiceResponse> {
  const trimmedChoice = choice.trim();

  if (!trimmedChoice) {
    return { ok: false, mode: "demo", message: "Please select an option before submitting." };
  }

  if (!supabase) {
    const counts = readLocal<Record<string, number>>("equalspace-poll-counts", {});
    if (!writeLocal("equalspace-poll-counts", { ...counts, [trimmedChoice]: (counts[trimmedChoice] || 0) + 1 })) {
      return unavailable("Your browser could not save this response. Check its storage settings and try again.");
    }
    return {
      ok: true,
      mode: "demo",
      message: "Your response is saved on this device. Configure Supabase to include it in community results."
    };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("poll_responses").insert([{
      id: generateId(), user_id: user?.id ?? null, choice: trimmedChoice, created_at: new Date().toISOString()
    }]);

    if (error) return { ok: false, mode: "supabase", message: error.message };
    return { ok: true, mode: "supabase", message: "Your response has been recorded." };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not submit your response. Check your connection and try again." };
  }
}

export function getLocalPollCounts(): Record<string, number> {
  return readLocal<Record<string, number>>("equalspace-poll-counts", {});
}

export function subscribeToLocalPollCounts(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handleChange = (event: Event) => {
    if (event instanceof CustomEvent && event.detail !== "equalspace-poll-counts") return;
    onChange();
  };
  window.addEventListener("storage", handleChange);
  window.addEventListener("equalspace-local-data", handleChange);
  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("equalspace-local-data", handleChange);
  };
}

export function getLocalPollCountsSnapshot(): string {
  if (typeof window === "undefined") return "{}";
  try {
    return window.localStorage.getItem("equalspace-poll-counts") || "{}";
  } catch {
    return "{}";
  }
}

export async function getCompletedLessons(): Promise<string[]> {
  if (!supabase) return readLocal<string[]>("equalspace-completed-lessons", []);
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return readLocal<string[]>("equalspace-completed-lessons", []);
    const { data, error } = await supabase.from("user_progress").select("lesson_slug").eq("user_id", user.id).eq("completed", true);
    return error ? [] : (data || []).flatMap((item) => item.lesson_slug ? [item.lesson_slug] : []);
  } catch {
    return [];
  }
}

export async function markLessonComplete(slug: string): Promise<ServiceResponse> {
  if (!supabase) {
    const completed = readLocal<string[]>("equalspace-completed-lessons", []);
    if (!writeLocal("equalspace-completed-lessons", [...new Set([...completed, slug])])) {
      return unavailable("Your browser could not save progress. Check its storage settings and try again.");
    }
    return { ok: true, mode: "demo", message: "Lesson marked complete on this device." };
  }
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const completed = readLocal<string[]>("equalspace-completed-lessons", []);
      if (!writeLocal("equalspace-completed-lessons", [...new Set([...completed, slug])])) {
        return unavailable("Please sign in or enable browser storage to save your progress.");
      }
      return { ok: true, mode: "demo", message: "Lesson marked complete on this device. Sign in to sync progress." };
    }
    const { error } = await supabase.from("user_progress").upsert({
      user_id: user.id, lesson_slug: slug, completed: true, updated_at: new Date().toISOString()
    }, { onConflict: "user_id,lesson_slug" });
    return error
      ? { ok: false, mode: "supabase", message: error.message }
      : { ok: true, mode: "supabase", message: "Lesson marked complete." };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not save your progress. Check your connection and try again." };
  }
}

export async function getQuizAttempts(): Promise<QuizAttempt[]> {
  if (!supabase) return readLocal<QuizAttempt[]>("equalspace-quiz-attempts", []);
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return readLocal<QuizAttempt[]>("equalspace-quiz-attempts", []);
    const { data, error } = await supabase.from("quiz_attempts").select("score,total,created_at").eq("user_id", user.id).order("created_at", { ascending: false });
    return error ? [] : (data as QuizAttempt[]);
  } catch {
    return [];
  }
}

export async function saveQuizAttempt(score: number, total: number): Promise<ServiceResponse> {
  if (!Number.isInteger(score) || !Number.isInteger(total) || total <= 0 || score < 0 || score > total) {
    return unavailable("The quiz result is not valid and could not be saved.");
  }
  if (!supabase) {
    const attempts = readLocal<Array<{ score: number; total: number; created_at: string }>>("equalspace-quiz-attempts", []);
    if (!writeLocal("equalspace-quiz-attempts", [...attempts, { score, total, created_at: new Date().toISOString() }])) {
      return unavailable("Your browser could not save this result. Check its storage settings and try again.");
    }
    return {
      ok: true,
      mode: "demo",
      message: "Quiz result saved on this device. Configure Supabase to sync your progress."
    };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const attempts = readLocal<QuizAttempt[]>("equalspace-quiz-attempts", []);
      if (!writeLocal("equalspace-quiz-attempts", [...attempts, { score, total, created_at: new Date().toISOString() }])) {
        return unavailable("Your browser could not save this result. Check its storage settings and try again.");
      }
      return { ok: true, mode: "demo", message: "Quiz result saved on this device. Sign in to sync your progress." };
    }
    const { error } = await supabase.from("quiz_attempts").insert([{
      id: generateId(), user_id: user.id, score, total, created_at: new Date().toISOString()
    }]);

    if (error) return { ok: false, mode: "supabase", message: error.message };
    return { ok: true, mode: "supabase", message: "Quiz attempt saved." };
  } catch {
    return { ok: false, mode: "supabase", message: "Could not save your result. Check your connection and try again." };
  }
}

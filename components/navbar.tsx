"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/lib/data";
import { supabase } from "@/lib/supabase";

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("equalspace-theme-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("equalspace-theme-change", onChange);
  };
}

function getThemeSnapshot() {
  try {
    const savedTheme = window.localStorage.getItem("equalspace-theme");
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-violet-200">
        E
      </div>
      <div>
        <div className="text-lg font-black tracking-tight text-slate-900 dark:text-white">EqualSpace</div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUserEmail(session?.user.email ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => {
    window.localStorage.setItem("equalspace-theme", darkMode ? "light" : "dark");
    window.dispatchEvent(new Event("equalspace-theme-change"));
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setSearchOpen(false);
    setMenuOpen(false);
    router.push(`/learn?search=${encodeURIComponent(query)}`);
  };

  const handleSignOut = async () => {
    if (!supabase) {
      setLogoutError("Sign out is unavailable because Supabase is not configured.");
      return;
    }

    setIsSigningOut(true);
    setLogoutError("");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setLogoutError("Could not sign out. Please try again.");
        return;
      }
      setUserEmail(null);
      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError("Could not sign out. Check your connection and try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full bg-slate-100 p-1 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 transition ${
                  active
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                    : "hover:bg-white/80 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-violet-200 hover:text-violet-600 dark:border-slate-700 dark:text-slate-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button aria-label="Search lessons" aria-expanded={searchOpen} onClick={() => setSearchOpen((value) => !value)} className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 hover:border-violet-200 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <Search size={18} />
          </button>
          {userEmail ? <><Link href="/dashboard" className="text-sm font-semibold text-slate-700 hover:text-violet-600 dark:text-slate-200">Dashboard</Link><button onClick={handleSignOut} disabled={isSigningOut} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200">{isSigningOut ? "Signing out..." : "Sign out"}</button></> : <Link href="/login" className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:translate-y-[-1px] dark:shadow-violet-950/40">Log in</Link>}
        </div>

        {logoutError && <p role="alert" className="mx-auto max-w-7xl px-4 pb-3 text-sm text-rose-600 dark:text-rose-300 sm:px-6 lg:px-8">{logoutError}</p>}

        <div className="flex items-center gap-2 md:hidden">
          <button aria-label="Search lessons" aria-expanded={searchOpen} onClick={() => setSearchOpen((value) => !value)} className="rounded-full border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200"><Search size={18} /></button>
          <button aria-label="Toggle menu" aria-expanded={menuOpen} className="rounded-full border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && <motion.form onSubmit={handleSearch} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-slate-200 bg-white/95 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-3xl gap-2">
            <label className="sr-only" htmlFor="site-search">Search learning topics</label>
            <input id="site-search" autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search lessons and topics..." className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900" />
            <button className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white">Search</button>
          </div>
        </motion.form>}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2 ${pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)) ? "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-200" : "text-slate-700 dark:text-slate-200"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 dark:border-slate-700"
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {darkMode ? "Light" : "Dark"} mode
                </button>
                {userEmail ? <><Link href="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-full bg-violet-600 px-4 py-2 font-semibold text-white">Dashboard</Link><button onClick={handleSignOut} disabled={isSigningOut} className="rounded-full border border-slate-200 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700">{isSigningOut ? "Signing out..." : "Sign out"}</button></> : <Link href="/login" className="rounded-full bg-violet-600 px-4 py-2 font-semibold text-white">Log in</Link>}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

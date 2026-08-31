"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "হোম", href: "/" },
  { label: "সর্বশেষ", href: "/#latest" },
  { label: "ট্রেন্ডিং", href: "/#trending" },
  { label: "ক্যাটাগরি", href: "/#categories" },
  { label: "নিউজলেটার", href: "/#newsletter" },
];

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchValue.trim()) params.set("search", searchValue.trim());
    router.push(`/${params.toString() ? `?${params.toString()}` : ""}#latest`);
    setMobileOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`glass-nav flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-shadow duration-500 sm:px-6 ${
          scrolled ? "shadow-[0_8px_40px_rgba(0,243,255,0.12)]" : ""
        }`}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-600/30 ring-1 ring-white/15">
            <Sparkles className="h-4.5 w-4.5 text-cyan-300 transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-gradient text-base font-bold tracking-tight">প্রযুক্তির দর্পণ</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Projuktir Dorpon</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:bg-white/10 hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <form
            onSubmit={handleSearchSubmit}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 md:flex"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="খুঁজুন..."
              className="w-36 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none lg:w-48"
            />
          </form>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 lg:hidden"
            aria-label="মেনু টগল করুন"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-nav absolute left-3 right-3 top-[76px] z-40 rounded-2xl p-4 sm:left-6 sm:right-6 lg:hidden"
          >
            <form onSubmit={handleSearchSubmit} className="mb-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="খুঁজুন..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </form>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

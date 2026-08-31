"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "সমস্যা হয়েছে");
      setStatus("success");
      setMessage(data.message ?? "সফলভাবে যুক্ত হয়েছেন!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "সমস্যা হয়েছে");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <div id="newsletter">
      <div className="mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-slate-50">নিউজলেটার সাবস্ক্রিপশন</h3>
      </div>
      <p className="mb-4 text-sm text-slate-400">
        প্রতি সপ্তাহে সেরা প্রযুক্তি খবর সরাসরি আপনার ইনবক্সে পেতে সাবস্ক্রাইব করুন।
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="আপনার ইমেইল লিখুন"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 px-4 py-3 text-sm font-semibold text-[#050813] transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "loading" ? "পাঠানো হচ্ছে..." : "সাবস্ক্রাইব করুন"}
          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </form>

      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 text-sm text-emerald-400"
        >
          <CheckCircle2 className="h-4 w-4" /> {message}
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 text-sm text-rose-400"
        >
          <AlertCircle className="h-4 w-4" /> {message}
        </motion.p>
      )}
    </div>
  );
}

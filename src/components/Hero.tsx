"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Clock, Zap } from "lucide-react";
import type { PostSummary } from "@/lib/types";
import { formatBengaliDate, formatNumber } from "@/lib/icon-map";

type HeroProps = {
  featured: PostSummary | null;
};

export default function Hero({ featured }: HeroProps) {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pt-32 pb-16 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-300 sm:text-sm"
        >
          <Zap className="h-3.5 w-3.5" />
          বাংলাদেশের সবচেয়ে আধুনিক প্রযুক্তি ব্লগ
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          ভবিষ্যতের প্রযুক্তি,
          <br />
          <span className="text-gradient bg-[length:200%_auto] animate-shimmer">আজকের দর্পণে</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg"
        >
          আর্টিফিশিয়াল ইন্টেলিজেন্স, স্মার্টফোন, গ্যাজেট রিভিউ, সাইবার সিকিউরিটি ও স্টার্টআপ জগতের
          সবচেয়ে গুরুত্বপূর্ণ খবর ও বিশ্লেষণ — এক জায়গায়।
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#latest"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 px-7 py-3 text-sm font-semibold text-navy shadow-[0_0_30px_rgba(0,243,255,0.35)] transition-transform duration-300 hover:scale-105 sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2 text-[#050813]">
              সর্বশেষ প্রবন্ধ পড়ুন
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
          <a
            href="#categories"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition-colors duration-300 hover:bg-white/10 sm:text-base"
          >
            ক্যাটাগরি দেখুন
          </a>
        </motion.div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
            className="mt-16 w-full animate-float"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="glass-panel glow-border shimmer-sweep group relative mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl text-left transition-transform duration-500 hover:-translate-y-1 sm:flex-row"
            >
              <div className="relative h-56 w-full overflow-hidden sm:h-auto sm:w-2/5">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent sm:bg-gradient-to-r" />
                <span className="absolute left-3 top-3 rounded-full bg-cyan-400/90 px-3 py-1 text-xs font-bold text-navy">
                  ফিচার্ড
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8">
                <span className="w-fit rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-medium text-purple-300">
                  {featured.categoryName}
                </span>
                <h2 className="text-xl font-bold leading-snug text-slate-50 sm:text-2xl">
                  {featured.title}
                </h2>
                <p className="line-clamp-2 text-sm text-slate-400">{featured.excerpt}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> {formatNumber(featured.views)} ভিউ
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} মিনিট পড়া
                  </span>
                  <span>{formatBengaliDate(featured.publishedAt)}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

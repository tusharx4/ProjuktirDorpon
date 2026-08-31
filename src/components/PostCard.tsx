"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Clock, ArrowUpRight, TrendingUp } from "lucide-react";
import type { PostSummary } from "@/lib/types";
import { formatBengaliDate, formatNumber } from "@/lib/icon-map";

export default function PostCard({ post, index = 0 }: { post: PostSummary; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.06 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="glass-panel glow-border shimmer-sweep group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,243,255,0.15)]"
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium text-cyan-300 backdrop-blur-md">
            {post.categoryName}
          </span>
          {post.isTrending && (
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-2.5 py-1 text-[11px] font-bold text-white">
              <TrendingUp className="h-3 w-3" /> ট্রেন্ডিং
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-50 transition-colors duration-300 group-hover:text-cyan-300">
            {post.title}
          </h3>
          <p className="line-clamp-2 flex-1 text-sm text-slate-400">{post.excerpt}</p>

          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> {formatNumber(post.views)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readMinutes} মিনিট
              </span>
            </div>
            <span className="flex items-center gap-1 font-medium text-slate-500 transition-colors group-hover:text-cyan-300">
              {formatBengaliDate(post.publishedAt)}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Flame, Eye } from "lucide-react";
import type { TrendingPost } from "@/lib/types";
import { formatNumber } from "@/lib/icon-map";

export default function TrendingList({ posts }: { posts: TrendingPost[] }) {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const toBn = (n: number) =>
    n
      .toString()
      .split("")
      .map((d) => bengaliDigits[Number(d)] ?? d)
      .join("");

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Flame className="h-5 w-5 text-orange-400" />
        <h3 className="text-lg font-bold text-slate-50">টপ ট্রেন্ডিং পোস্ট</h3>
      </div>
      <ul className="flex flex-col gap-4">
        {posts.map((post, i) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="group flex items-center gap-3">
              <span className="text-gradient w-6 shrink-0 text-2xl font-black opacity-70">
                {toBn(i + 1)}
              </span>
              <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="flex flex-1 flex-col gap-1 overflow-hidden">
                <span className="line-clamp-2 text-sm font-medium text-slate-200 transition-colors group-hover:text-cyan-300">
                  {post.title}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Eye className="h-3 w-3" /> {formatNumber(post.views)} ভিউ
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX, Loader2 } from "lucide-react";
import PostCard from "@/components/PostCard";
import type { PostSummary } from "@/lib/types";

export default function BlogGrid({ initialPosts }: { initialPosts: PostSummary[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const search = searchParams.get("search") ?? "";

  const [posts, setPosts] = useState<PostSummary[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const isDefault = category === "all" && search === "";

  useEffect(() => {
    if (isDefault) {
      setPosts(initialPosts);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (search) params.set("search", search);

    fetch(`/api/posts?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setPosts(data.posts ?? []))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, isDefault]);

  return (
    <div id="latest" className="scroll-mt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">সর্বশেষ প্রবন্ধ</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-50 sm:text-3xl">
            {search ? `"${search}" এর ফলাফল` : "সাম্প্রতিক পোস্টসমূহ"}
          </h2>
        </div>
        {loading && (
          <span className="flex items-center gap-2 text-sm text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" /> লোড হচ্ছে...
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {posts.length === 0 && !loading ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel flex flex-col items-center gap-3 rounded-3xl px-6 py-16 text-center"
          >
            <SearchX className="h-10 w-10 text-slate-500" />
            <p className="text-slate-300">কোনো প্রবন্ধ খুঁজে পাওয়া যায়নি।</p>
          </motion.div>
        ) : (
          <motion.div
            key={`${category}-${search}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

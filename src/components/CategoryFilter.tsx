"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import type { Category } from "@/lib/types";
import { getCategoryIcon } from "@/lib/icon-map";

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";

  function selectCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/${params.toString() ? `?${params.toString()}` : ""}#latest`, { scroll: false });
  }

  return (
    <div id="categories">
      <div className="mb-4 flex items-center gap-2">
        <LayoutGrid className="h-5 w-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-slate-50">ক্যাটাগরি ফিল্টার</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => selectCategory("all")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
            activeCategory === "all"
              ? "border-cyan-400/60 bg-cyan-400/15 text-cyan-300 shadow-[0_0_16px_rgba(0,243,255,0.25)]"
              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
          }`}
        >
          সবগুলো
        </button>
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.icon);
          const active = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.slug)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active
                  ? "border-purple-400/60 bg-purple-400/15 text-purple-300 shadow-[0_0_16px_rgba(123,44,191,0.3)]"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

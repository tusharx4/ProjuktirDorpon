import GlassCard from "@/components/GlassCard";
import TrendingList from "@/components/TrendingList";
import CategoryFilter from "@/components/CategoryFilter";
import Newsletter from "@/components/Newsletter";
import type { Category, TrendingPost } from "@/lib/types";

export default function Sidebar({
  trending,
  categories,
}: {
  trending: TrendingPost[];
  categories: Category[];
}) {
  return (
    <aside className="flex flex-col gap-6">
      <GlassCard className="p-6">
        <TrendingList posts={trending} />
      </GlassCard>
      <GlassCard className="p-6">
        <CategoryFilter categories={categories} />
      </GlassCard>
      <GlassCard className="p-6">
        <Newsletter />
      </GlassCard>
    </aside>
  );
}

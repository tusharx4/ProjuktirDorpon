import { Suspense } from "react";
import LiquidBackground from "@/components/LiquidBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getAllCategories, getAllPosts, getFeaturedPost, getTrendingPosts } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, trending, categories, latestPosts] = await Promise.all([
    getFeaturedPost(),
    getTrendingPosts(5),
    getAllCategories(),
    getAllPosts({ limit: 30 }),
  ]);

  return (
    <>
      <LiquidBackground />
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="relative">
        <Hero
          featured={
            featured
              ? {
                  ...featured,
                  tags: "",
                  isTrending: true,
                  isFeatured: true,
                  publishedAt: featured.publishedAt.toString(),
                }
              : null
          }
        />

        <section id="trending" className="scroll-mt-28" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 pb-10 sm:px-6 lg:grid-cols-[1fr_340px]">
          <Suspense fallback={<GridSkeleton />}>
            <BlogGrid
              initialPosts={latestPosts.map((p) => ({
                ...p,
                publishedAt: p.publishedAt.toString(),
              }))}
            />
          </Suspense>

          <Suspense fallback={null}>
            <Sidebar
              trending={trending.map((t) => ({ ...t, publishedAt: t.publishedAt.toString() }))}
              categories={categories.map((c) => ({ ...c, createdAt: c.createdAt.toString() }))}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-panel h-80 animate-pulse rounded-3xl" />
      ))}
    </div>
  );
}

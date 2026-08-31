import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Eye, Clock, ArrowLeft, Tag } from "lucide-react";
import LiquidBackground from "@/components/LiquidBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Sidebar from "@/components/Sidebar";
import GlassCard from "@/components/GlassCard";
import { getAllCategories, getPostBySlug, getTrendingPosts } from "@/db/queries";
import { formatBengaliDate, formatNumber } from "@/lib/icon-map";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "পোস্ট পাওয়া যায়নি | প্রযুক্তির দর্পণ" };
  return {
    title: `${post.title} | প্রযুক্তির দর্পণ`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, trending, categories] = await Promise.all([
    getPostBySlug(slug),
    getTrendingPosts(5),
    getAllCategories(),
  ]);

  if (!post) notFound();

  const tags = post.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <>
      <LiquidBackground />
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="relative px-4 pb-16 pt-28 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <article>
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-300"
            >
              <ArrowLeft className="h-4 w-4" /> হোমে ফিরে যান
            </Link>

            <span className="mb-4 inline-block w-fit rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-medium text-purple-300">
              {post.categoryName}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-slate-50 sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>লেখক: {post.author}</span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {formatNumber(post.views)} ভিউ
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {post.readMinutes} মিনিট পড়া
              </span>
              <span>{formatBengaliDate(post.publishedAt)}</span>
            </div>

            <div className="glass-panel relative mt-8 h-64 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            <GlassCard className="mt-8 p-6 sm:p-10">
              <p className="whitespace-pre-line text-base leading-relaxed text-slate-200 sm:text-lg">
                {post.content}
              </p>
            </GlassCard>

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-slate-500" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

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

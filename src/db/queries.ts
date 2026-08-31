import { db } from "@/db";
import { categories, posts, subscribers } from "@/db/schema";
import { desc, eq, and, or, ilike, sql } from "drizzle-orm";

export type PostWithCategory = Awaited<ReturnType<typeof getAllPosts>>[number];

export async function getAllCategories() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function getAllPosts(opts?: {
  categorySlug?: string;
  search?: string;
  limit?: number;
}) {
  const conditions = [];

  if (opts?.categorySlug && opts.categorySlug !== "all") {
    const cat = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, opts.categorySlug))
      .limit(1);
    if (cat[0]) conditions.push(eq(posts.categoryId, cat[0].id));
  }

  if (opts?.search) {
    const term = `%${opts.search}%`;
    conditions.push(
      or(ilike(posts.title, term), ilike(posts.excerpt, term), ilike(posts.tags, term)),
    );
  }

  const query = db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      coverImage: posts.coverImage,
      author: posts.author,
      tags: posts.tags,
      views: posts.views,
      readMinutes: posts.readMinutes,
      isTrending: posts.isTrending,
      isFeatured: posts.isFeatured,
      publishedAt: posts.publishedAt,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(posts.publishedAt))
    .$dynamic();

  if (opts?.limit) {
    return query.limit(opts.limit);
  }

  return query;
}

export async function getPostBySlug(slug: string) {
  const rows = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      coverImage: posts.coverImage,
      author: posts.author,
      tags: posts.tags,
      views: posts.views,
      readMinutes: posts.readMinutes,
      isTrending: posts.isTrending,
      isFeatured: posts.isFeatured,
      publishedAt: posts.publishedAt,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.slug, slug))
    .limit(1);

  return rows[0] ?? null;
}

export async function getFeaturedPost() {
  const rows = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      coverImage: posts.coverImage,
      author: posts.author,
      views: posts.views,
      readMinutes: posts.readMinutes,
      publishedAt: posts.publishedAt,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.isFeatured, true))
    .orderBy(desc(posts.publishedAt))
    .limit(1);

  return rows[0] ?? null;
}

export async function getTrendingPosts(limit = 5) {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      coverImage: posts.coverImage,
      views: posts.views,
      publishedAt: posts.publishedAt,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.isTrending, true))
    .orderBy(desc(posts.views))
    .limit(limit);
}

export async function incrementPostViews(slug: string) {
  await db
    .update(posts)
    .set({ views: sql`${posts.views} + 1` })
    .where(eq(posts.slug, slug));
}

export async function addSubscriber(email: string) {
  return db.insert(subscribers).values({ email }).onConflictDoNothing().returning();
}

export type PostSummary = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string;
  views: number;
  readMinutes: number;
  isTrending: boolean;
  isFeatured: boolean;
  publishedAt: string;
  categoryName: string;
  categorySlug: string;
};

export type PostDetail = PostSummary & {
  content: string;
};

export type TrendingPost = {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  views: number;
  publishedAt: string;
  categoryName: string;
  categorySlug: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  createdAt: string;
};

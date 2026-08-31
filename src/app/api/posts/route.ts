import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/db/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;

  try {
    const data = await getAllPosts({ categorySlug: category, search, limit });
    return NextResponse.json({ posts: data });
  } catch (error) {
    console.error("Failed to load posts", error);
    return NextResponse.json({ error: "পোস্ট লোড করা যায়নি।" }, { status: 500 });
  }
}

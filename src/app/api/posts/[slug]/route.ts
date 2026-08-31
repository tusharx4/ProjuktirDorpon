import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, incrementPostViews } from "@/db/queries";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "পোস্ট খুঁজে পাওয়া যায়নি।" }, { status: 404 });
    }
    incrementPostViews(slug).catch(() => {});
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Failed to load post", error);
    return NextResponse.json({ error: "পোস্ট লোড করা যায়নি।" }, { status: 500 });
  }
}

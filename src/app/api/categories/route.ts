import { NextResponse } from "next/server";
import { getAllCategories } from "@/db/queries";

export async function GET() {
  try {
    const data = await getAllCategories();
    return NextResponse.json({ categories: data });
  } catch (error) {
    console.error("Failed to load categories", error);
    return NextResponse.json({ error: "ক্যাটাগরি লোড করা যায়নি।" }, { status: 500 });
  }
}

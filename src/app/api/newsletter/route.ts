import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/db/queries";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "সঠিক ইমেইল ঠিকানা দিন।" },
        { status: 400 },
      );
    }

    const result = await addSubscriber(email);

    if (result.length === 0) {
      return NextResponse.json(
        { message: "আপনি ইতিমধ্যে সাবস্ক্রাইব করেছেন।" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "সফলভাবে সাবস্ক্রাইব করা হয়েছে!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Newsletter subscription failed", error);
    return NextResponse.json(
      { error: "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।" },
      { status: 500 },
    );
  }
}

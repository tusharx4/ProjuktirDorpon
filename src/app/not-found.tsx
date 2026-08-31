import Link from "next/link";
import { Suspense } from "react";
import { Compass } from "lucide-react";
import LiquidBackground from "@/components/LiquidBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <LiquidBackground />
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 pt-28 text-center">
        <div className="glass-panel flex flex-col items-center gap-4 rounded-3xl px-10 py-14">
          <Compass className="h-12 w-12 text-cyan-300" />
          <h1 className="text-gradient text-5xl font-black">৪০৪</h1>
          <p className="max-w-sm text-slate-300">
            দুঃখিত, আপনি যে পাতাটি খুঁজছেন তা খুঁজে পাওয়া যায়নি। হয়তো এটি সরিয়ে ফেলা হয়েছে বা লিংকটি ভুল।
          </p>
          <Link
            href="/"
            className="mt-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 px-6 py-3 text-sm font-semibold text-[#050813] transition-transform hover:scale-105"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

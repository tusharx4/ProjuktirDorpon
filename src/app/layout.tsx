import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hind_Siliguri, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "প্রযুক্তির দর্পণ | Projuktir Dorpon",
  description:
    "বাংলাদেশের সবচেয়ে আধুনিক প্রযুক্তি ব্লগ — আর্টিফিশিয়াল ইন্টেলিজেন্স, স্মার্টফোন, গ্যাজেট, সাইবার সিকিউরিটি ও স্টার্টআপ সম্পর্কিত সর্বশেষ খবর।",
  keywords: [
    "প্রযুক্তি",
    "বাংলা টেক ব্লগ",
    "AI",
    "স্মার্টফোন",
    "গ্যাজেট",
    "Projuktir Dorpon",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${notoSansBengali.variable}`}>
      <body className="bg-navy text-slate-100 antialiased selection:bg-cyan-400/30">
        {children}
      </body>
    </html>
  );
}

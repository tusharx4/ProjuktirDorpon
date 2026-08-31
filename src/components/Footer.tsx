import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/components/SocialIcons";

const SOCIALS = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

const LINK_GROUPS = [
  {
    title: "কুইক লিংক",
    links: [
      { label: "হোম", href: "/" },
      { label: "সর্বশেষ", href: "/#latest" },
      { label: "ট্রেন্ডিং", href: "/#trending" },
      { label: "ক্যাটাগরি", href: "/#categories" },
    ],
  },
  {
    title: "ক্যাটাগরি",
    links: [
      { label: "AI", href: "/?category=ai" },
      { label: "স্মার্টফোন", href: "/?category=smartphone" },
      { label: "সাইবার সিকিউরিটি", href: "/?category=security" },
      { label: "স্টার্টআপ", href: "/?category=startup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 px-4 pb-8 sm:px-6">
      <div className="glass-panel mx-auto max-w-6xl rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-600/30 ring-1 ring-white/15">
                <Sparkles className="h-4.5 w-4.5 text-cyan-300" />
              </span>
              <span className="text-gradient text-lg font-bold">প্রযুক্তির দর্পণ</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              বাংলাদেশের পাঠকদের জন্য বিশ্বস্ত ও তথ্যবহুল প্রযুক্তি সংবাদের প্ল্যাটফর্ম। আমরা বিশ্বাস
              করি প্রযুক্তির খবর হওয়া উচিত সহজবোধ্য এবং সবার জন্য উন্মুক্ত।
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-bold text-slate-100">{group.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} প্রযুক্তির দর্পণ। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>Built with Next.js &amp; Liquid Glassmorphism</p>
        </div>
      </div>
    </footer>
  );
}

import {
  BrainCircuit,
  Smartphone,
  Cpu,
  Code2,
  ShieldCheck,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  "brain-circuit": BrainCircuit,
  smartphone: Smartphone,
  cpu: Cpu,
  "code-2": Code2,
  "shield-check": ShieldCheck,
  rocket: Rocket,
};

export function getCategoryIcon(icon: string): LucideIcon {
  return ICON_MAP[icon] ?? Sparkles;
}

export function formatNumber(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}হাজার`;
  }
  return n.toString();
}

export function formatBengaliDate(dateStr: string | Date): string {
  const date = new Date(dateStr);
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const toBengaliNum = (num: number) =>
    num
      .toString()
      .split("")
      .map((d) => bengaliDigits[Number(d)] ?? d)
      .join("");

  return `${toBengaliNum(date.getDate())} ${months[date.getMonth()]}, ${toBengaliNum(date.getFullYear())}`;
}

import "dotenv/config";
import { db, pool } from "@/db";
import { categories, posts } from "@/db/schema";

const CATEGORY_DATA = [
  { name: "আর্টিফিশিয়াল ইন্টেলিজেন্স", slug: "ai", icon: "brain-circuit" },
  { name: "স্মার্টফোন", slug: "smartphone", icon: "smartphone" },
  { name: "গ্যাজেট রিভিউ", slug: "gadget", icon: "cpu" },
  { name: "সফটওয়্যার", slug: "software", icon: "code-2" },
  { name: "সাইবার সিকিউরিটি", slug: "security", icon: "shield-check" },
  { name: "স্টার্টআপ", slug: "startup", icon: "rocket" },
];

const IMG = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

const POSTS_DATA = [
  {
    title: "চ্যাটজিপিটি থেকে জেমিনি: ২০২৬ সালে AI যুদ্ধের নতুন মোড়",
    slug: "ai-race-2026-chatgpt-vs-gemini",
    excerpt:
      "কৃত্রিম বুদ্ধিমত্তার জগতে বড় বড় প্রতিষ্ঠানগুলোর প্রতিযোগিতা এখন তুঙ্গে। কোন মডেল এগিয়ে, আর ভবিষ্যতে কী অপেক্ষা করছে আমাদের জন্য?",
    coverImage: IMG("photo-1677442136019-21780ecad995"),
    category: "ai",
    author: "রাফিউল ইসলাম",
    tags: "AI,ChatGPT,Gemini,Machine Learning",
    views: 15400,
    readMinutes: 7,
    isTrending: true,
    isFeatured: true,
  },
  {
    title: "স্যামসাং গ্যালাক্সি S26 আল্ট্রা: ফিচার ফাঁস, দাম ও রিলিজ ডেট",
    slug: "samsung-galaxy-s26-ultra-leak",
    excerpt:
      "স্যামসাংয়ের আসন্ন ফ্ল্যাগশিপ ফোন নিয়ে ইতিমধ্যে ফাঁস হয়েছে নানা তথ্য। ক্যামেরা, প্রসেসর ও ডিজাইনে কী কী পরিবর্তন আসছে দেখে নেওয়া যাক।",
    coverImage: IMG("photo-1610945415295-d9bbf067e59c"),
    category: "smartphone",
    author: "তানভীর আহমেদ",
    tags: "Samsung,Smartphone,Galaxy S26",
    views: 12300,
    readMinutes: 6,
    isTrending: true,
    isFeatured: false,
  },
  {
    title: "অ্যাপল ভিশন প্রো ২: মিক্সড রিয়েলিটির নতুন যুগ",
    slug: "apple-vision-pro-2-review",
    excerpt:
      "অ্যাপলের দ্বিতীয় প্রজন্মের ভিশন প্রো হেডসেট বাজারে এসেছে হালকা ওজন আর উন্নত ডিসপ্লে নিয়ে। বিস্তারিত রিভিউ পড়ুন।",
    coverImage: IMG("photo-1622979135225-d2ba269cf1ac"),
    category: "gadget",
    author: "নুসরাত জাহান",
    tags: "Apple,Vision Pro,AR,VR",
    views: 9800,
    readMinutes: 8,
    isTrending: true,
    isFeatured: false,
  },
  {
    title: "লিনাক্স কার্নেল ৭.০: নতুন কী আসছে ডেভেলপারদের জন্য",
    slug: "linux-kernel-7-release",
    excerpt:
      "লিনাক্স কার্নেলের নতুন সংস্করণে যুক্ত হয়েছে পারফরম্যান্স বুস্ট, নিরাপত্তা উন্নয়ন এবং নতুন হার্ডওয়্যার সাপোর্ট। ডেভেলপারদের জন্য বিস্তারিত গাইড।",
    coverImage: IMG("photo-1518432031352-d6fc5c10da5a"),
    category: "software",
    author: "সাকিব হাসান",
    tags: "Linux,Open Source,Kernel",
    views: 6700,
    readMinutes: 9,
    isTrending: false,
    isFeatured: false,
  },
  {
    title: "র‍্যানসমওয়্যার হামলা থেকে বাঁচার ৭টি কার্যকর উপায়",
    slug: "ransomware-protection-tips",
    excerpt:
      "সাইবার অপরাধীদের নতুন কৌশল থেকে বাঁচতে আপনার ডিভাইস ও ডেটা সুরক্ষিত রাখার সহজ কিন্তু কার্যকর কিছু পদ্ধতি জেনে নিন।",
    coverImage: IMG("photo-1550751827-4bd374c3f58b"),
    category: "security",
    author: "ফারহানা আক্তার",
    tags: "Cybersecurity,Ransomware,Privacy",
    views: 11200,
    readMinutes: 6,
    isTrending: true,
    isFeatured: false,
  },
  {
    title: "বাংলাদেশি স্টার্টআপ 'টেকনোভা' পেল ১০ মিলিয়ন ডলার বিনিয়োগ",
    slug: "bangladeshi-startup-technova-funding",
    excerpt:
      "দেশীয় প্রযুক্তি খাতে নতুন মাইলফলক স্থাপন করলো স্টার্টআপ টেকনোভা। আন্তর্জাতিক বিনিয়োগকারীদের কাছ থেকে পেয়েছে বড় অঙ্কের ফান্ডিং।",
    coverImage: IMG("photo-1519389950473-47ba0277781c"),
    category: "startup",
    author: "ইমরান খান",
    tags: "Startup,Bangladesh,Funding",
    views: 8900,
    readMinutes: 5,
    isTrending: false,
    isFeatured: false,
  },
  {
    title: "রিয়েক্ট ১৯ বনাম নেক্সট.জেএস ১৬: কোনটি বেছে নেবেন?",
    slug: "react-19-vs-nextjs-16",
    excerpt:
      "ওয়েব ডেভেলপমেন্টে নতুন দুটি বড় আপডেট এসেছে। কর্মক্ষমতা, নতুন ফিচার এবং ব্যবহারিক দিক বিবেচনায় বিস্তারিত তুলনামূলক আলোচনা।",
    coverImage: IMG("photo-1633356122544-f134324a6cee"),
    category: "software",
    author: "সাকিব হাসান",
    tags: "React,Next.js,Web Development",
    views: 14100,
    readMinutes: 10,
    isTrending: true,
    isFeatured: false,
  },
  {
    title: "টেসলা অপটিমাস রোবট: বাস্তবে কতটা কার্যকর?",
    slug: "tesla-optimus-robot-review",
    excerpt:
      "টেসলার হিউম্যানয়েড রোবট অপটিমাস নিয়ে চলছে ব্যাপক আলোচনা। কারখানায় বাস্তব ব্যবহারের অভিজ্ঞতা কেমন হলো, জানুন বিস্তারিত।",
    coverImage: IMG("photo-1485827404703-89b55fcc595e"),
    category: "ai",
    author: "রাফিউল ইসলাম",
    tags: "Tesla,Robotics,AI",
    views: 10500,
    readMinutes: 7,
    isTrending: false,
    isFeatured: false,
  },
  {
    title: "ফোল্ডেবল ফোনের ৫ বছর: কতটা এগিয়েছে প্রযুক্তি",
    slug: "foldable-phones-5-years-progress",
    excerpt:
      "ফোল্ডেবল স্মার্টফোন প্রযুক্তি বাজারে আসার পর গত পাঁচ বছরে কী কী পরিবর্তন এসেছে, আর কোন ব্র্যান্ড সবচেয়ে এগিয়ে তার বিশ্লেষণ।",
    coverImage: IMG("photo-1592286927505-1def25115558"),
    category: "smartphone",
    author: "তানভীর আহমেদ",
    tags: "Foldable,Smartphone,Innovation",
    views: 7300,
    readMinutes: 6,
    isTrending: false,
    isFeatured: false,
  },
  {
    title: "কোয়ান্টাম কম্পিউটিং: আগামী দশকে যা বদলে দেবে সব কিছু",
    slug: "quantum-computing-next-decade",
    excerpt:
      "কোয়ান্টাম কম্পিউটার প্রযুক্তি কীভাবে ওষুধ আবিষ্কার, ক্রিপ্টোগ্রাফি ও কৃত্রিম বুদ্ধিমত্তার জগতে বিপ্লব আনতে যাচ্ছে তার বিস্তারিত পর্যালোচনা।",
    coverImage: IMG("photo-1635070041078-e363dbe005cb"),
    category: "gadget",
    author: "নুসরাত জাহান",
    tags: "Quantum Computing,Future Tech",
    views: 5600,
    readMinutes: 11,
    isTrending: false,
    isFeatured: false,
  },
  {
    title: "পাসওয়ার্ড ছাড়াই লগইন: পাসকি প্রযুক্তির খুঁটিনাটি",
    slug: "passkey-passwordless-login-guide",
    excerpt:
      "পাসওয়ার্ডের ঝক্কি এড়াতে বিশ্বজুড়ে জনপ্রিয় হয়ে উঠছে পাসকি প্রযুক্তি। এটি কীভাবে কাজ করে এবং কতটা নিরাপদ তা জেনে নিন।",
    coverImage: IMG("photo-1563986768609-322da13575f3"),
    category: "security",
    author: "ফারহানা আক্তার",
    tags: "Passkey,Security,Login",
    views: 4200,
    readMinutes: 5,
    isTrending: false,
    isFeatured: false,
  },
  {
    title: "ঢাকার তরুণ উদ্যোক্তাদের হাত ধরে গড়ে উঠছে নতুন AI ইকোসিস্টেম",
    slug: "dhaka-youth-ai-ecosystem",
    excerpt:
      "রাজধানীর তরুণ প্রজন্ম কৃত্রিম বুদ্ধিমত্তা নিয়ে গড়ে তুলছেন একের পর এক উদ্ভাবনী প্রকল্প। কেমন হবে বাংলাদেশের AI ভবিষ্যৎ?",
    coverImage: IMG("photo-1521737604893-d14cc237f11d"),
    category: "startup",
    author: "ইমরান খান",
    tags: "AI,Startup,Bangladesh",
    views: 3900,
    readMinutes: 6,
    isTrending: false,
    isFeatured: false,
  },
];

async function main() {
  console.log("Seeding database...");

  const insertedCategories = await db
    .insert(categories)
    .values(CATEGORY_DATA)
    .onConflictDoNothing({ target: categories.slug })
    .returning();

  const allCategories =
    insertedCategories.length > 0
      ? insertedCategories
      : await db.select().from(categories);

  const categoryMap = new Map(allCategories.map((c) => [c.slug, c.id]));

  const postsToInsert = POSTS_DATA.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: `${p.excerpt}\n\n${p.excerpt} বিস্তারিত বিশ্লেষণ, বিশেষজ্ঞদের মতামত এবং ভবিষ্যৎ সম্ভাবনার আলোকে এই প্রতিবেদনে আমরা তুলে ধরেছি প্রযুক্তির সর্বশেষ ধারা। প্রযুক্তির দর্পণের পাঠকদের জন্য আমরা সবসময় চেষ্টা করি নির্ভরযোগ্য ও তথ্যবহুল কনটেন্ট উপস্থাপন করতে।`,
    coverImage: p.coverImage,
    author: p.author,
    categoryId: categoryMap.get(p.category)!,
    tags: p.tags,
    views: p.views,
    readMinutes: p.readMinutes,
    isTrending: p.isTrending,
    isFeatured: p.isFeatured,
  }));

  await db.insert(posts).values(postsToInsert).onConflictDoNothing({ target: posts.slug });

  console.log("Seed completed.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

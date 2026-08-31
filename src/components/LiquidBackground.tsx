"use client";

export default function LiquidBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0a0f1d]">
      {/* base grid glow */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] animate-blob rounded-full bg-cyan-400/25 blur-[120px]" />
      <div
        className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] animate-blob rounded-full bg-purple-600/25 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] animate-blob rounded-full bg-cyan-500/15 blur-[130px]"
        style={{ animationDelay: "-11s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-[22rem] w-[22rem] animate-blob rounded-full bg-fuchsia-500/15 blur-[110px]"
        style={{ animationDelay: "-3s" }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,15,29,0.4)_60%,rgba(10,15,29,0.95)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1d]" />
    </div>
  );
}

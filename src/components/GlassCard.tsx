"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
  as?: "div";
};

export default function GlassCard({ children, className = "", glowClassName = "" }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`glass-panel relative rounded-3xl ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ${active ? "opacity-100" : ""} ${glowClassName}`}
        style={{
          background: `radial-gradient(320px circle at ${pos.x}% ${pos.y}%, rgba(0, 243, 255, 0.16), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

interface Props {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function TipsArticleShell({ label, title, description, children }: Props) {
  return (
    <main className="min-h-screen">
      <div className="relative pt-24 pb-10 overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(212,175,55,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(212,175,55,0.12) 0%, transparent 50%)",
        }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-gold/5 animate-pulse-glow" style={{ animationDuration: "6s" }} />
          <div className="absolute top-20 -left-20 w-60 h-60 rounded-full border border-gold/5 animate-pulse-glow" style={{ animationDuration: "8s", animationDelay: "2s" }} />
        </div>
        <div className="max-w-[1728px] mx-auto px-6 relative z-10">
          <div className="animate-fade-in-instant">
            <Link href="/tips" className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#e8c75a] text-sm font-medium transition-all duration-300 mb-8 group">
              <span className="w-7 h-7 rounded-full border border-[#d4af37]/30 flex items-center justify-center group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/50 transition-all duration-300">
                <ArrowLeft size={13} />
              </span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">Back to all tips</span>
            </Link>
          </div>
          <div className="max-w-3xl">
            <span className="animate-fade-in-instant text-gold text-sm font-medium tracking-[0.15em] uppercase mb-4 flex items-center gap-2" style={{ animationDelay: "60ms" }}>
              <Sparkles size={14} /> {label}
            </span>
            <h1 className="animate-fade-in-instant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white" style={{ animationDelay: "120ms" }}>
              {title}
            </h1>
            <p className="animate-fade-in-instant text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl" style={{ animationDelay: "180ms" }}>
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1728px] mx-auto px-6 pb-20">
        {children}
      </div>
    </main>
  );
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform will-change-opacity ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 sm:p-5 hover:border-[#d4af37]/20 hover:shadow-[0_0_20px_-8px_rgba(212,175,55,0.15)] hover:-translate-y-0.5 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Banknote, Utensils, Bus, MapPin, Shield, Waves, Sun, Globe, Languages, Shirt, Smartphone, HelpCircle, Play } from "lucide-react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.unobserve(el); }
      },
      { threshold: 0, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

const breakdown = [
  { label: "Accommodation", amount: 72000, percent: 45, color: "#d4af37", icon: Banknote },
  { label: "Meals", amount: 28000, percent: 17.5, color: "#f59e0b", icon: Utensils },
  { label: "Transport", amount: 32000, percent: 20, color: "#06b6d4", icon: Bus },
  { label: "Tours & Activities", amount: 20000, percent: 12.5, color: "#8b5cf6", icon: MapPin },
  { label: "Guide & Support", amount: 8000, percent: 5, color: "#10b981", icon: Shield },
];

const vibeTracks = [
  { day: 1, title: "Arrival & River Cruise", vibe: "Scenic", short: "City lights from the water", song: "Podmoskovnye Vechera", artist: "Traditional" },
  { day: 2, title: "Red Square, Kremlin & GUM", vibe: "Iconic", short: "Where history meets grandeur", song: "Moscow Never Sleeps", artist: "DJ Smash" },
  { day: 3, title: "Limousine, Rooftop & Nightlife", vibe: "Glamorous", short: "Moscow by night, in style", song: "Krasivo", artist: "Jony" },
  { day: 4, title: "Stalin's Bunker & Arbat", vibe: "Hidden", short: "Secrets beneath the city", song: "Sudno", artist: "Molchat Doma" },
  { day: 5, title: "Viewpoints & Horror Quest", vibe: "Thrilling", short: "Heights, chills & adrenaline", song: "Thunder", artist: "Imagine Dragons" },
  { day: 6, title: "VDNKh, Izmailovo & Farewell", vibe: "Vibrant", short: "Fairytale rooftops & farewells", song: "Krysha", artist: "DDT" },
  { day: 7, title: "Departure", vibe: "Peaceful", short: "Until next time, Moscow", song: "Spokoynaya Noch", artist: "Kino" },
];

const smartPack = [
  { icon: Sun, label: "Weather", detail: "15–25°C August", note: "Pack layers, jacket for evenings" },
  { icon: Globe, label: "Tipping", detail: "10–15% restaurants", note: "Small change for hotel staff & guides" },
  { icon: Smartphone, label: "SIM", detail: "eSIM before you fly", note: "Airalo, 10 GB ~₹800" },
  { icon: Languages, label: "Language", detail: "Learn the basics", note: "Spasiba · Zdravstvuyte · Da/Nyet" },
  { icon: Shirt, label: "Dress Code", detail: "Smart casual", note: "Comfortable shoes for walking tours" },
];

const vibeBadge: Record<string, string> = {
  Scenic: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Iconic: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Glamorous: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  Hidden: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  Thrilling: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  Vibrant: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  Peaceful: "bg-teal-500/15 text-teal-300 border-teal-500/20",
};

function DonutChart({ inView }: { inView: boolean }) {
  const circumference = 2 * Math.PI * 60;
  const gap = 3;
  let offset = 0;
  const segments = breakdown.map((item) => {
    const length = (item.percent / 100) * circumference - gap;
    const startOffset = offset;
    offset += (item.percent / 100) * circumference;
    return { ...item, length, startOffset };
  });

  return (
    <div className="group relative w-44 h-44 sm:w-52 sm:h-52 mx-auto">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90 drop-shadow-[0_0_20px_rgba(212,175,55,0.08)]">
        {segments.map((seg) => (
          <circle
            key={seg.label}
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke={seg.color}
            strokeWidth="16"
            strokeDasharray={`${seg.length} ${circumference - seg.length}`}
            strokeDashoffset={inView ? -seg.startOffset : circumference}
            strokeLinecap="round"
            className="transition-all duration-[1.4s] ease-out group-hover:brightness-110"
            style={{ transitionDelay: "200ms" }}
          />
        ))}
        <circle cx="70" cy="70" r="48" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="1" strokeDasharray="3 6" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedTotal inView={inView} />
      </div>
    </div>
  );
}

function AnimatedTotal({ inView }: { inView: boolean }) {
  const total = useCountUp(160000, inView);
  return (
    <>
      <span className="text-white/30 text-[10px] uppercase tracking-[0.15em]">Total</span>
      <span className="text-gold text-xl sm:text-2xl font-bold tabular-nums tracking-tight">
        ₹{total.toLocaleString("en-IN")}
      </span>
    </>
  );
}

export default function TripBrief() {
  const { ref, inView } = useInView();
  const reducedMotion = useReducedMotion();

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .trip-brief * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <div
        ref={ref}
        className={`trip-brief relative rounded-2xl overflow-hidden transition-all duration-700 ease-out will-change-transform will-change-opacity ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Gold gradient border overlay */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.03), rgba(212,175,55,0.08))",
          mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }} />

        {/* Background base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#161412] via-[#12100e] to-[#0c0a0a]" />

        {/* Subtle gold radial glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-[0.04]" style={{
          background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
        }} />

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="px-6 pt-6 sm:px-8 sm:pt-8 pb-5 border-b border-white/[0.04]">
            <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold" />
              The Trip Brief
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">Moscow Express</h2>
            <p className="text-white/35 text-xs sm:text-sm mt-1 max-w-lg">Everything you need to know, at a glance</p>
          </div>

          <div className="p-6 sm:p-8 space-y-10">
            {/* Row: Breakdown + Tracklist */}
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
              {/* Price Breakdown */}
              <div className="lg:col-span-2">
                <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-5 flex items-center gap-2.5">
                  <span className="w-0.5 h-3.5 bg-gold/60 rounded-full" />
                  <Banknote size={13} className="text-gold" />
                  Price Breakdown
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  <DonutChart inView={inView} />
                  <div className="space-y-2 w-full">
                    {breakdown.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="group/row relative flex items-center justify-between gap-3 text-xs rounded-lg px-2.5 py-1.5 -mx-2.5 transition-all duration-300 cursor-default hover:bg-white/[0.04]"
                        >
                          {/* Hover bar */}
                          <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-transparent transition-all duration-300 group-hover/row:bg-gold/40" />
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.15)]" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}40` }} />
                            <Icon size={12} className="text-white/30 shrink-0 group-hover/row:text-gold/60 transition-colors duration-300" />
                            <span className="text-white/60 truncate group-hover/row:text-white/80 transition-colors duration-300">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-white/25 w-7 text-right tabular-nums group-hover/row:text-white/50 transition-colors duration-300">{item.percent}%</span>
                            <span className="text-white font-semibold w-14 text-right tabular-nums">₹{item.amount.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between gap-3 text-xs pt-3 border-t border-white/[0.04] mt-3 px-2.5">
                      <span className="text-white/40 font-medium">Total per person</span>
                      <span className="text-gold font-bold tabular-nums text-base">₹1,60,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Vibe Tracklist */}
              <div className="lg:col-span-3">
                <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-5 flex items-center gap-2.5">
                  <span className="w-0.5 h-3.5 bg-gold/60 rounded-full" />
                  <Waves size={13} className="text-gold" />
                  Daily Vibe Tracklist
                </h3>
                <div className="space-y-1">
                  {vibeTracks.map((track, i) => {
                    const delay = reducedMotion ? 0 : i * 70;
                    return (
                      <div
                        key={track.day}
                        className="group/track relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] transition-all duration-300 cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.08] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        {/* Play button hint */}
                        <div className="w-6 h-6 rounded-full border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover/track:border-gold/40 group-hover/track:bg-gold/10">
                          <span className="text-white/20 text-[11px] font-mono group-hover/track:hidden">{String(track.day).padStart(2, "0")}</span>
                          <Play size={10} className="text-gold hidden group-hover/track:block" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white text-xs font-medium group-hover/track:text-white transition-colors duration-300">{track.title}</span>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border transition-all duration-300 ${vibeBadge[track.vibe]}`}>
                              {track.vibe}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/25 mt-0.5 group-hover/track:text-white/40 transition-colors duration-300">{track.song} · {track.artist}</p>
                        </div>
                        <span className="text-white/20 text-[10px] text-right leading-tight max-w-[120px] hidden sm:block group-hover/track:text-white/35 transition-colors duration-300">{track.short}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Smart Pack */}
            <div className="pt-8 border-t border-white/[0.04]">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-5 flex items-center gap-2.5">
                <span className="w-0.5 h-3.5 bg-gold/60 rounded-full" />
                <HelpCircle size={13} className="text-gold" />
                Smart Pack
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {smartPack.map((item, i) => {
                  const Icon = item.icon;
                  const delay = reducedMotion ? 0 : 400 + i * 100;
                  return (
                    <div
                      key={item.label}
                      className="group/sp group relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 cursor-default hover:bg-white/[0.06] hover:border-gold/15 hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.12)] hover:-translate-y-0.5"
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold/[0.08] flex items-center justify-center mb-3 transition-all duration-300 group-hover/sp:bg-gold/[0.15] group-hover/sp:shadow-[0_0_20px_-4px_rgba(212,175,55,0.15)]">
                        <Icon size={16} className="text-gold/70 transition-all duration-300 group-hover/sp:text-gold" />
                      </div>
                      <p className="text-white font-semibold text-xs mb-0.5 group-hover/sp:text-white transition-colors duration-300">{item.label}</p>
                      <p className="text-gold text-[10px] font-medium mb-1">{item.detail}</p>
                      <p className="text-white/25 text-[10px] leading-relaxed transition-all duration-300 group-hover/sp:text-white/40">{item.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

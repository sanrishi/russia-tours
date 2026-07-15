"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Banknote, Utensils, Bus, MapPin, Shield, Waves, Sun, Globe, Languages, Shirt, Smartphone, Play, BookOpen, Sparkles } from "lucide-react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
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
      setValue(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

const moodBoard = [
  { img: "/day1-river.jpg", vibe: "Scenic", caption: "City lights from the river", span: "short", song: "Podmoskovnye Vechera", artist: "Anna Netrebko", url: "https://www.youtube.com/watch?v=r3-z_KKsYhA", tip: "/tips/itineraries" },
  { img: "/day2-red-square.jpg", vibe: "Iconic", caption: "Where history meets grandeur", span: "tall", song: "Moscow Never Sleeps", artist: "DJ Smash", url: "https://www.youtube.com/watch?v=T5Qnipn6cZc", tip: "/tips/first-time" },
  { img: "/day3-rooftop.jpg", vibe: "Glamorous", caption: "Moscow by night, in style", span: "short", song: "Komety", artist: "Jony", url: "https://www.youtube.com/watch?v=dON9SgBPQkU", tip: "/tips/practical-tips" },
  { img: "/day4-arbat.jpg", vibe: "Hidden", caption: "Secrets beneath the city", span: "tall", song: "Sudno", artist: "Molchat Doma", url: "https://www.youtube.com/watch?v=91GTuZWCQmY", tip: "/tips/safety" },
  { img: "/day5-viewpoint.jpg", vibe: "Thrilling", caption: "Heights, chills & adrenaline", span: "short", song: "Thunder", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=fKopy74weus", tip: "/tips/transport" },
  { img: "/day6-vdnkh.jpg", vibe: "Vibrant", caption: "Fairytale rooftops & farewells", span: "tall", song: "Chto takoe osen", artist: "DDT", url: "https://www.youtube.com/watch?v=5KC-iscJtsI", tip: "/tips/currency" },
  { img: "/day7-departure.jpg", vibe: "Peaceful", caption: "Until next time, Moscow", span: "short", song: "Spokoynaya Noch", artist: "Kino", url: "https://www.youtube.com/watch?v=SOYkG5VMhp8", tip: "/tips/visa-guide" },
];

const vlogData = [
  { url: "https://www.youtube.com/watch?v=H6lTf-X9-mE", title: "Moscow River Tram", creator: "Travelling with Russell" },
  { url: "https://www.youtube.com/watch?v=iJ_57qfeJCQ", title: "Red Square Walk", creator: "Valeria Sheffield" },
  { url: "https://www.youtube.com/watch?v=I6AJUiSZQH4", title: "Moscow After Midnight", creator: "Window to Moscow" },
  { url: "https://www.youtube.com/watch?v=fXeaK7bDoxE", title: "Moscow Metro Tour", creator: "Englishman In Russia" },
  { url: "https://www.youtube.com/watch?v=CRbCvci23gQ", title: "Sparrow Hills Cable Car", creator: "Wanderlust forever" },
  { url: "https://www.youtube.com/watch?v=EMNxmoUZilU", title: "VDNKh: Soviet Dreams", creator: "Setarko" },
  { url: "https://www.youtube.com/watch?v=4BYV7ZirMoI", title: "Domodedovo Departure", creator: "Feel Art Man" },
];

const breakdown = [
  { label: "Accommodation", amount: 72000, percent: 45, color: "#d4af37", icon: Banknote, desc: "6 nights in 3-4★ hotels" },
  { label: "Meals", amount: 28000, percent: 17.5, color: "#f59e0b", icon: Utensils, desc: "Daily breakfasts + lunches" },
  { label: "Transport", amount: 32000, percent: 20, color: "#06b6d4", icon: Bus, desc: "Airport, limousine, minibus" },
  { label: "Activities", amount: 20000, percent: 12.5, color: "#8b5cf6", icon: MapPin, desc: "Cruise, bunker, cable car" },
  { label: "Support", amount: 8000, percent: 5, color: "#10b981", icon: Shield, desc: "Guide, visa help, photos" },
];

const smartPack = [
  { icon: Sun, label: "Weather", detail: "15–25°C", note: "Layers + jacket for evenings", tip: "/tips/weather-packing" },
  { icon: Globe, label: "Tipping", detail: "10–15%", note: "Small change for hotel staff", tip: "/tips/currency" },
  { icon: Smartphone, label: "SIM", detail: "eSIM", note: "Airalo, 10 GB ~₹800", tip: "/tips/connectivity" },
  { icon: Languages, label: "Language", detail: "Basics", note: "Spasiba · Zdravstvuyte", tip: "/tips/phrasebook" },
  { icon: Shirt, label: "Dress", detail: "Smart casual", note: "Comfortable walking shoes", tip: "/tips/practical-tips" },
];

const vibeBadge: Record<string, string> = {
  Scenic: "bg-emerald-500/35 text-emerald-100 border-emerald-400/40 shadow-lg shadow-emerald-900/40",
  Iconic: "bg-amber-500/35 text-amber-100 border-amber-400/40 shadow-lg shadow-amber-900/40",
  Glamorous: "bg-rose-500/35 text-rose-100 border-rose-400/40 shadow-lg shadow-rose-900/40",
  Hidden: "bg-violet-500/35 text-violet-100 border-violet-400/40 shadow-lg shadow-violet-900/40",
  Thrilling: "bg-orange-500/35 text-orange-100 border-orange-400/40 shadow-lg shadow-orange-900/40",
  Vibrant: "bg-sky-500/35 text-sky-100 border-sky-400/40 shadow-lg shadow-sky-900/40",
  Peaceful: "bg-teal-500/35 text-teal-100 border-teal-400/40 shadow-lg shadow-teal-900/40",
};
const vibeGradients: Record<string, string> = {
  Scenic: "from-emerald-900/70 via-emerald-900/20 to-transparent",
  Iconic: "from-amber-900/70 via-amber-900/20 to-transparent",
  Glamorous: "from-rose-900/70 via-rose-900/20 to-transparent",
  Hidden: "from-violet-900/70 via-violet-900/20 to-transparent",
  Thrilling: "from-orange-900/70 via-orange-900/20 to-transparent",
  Vibrant: "from-sky-900/70 via-sky-900/20 to-transparent",
  Peaceful: "from-teal-900/70 via-teal-900/20 to-transparent",
};

function DonutChart({ inView }: { inView: boolean }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const gap = 2;
  let offset = 0;
  const segments = breakdown.map((item) => {
    const length = (item.percent / 100) * circumference - gap;
    const startOffset = offset;
    offset += (item.percent / 100) * circumference;
    return { ...item, length, startOffset };
  });

  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        {segments.map((seg) => (
          <circle key={seg.label} cx="50" cy="50" r={r} fill="none" stroke={seg.color} strokeWidth="8"
            strokeDasharray={`${seg.length} ${circumference - seg.length}`}
            strokeDashoffset={inView ? -seg.startOffset : circumference}
            strokeLinecap="round"
            className="transition-all duration-[1.4s] ease-out"
            style={{ transitionDelay: "200ms" }}
          />
        ))}
        <circle cx="50" cy="50" r={r - 5} fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="1" strokeDasharray="2 4" />
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
      <span className="text-white/35 text-[9px] uppercase tracking-widest font-medium">Total</span>
      <span className="text-gold text-sm sm:text-base font-bold tabular-nums leading-tight">₹{total.toLocaleString("en-IN")}</span>
    </>
  );
}

function GlassHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <div className="h-5 w-[2px] rounded-full bg-gradient-to-b from-gold/60 to-transparent" />
      <Sparkles size={12} className="text-gold/60" />
      <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-gold via-amber-300 to-rose-300 bg-clip-text text-transparent">{label}</span>
    </div>
  );
}

function PriceBar({ percent, color, delay }: { percent: number; color: string; delay: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(percent), delay);
    return () => clearTimeout(t);
  }, [percent, delay]);
  return (
    <div className="h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
      <div className="h-full rounded-full transition-all duration-[1s] ease-out" style={{ width: `${w}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}60` }} />
    </div>
  );
}

export default function TripExperience() {
  const { ref, inView } = useInView();
  const reduced = useReducedMotion();

  return (
    <>
      <style>{`@media (prefers-reduced-motion:reduce){.trip-x *{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}`}</style>
      <div ref={ref} className={`trip-x transition-all duration-700 ease-out will-change-transform will-change-opacity ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* ─── MOOD BOARD ─── */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-xl mb-5 overflow-hidden">
          <div className="relative px-6 pt-6 sm:px-8 sm:pt-8 pb-2">
            <span className="font-heading text-xs tracking-[0.25em] uppercase text-gold">The Moscow Express</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight">7 Days · Small Group · 1 Adventure</h2>
            <p className="font-sans text-white/50 text-[11px] mt-2 tracking-wide">Tap any card to watch a travel vlog from that day</p>
          </div>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="columns-2 md:columns-3 gap-3 space-y-3">
              {moodBoard.map((item, i) => {
                const delay = reduced ? 0 : i * 80;
                return (
                  <div key={item.vibe} onClick={() => window.open(vlogData[i].url, "_blank", "noopener")} className={`break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    style={{ transitionDelay: `${delay}ms` }}>
                    <div className={`relative ${item.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                      <img src={item.img} alt="" className="absolute inset-0 w-full h-full object-cover transition-all duration-[1s] ease-out group-hover:scale-105 group-hover:saturate-[1.1]" loading="lazy" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${vibeGradients[item.vibe]} transition-opacity duration-500`} />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                      <div className="absolute top-3 left-3">
                        <span className={`font-heading text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-lg backdrop-blur-sm ${vibeBadge[item.vibe]}`}>{item.vibe}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="font-heading text-white text-sm sm:text-base font-semibold leading-snug mb-1.5 line-clamp-1">{item.caption}</p>
                        <p onClick={(e) => { e.stopPropagation(); window.open(vlogData[i].url, "_blank", "noopener"); }} className="font-sans text-white/50 text-xs flex items-center gap-1 sm:gap-1.5 cursor-pointer hover:text-gold/80 transition-colors duration-300">
                          <Play size={11} className="text-gold/70 shrink-0" />
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-gold/60">Vlog</span>
                          <span className="hidden sm:inline"> · {vlogData[i].title} · {vlogData[i].creator}</span>
                        </p>
                        <Link href={item.tip} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-semibold uppercase tracking-widest text-gold/60 hover:text-gold transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                          <BookOpen size={10} /> Tips
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </div>

        {/* ─── THE DETAILS ─── */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-xl mb-5 overflow-hidden">
        <section className="mb-5">
          <div className="flex items-center gap-3 mb-5 px-1">
            <span className="w-1 h-4 rounded-full bg-gold/40" />
            <span className="font-heading text-white/60 text-xs font-semibold uppercase tracking-[0.2em]">The Details</span>
          </div>

          <div className="space-y-4">
            {/* ─── PRICE BREAKDOWN CARD ─── */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black/50 backdrop-blur-xl p-6 sm:p-7">
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #d4af37 0%, transparent 70%)" }} />
              <div className="relative">
                <GlassHeader label="Price Breakdown" />

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                  <DonutChart inView={inView} />
                  <div className="w-full space-y-3">
                    {breakdown.map((item, i) => {
                      const delay = reduced ? 0 : 300 + i * 80;
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="group/row transition-all duration-500 ease-out" style={{ transitionDelay: `${delay}ms` }}>
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}60` }} />
                              <Icon size={13} className="text-white/40 shrink-0" />
                              <span className="font-sans text-sm text-white/80 truncate">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="font-sans text-xs text-white/30 tabular-nums">{item.percent}%</span>
                              <span className="font-sans text-sm text-white font-semibold tabular-nums w-16 text-right">₹{item.amount.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                          <PriceBar percent={item.percent} color={item.color} delay={400 + i * 80} />
                          <p className="font-sans text-[11px] text-white/35 mt-0.5 ml-4">{item.desc}</p>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] mt-4">
                      <span className="font-sans text-xs text-white/50 font-medium">Total per person</span>
                      <span className="font-heading text-gold font-bold text-base tabular-nums">₹1,60,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SOUNDTRACK CARD ─── */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black/50 backdrop-blur-xl p-6 sm:p-7">
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #d4af37 0%, transparent 70%)" }} />
              <div className="relative">
                <GlassHeader label="Trip Soundtrack" />
                <p className="font-sans text-white/50 text-[11px] -mt-3 mb-4 tracking-wide">Click any track to hear the song on YouTube</p>

                <div className="space-y-1.5">
                  {moodBoard.map((item, i) => {
                    const delay = reduced ? 0 : i * 50;
                    return (
                      <div key={item.vibe} onClick={() => window.open(item.url, "_blank", "noopener")}
                        className="group/track relative flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/[0.04] bg-white/[0.02] transition-all duration-300 cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.08] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                        style={{ transitionDelay: `${delay}ms` }}>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-white/[0.06] shrink-0">
                          <img src={item.img} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-sans text-sm sm:text-base text-white/90 font-medium">{item.caption}</span>
                            <span className={`font-heading text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${vibeBadge[item.vibe]}`}>{item.vibe}</span>
                          </div>
                          <p className="font-sans text-xs text-white/40 mt-0.5 group-hover/track:text-white/50 transition-colors duration-300">{item.song} · {item.artist}</p>
                        </div>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover/track:border-gold/40 group-hover/track:bg-gold/10">
                          <Play size={12} className="text-white/30 group-hover/track:text-gold transition-colors duration-300" />
                        </div>
                      </div>
                    );
                  })}
            </div>
            </div>
            </div>
          </div>
        </section>
        </div>

        {/* ─── KNOW BEFORE YOU GO ─── */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-xl overflow-hidden">
            <section className="p-6 sm:p-7">
          <div className="relative">
            <GlassHeader label="Know Before You Go" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {smartPack.map((item, i) => {
                const Icon = item.icon;
                const delay = reduced ? 0 : 300 + i * 80;
                return (
                  <div key={item.label} className="group/sp relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 cursor-default hover:bg-white/[0.06] hover:border-gold/15 hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.12)] hover:-translate-y-0.5"
                    style={{ transitionDelay: `${delay}ms` }}>
                    <div className="w-10 h-10 rounded-lg bg-gold/[0.08] flex items-center justify-center mb-3 transition-all duration-300 group-hover/sp:bg-gold/[0.15] group-hover/sp:shadow-[0_0_20px_-4px_rgba(212,175,55,0.15)]">
                      <Icon size={17} className="text-gold/70 transition-all duration-300 group-hover/sp:text-gold" />
                    </div>
                    <p className="font-heading text-white font-semibold text-sm mb-1">{item.label}</p>
                    <p className="font-sans text-gold text-xs font-medium mb-1.5">{item.detail}</p>
                    <p className="font-sans text-white/50 text-xs leading-relaxed group-hover/sp:text-white/60 transition-colors duration-300">{item.note}</p>
                    <Link href={item.tip} className="inline-flex items-center gap-1 mt-2.5 text-[9px] font-bold uppercase tracking-widest text-gold/50 hover:text-gold transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover/sp:opacity-100 sm:translate-y-1 sm:group-hover/sp:translate-y-0">
                      <BookOpen size={9} /> Read Tips
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        </div>
      </div>
    </>
  );
}

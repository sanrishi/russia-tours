"use client";

import { useEffect, useRef, useState } from "react";

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

const moods = [
  { day: 1, img: "/day1-river.webp", vibe: "Scenic", caption: "City lights from the river", span: "short" },
  { day: 2, img: "/day2-red-square.webp", vibe: "Iconic", caption: "Where history meets grandeur", span: "tall" },
  { day: 3, img: "/day3-rooftop.webp", vibe: "Glamorous", caption: "Moscow by night, in style", span: "short" },
  { day: 4, img: "/day4-arbat.webp", vibe: "Hidden", caption: "Secrets beneath the city", span: "tall" },
  { day: 5, img: "/day5-viewpoint.webp", vibe: "Thrilling", caption: "Heights, chills & adrenaline", span: "short" },
  { day: 6, img: "/day6-vdnkh.webp", vibe: "Vibrant", caption: "Fairytale rooftops & farewells", span: "tall" },
  { day: 7, img: "/day7-departure.webp", vibe: "Peaceful", caption: "Until next time, Moscow", span: "short" },
];

const vibeColors: Record<string, string> = {
  Scenic: "from-emerald-500/60 to-emerald-800/60",
  Iconic: "from-amber-500/60 to-amber-800/60",
  Glamorous: "from-rose-500/60 to-rose-800/60",
  Hidden: "from-violet-500/60 to-violet-800/60",
  Thrilling: "from-orange-500/60 to-orange-800/60",
  Vibrant: "from-sky-500/60 to-sky-800/60",
  Peaceful: "from-teal-500/60 to-teal-800/60",
};

export default function TripMoodBoard() {
  return (
    <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
      {moods.map((item, i) => (
        <MoodCard key={item.day} item={item} index={i} />
      ))}
    </div>
  );
}

function MoodCard({ item, index }: { item: typeof moods[0]; index: number }) {
  const { ref, inView } = useInView();
  const delay = index * 80;

  return (
    <div
      ref={ref}
      className={`break-inside-avoid relative rounded-2xl overflow-hidden border border-white/[0.06] group cursor-default transition-all duration-700 ease-out will-change-transform will-change-opacity ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`relative ${item.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
        <img
          src={item.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:saturate-[1.1]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/20 to-transparent" />

        {/* Vibe tag */}
        <div className="absolute top-3 left-3">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gradient-to-r ${vibeColors[item.vibe]} text-white/90 shadow-lg backdrop-blur-sm`}>
            {item.vibe}
          </span>
        </div>

        {/* Day number */}
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 text-[10px] font-bold">
          {item.day}
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-sm sm:text-base font-semibold leading-tight">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

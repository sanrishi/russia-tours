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

const days = [
  { day: 1, title: "Arrival & River Cruise", highlights: ["Airport meet & transfer", "Welcome river cruise", "City lights from Moskva River"], img: "/day1-river.jpg", desc: "Arrive at Moscow airport. Meet your guide and transfer to hotel. Evening welcome river cruise along the Moskva River." },
  { day: 2, title: "Red Square, Kremlin & GUM", highlights: ["Red Square & St. Basil's", "Kremlin grounds tour", "GUM department store", "Zaryadye Park"], img: "/day2-red-square.jpg", desc: "Full-day tour: Red Square, St. Basil's Cathedral, Kremlin grounds. Visit GUM and Zaryadye Park." },
  { day: 3, title: "Limousine, Rooftop & Nightlife", highlights: ["Limousine city tour", "Rooftop observation deck", "Evening nightlife"], img: "/day3-rooftop.jpg", desc: "Explore Moscow in style with a limousine ride. Rooftop panoramic views. Evening nightlife experience." },
  { day: 4, title: "Stalin's Bunker & Arbat", highlights: ["Cold War bunker tour", "Arbat Street stroll"], img: "/day4-arbat.jpg", desc: "Tour Stalin's Cold War bunker. Afternoon stroll through Arbat Street." },
  { day: 5, title: "Viewpoints & Horror Quest", highlights: ["Sparrow Hills viewpoint", "Moscow City skyline", "Horror quest activity"], img: "/day5-viewpoint.jpg", desc: "Moscow's best viewpoints. Afternoon horror quest group activity." },
  { day: 6, title: "VDNKh, Izmailovo & Farewell", highlights: ["VDNKh exhibition park", "Izmailovo Kremlin", "Cable car ride", "Farewell dinner"], img: "/day6-vdnkh.jpg", desc: "Explore VDNKh park, Izmailovo Kremlin. Cable car ride. Farewell dinner." },
  { day: 7, title: "Departure", highlights: ["Breakfast at hotel", "Airport transfer"], img: "/day7-departure.jpg", desc: "Breakfast at hotel. Transfer to airport for departure." },
];

export default function TripTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height + rect.top;
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / (total - window.innerHeight), 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Progress line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/5">
        <div className="w-full bg-gold/40 transition-none" style={{ height: `${scrollProgress * 100}%` }} />
      </div>

      <div className="space-y-24 sm:space-y-32">
        {days.map((day, i) => (
          <TimelineDay key={day.day} day={day} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineDay({ day, index }: { day: typeof days[0]; index: number }) {
  const { ref, inView } = useInView();
  const delay = index * 100;

  return (
    <div
      ref={ref}
      className="relative pl-12 sm:pl-14"
    >
      {/* Timeline dot */}
      <div className={`absolute left-[13px] top-6 w-[14px] h-[14px] rounded-full border-4 border-[#0c0a0a] z-10 transition-all duration-700 ease-out ${inView ? "bg-gold shadow-[0_0_16px_rgba(212,175,55,0.3)]" : "bg-gold/30 shadow-none"}`} />

      {/* Day label */}
      <div className={`text-gold text-xs font-bold tracking-[0.2em] uppercase mb-2 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ transitionDelay: `${delay}ms` }}>
        Day {day.day}
      </div>

      {/* Image card */}
      <div className={`relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#161412] transition-all duration-700 ease-out will-change-transform will-change-opacity ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${delay + 100}ms` }}>
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
          <img
            src={day.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out"
            style={{ transform: inView ? "scale(1)" : "scale(1.05)" }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/30 to-transparent" />
        </div>

        <div className={`p-5 sm:p-6 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${delay + 200}ms` }}>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
            {day.title}
          </h3>
          <ul className="space-y-1.5 mb-3">
            {day.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0 mt-2" />
                {h}
              </li>
            ))}
          </ul>
          <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
            {day.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

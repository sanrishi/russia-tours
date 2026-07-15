"use client";

import { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import Link from "next/link";

interface Festival {
  key: string;
  emoji: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  startMonth: number;
  endMonth: number;
  startDay: number;
  endDay: number;
}

const festivals: Festival[] = [
  {
    key: "diwali",
    emoji: "🪔",
    title: "Diwali Special",
    text: "Book your Russia trip this Diwali & get 10% off — limited seats!",
    cta: "Claim Offer",
    href: "/moscow-express#booking",
    startMonth: 10,
    endMonth: 11,
    startDay: 15,
    endDay: 15,
  },
  {
    key: "holi",
    emoji: "🎨",
    title: "Holi Special",
    text: "Celebrate Holi in Moscow! Book by March 31 & save ₹10,000 per person.",
    cta: "Book Now",
    href: "/moscow-express#booking",
    startMonth: 3,
    endMonth: 3,
    startDay: 1,
    endDay: 31,
  },
  {
    key: "onam",
    emoji: "🌺",
    title: "Onam Special",
    text: "Onam offers on Russia tours — ₹5,000 off per couple. Book now!",
    cta: "Get Offer",
    href: "/moscow-express#booking",
    startMonth: 8,
    endMonth: 9,
    startDay: 1,
    endDay: 15,
  },
  {
    key: "pongal",
    emoji: "🌾",
    title: "Pongal Special",
    text: "Start the year with a Russian adventure! ₹7,500 off per booking.",
    cta: "Claim Now",
    href: "/moscow-express#booking",
    startMonth: 1,
    endMonth: 1,
    startDay: 10,
    endDay: 20,
  },
  {
    key: "newyear",
    emoji: "🎄",
    title: "New Year in Moscow",
    text: "Ring in the new year on Red Square! Special group departure available.",
    cta: "View Trip",
    href: "/moscow-express",
    startMonth: 12,
    endMonth: 1,
    startDay: 20,
    endDay: 10,
  },
];

function getActiveFestival(): Festival | null {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  for (const f of festivals) {
    if (f.key === "newyear") {
      if (m === 12 && d >= f.startDay) return f;
      if (m === 1 && d <= f.endDay) return f;
    } else {
      if (m >= f.startMonth && m <= f.endMonth && d >= f.startDay && d <= f.endDay) return f;
    }
  }
  return null;
}

export default function FestivalBanner() {
  const festival = getActiveFestival();
  if (!festival) return null;

  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("festival-banner-dismissed");
    if (stored) setDismissed(true);
  }, []);

  if (dismissed) return null;

  return (
    <div className="absolute top-20 left-0 right-0 z-40">
        <div className="max-w-[1728px] mx-auto px-4 sm:px-6 py-3 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <Sparkles size={14} className="text-gold shrink-0" />
            <p className="text-white/80 text-sm leading-tight">
              <span className="text-gold font-semibold">{festival.title}</span>
              {" — "}{festival.text}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={festival.href}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold text-charcoal text-xs font-bold hover:brightness-110 transition-all"
            >
              {festival.cta}
            </Link>
            <button
              onClick={() => {
                setDismissed(true);
                try { localStorage.setItem("festival-banner-dismissed", "true"); } catch {}
              }}
              className="text-white/30 hover:text-white/60 transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
    </div>
  );
}
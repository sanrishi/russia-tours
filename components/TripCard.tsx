"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, IndianRupee, Clock, Utensils, Bus, Shield, Check, X, ArrowRight, MessageCircle, Calculator } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import type { MouseEvent } from "react";

interface Day {
  day: number;
  title: string;
  meals: string;
  transport: string;
  description: string;
}

interface Trip {
  title: string;
  tagline: string;
  image: string;
  pricePerPerson: number;
  duration: string;
  groupSize: string;
  ageGroup: string;
  seats: number;
  description: string;
  itinerary: Day[];
  visaInfo: string;
  included: string[];
  excluded: string[];
  comingSoon?: boolean;
}

const trips: Trip[] = [
  {
    title: "Moscow Discovery — 7 Days",
    tagline: "August 2026 — Limited to 8 Seats",
    image: "/riverside_smiling.webp",
    pricePerPerson: 160000,
    duration: "7 days / 6 nights",
    groupSize: "Max 8 people",
    ageGroup: "21–36",
    seats: 8,
    description:
      "Explore Moscow like never before — from Red Square and Stalin's bunker to rooftop views and a limousine ride. All transfers, accommodation, breakfasts, and guided tours included.",
    included: [
      "Hotel accommodation (6 nights)",
      "Daily breakfasts",
      "All transfers (airport, city, intercity)",
      "River cruise",
      "Nightlife experience",
      "Rooftop visit",
      "Stalin's bunker tour",
      "Tretyakov Gallery / equivalent",
      "Bus tour of Moscow",
      "Cable car ride",
      "Photo support throughout",
      "Goodbye dinner",
    ],
    excluded: [
      "Flights to/from Moscow",
      "Visa fee",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & River Cruise",
        meals: "Dinner",
        transport: "Airport transfer by private car",
        description:
          "Arrive at Moscow airport. Meet your guide and transfer to hotel. Evening welcome river cruise along the Moskva River — see the city lights from the water.",
      },
      {
        day: 2,
        title: "Red Square, Kremlin & GUM",
        meals: "Breakfast, Lunch, Dinner",
        transport: "Private minibus",
        description:
          "Full-day tour: Red Square, St. Basil's Cathedral, Kremlin grounds. Visit GUM department store and Zaryadye Park. Lunch at an Indian-friendly restaurant.",
      },
      {
        day: 3,
        title: "Limousine, Rooftop & Nightlife",
        meals: "Breakfast, Dinner",
        transport: "Limousine transfer",
        description:
          "Explore Moscow in style with a limousine ride. Visit a rooftop observation deck for panoramic city views. Evening nightlife experience.",
      },
      {
        day: 4,
        title: "Stalin's Bunker & Arbat",
        meals: "Breakfast, Lunch",
        transport: "Private minibus",
        description:
          "Tour Stalin's Cold War bunker — a hidden underground command center. Afternoon stroll through Arbat Street, Moscow's historic pedestrian avenue.",
      },
      {
        day: 5,
        title: "Viewpoints & Horror Quest",
        meals: "Breakfast, Lunch",
        transport: "Private minibus",
        description:
          "Visit Moscow's best viewpoints: Sparrow Hills, Moscow City skyline. Afternoon horror quest experience — an interactive group activity.",
      },
      {
        day: 6,
        title: "VDNKh, Izmailovo & Farewell Dinner",
        meals: "Breakfast, Lunch, Dinner",
        transport: "Private minibus",
        description:
          "Explore VDNKh exhibition park and the Izmailovo Kremlin complex. Cable car ride. Farewell dinner at a restaurant.",
      },
      {
        day: 7,
        title: "Departure",
        meals: "Breakfast",
        transport: "Airport transfer by private car",
        description:
          "Breakfast at hotel. Transfer to airport for departure flight.",
      },
    ],
    visaInfo:
      "Indian passport holders need a tourist visa. We assist with the invitation letter (visa support) included in the package. Standard visa processing takes 7–10 business days.",
  },
];

interface CmsOverride {
  price?: string;
  duration?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: { day: number; title: string; meals: string; transport: string; description: string }[];
}

export default function TripCard({ costBtnRef, cmsData }: { costBtnRef?: React.RefObject<HTMLButtonElement | null>; cmsData?: CmsOverride }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tripsWithCms: Trip[] = cmsData ? trips.map(t => ({
    ...t,
    pricePerPerson: cmsData.price ? parseInt(cmsData.price.replace(/[^0-9]/g, "")) || t.pricePerPerson : t.pricePerPerson,
    duration: cmsData.duration || t.duration,
    included: cmsData.inclusions || t.included,
    excluded: cmsData.exclusions || t.excluded,
    itinerary: cmsData.itinerary || t.itinerary,
  })) : trips;

  return (
    <div className="space-y-8">
      {tripsWithCms.map((trip, i) => (
        <motion.div
          key={trip.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
            className={`rounded-2xl overflow-hidden transition-all duration-500 ${
            trip.comingSoon
              ? "border border-white/5 bg-[#1C1917] opacity-60"
              : "border border-white/[0.04] bg-[#1C1917]/85 backdrop-blur-sm hover:shadow-[0_0_50px_-20px_rgba(202,138,4,0.15)]"
            }`}
        >
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none" />
          {trip.comingSoon ? (
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-base">{trip.title.replace(" — Coming Soon", "")}</h3>
                  <p className="text-white/40 text-xs mt-0.5">{trip.tagline}</p>
                  <p className="text-white/30 text-[11px] leading-relaxed mt-2">{trip.description}</p>
                </div>
                <span className="inline-flex items-center bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                  Coming Soon
                </span>
              </div>
            </div>
          ) : (
            <HeaderSlideshow tagline={trip.tagline} title={trip.title} />
          )}

          <div className="p-6">
            {!trip.comingSoon && (
              <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {trip.duration}
                </span>
                <span className="flex items-center gap-1.5 text-gold font-bold">
                  <IndianRupee size={14} /> {trip.pricePerPerson.toLocaleString("en-IN")}/person
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-medium">
                  Age {trip.ageGroup}
                </span>
                <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      ref={costBtnRef}
                      className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full border border-white/20 text-white/60 hover:text-gold hover:border-gold/40 bg-transparent text-xs transition-all cursor-pointer"
                    >
                      <Calculator size={12} /> Cost
                    </button>
                  <button
                    type="button"
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-gold text-gold bg-transparent font-semibold text-xs hover:bg-gold/10 transition-all cursor-pointer"
                  >
                    Check Availability <ArrowRight size={12} />
                  </button>
                  <a
                    href="https://wa.me/?text=Check%20out%20this%20Russia%20tour%3A%20Moscow%20Discovery%20%E2%80%94%207%20Days%20-%20https%3A%2F%2Ftripstorussia.com%2Fmoscow-express"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full border border-gold/50 text-white/50 hover:text-gold hover:border-gold bg-transparent text-xs transition-all cursor-pointer"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle size={14} />
                  </a>
                </div>
              </div>
            )}

            {!trip.comingSoon && (
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {trip.description}
              </p>
            )}

            {!trip.comingSoon && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.05] lg:col-span-2">
                    <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">
                      Included
                    </p>
                    <ul className="space-y-1.5">
                      {trip.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-white/60">
                          <Check size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.05] lg:col-span-1">
                    <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-3">
                      Not Included
                    </p>
                    <ul className="space-y-1.5">
                      {trip.excluded.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-white/60">
                          <X size={12} className="text-red-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <Shield size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold mb-0.5">
                      Visa Information
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {trip.visaInfo}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-3 font-medium">
                    <span className="text-gold">Day-by-Day Itinerary</span>
                  </p>
                  <div className="space-y-2 pl-8 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gold/20" />
                    {trip.itinerary.map((day) => {
                      const isOpen = openIndex === day.day;
                      return (
                        <div key={day.day} className="relative">
                          <div
                            className={`absolute -left-[26px] top-5 w-[9px] h-[9px] rounded-full border-2 border-charcoal z-10 transition-all duration-300 ${
                              isOpen ? "bg-gold shadow-[0_0_12px_rgba(212,175,55,0.8)] animate-pulse-dot" : "bg-gold/70"
                            }`}
                          />
                          <div
                            className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                              isOpen
                              ? "bg-white/[0.08] border-t-gold/20 border-white/5 -translate-y-2 shadow-[0_12px_40px_rgba(212,175,55,0.2)]"
                              : "bg-white/[0.03] border-white/5 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:bg-white/[0.06]"
                            }`}
                          >
                            <button
                              onClick={() =>
                                setOpenIndex(isOpen ? null : day.day)
                              }
                              className="w-full flex items-center justify-between p-4 text-left"
                            >
                              <div>
                                <p className="text-sm font-semibold">
                                  <span className="text-gold">Day {day.day}</span>
                                  <span className="text-white"> — {day.title}</span>
                                </p>
                                <div className="flex flex-wrap gap-3 mt-1">
                                  <span className="flex items-center gap-1 text-xs text-white/40">
                                    <Utensils size={11} /> {day.meals}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-white/40">
                                    <Bus size={11} /> {day.transport}
                                  </span>
                                </div>
                              </div>
                              <ChevronDown
                                size={16}
                                className={`text-white/30 shrink-0 transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <DayContent day={day} isOpen={isOpen} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const slides = [
  "/moscow-city-1.webp",
  "/moscow-city-3.webp",
  "/unsplash-stbasil.webp",
  "/soultrain-sunset-8064078.webp",
  "/moscow-city-2.webp",
  "/cattu-moscow-964445.webp",
  "/serbuxarev-street-4630827.webp",
];

const dayImages: Record<number, string> = {
  1: "/day1-river.webp",
  2: "/day2-red-square.webp",
  3: "/day3-rooftop.webp",
  4: "/day4-arbat.webp",
  5: "/day5-viewpoint.webp",
  6: "/day6-vdnkh.webp",
  7: "/day7-departure.webp",
};

const dayPositions: Record<number, string> = {
  1: "object-center",
  2: "object-[50%_75%]",
  3: "object-center",
  4: "object-center",
  5: "object-center",
  6: "object-center",
  7: "object-center",
};

const dayHighlights: Record<number, string[]> = {
  1: ["Airport meet & transfer", "Welcome river cruise", "City lights from Moskva River"],
  2: ["Red Square & St. Basil's Cathedral", "Kremlin grounds tour", "GUM department store", "Zaryadye Park", "Indian-friendly lunch"],
  3: ["Limousine city tour", "Rooftop observation deck", "Evening nightlife experience"],
  4: ["Cold War bunker tour", "Arbat Street stroll"],
  5: ["Sparrow Hills viewpoint", "Moscow City skyline panorama", "Horror quest group activity"],
  6: ["VDNKh exhibition park", "Izmailovo Kremlin complex", "Cable car ride", "Farewell dinner"],
  7: ["Breakfast at hotel", "Airport transfer included"],
};

function DayContent({ day, isOpen }: { day: Day; isOpen: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? contentHeight : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden"
    >
      <div ref={contentRef} className="px-4 pb-4 space-y-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="relative w-full aspect-video rounded-lg overflow-hidden border border-gold/20"
        >
          <img
            src={dayImages[day.day]}
            alt=""
            className={`w-full h-full object-cover ${dayPositions[day.day]}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        </motion.div>
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="space-y-1.5"
        >
          {dayHighlights[day.day]?.map((h) => (
            <motion.li key={h} variants={itemVariants} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-gold mt-1">&#9679;</span>
              {h}
            </motion.li>
          ))}
        </motion.ul>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="text-xs text-white/40 leading-relaxed"
        >
          {day.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

function HeaderSlideshow({ tagline, title }: { tagline: string; title: string }) {
  const [index, setIndex] = useState(0);
  const readyRef = useRef<boolean[]>(slides.map(() => false));
  const indexRef = useRef(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    slides.forEach((src, i) => {
      const img = new Image();
      img.onload = () => { readyRef.current[i] = true; };
      img.src = src;
    });
  }, []);

  const goTo = useCallback((i: number) => {
    const nextIndex = (i + slides.length) % slides.length;
    if (!readyRef.current[nextIndex]) return;
    indexRef.current = nextIndex;
    setIndex(nextIndex);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(indexRef.current + 1) : goTo(indexRef.current - 1);
    }
  };

  return (
    <div
      className="relative aspect-[4/3] sm:aspect-[16/9] bg-charcoal/50 overflow-hidden group"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[index]}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out ${
              index === 4 ? "object-bottom" : ""
            }`}
            style={{ filter: "brightness(1.05) contrast(1.1) saturate(1.15)" }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-gold text-xs font-medium tracking-[0.15em] uppercase mb-1">
          {tagline}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h3>
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo(index - 1)}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? "bg-gold w-5" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

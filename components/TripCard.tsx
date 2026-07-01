"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, IndianRupee, Clock, Utensils, Bus, Shield, Check, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

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
}

const trips: Trip[] = [
  {
    title: "Moscow Discovery — 7 Days",
    tagline: "August 2026 — Limited to 8 Seats",
    image: "/riverside_smiling.jpeg",
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

export default function TripCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {trips.map((trip, i) => (
        <motion.div
          key={trip.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-gold/20 transition-all duration-500"
        >
          <HeaderSlideshow tagline={trip.tagline} title={trip.title} />

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {trip.duration}
                </span>
                <span className="flex items-center gap-1.5 text-gold font-bold">
                  <IndianRupee size={14} /> {trip.pricePerPerson.toLocaleString("en-IN")}/person
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-medium">
                  Age {trip.ageGroup}
                </span>
              </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {trip.description}
            </p>

            {/* Inclusions / Exclusions */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02]">
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
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
              <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.02]">
                <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
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

            {/* Visa Info */}
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

            {/* CTA */}
            <Link
              href="/#contact"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gold text-charcoal font-semibold text-sm hover:bg-gold/90 transition-all duration-300 mb-6"
            >
              Check Availability <ArrowRight size={16} />
            </Link>

            {/* Accordion Itinerary */}
            <div className="border-t border-white/5 pt-4">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3 font-medium">
                Day-by-Day Itinerary
              </p>
              <div className="space-y-2">
                {trip.itinerary.map((day) => (
                  <div key={day.day} className="rounded-xl border border-white/5 overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === day.day ? null : day.day)
                      }
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div>
                        <p className="text-white text-sm font-semibold">
                          Day {day.day} — {day.title}
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
                          openIndex === day.day ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openIndex === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-white/50 leading-relaxed">
                            {day.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const slides = [
  "/soultrain-sunset-8064078.jpg",
  "/unsplash-stbasil.jpg",
  "/unsplash-traffic.jpg",
  "/unsplash-city.jpg",
];

function HeaderSlideshow({ tagline, title }: { tagline: string; title: string }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const readyRef = useRef<boolean[]>(slides.map(() => false));
  const indexRef = useRef(0);

  useEffect(() => {
    slides.forEach((src, i) => {
      const img = new Image();
      img.onload = () => { readyRef.current[i] = true; };
      img.src = src;
    });
  }, []);

  const next = useCallback(() => {
    const nextIndex = (indexRef.current + 1) % slides.length;
    if (!readyRef.current[nextIndex]) return;
    indexRef.current = nextIndex;
    setIndex(nextIndex);
    setProgress(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          next();
          return 0;
        }
        return Math.min(p + 0.01, 1);
      });
    }, 40);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-charcoal/50 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[index]}
            alt=""
            className={`absolute inset-0 w-full h-full ${index === 2 ? "object-cover object-bottom" : "object-cover"}`}
            style={{ transform: `scale(${1 + progress * 0.15})` }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-gold text-xs font-medium tracking-[0.15em] uppercase mb-1">
          {tagline}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          {title}
        </h3>
      </div>
      <div className="absolute top-3 left-3 right-3 flex gap-1.5">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gold transition-all duration-100"
              style={{ width: i === index ? `${progress * 100}%` : i < index ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

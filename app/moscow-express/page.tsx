"use client"

import { useState, useRef } from "react"
import { Send, Sparkles, Compass, ChevronDown } from "lucide-react"
import TripCard from "@/components/TripCard"
import TripExperience from "@/components/TripExperience"
import CostEstimator from "@/components/CostEstimator"
import GroupBookingCallout from "@/components/GroupBookingCallout"
import GlassCard from "@/components/GlassCard"

const chapters = [
  {
    id: "arrival",
    label: "Day 1",
    title: "Arrival in Moscow",
    subtitle: "Добро пожаловать в Москву",
    desc: "Land at Sheremetyevo, private transfer to your 5-star hotel in Tverskoy district. Evening welcome dinner with Indian-Russian fusion cuisine.",
    color: "from-[#1A0A0A] via-[#3D0E0E] to-[#1A0A0A]",
    accent: "#DC2626",
  },
  {
    id: "kremlin",
    label: "Day 2",
    title: "Kremlin & Red Square",
    subtitle: "Кремль и Красная площадь",
    desc: "Guided tour of the Moscow Kremlin, Armoury Chamber, St. Basil's Cathedral. Evening river cruise with champagne.",
    color: "from-[#1A0A0A] via-[#2D1B0E] to-[#1A0A0A]",
    accent: "#D4AF37",
  },
  {
    id: "cultural",
    label: "Day 3",
    title: "Cultural Immersion",
    subtitle: "Культурное погружение",
    desc: "Visit Tretyakov Gallery, Moscow Metro tour (the 'underground palaces'), traditional Russian banya experience.",
    color: "from-[#0F0A1A] via-[#1A0F2E] to-[#0F0A1A]",
    accent: "#A855F7",
  },
  {
    id: "excursion",
    label: "Day 4",
    title: "Sergiev Posad",
    subtitle: "Сергиев Посад",
    desc: "Day trip to the Golden Ring — Trinity Lavra monastery, Russian lunch at a local dacha, Matryoshka painting workshop.",
    color: "from-[#0A1A0F] via-[#0F2E1A] to-[#0A1A0F]",
    accent: "#22C55E",
  },
  {
    id: "modern",
    label: "Day 5",
    title: "Modern Moscow",
    subtitle: "Современная Москва",
    desc: "Moscow City skyscrapers observation deck, Gorky Park, contemporary art at Garage Museum, Moscow by night photography tour.",
    color: "from-[#0A0F1A] via-[#0F1A2E] to-[#0A0F1A]",
    accent: "#3B82F6",
  },
  {
    id: "farewell",
    label: "Day 6",
    title: "Farewell Dinner & Shopping",
    subtitle: "Прощальный ужин",
    desc: "Last day shopping at GUM Department Store, souvenir hunting at Arbat Street. Farewell dinner with traditional Russian folk show and champagne.",
    color: "from-[#1A0A0A] via-[#2D1B0E] to-[#1A0A0A]",
    accent: "#D4AF37",
  },
  {
    id: "departure",
    label: "Day 7",
    title: "Departure",
    subtitle: "Отъезд",
    desc: "Private airport transfer to Sheremetyevo. до новых встреч — until we meet again!",
    color: "from-[#1A0A0A] via-[#3D0E0E] to-[#1A0A0A]",
    accent: "#DC2626",
  },
]

export default function MoscowExpressPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const costBtnRef = useRef<HTMLButtonElement>(null)
  const calcBtnRef = useRef<HTMLButtonElement>(null)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const f = e.currentTarget.elements
    const payload = {
      _captcha: "false",
      name: (f.namedItem("name") as HTMLInputElement).value,
      email: (f.namedItem("email") as HTMLInputElement).value,
      phone: (f.namedItem("phone") as HTMLInputElement).value,
      group_size: (f.namedItem("group_size") as HTMLSelectElement).value,
      message: (f.namedItem("message") as HTMLTextAreaElement).value,
      page: "Moscow Express — Check Availability",
    }
    try {
      await fetch("https://formsubmit.co/ajax/svetaindia07@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch {}
    setSending(false)
    setSubmitted(true)
  }

  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "Moscow Discovery — 7 Days",
    description: "7-day guided group tour of Moscow for Indian travelers.",
    touristType: "Indian Travelers",
    offers: {
      "@type": "Offer",
      price: "160000",
      priceCurrency: "INR",
      availability: "https://schema.org/LimitedAvailability",
    },
    provider: {
      "@type": "TravelAgency",
      name: "Trips to Russia by Indosvetka",
      url: "https://russia-tours-poc.vercel.app",
    },
  }

  return (
    <main
      className="relative bg-cover bg-top bg-fixed bg-no-repeat bg-[url(/mobile-bg.png)] sm:bg-[url(/moscow-bg_final.png)]"
      style={{
        WebkitOptimizeContrast: "true",
        imageRendering: "crisp-edges",
      } as React.CSSProperties}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }} />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-6">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                7 Days · Small Group · Indian-Friendly
              </span>
            </div>
            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Moscow
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#DC2626] bg-clip-text text-transparent">
                Express
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              A 7-day guided journey through Russia&apos;s majestic capital — designed for Indian travelers
              who seek luxury, culture, and the extraordinary.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center gap-2 bg-[#F4AA01] text-[#010101] font-bold px-8 py-[11px] rounded-full text-sm hover:bg-black hover:text-white disabled:opacity-80 disabled:hover:bg-[#F4AA01] cursor-pointer active:scale-95 transition-all duration-500 ease-in-out"
              >
                Book Your Journey
                <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.04] text-white/70 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:border-white hover:text-black hover:bg-white"
              >
                <Compass size={15} />
                Explore the Journey
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <ChevronDown size={20} className="text-white/30" />
          </div>
        </section>

        {/* ─── STORY CHAPTERS ─── */}
        <section id="story" className="px-4 sm:px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#DC2626] bg-clip-text text-transparent">
                Your Journey
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mt-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A Week Across Russia&apos;s Soul
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/40 via-[#DC2626]/20 to-transparent sm:-translate-x-px" />

              {chapters.map((ch, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div
                    key={ch.id}
                    className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-12 mb-16 last:mb-0 ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                    onMouseEnter={() => setActiveChapter(ch.id)}
                    onMouseLeave={() => setActiveChapter(null)}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 sm:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10 ring-4 ring-[#0B0D1A] transition-all duration-500 ${
                        activeChapter === ch.id ? "scale-150" : ""
                      }`}
                      style={{ backgroundColor: ch.accent }}
                    />

                    {/* Content */}
                    <div className={`pl-10 sm:pl-0 sm:w-1/2 ${isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                      <div
                        className={`group relative rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_50px_-20px_rgba(212,175,55,0.15)] ${
                          activeChapter === ch.id ? "border-white/[0.12] shadow-[0_0_50px_-20px_rgba(212,175,55,0.15)]" : ""
                        }`}
                      >
                        <div
                          className="absolute -top-px left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${ch.accent}, transparent)`,
                          }}
                        />
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: ch.accent }}
                        >
                          {ch.label}
                        </span>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-white mt-1 mb-1"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {ch.title}
                        </h3>
                        <p className="text-white/30 text-xs italic mb-3">{ch.subtitle}</p>
                        <p className="text-white/55 text-sm leading-relaxed">{ch.desc}</p>
                      </div>
                    </div>

                    {/* Empty space for the other side */}
                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── TRIP CARD ─── */}
        <div className="px-4 sm:px-6 pb-16">
          <div className="max-w-[1728px] mx-auto">
            <TripCard costBtnRef={costBtnRef as React.RefObject<HTMLButtonElement | null>} />
          </div>
        </div>

        {/* ─── GROUP BOOKING CTA ─── */}
        <div className="px-4 sm:px-6 pb-16">
          <div className="max-w-[1728px] mx-auto">
            <GlassCard>
              <GroupBookingCallout calcBtnRef={calcBtnRef as React.RefObject<HTMLButtonElement | null>} />
            </GlassCard>
          </div>
        </div>

        {/* ─── TRIP EXPERIENCE ─── */}
        <div className="px-4 sm:px-6 pb-16">
          <div className="max-w-[1728px] mx-auto">
            <TripExperience />
          </div>
        </div>

        <div className="h-80 bg-gradient-to-b from-transparent to-[#0B0D1A] relative pointer-events-none -mt-16" />
        {/* ─── ROUTE MAP ─── */}
        <div className="px-4 sm:px-6 pb-16">
          <div className="max-w-[1728px] mx-auto">
            <GlassCard>
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#DC2626]" />
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Trip Route Map
                  </h2>
                </div>
                <p className="text-white/40 text-xs sm:text-sm mb-4 ml-4">
                  Moscow Express — 7 days tour · Interactive itinerary map
                </p>
                <div className="rounded-xl overflow-hidden border border-white/[0.06] [filter:invert(0.9)_hue-rotate(180deg)]">
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1D3zYRmCXIzb8fT5M6Bb3sOCRxHO9oIo"
                    width="100%"
                    height="800"
                    className="w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Moscow Express Route Map"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* ─── BOOKING ─── */}
        <section id="booking" className="relative scroll-mt-24 px-4 sm:px-6 pb-24 flex justify-center">
          <div className="w-full max-w-2xl">
            <GlassCard>
                <div className="p-8 sm:p-10">
                  <div className="text-center mb-8">
                    <h2
                      className="text-2xl sm:text-3xl font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Check{" "}
                      <span className="bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#DC2626] bg-clip-text text-transparent">
                        Availability
                      </span>
                    </h2>
                    <p className="text-white/40 text-sm">
                      Fill in your details and we&apos;ll get back to you within 24 hours.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5">
                        <Send size={22} className="text-[#D4AF37]" />
                      </div>
                      <h3
                        className="text-xl font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Thank You!
                      </h3>
                      <p className="text-white/50 text-sm">
                        We&apos;ll reach out on WhatsApp within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-300 hover:border-white/20"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-300 hover:border-white/20"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-300 hover:border-white/20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                          Group Size
                        </label>
                        <select
                          name="group_size"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-300 hover:border-white/20"
                        >
                          <option value="" className="bg-[#0B0D1A]">
                            Select...
                          </option>
                          <option value="1" className="bg-[#0B0D1A]">
                            1 person
                          </option>
                          <option value="2" className="bg-[#0B0D1A]">
                            2 people
                          </option>
                          <option value="3" className="bg-[#0B0D1A]">
                            3 people
                          </option>
                          <option value="4" className="bg-[#0B0D1A]">
                            4 people
                          </option>
                          <option value="5" className="bg-[#0B0D1A]">
                            5 people
                          </option>
                          <option value="6" className="bg-[#0B0D1A]">
                            6 people
                          </option>
                          <option value="7" className="bg-[#0B0D1A]">
                            7 people
                          </option>
                          <option value="8" className="bg-[#0B0D1A]">
                            8 people (full group)
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                          Message (optional)
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder="Any questions or special requests..."
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-300 hover:border-white/20 resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] bg-[length:200%_100%] animate-border-flow text-[#0B0D1A] font-bold text-sm hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sending ? "Sending..." : "Send Inquiry"}
                      </button>
                    </form>
                  )}
                </div>
            </GlassCard>
          </div>
        </section>

      <CostEstimator triggerRefs={[costBtnRef, calcBtnRef]} />

    </main>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { useScroll } from "framer-motion"
import { Send, Sparkles, Compass, ArrowRight } from "lucide-react"
import { playClick } from "@/lib/sounds"
import { ric, cancelRic } from "@/lib/ric"
import DotsOverlay from "@/components/DotsOverlay"
import TripCard from "@/components/TripCard"
import TripGallery from "@/components/TripGallery"
import CostEstimator from "@/components/CostEstimator"
import GroupBookingCallout from "@/components/GroupBookingCallout"
import GlassCard from "@/components/GlassCard"

const chapters = [
  {
    id: "arrival",
    label: "Day 1",
    title: "Arrival & Aurora Hunting",
    subtitle: "Северное сияние",
    desc: "Driver picks you up at the airport with a sign. After check-in and rest, we head out at 21:00 (Moscow time) for 3–5 hours of aurora hunting — hot tea, cookies, and professional photos included.",
    color: "from-[#0A1A1A] via-[#0E2E2E] to-[#0A1A1A]",
    accent: "#2DD4BF",
  },
  {
    id: "teriberka",
    label: "Day 2",
    title: "Teriberka — Edge of the Earth",
    subtitle: "Териберка",
    desc: "Travel to one of the oldest settlements in the Murmansk region, on the shore of the Barents Sea. Photo stops at Polar Wind Park, the Ancient Ship Cemetery, Dragon Egg Beach, and Battery Waterfall among red cliffs. Return around 19:00.",
    color: "from-[#0A0F1A] via-[#0F1A2E] to-[#0A0F1A]",
    accent: "#38BDF8",
  },
  {
    id: "husky",
    label: "Day 3",
    title: "Husky & Reindeer Park",
    subtitle: "Хаски и северные олени",
    desc: "Meet the ancient northern people and their 3000-year-old culture. Feed reindeer, go husky sledding, try on traditional Sami costumes, and enjoy local cuisine lunch in a wooden house.",
    color: "from-[#0A1A0F] via-[#0F2E1A] to-[#0A1A0F]",
    accent: "#22C55E",
  },
  {
    id: "icefloating",
    label: "Day 4",
    title: "Snowmobile Safari & Ice Floating",
    subtitle: "Снегоход и ледяное плавание",
    desc: "Speed across snow-covered landscapes on a 1-hour snowmobile safari in the Tundra park, refuel with authentic Arctic cuisine and hot herbal tea, then plunge into the Kola Bay in a thermal wetsuit for the ultimate ice floating experience (~2 hours with instruction).",
    color: "from-[#0A1A1A] via-[#0E2E2E] to-[#0A1A1A]",
    accent: "#2DD4BF",
  },
]

export default function MurmanskPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const costBtnRef = useRef<HTMLButtonElement>(null)
  const calcBtnRef = useRef<HTMLButtonElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  })
  const animPathRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)
  const mobileTimelineRef = useRef<HTMLDivElement>(null)
  const preparedPointsRef = useRef<{ x: number; y: number }[]>([])
  const pathLenRef = useRef(0)

  useEffect(() => {
    const el = animPathRef.current
    if (!el) return
    const len = el.getTotalLength()
    pathLenRef.current = len
    const pts: { x: number; y: number }[] = []
    for (let i = 0; i <= 100; i++) {
      const pt = el.getPointAtLength((len * i) / 100)
      pts.push({ x: pt.x, y: pt.y })
    }
    preparedPointsRef.current = pts
    el.style.strokeDasharray = String(len + 100)
    el.style.strokeDashoffset = String(len)
  }, [])

  useEffect(() => {
    const el = animPathRef.current
    const plane = planeRef.current
    const pts = preparedPointsRef.current
    const pathLen = pathLenRef.current
    if (!el || !plane || pts.length === 0 || !pathLen) return

    const scrollUpdate = (v: number) => {
      el.style.strokeDashoffset = String(pathLen * (1 - v))
      if (v < 0.01 || v > 0.99) { plane.style.opacity = "0"; return }
      plane.style.opacity = "1"
      const idx = v * 99
      const i = Math.floor(idx)
      const f = idx - i
      const p1 = pts[i]
      const p2 = pts[Math.min(i + 1, 99)]
      const x = p1.x + (p2.x - p1.x) * f
      const y = p1.y + (p2.y - p1.y) * f
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      plane.setAttribute("transform", `translate(${x},${y}) rotate(${angle + 45})`)
    }

    scrollUpdate(scrollYProgress.get())
    const unsub = scrollYProgress.on("change", scrollUpdate)
    return () => unsub()
  }, [scrollYProgress])

  useEffect(() => {
    const el = mobileTimelineRef.current
    if (!el) return
    const update = (v: number) => {
      el.style.height = `${v * 100}%`
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on("change", update)
    return () => unsub()
  }, [scrollYProgress])

  useEffect(() => {
    const isMobile = window.innerWidth < 640
    document.documentElement.style.setProperty("--hero-bg", `url(${isMobile ? "/murmansk-bg-mobile.webp" : "/murmansk-bg-desktop.webp"})`)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const f = e.currentTarget.elements
    const name = (f.namedItem("name") as HTMLInputElement).value
    const email = (f.namedItem("email") as HTMLInputElement).value
    const phone = (f.namedItem("phone") as HTMLInputElement).value
    const group_size = (f.namedItem("group_size") as HTMLSelectElement).value
    const message = (f.namedItem("message") as HTMLTextAreaElement).value

    const msg = `*New Enquiry from Polar Saga — Murmansk (Ice Floating)*
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Group Size:* ${group_size}
*Message:* ${message}`

    setSending(false)
    setSubmitted(true)

    window.open(`https://wa.me/917042987451?text=${encodeURIComponent(msg)}`, "_blank")

    fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _captcha: "false", name, email, phone, group_size, message, page: "Polar Saga — Murmansk (Ice Floating)" }),
    }).catch(() => {})
  }

  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "Polar Saga — Murmansk, 4 Days",
    description: "4-day guided tour of Murmansk with aurora hunting, Teriberka on the Arctic Ocean, husky & reindeer park, and a snowmobile safari with ice floating in the Kola Bay.",
    touristType: "Indian Travelers",
    offers: {
      "@type": "Offer",
      price: "782",
      priceCurrency: "USD",
      availability: "https://schema.org/LimitedAvailability",
    },
    provider: {
      "@type": "TravelAgency",
      name: "Trips to Russia by Indosvetka",
      url: "https://tripstorussia.com",
    },
  }

  return (
    <><main className="relative">
      {/* Fixed background — lazy-loaded via JS to avoid competing with LCP */}
      <div
        className="fixed inset-0 -z-10 bg-[#0a0a0a] bg-cover bg-top bg-no-repeat"
        aria-hidden="true"
        style={{ backgroundImage: "var(--hero-bg)" }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }} />

      {/* ─── HERO ─── */}
      <section className="relative min-h-svh flex flex-col overflow-hidden">
        {/* Background orbs with static blur (composited — no animation) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#D4AF37]/30 blur-[80px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#38BDF8]/20 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#2DD4BF]/15 blur-[100px]" />
        </div>

        <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center px-4 pt-24">
        <div className="relative max-w-4xl mx-auto w-full p-8 sm:p-12 lg:p-16 rounded-2xl border border-white/[0.04] bg-[#1C1917]/70 backdrop-blur-md shadow-[0_0_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
          <DotsOverlay />
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          <div className="text-center">
            {/* Decorative top line */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] mb-8 hover:border-[#D4AF37]/20 transition-all duration-500">
              <Sparkles size={10} className="text-[#D4AF37]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                4 Days · Small Group · Ice Floating & Aurora
              </span>
            </div>

            {/* Main headline */}
            <h1 className="mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="block text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.02em] text-white leading-[0.9]">
                Murmansk
              </span>
              <span className="block text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.08em] mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#2DD4BF] bg-clip-text text-transparent bg-[length:200%_100%] animate-border-flow">
                Polar Saga
              </span>
            </h1>

            {/* Decorative line under headline */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <span className="text-[#D4AF37]/40 text-xs" style={{ fontFamily: "var(--font-body)" }}>✦</span>
              <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-20 leading-relaxed tracking-wide font-light" style={{ fontFamily: "var(--font-body)" }}>
              Chase the Northern Lights, meet Arctic huskies, and float in the
              icy Kola Bay — designed for Indian travelers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
              <a
                href="#booking"
                onClick={playClick}
                className="group relative inline-flex items-center gap-2.5 bg-[#CA8A04] text-[#0C0A09] font-semibold px-8 py-3 rounded-full text-sm overflow-hidden transition-all duration-500 ease-in-out active:scale-95 hover:bg-black hover:text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2.5">
                  Book Your Journey
                  <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
              <a
                href="#story"
                onClick={playClick}
                className="group relative inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.03] text-white/60 px-8 py-3 rounded-full text-sm font-medium overflow-hidden transition-all duration-500 ease-in-out active:scale-95 hover:border-white hover:text-black hover:bg-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Compass size={14} />
                Explore the Journey
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
        </div>

        {/* Scroll indicator — normal flow, below centered content */}
        <div className="relative z-10 flex flex-col items-center gap-2 pb-8">
          <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-medium" style={{ fontFamily: "var(--font-body)" }}>Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/[0.08] flex justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-white/30 animate-bounce" />
          </div>
        </div>
      </section>

        {/* ─── STORY CHAPTERS ─── */}
        <section id="story" className="px-4 sm:px-6 pt-32 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-32 max-w-3xl mx-auto relative rounded-2xl border border-white/[0.06] bg-black/80 backdrop-blur-md p-8 sm:p-10 overflow-hidden">
              <DotsOverlay />
              <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#2DD4BF] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-body)" }}>
                Your Journey
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mt-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                4 Days Beyond the Arctic Circle
              </h2>
            </div>

            <div ref={storyRef} className="relative">
              {/* Curvy timeline path — desktop */}
              <div className="hidden sm:block absolute left-1/2 top-0 h-full w-[400px] -translate-x-1/2 pointer-events-none">  <svg className="w-full h-full" viewBox="0 0 400 900" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="50%" stopColor="#2DD4BF" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                    <filter id="pathGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Background path */}
                  <path
                    d="M 200 30 C 200 100, 60 120, 60 190 C 60 260, 340 280, 340 350 C 340 420, 60 440, 60 510 C 60 580, 340 600, 340 670 C 340 740, 200 760, 200 830"
                    stroke="#D4AF37" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" fill="none"
                  />
                  {/* Glowing animated path */}
                  <path
                    ref={animPathRef}
                    d="M 200 30 C 200 100, 60 120, 60 190 C 60 260, 340 280, 340 350 C 340 420, 60 440, 60 510 C 60 580, 340 600, 340 670 C 340 740, 200 760, 200 830"
                    stroke="url(#pathGradient)" strokeWidth="4" strokeLinecap="round" fill="none" filter="url(#pathGlow)"
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                  />
                  {/* Start marker */}
                  <g transform="translate(200,30)">
                    <path d="M0-12 L3-4 L11-4 L5 1 L7 9 L0 4 L-7 9 L-5 1 L-11-4 L-3-4 Z" fill="#FFFFFF" />
                  </g>
                  {/* End marker */}
                  <g transform="translate(200,830)">
                    <path d="M0-12 L3-4 L11-4 L5 1 L7 9 L0 4 L-7 9 L-5 1 L-11-4 L-3-4 Z" fill="#FFFFFF" />
                  </g>
                  {/* Plane following path */}
                  <g ref={planeRef} transform="translate(200,30)" opacity="0" style={{ transition: "transform 0.25s ease-out, opacity 0.25s ease-out" }}>
                    <g transform="translate(-12,-12)">
                      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.5c.3.5.8.7 1.3.3l.5-.3c.4-.3.6-.7.5-1.2z" fill="#115E59" />
                    </g>
                  </g>
                </svg>
              </div>

              {/* Mobile timeline line */}
              <div className="block sm:hidden absolute left-[22px] top-0 bottom-0 w-0.5 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-[#2DD4BF]/10 to-[#D4AF37]/10 rounded-full" />
                <div ref={mobileTimelineRef} className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#D4AF37] via-[#2DD4BF] to-[#D4AF37]" style={{ height: '0%' }} />
              </div>

              {chapters.map((ch, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div
                    key={ch.id}
                    className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-12 mb-10 last:mb-0 ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                    onMouseEnter={() => setActiveChapter(ch.id)}
                    onMouseLeave={() => setActiveChapter(null)}
                  >
                    {/* Mobile circle + connector */}
                    <div className="block sm:hidden absolute left-0 top-6 z-10">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-[#0B0D1A] border-2 flex items-center justify-center shadow-lg" style={{ borderColor: ch.accent, boxShadow: `0 0 12px ${ch.accent}55` }}>
                          <span className="text-xs font-bold" style={{ color: ch.accent }}>{i + 1}</span>
                        </div>
                      </div>
                    </div>
                    <div className="block sm:hidden absolute left-8 top-[26px] w-4 h-px" style={{ background: `linear-gradient(90deg, ${ch.accent}88, transparent)` }} />

                    {/* Content */}
                    <div className={`pl-14 sm:pl-0 sm:w-1/2 ${isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                      <div
                        className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/70 backdrop-blur-md p-6 sm:p-8 transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_50px_-20px_rgba(212,175,55,0.15)] ${
                           activeChapter === ch.id ? "border-white/[0.12] shadow-[0_0_50px_-20px_rgba(212,175,55,0.15)]" : ""
                         }`}
                        style={{ '--card-accent': ch.accent } as React.CSSProperties}
                      >
                        <DotsOverlay />
                        <div
                          className="absolute -top-px left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${ch.accent}, transparent)`,
                          }}
                        />
                        <div className={`flex flex-col items-center mb-1 ${isLeft ? "sm:items-end" : "sm:items-start"}`}>
                          <div className="w-3.5 h-3.5 rounded-full ring-[3px] ring-[#0B0D1A] mb-1.5" style={{ backgroundColor: ch.accent }} />
                          <span
                            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                            style={{ color: ch.accent, fontFamily: "var(--font-body)" }}
                          >
                            {ch.label}
                          </span>
                        </div>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--card-accent)] mt-1 mb-1 transition-colors duration-500"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {ch.title}
                        </h3>
                        <p className="text-white/30 text-xs italic mb-3" style={{ fontFamily: "var(--font-body)" }}>{ch.subtitle}</p>
                        <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{ch.desc}</p>
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
            <TripCard
              costBtnRef={costBtnRef as React.RefObject<HTMLButtonElement | null>}
              currency="RUB"
              pageUrl="/murmansk"
              trips={murmanskTrips}
              media={murmanskMedia}
            />
          </div>
        </div>

        {/* ─── FLEXIBLE OPTIONS ─── */}
        <div className="px-4 sm:px-6 pb-16">
          <div className="max-w-[1728px] mx-auto">
            <GlassCard>
              <div className="p-8 sm:p-10">
                <div className="text-center mb-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#2DD4BF] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-body)" }}>
                    Flexible Packages
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-white mt-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    More Ways to Experience Murmansk
                  </h2>
                  <p className="text-white/60 text-sm mt-3 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
                    Polar Saga is our flagship tour. Want a shorter stay or the mountain adventure instead? We&apos;ll customize any of these for you on WhatsApp.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {[
                    {
                      name: "Arctic Quest",
                      days: "4 Days",
                      price: "₽61,000/person",
                      note: "Adds Khibiny Mountains & Kirovsk — Snow Village, snowmobile safari and funicular with a bird's-eye view.",
                    },
                    {
                      name: "Awesome Arctic",
                      days: "3 Days",
                      price: "₽45,000/person",
                      note: "A compact aurora escape — Teriberka on the Arctic Ocean and the husky & reindeer park in three days.",
                    },
                  ].map((opt) => (
                    <div
                      key={opt.name}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.05] backdrop-blur-sm p-6 flex flex-col text-center sm:text-left"
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium" style={{ fontFamily: "var(--font-body)" }}>{opt.days}</p>
                      <h3 className="text-lg font-bold text-white mt-1" style={{ fontFamily: "var(--font-heading)" }}>{opt.name}</h3>
                      <p className="text-[#D4AF37] font-bold text-sm mt-1" style={{ fontFamily: "var(--font-body)" }}>{opt.price}</p>
                      <p className="text-white/50 text-sm leading-relaxed mt-3 flex-1" style={{ fontFamily: "var(--font-body)" }}>{opt.note}</p>
                      <a
                        href={`https://wa.me/917042987451?text=${encodeURIComponent(`Hi! I'm interested in the ${opt.name} — ${opt.days} Murmansk package (${opt.price}). Could you share the full itinerary?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center gap-2 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#D4AF37] hover:text-[#0B0D1A] transition-all duration-300"
                      >
                        Enquire on WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* ─── TRIP GALLERY ─── */}
        <div className="px-4 sm:px-6 pb-16">
          <div className="max-w-[1728px] mx-auto">
            <GlassCard>
              <div className="p-6 sm:p-8">
                <TripGallery photos={murmanskPhotos} />
              </div>
            </GlassCard>
          </div>
        </div>

        {/* ─── VIDEOS FROM THE ARCTIC ─── */}
        <div className="px-4 sm:px-6 pb-16">
          <div className="max-w-[1728px] mx-auto">
            <GlassCard>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2
                      className="text-lg sm:text-xl font-bold text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Videos from the Arctic
                    </h2>
                    <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                      Real moments from the Polar Saga journey
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <video
                      key={n}
                      src={`/sveta-vid-${n}.mp4`}
                      poster={`/sveta-vid-${n}-poster.webp`}
                      controls
                      preload="none"
                      playsInline
                      className="w-full aspect-video rounded-xl border border-white/[0.08] bg-black/60 object-cover cursor-pointer"
                      aria-label={`Polar Saga video ${n}`}
                    />
                  ))}
                </div>
              </div>
            </GlassCard>
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

        <div className="h-80 bg-gradient-to-b from-transparent to-[#0B0D1A] relative pointer-events-none -mt-16" />

        {/* ─── BOOKING ─── */}
        <section id="booking" className="relative scroll-mt-24 px-4 sm:px-6 pb-24 flex justify-center">
          <div className="w-full max-w-2xl">
            <GlassCard>
                <div className="p-8 sm:p-10">
                  <div className="text-center mb-8">
                    <h2
                      className="text-2xl sm:text-3xl font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Check{" "}
                      <span className="bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#2DD4BF] bg-clip-text text-transparent">
                        Availability
                      </span>
                    </h2>
                    <p className="text-white/90 text-sm" style={{ fontFamily: "var(--font-body)" }}>
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
                        style={{ fontFamily: "var(--font-heading)" }}
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
                          <label htmlFor="name" className="block text-xs text-white uppercase tracking-wider mb-1.5 font-semibold">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white text-sm placeholder-white/60 focus:outline-none focus:border-[#D4AF37]/60 transition-all duration-300 hover:border-white/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs text-white uppercase tracking-wider mb-1.5 font-semibold">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white text-sm placeholder-white/60 focus:outline-none focus:border-[#D4AF37]/60 transition-all duration-300 hover:border-white/30"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs text-white uppercase tracking-wider mb-1.5 font-semibold">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white text-sm placeholder-white/60 focus:outline-none focus:border-[#D4AF37]/60 transition-all duration-300 hover:border-white/30"
                        />
                      </div>
                      <div>
                        <label htmlFor="group_size" className="block text-xs text-white uppercase tracking-wider mb-1.5 font-semibold">
                          Group Size
                        </label>
                        <select
                          name="group_size"
                          id="group_size"
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
                        <label htmlFor="message" className="block text-xs text-white uppercase tracking-wider mb-1.5 font-semibold">
                          Message (optional)
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          rows={3}
                          placeholder="Any questions or special requests..."
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white text-sm placeholder-white/60 focus:outline-none focus:border-[#D4AF37]/60 transition-all duration-300 hover:border-white/30 resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={playClick}
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

      <CostEstimator
        triggerRefs={[costBtnRef, calcBtnRef]}
        pricePerPerson={62000}
        durationDays={4}
        currency="RUB"
      />
    </main>
    </>
  )
}

const murmanskTrips = [
  {
    title: "Polar Saga — Murmansk · 4 Days",
    tagline: "Aurora · Teriberka · Husky · Ice Floating",
    image: "/sveta-30.webp",
    pricePerPerson: 62000,
    duration: "4 days",
    groupSize: "Max 8 people",
    ageGroup: "All ages",
    seats: 8,
    description:
      "Two nights of aurora hunting, the edge of the Arctic Ocean at Teriberka, huskies and reindeer, then a snowmobile safari and the ultimate ice floating plunge into the Kola Bay. Airport transfers, guide, and professional aurora photos included.",
    included: [
      "Airport pickup and drop",
      "Two nights of Aurora hunting",
      "Transfers during the trip",
      "English-speaking guide",
      "Professional photos of Northern Lights",
      "Hot tea and cookies onboard",
      "Tickets to Husky park and lunch there",
      "Husky sledding",
      "Reindeer feeding",
      "Snowmobile sledding to the Arctic ocean",
      "Snowmobiles rent for 1 hour and lunch in Tundra",
      "Ice floating wetsuits",
      "Entrance fees for all attractions as per program",
    ],
    excluded: [
      "Air tickets to Murmansk and back",
      "Whales-watching at the ship",
      "Accommodation in Murmansk",
      "Lunches and dinners",
      "Alcohol",
      "Other services not included in the program",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Aurora Hunting",
        meals: "—",
        transport: "Airport transfer by private car",
        description:
          "At arrival our driver will meet you at the airport with a sign. After check-in you may visit a local restaurant and rest. At 21:00 (Moscow time) we pick you up at your hotel and start hunting — 3–5 hours depending on weather. Hot tea, cookies, and all aurora photos included. If the previous nights are unsuccessful, we provide a third night for free.",
      },
      {
        day: 2,
        title: "Teriberka — Edge of the Earth",
        meals: "Lunch (paid separately)",
        transport: "Private car",
        description:
          "Head to Teriberka, one of the oldest settlements in the Murmansk region, right on the shore of the Barents Sea (Arctic Ocean). Photo stops at Polar Wind Park & Rock Garden, the Ancient Ship Cemetery, Dragon Egg Beach and Dragon's Lair, Battery Waterfall among Red Cliffs, Giant Swings on the Seashore, and the Famous Traveler's Bench. Lunch at a restaurant on the sandy beach (extra). Optional whale-watching by boat (extra, booked in advance). Return around 19:00.",
      },
      {
        day: 3,
        title: "Husky & Reindeer Park",
        meals: "Lunch",
        transport: "Private car",
        description:
          "Discover the culture and life of the ancient northern people, existing for almost 3000 years. Feed reindeer, go husky sledding, try on traditional Sami costumes, and enjoy local cuisine lunch in a wooden house. After lunch, walk around the park before returning to Murmansk. Husky sledding subject to snow cover.",
      },
      {
        day: 4,
        title: "Snowmobile Safari & Ice Floating",
        meals: "Lunch",
        transport: "Private car",
        description:
          "In the morning, travel to the Tundra park for a 1-hour snowmobile safari across snow-covered landscapes. Refuel and warm up with authentic Arctic cuisine and hot herbal tea, then experience the Ultimate Ice Floating — about 2 hours with instruction — plunging into the Kola Bay in a thermal wetsuit. The whole day takes about 5–6 hours with transfers. Start time subject to ticket availability.",
      },
    ],
    visaInfo:
      "Indian passport holders need a Russian visa. For this tour we assist with the invitation letter (visa support). Indian citizens are eligible for Russia's unified e-visa — processed online in 4 calendar days.",
  },
]

const murmanskMedia = {
  slides: [
    "/sveta-04.webp",
    "/sveta-10.webp",
    "/sveta-24.webp",
    "/sveta-03.webp",
    "/sveta-01.webp",
  ],
  dayImages: {
    1: "/sveta-34.webp",
    2: "/sveta-07.webp",
    3: "/sveta-19.webp",
    4: "/sveta-18.webp",
  },
  dayPositions: {
    1: "object-center",
    2: "object-center",
    3: "object-center",
    4: "object-center",
  },
  dayHighlights: {
    1: ["Airport meet & transfer", "Evening aurora hunting (21:00)", "Hot tea & cookies onboard", "Professional aurora photos included"],
    2: ["Barents Sea / Arctic Ocean", "Polar Wind Park & Rock Garden", "Ancient Ship Cemetery", "Dragon Egg Beach", "Battery Waterfall among Red Cliffs", "Giant Swings on the Seashore"],
    3: ["Reindeer feeding", "Husky sledding", "Sami costumes & culture", "Local cuisine lunch in a wooden house"],
    4: ["1-hour snowmobile safari", "Arctic cuisine lunch & hot herbal tea", "Ice floating in thermal wetsuit", "Plunge into the Kola Bay"],
  },
}

const murmanskPhotos = [
  { src: "/sveta-01.webp", alt: "Winter Landscape 01", tag: "Winter Landscape", span: "tall" },
  { src: "/sveta-02.webp", alt: "Winter Landscape 02", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-03.webp", alt: "Arctic Ocean & Sky 03", tag: "Arctic Ocean & Sky", span: "sq" },
  { src: "/sveta-04.webp", alt: "Arctic Ocean & Sky 04", tag: "Arctic Ocean & Sky", span: "sq" },
  { src: "/sveta-05.webp", alt: "Winter Landscape 05", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-06.webp", alt: "Winter Landscape 06", tag: "Winter Landscape", span: "wide" },
  { src: "/sveta-07.webp", alt: "Arctic Ocean & Sky 07", tag: "Arctic Ocean & Sky", span: "sq" },
  { src: "/sveta-08.webp", alt: "Winter Landscape 08", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-09.webp", alt: "Arctic Ocean & Sky 09", tag: "Arctic Ocean & Sky", span: "tall" },
  { src: "/sveta-10.webp", alt: "Arctic Ocean & Sky 10", tag: "Arctic Ocean & Sky", span: "sq" },
  { src: "/sveta-11.webp", alt: "Arctic Ocean & Sky 11", tag: "Arctic Ocean & Sky", span: "wide" },
  { src: "/sveta-12.webp", alt: "Arctic Ocean & Sky 12", tag: "Arctic Ocean & Sky", span: "sq" },
  { src: "/sveta-13.webp", alt: "Winter Landscape 13", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-14.webp", alt: "Winter Landscape 14", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-15.webp", alt: "Murmansk Moments 15", tag: "Murmansk Moments", span: "sq" },
  { src: "/sveta-16.webp", alt: "Arctic Ocean & Sky 16", tag: "Arctic Ocean & Sky", span: "wide" },
  { src: "/sveta-17.webp", alt: "Arctic Ocean & Sky 17", tag: "Arctic Ocean & Sky", span: "tall" },
  { src: "/sveta-18.webp", alt: "Arctic Ocean & Sky 18", tag: "Arctic Ocean & Sky", span: "sq" },
  { src: "/sveta-19.webp", alt: "Arctic Ocean & Sky 19", tag: "Arctic Ocean & Sky", span: "sq" },
  { src: "/sveta-20.webp", alt: "Winter Landscape 20", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-21.webp", alt: "Winter Landscape 21", tag: "Winter Landscape", span: "wide" },
  { src: "/sveta-22.webp", alt: "Murmansk Moments 22", tag: "Murmansk Moments", span: "sq" },
  { src: "/sveta-23.webp", alt: "Winter Landscape 23", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-24.webp", alt: "Winter Landscape 24", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-25.webp", alt: "Murmansk Moments 25", tag: "Murmansk Moments", span: "tall" },
  { src: "/sveta-26.webp", alt: "Winter Landscape 26", tag: "Winter Landscape", span: "wide" },
  { src: "/sveta-27.webp", alt: "Winter Landscape 27", tag: "Winter Landscape", span: "sq" },
  { src: "/sveta-28.webp", alt: "Murmansk Moments 28", tag: "Murmansk Moments", span: "sq" },
  { src: "/sveta-29.webp", alt: "Murmansk Moments 29", tag: "Murmansk Moments", span: "sq" },
  { src: "/sveta-30.webp", alt: "Aurora Night 30", tag: "Aurora Night", span: "sq" },
  { src: "/sveta-31.webp", alt: "Arctic Ocean & Sky 31", tag: "Arctic Ocean & Sky", span: "wide" },
  { src: "/sveta-32.webp", alt: "Murmansk Moments 32", tag: "Murmansk Moments", span: "sq" },
  { src: "/sveta-33.webp", alt: "Winter Landscape 33", tag: "Winter Landscape", span: "tall" },
  { src: "/sveta-34.webp", alt: "Aurora Night 34", tag: "Aurora Night", span: "sq" },
  { src: "/sveta-35.webp", alt: "Winter Landscape 35", tag: "Winter Landscape", span: "sq" },
]

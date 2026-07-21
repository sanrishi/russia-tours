"use client"

import { useState, useRef, useEffect } from "react"
import { useScroll } from "framer-motion"
import { Send, Sparkles, Compass, ArrowRight } from "lucide-react"
import { playClick } from "@/lib/sounds"
import TripCard from "@/components/TripCard"
import TripGallery from "@/components/TripGallery"
import TripExperience from "@/components/TripExperience"
import CostEstimator from "@/components/CostEstimator"
import GroupBookingCallout from "@/components/GroupBookingCallout"
import GlassCard from "@/components/GlassCard"

interface CmsTourData {
  price?: string;
  duration?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: { day: number; title: string; meals: string; transport: string; description: string }[];
}

const chapters = [
  {
    id: "arrival",
    label: "Day 1",
    title: "Arrival in Moscow",
    subtitle: "Добро пожаловать в Москву",
    desc: "Land at Sheremetyevo, private transfer to your 5-star hotel in Tverskoy district. Evening welcome dinner with Indian-Russian fusion cuisine.",
    color: "from-[#1A0A0A] via-[#3D0E0E] to-[#1A0A0A]",
    accent: "#EF4444",
  },
  {
    id: "kremlin",
    label: "Day 2",
    title: "Kremlin & Red Square",
    subtitle: "Кремль и Красная площадь",
    desc: "Guided tour of the Moscow Kremlin, Armoury Chamber, St. Basil's Cathedral. Evening river cruise with champagne.",
    color: "from-[#1A0A0A] via-[#2D1B0E] to-[#1A0A0A]",
    accent: "#F59E0B",
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
    color: "from-[#1A0A0A] via-[#2D0A1A] to-[#1A0A0A]",
    accent: "#EC4899",
  },
  {
    id: "departure",
    label: "Day 7",
    title: "Departure",
    subtitle: "Отъезд",
    desc: "Private airport transfer to Sheremetyevo. до новых встреч — until we meet again!",
    color: "from-[#0A0A1A] via-[#0A1A2E] to-[#0A0A1A]",
    accent: "#06B6D4",
  },
]

export default function MoscowExpressPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const costBtnRef = useRef<HTMLButtonElement>(null)
  const calcBtnRef = useRef<HTMLButtonElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [cmsData, setCmsData] = useState<CmsTourData | null>(null)

  useEffect(() => {
    const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
    if (!spaceId || !token) return
    fetch(`https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${token}&content_type=tourPackage&fields.slug[in]=moscow-discovery&limit=1`)
      .then(r => r.json())
      .then(d => {
        const f = d.items?.[0]?.fields
        if (!f) return
        setCmsData({
          price: f.price,
          duration: f.duration,
          highlights: f.highlights,
          inclusions: f.inclusions,
          exclusions: f.exclusions,
          itinerary: f.itinerary?.map((desc: string, i: number) => ({
            day: i + 1,
            title: desc.replace(/^Day \d+: /, ""),
            meals: "Breakfast",
            transport: "Private transfer",
            description: `Day ${i + 1} of the Moscow Discovery tour. ${desc}`,
          })),
        })
      })
      .catch(() => {})
  }, [])

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  })
  const animPathRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)
  const mobileTimelineRef = useRef<HTMLDivElement>(null)
  const [pathLen, setPathLen] = useState(0)

  useEffect(() => {
    const el = animPathRef.current
    if (!el) return
    const len = Math.ceil(el.getTotalLength())
    setPathLen(len)
  }, [])

  useEffect(() => {
    if (!pathLen) return
    const el = animPathRef.current
    const plane = planeRef.current
    if (!el || !plane) return
    el.style.strokeDasharray = String(pathLen + 100)
    el.style.strokeDashoffset = String(pathLen)
    const update = (v: number) => {
      const offset = pathLen * (1 - v)
      el.style.strokeDashoffset = String(offset)
      const leading = Math.min(pathLen - 1, Math.max(0, pathLen + 100 - offset))
      if (leading < 1 || leading > pathLen - 2) { plane.style.opacity = "0"; return }
      plane.style.opacity = "1"
      const pt = el.getPointAtLength(leading)
      const pt2 = el.getPointAtLength(Math.min(leading + 4, pathLen - 1))
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI)
      plane.setAttribute("transform", `translate(${pt.x},${pt.y}) rotate(${angle + 45})`)
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on("change", update)
    return () => unsub()
  }, [scrollYProgress, pathLen])

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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const f = e.currentTarget.elements
    const name = (f.namedItem("name") as HTMLInputElement).value
    const email = (f.namedItem("email") as HTMLInputElement).value
    const phone = (f.namedItem("phone") as HTMLInputElement).value
    const group_size = (f.namedItem("group_size") as HTMLSelectElement).value
    const message = (f.namedItem("message") as HTMLTextAreaElement).value

    const msg = `*New Enquiry from Moscow Express*
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
      body: JSON.stringify({ _captcha: "false", name, email, phone, group_size, message, page: "Moscow Express — Check Availability" }),
    }).catch(() => {})
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
      url: "https://tripstorussia.com",
    },
  }

  return (
    <main className="relative">
      {/* Fixed background — viewport-anchored, works on all browsers including iOS */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-top bg-no-repeat bg-[url(/mobile-bg.webp)] sm:bg-[url(/enhanced_moscow-bg_final_2.webp)]"
        aria-hidden="true"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }} />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-[120px] animate-pulse" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#DC2626]/5 blur-[120px] animate-pulse [animation-delay:2s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#CA8A04]/3 blur-[150px] animate-pulse [animation-delay:4s]" />
        </div>

        <div className="relative max-w-4xl mx-auto w-full p-8 sm:p-12 lg:p-16 rounded-2xl border border-white/[0.04] bg-[#1C1917]/70 shadow-[0_0_60px_-20px_rgba(0,0,0,0.5)]">
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
                7 Days · Small Group · Indian-Friendly
              </span>
            </div>

            {/* Main headline */}
            <h1 className="mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="block text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.02em] text-white leading-[0.9]">
                Moscow
              </span>
              <span className="block text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.08em] mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#DC2626] bg-clip-text text-transparent bg-[length:200%_100%] animate-border-flow">
                Express
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
              A 7-day guided journey through Russia&apos;s majestic capital — designed for Indian travelers
              who seek luxury, culture, and the extraordinary.
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2">
          <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-medium" style={{ fontFamily: "var(--font-body)" }}>Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/[0.08] flex justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-white/30 animate-bounce" />
          </div>
        </div>
      </section>

        {/* ─── STORY CHAPTERS ─── */}
        <section id="story" className="px-4 sm:px-6 pt-32 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-32 max-w-3xl mx-auto relative rounded-2xl border border-white/[0.06] bg-black/80 p-8 sm:p-10">
              <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#DC2626] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-body)" }}>
                Your Journey
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mt-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A Week Across Russia&apos;s Soul
              </h2>
            </div>

            <div ref={storyRef} className="relative">
              {/* Curvy timeline path — desktop */}
              <div className="hidden sm:block absolute left-1/2 top-0 h-full w-[400px] -translate-x-1/2 pointer-events-none">  <svg className="w-full h-full" viewBox="0 0 400 1200" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="50%" stopColor="#DC2626" />
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
                    d="M 200 30 C 200 100, 60 120, 60 190 C 60 260, 340 280, 340 350 C 340 420, 60 440, 60 510 C 60 580, 340 600, 340 670 C 340 740, 60 760, 60 830 C 60 900, 340 920, 340 990 C 340 1060, 200 1080, 200 1150"
                    stroke="#D4AF37" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" fill="none"
                  />
                  {/* Glowing animated path */}
                  <path
                    ref={animPathRef}
                    d="M 200 30 C 200 100, 60 120, 60 190 C 60 260, 340 280, 340 350 C 340 420, 60 440, 60 510 C 60 580, 340 600, 340 670 C 340 740, 60 760, 60 830 C 60 900, 340 920, 340 990 C 340 1060, 200 1080, 200 1150"
                    stroke="url(#pathGradient)" strokeWidth="4" strokeLinecap="round" fill="none" filter="url(#pathGlow)"
                    style={{ transition: "stroke-dashoffset 0.25s ease-out" }}
                  />
                  {/* Start marker */}
                  <g transform="translate(200,30)">
                    <path d="M0-12 L3-4 L11-4 L5 1 L7 9 L0 4 L-7 9 L-5 1 L-11-4 L-3-4 Z" fill="#FFFFFF" />
                  </g>
                  {/* End marker */}
                  <g transform="translate(200,1150)">
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
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-[#DC2626]/10 to-[#D4AF37]/10 rounded-full" />
                <div ref={mobileTimelineRef} className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#D4AF37] via-[#DC2626] to-[#D4AF37]" style={{ height: '0%' }} />
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
                        className={`group relative rounded-2xl border border-white/[0.06] bg-black/80 p-6 sm:p-8 transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_50px_-20px_rgba(212,175,55,0.15)] ${
                          activeChapter === ch.id ? "border-white/[0.12] shadow-[0_0_50px_-20px_rgba(212,175,55,0.15)]" : ""
                        }`}
                        style={{ '--card-accent': ch.accent } as React.CSSProperties}
                      >
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
            <TripCard costBtnRef={costBtnRef as React.RefObject<HTMLButtonElement | null>} cmsData={cmsData ?? undefined} />
          </div>
        </div>

        {/* ─── TRIP GALLERY ─── */}
        <div className="px-4 sm:px-6 pb-16">
          <div className="max-w-[1728px] mx-auto">
            <GlassCard>
              <div className="p-6 sm:p-8">
                <TripGallery />
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
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Trip Route Map
                  </h2>
                </div>
                <p className="text-white/60 text-xs sm:text-sm mb-4 ml-4" style={{ fontFamily: "var(--font-body)" }}>
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
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Check{" "}
                      <span className="bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#DC2626] bg-clip-text text-transparent">
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

      <CostEstimator triggerRefs={[costBtnRef, calcBtnRef]} />

    </main>
  )
}

"use client"

import { useState, useRef } from "react"
import { Send, Sparkles, Compass, ArrowRight, Landmark } from "lucide-react"
import { playClick } from "@/lib/sounds"
import DotsOverlay from "@/components/DotsOverlay"
import TripCard from "@/components/TripCard"
import TripGallery from "@/components/TripGallery"
import CostEstimator from "@/components/CostEstimator"
import GroupBookingCallout from "@/components/GroupBookingCallout"
import GlassCard from "@/components/GlassCard"

interface RussiaHighlightsProps {
  city: string
  heroTitle: string
  heroSubtitle: string
  gradientTitle: string
  badge: string
  description: string
  heroBg: string
  accentFrom: string
  accentVia: string
  accentTo: string
  accentText: string
  pageLabel: string
  headline: string
  trips: any[]
  media: any
  photos: { src: string; alt: string; tag: string; span: string }[]
  pricePerPerson: number
  waText: string
  enquiryTitle: string
  jsonLdName: string
  jsonLdDesc: string
  accent?: "gold" | "emerald"
}

export default function RussiaHighlightsPage(props: RussiaHighlightsProps) {
  const {
    city, heroTitle, heroSubtitle, gradientTitle, badge, description, heroBg,
    accentFrom, accentVia, accentTo, accentText,
    pageLabel, headline, trips, media, photos,
    pricePerPerson, waText, enquiryTitle, jsonLdName, jsonLdDesc, accent,
  } = props
  const isEmerald = accent === "emerald"
  const focusBorder = isEmerald ? "focus:border-[#34D399]/60" : "focus:border-[#D4AF37]/60"
  const focusBorderSoft = isEmerald ? "focus:border-[#34D399]/50" : "focus:border-[#D4AF37]/50"
  const successBg = isEmerald ? "bg-[#34D399]/10" : "bg-[#D4AF37]/10"
  const successIcon = isEmerald ? "text-[#34D399]" : "text-[#D4AF37]"
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const costBtnRef = useRef<HTMLButtonElement>(null)
  const calcBtnRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const f = e.currentTarget.elements
    const name = (f.namedItem("name") as HTMLInputElement).value
    const email = (f.namedItem("email") as HTMLInputElement).value
    const phone = (f.namedItem("phone") as HTMLInputElement).value
    const group_size = (f.namedItem("group_size") as HTMLSelectElement).value
    const message = (f.namedItem("message") as HTMLTextAreaElement).value

    const msg = `*New Enquiry from ${enquiryTitle}*
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
      body: JSON.stringify({ _captcha: "false", name, email, phone, group_size, message, page: enquiryTitle }),
    }).catch(() => {})
  }

  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: jsonLdName,
    description: jsonLdDesc,
    touristType: "Indian Travelers",
    offers: {
      "@type": "Offer",
      price: String(Math.round(pricePerPerson / 83)),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }} />

      {/* Fixed full-page background — stays behind all content while scrolling */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0B0D1A]/70" />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative min-h-svh flex flex-col overflow-hidden">
        {/* Local vignette over the fixed bg — scrolls with the hero */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D1A]/60 via-transparent to-[#0B0D1A]" />
        </div>
        {/* Background orbs with static blur */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full ${isEmerald ? "bg-[#34D399]/20" : "bg-[#D4AF37]/20"} blur-[80px]`} />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#38BDF8]/10 blur-[80px]" />
        </div>

        <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center px-4 pt-24">
        <div className="relative max-w-4xl mx-auto w-full p-8 sm:p-12 lg:p-16 rounded-2xl border border-white/[0.04] bg-[#1C1917]/70 backdrop-blur-md shadow-[0_0_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
          <DotsOverlay />
          <div className={`absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent ${isEmerald ? "via-[#34D399]/30" : "via-[#D4AF37]/30"} to-transparent`} />
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className={`w-8 h-px bg-gradient-to-r from-transparent ${isEmerald ? "to-[#34D399]/60" : "to-[#D4AF37]/60"}`} />
              <span className={`w-1 h-1 rounded-full ${isEmerald ? "bg-[#34D399]" : "bg-[#D4AF37]"}`} />
              <span className={`w-8 h-px bg-gradient-to-l from-transparent ${isEmerald ? "to-[#34D399]/60" : "to-[#D4AF37]/60"}`} />
            </div>

            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] mb-8 ${isEmerald ? "hover:border-[#34D399]/20" : "hover:border-[#D4AF37]/20"} transition-all duration-500`}>
              <Sparkles size={10} className={isEmerald ? "text-[#34D399]" : "text-[#D4AF37]"} />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                {badge}
              </span>
            </div>

            <h1 className="mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              <span data-split={heroTitle} className="block text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.02em] text-white leading-[0.9]">
                {heroTitle}
              </span>
              <span data-split={gradientTitle} className={`block text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.08em] mt-2 bg-gradient-to-r ${accentFrom} ${accentVia} ${accentTo} bg-clip-text text-transparent bg-[length:200%_100%] animate-border-flow`}>
                {gradientTitle}
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <span className="text-[#D4AF37]/40 text-xs" style={{ fontFamily: "var(--font-body)" }}>✦</span>
              <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            </div>

            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-20 leading-relaxed tracking-wide font-light" style={{ fontFamily: "var(--font-body)" }}>
              {heroSubtitle}
            </p>

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
                href="#tour"
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

        <div className="relative z-10 flex flex-col items-center gap-2 pb-8">
          <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-medium" style={{ fontFamily: "var(--font-body)" }}>Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/[0.08] flex justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-white/30 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── OVERVIEW ─── */}
      <section className="px-4 sm:px-6 pt-32 pb-16 sol-reveal">
        <div className="max-w-4xl mx-auto text-center relative rounded-2xl border border-white/[0.06] bg-[#0B0D1A]/50 backdrop-blur-md p-8 sm:p-10 overflow-hidden">
          <DotsOverlay />
          <div className={`absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent ${accent === "emerald" ? "via-[#34D399]/30" : "via-[#D4AF37]/30"} to-transparent`} />
          <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] bg-gradient-to-r ${accentFrom} ${accentVia} ${accentTo} bg-clip-text text-transparent`} style={{ fontFamily: "var(--font-body)" }}>
            {pageLabel}
          </span>
          <h2 data-split={headline} className="text-3xl sm:text-4xl font-bold text-white mt-2" style={{ fontFamily: "var(--font-heading)" }}>
            {headline}
          </h2>
          <p data-split={description} className="text-white/60 text-sm sm:text-base mt-4 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {description}
          </p>
        </div>
      </section>

      {/* ─── TRIP CARD ─── */}
      <section id="tour" className="px-4 sm:px-6 pb-16 scroll-mt-24 sol-reveal">
        <div className="max-w-[1728px] mx-auto">
          <TripCard
            costBtnRef={costBtnRef as React.RefObject<HTMLButtonElement | null>}
            currency="INR"
            pageUrl={`/${city.toLowerCase()}`}
            trips={trips}
            media={media}
            accent={accent}
          />
        </div>
      </section>

      {/* ─── TRIP GALLERY ─── */}
      <div className="px-4 sm:px-6 pb-16 sol-reveal">
        <div className="max-w-[1728px] mx-auto">
          <GlassCard bg="bg-[#0B0D1A]/40">
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] bg-gradient-to-r ${accentFrom} ${accentVia} ${accentTo} bg-clip-text text-transparent`} style={{ fontFamily: "var(--font-body)" }}>
                  Gallery
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1" style={{ fontFamily: "var(--font-heading)" }}>
                  Moments from {heroTitle}
                </h2>
              </div>
              <TripGallery photos={photos} />
            </div>
          </GlassCard>
        </div>
      </div>

      {/* ─── GROUP BOOKING CTA ─── */}
      <div className="px-4 sm:px-6 pb-16">
        <div className="max-w-[1728px] mx-auto">
          <GlassCard bg="bg-[#0B0D1A]/40">
            <GroupBookingCallout calcBtnRef={calcBtnRef as React.RefObject<HTMLButtonElement | null>} accent={accent} />
          </GlassCard>
        </div>
      </div>

      <div className="h-80 bg-gradient-to-b from-transparent to-[#0B0D1A] relative pointer-events-none -mt-16" />

      {/* ─── BOOKING ─── */}
      <section id="booking" className="relative scroll-mt-24 px-4 sm:px-6 pb-24 flex justify-center">
        <div className="w-full max-w-2xl">
          <GlassCard bg="bg-[#0B0D1A]/40">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Check <span className={`bg-gradient-to-r ${accentFrom} ${accentVia} ${accentTo} bg-clip-text text-transparent`}>Availability</span>
                </h2>
                <p className="text-white/90 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  Fill in your details and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full ${successBg} flex items-center justify-center mx-auto mb-5">
                    <Send size={22} className={`${successIcon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
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
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white text-sm placeholder-white/60 focus:outline-none ${focusBorder} transition-all duration-300 hover:border-white/30"
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
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white text-sm placeholder-white/60 focus:outline-none ${focusBorder} transition-all duration-300 hover:border-white/30"
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
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white text-sm placeholder-white/60 focus:outline-none ${focusBorder} transition-all duration-300 hover:border-white/30"
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
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white text-sm focus:outline-none ${focusBorderSoft} transition-all duration-300 hover:border-white/20"
                    >
                      <option value="" className="bg-[#0B0D1A]">Select...</option>
                      <option value="1" className="bg-[#0B0D1A]">1 person</option>
                      <option value="2" className="bg-[#0B0D1A]">2 people</option>
                      <option value="3" className="bg-[#0B0D1A]">3 people</option>
                      <option value="4" className="bg-[#0B0D1A]">4 people</option>
                      <option value="5" className="bg-[#0B0D1A]">5 people</option>
                      <option value="6" className="bg-[#0B0D1A]">6 people</option>
                      <option value="7" className="bg-[#0B0D1A]">7 people</option>
                      <option value="8" className="bg-[#0B0D1A]">8 people (full group)</option>
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
                    className={`w-full py-3.5 px-6 rounded-xl bg-gradient-to-r ${accentFrom} ${accentVia} ${accentTo} bg-[length:200%_100%] animate-border-flow text-[#0B0D1A] font-bold text-sm hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
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
        pricePerPerson={pricePerPerson}
        durationDays={5}
        currency="INR"
      />
    </main>
    </>
  )
}

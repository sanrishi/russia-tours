"use client"

import { MessageCircle, ArrowRight, Users, Sparkles } from "lucide-react"

const WHATSAPP_NUMBER = "917042987451"

export default function GroupBookingCallout({ calcBtnRef }: { calcBtnRef?: React.RefObject<HTMLButtonElement | null> }) {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm planning a trip for 4+ people. Can you share group pricing and availability?")}`

  return (
    <div className="relative p-8 sm:p-10 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
          <Sparkles size={12} className="text-gold/60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/50">Group Travel</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Planning for <span className="bg-gradient-to-r from-gold via-amber-300 to-rose-300 bg-clip-text text-transparent animate-iridescent">4+ People</span>?
        </h2>
        <p className="text-white/50 text-sm sm:text-base max-w-lg leading-relaxed mx-auto md:mx-0">
          Get an exclusive group quote with special pricing, customized itinerary, and dedicated support.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            ref={calcBtnRef}
            className="group inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.04] text-white/80 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:border-gold/30 hover:bg-gold/[0.06] hover:text-gold cursor-pointer hover:[text-shadow:1px_0_0_rgba(202,138,4,0.3),_-1px_0_0_rgba(147,197,253,0.2)]"
          >
            <Users size={15} />
            Calculate Cost
          </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#F4AA01] text-[#010101] font-bold px-6 py-3 rounded-full text-sm active:scale-95 hover:bg-black hover:text-white transition-all duration-500 ease-in-out"
        >
          <MessageCircle size={16} />
          Get Quote via WhatsApp
          <ArrowRight size={15} />
        </a>
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex flex-wrap items-center gap-x-6 gap-y-1 justify-center md:pl-10 md:justify-start">
        <span className="text-[11px] text-white/30">Reply within 2 hours</span>
        <span className="text-[11px] text-white/30">24/7 support</span>
        <span className="text-[11px] text-white/30">Custom itinerary</span>
      </div>
    </div>
  )
}

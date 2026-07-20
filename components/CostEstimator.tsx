"use client"

import { motion, AnimatePresence } from "framer-motion"
import { IndianRupee, Minus, Plus } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const PRICE_PER_PERSON = 160000
const DURATION_DAYS = 7

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)
  useEffect(() => {
    const from = prevRef.current
    const to = value
    if (from === to) { setDisplay(to); return }
    const duration = 400
    const start = performance.now()
    let running = true
    const animate = (now: number) => {
      if (!running) return
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (to - from) * eased))
    }
    prevRef.current = to
    requestAnimationFrame(animate)
    return () => { running = false }
  }, [value])
  return <span>{display.toLocaleString("en-IN")}</span>
}

export default function CostEstimator({ triggerRefs }: { triggerRefs: React.RefObject<HTMLElement | null>[] }) {
  const [show, setShow] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const [groupSize, setGroupSize] = useState(4)
  const popupRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const total = groupSize * PRICE_PER_PERSON

  useEffect(() => {
    const els = triggerRefs.map(r => r.current).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const onEnter = (e: Event) => {
      clearTimeout(hideTimer.current)
      const target = e.currentTarget as HTMLElement
      showTimer.current = setTimeout(() => {
        const rect = target.getBoundingClientRect()
        const popupHeight = 480
        const spaceBelow = window.innerHeight - rect.bottom
        const isMobile = window.innerWidth < 640
        const popupWidth = isMobile ? window.innerWidth - 16 : 480
        let top = spaceBelow >= popupHeight ? rect.bottom + 8 : rect.top - popupHeight - 8
        top = Math.max(8, top)
        const left = isMobile ? 8 : Math.max(8, Math.min(rect.left + rect.width / 2 - 240, window.innerWidth - popupWidth - 8))
        setPos({ top, left })
        setShow(true)
      }, 200)
    }
    const onLeave = () => {
      clearTimeout(showTimer.current)
      hideTimer.current = setTimeout(() => setShow(false), 300)
    }

    els.forEach(el => {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      els.forEach(el => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      })
      clearTimeout(showTimer.current)
      clearTimeout(hideTimer.current)
    }
  }, [triggerRefs])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, scale: 0.92, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed z-50 w-[calc(100vw-16px)] sm:w-[480px]"
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={() => clearTimeout(hideTimer.current)}
          onMouseLeave={() => setShow(false)}
        >
          <div className="rounded-2xl border border-white/[0.08] bg-[#1C1917]/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_60px_-12px_rgba(202,138,4,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #CA8A04 0%, transparent 70%)" }} />

            <div className="relative p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-gold/[0.1] flex items-center justify-center">
                  <IndianRupee size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Trip Cost Estimator</h3>
                  <p className="text-[10px] text-white/40">Hover to estimate · Real-time</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 mb-4">
                <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.03]">
                  <p className="text-[9px] text-white/30 uppercase tracking-wider mb-0.5">Per Person</p>
                  <p className="text-lg font-bold text-white tabular-nums">₹{PRICE_PER_PERSON.toLocaleString("en-IN")}</p>
                  <p className="text-[9px] text-white/20">7-day tour</p>
                </div>
                <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.03]">
                  <p className="text-[9px] text-white/30 uppercase tracking-wider mb-0.5">Per Day</p>
                  <p className="text-lg font-bold text-white tabular-nums">₹{Math.round(PRICE_PER_PERSON / DURATION_DAYS).toLocaleString("en-IN")}</p>
                  <p className="text-[9px] text-white/20">{groupSize} {groupSize === 1 ? "traveler" : "travelers"}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium">Group Size</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGroupSize(Math.max(1, groupSize - 1))} className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/[0.04] transition-all active:scale-95 cursor-pointer">
                      <Minus size={10} className="text-white/50" />
                    </button>
                    <span className="text-white font-bold text-base tabular-nums w-6 text-center">{groupSize}</span>
                    <button onClick={() => setGroupSize(Math.min(15, groupSize + 1))} className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/[0.04] transition-all active:scale-95 cursor-pointer">
                      <Plus size={10} className="text-white/50" />
                    </button>
                  </div>
                </div>
                <div className="relative h-5 flex items-center">
                  <div className="absolute left-0 right-0 h-[2px] rounded-full bg-white/10" />
                  <div className="absolute left-0 h-[2px] rounded-full bg-gradient-to-r from-gold/60 to-gold" style={{ width: `${((groupSize - 1) / 14) * 100}%` }} />
                  <input type="range" min={1} max={15} value={groupSize}
                    onChange={(e) => setGroupSize(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                </div>
                <div className="flex justify-between text-[9px] text-white/20 mt-1">
                  <span>1</span>
                  <span>15</span>
                </div>
              </div>

              <div className="relative p-4 rounded-xl border border-gold/15 bg-gold/[0.03] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(202,138,4,0.06),transparent_60%)]" />
                <div className="relative text-center">
                  <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1">Estimated Total</p>
                  <p className="text-2xl font-bold text-gold tabular-nums tracking-tight">₹<AnimatedNumber value={total} /></p>
                  <p className="text-[10px] text-white/30 mt-1">₹{Math.round(total / DURATION_DAYS).toLocaleString("en-IN")} per day</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

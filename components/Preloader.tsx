"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { usePathname } from "next/navigation"
import SiteLogo from "./SiteLogo"
import KremlinSkyline from "./KremlinSkyline"

function det(n: number, seed: number) {
  const x = Math.sin(seed + n * 137.5) * 10000
  return x - Math.floor(x)
}

const INFINITY_PATH =
  "M83.604 80c-11.503 0-28.62-4.314-51.855-20.959q-.87.269-1.747.548c-12.25 3.894-22.517 2.683-27.45-3.252-2.624-3.156-3.198-7.202-1.528-10.825 1.261-2.739 3.591-4.89 6.717-6.327A332 332 0 0 1 0 31.74l1.49-1.612a343 343 0 0 0 8.533 8.182c2.735-.865 5.92-1.276 9.443-1.158l.087 2.154c-2.826 0-5.396.233-7.606.769C19.136 46.605 25.85 52.057 32.11 56.6c34.55-10.563 60.77-10.491 70.441.28 2.882 3.212 3.87 7.38 2.702 11.438-1.453 5.052-5.921 8.986-11.956 10.53C90.684 79.513 87.46 80 83.604 80M34.398 58.235C63.868 78.957 82.884 79.213 92.78 76.68c5.285-1.35 9.176-4.715 10.407-9 .943-3.281.135-6.661-2.216-9.279-8.818-9.82-34.106-9.822-66.573-.168M9.52 40.831c-3.113 1.21-5.398 3.134-6.554 5.643-1.289 2.798-.835 5.941 1.216 8.406 1.633 1.964 8.278 7.952 25.188 2.574q.066-.024.139-.044c-6.23-4.6-12.897-10.08-19.989-16.579"

const EMBERS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 2 + det(i, 42) * 96,
  size: 0.5 + det(i, 73) * 3.5,
  delay: det(i, 11) * 5,
  duration: 4 + det(i, 29) * 7,
  drift: -25 + det(i, 53) * 50,
  big: det(i, 97) > 0.8,
}))

const HERO_EMBERS = Array.from({ length: 6 }, (_, i) => ({
  id: 200 + i,
  x: 8 + i * 8,
  size: 4.5 + det(i, 31) * 3,
  delay: det(i, 7) * 3,
  duration: 9 + det(i, 13) * 5,
  drift: -12 + det(i, 23) * 24,
}))

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: 400 + i,
  x: 2 + det(i, 5) * 96,
  y: 2 + det(i, 17) * 96,
  size: 0.5 + det(i, 41) * 1,
  delay: det(i, 61) * 5,
  duration: 2 + det(i, 83) * 3,
}))

const DUST = Array.from({ length: 18 }, (_, i) => ({
  id: 500 + i,
  x: 3 + det(i, 3) * 94,
  size: 1.5 + det(i, 19) * 2.5,
  delay: det(i, 47) * 5,
  duration: 10 + det(i, 59) * 8,
  drift: -20 + det(i, 71) * 40,
}))

const GOLD_THEME = {
  bg: "bg-charcoal",
  accent: "rgba(240,208,96,",
  accent2: "rgba(255,232,136,",
  glow: "rgba(240,208,96,0.4)",
  gold: "text-[#E8C840]/60",
  pulseBg: "radial-gradient(circle, rgba(255,232,136,0.7) 0%, transparent 100%)",
  progress: "linear-gradient(90deg, #B8941E, #DAA520, #F0D060, #FFE888, #FFF8DC, #FFE888, #F0D060, #DAA520, #B8941E)",
  ringStroke: "rgba(240,208,96,0.08)",
  ringStroke2: "rgba(240,208,96,0.12)",
  particleMain: "#FFEAA0",
  particleSub: "#E8C840",
  heroParticle: "#FFF8DC",
  heroShadow: "rgba(218,165,32,0.5)",
  heroShadow2: "rgba(218,165,32,0.3)",
  heroShadow3: "rgba(218,165,32,0.15)",
  bigShadow: "rgba(218,165,32,0.4), 0 8px 20px rgba(218,165,32,0.2), 0 0 8px rgba(255,232,136,0.5), 0 0 20px rgba(255,232,136,0.2)",
  smallShadow: "rgba(218,165,32,0.35)",
  glowBg: "radial-gradient(circle, rgba(240,208,96,0.25) 0%, transparent 55%)",
  dotBg: "radial-gradient(circle, #FFF8DC 0%, #FFE888 40%, #E8C840 70%, transparent 100%)",
  dotShadow: "0 0 16px rgba(240,208,96,0.9), 0 0 32px rgba(240,208,96,0.4), 0 0 48px rgba(240,208,96,0.15)",
  flashBg: "radial-gradient(circle, rgba(255,232,136,0.4) 0%, transparent 55%)",
  tagline: ["Signature", "Russia", "Tours"],
  dustOpacity: "radial-gradient(circle, rgba(255,232,136,0.7) 0%, rgba(240,208,96,0.4) 40%, transparent 100%)",
  bgGrad1: "from-charcoal/70 via-charcoal/50 to-crimson/20",
  bgGrad2: "from-charcoal via-charcoal/60 to-transparent",
  bgRadial: "radial-gradient(circle at 50% 42%, rgba(240,208,96,0.18) 0%, rgba(218,165,32,0.05) 35%, transparent 70%)",
  goldFlowH: ["rgba(240,208,96,0)", "rgba(240,208,96,0)", "rgba(255,232,136,0.55)", "rgba(255,248,220,0.7)", "rgba(255,232,136,0.55)", "rgba(240,208,96,0)", "rgba(240,208,96,0)"],
  goldFlowV: ["rgba(240,208,96,0)", "rgba(240,208,96,0)", "rgba(255,232,136,0.35)", "rgba(255,248,220,0.5)", "rgba(255,232,136,0.35)", "rgba(240,208,96,0)", "rgba(240,208,96,0)"],
  textGlow: "0 0 28px rgba(240,208,96,0.45), 0 0 60px rgba(218,165,32,0.15)",
  underlineGrad: "linear-gradient(90deg, transparent, #B8941E, #DAA520, #F0D060, #FFE888, #FFF8DC, #FFE888, #F0D060, #DAA520, #B8941E, transparent)",
}

const CRIMSON_THEME = {
  bg: "bg-[#120606]",
  accent: "rgba(220,50,50,",
  accent2: "rgba(180,30,30,",
  glow: "rgba(220,50,50,0.25)",
  gold: "text-red-400/40",
  pulseBg: "radial-gradient(circle, rgba(220,50,50,0.6) 0%, transparent 100%)",
  progress: "linear-gradient(90deg, #8B1A1A, #DC3232, #FF4444, #DC3232, #8B1A1A)",
  ringStroke: "rgba(220,50,50,0.06)",
  ringStroke2: "rgba(220,50,50,0.035)",
  particleMain: "#FF4444",
  particleSub: "#DC3232",
  heroParticle: "#FF4444",
  heroShadow: "rgba(220,50,50,0.4)",
  heroShadow2: "rgba(220,50,50,0.2)",
  heroShadow3: "rgba(220,50,50,0.1)",
  bigShadow: "rgba(220,50,50,0.3), 0 8px 16px rgba(220,50,50,0.15), 0 0 4px rgba(255,68,68,0.4), 0 0 12px rgba(255,68,68,0.2)",
  smallShadow: "rgba(220,50,50,0.2)",
  glowBg: "radial-gradient(circle, rgba(220,50,50,0.2) 0%, transparent 65%)",
  dotBg: "radial-gradient(circle, #FF4444 0%, #DC3232 60%, transparent 100%)",
  dotShadow: "0 0 10px rgba(220,50,50,0.7), 0 0 20px rgba(220,50,50,0.3)",
  flashBg: "radial-gradient(circle, rgba(220,50,50,0.25) 0%, transparent 60%)",
  tagline: ["Moscow", "Express"],
  dustOpacity: "radial-gradient(circle, rgba(220,50,50,0.5) 0%, rgba(180,30,30,0.3) 40%, transparent 100%)",
  bgGrad1: "from-[#120606]/70 via-[#120606]/50 to-crimson/30",
  bgGrad2: "from-[#120606] via-[#120606]/60 to-transparent",
  bgRadial: "radial-gradient(circle at 50% 42%, rgba(220,50,50,0.12) 0%, rgba(220,50,50,0.03) 35%, transparent 70%)",
  goldFlowH: ["rgba(220,50,50,0)", "rgba(220,50,50,0)", "rgba(255,68,68,0.4)", "rgba(255,100,100,0.55)", "rgba(255,68,68,0.4)", "rgba(220,50,50,0)", "rgba(220,50,50,0)"],
  goldFlowV: ["rgba(220,50,50,0)", "rgba(220,50,50,0)", "rgba(255,68,68,0.25)", "rgba(255,100,100,0.35)", "rgba(255,68,68,0.25)", "rgba(220,50,50,0)", "rgba(220,50,50,0)"],
  textGlow: "0 0 20px rgba(220,50,50,0.35)",
  underlineGrad: "linear-gradient(90deg, transparent, #DC3232, #FF4444, #DC3232, transparent)",
}

export default function Preloader() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isMoscow = pathname === "/moscow-express"
  const shouldShow = isHome || isMoscow
  const theme = { ...CRIMSON_THEME, tagline: isMoscow ? ["Moscow", "Express"] : ["Signature", "Russia", "Tours"] }

  const [phase, setPhase] = useState<"loading" | "ready" | "exit" | "done">(shouldShow ? "loading" : "done")
  const ringProgress = useMotionValue(0)
  const dotX = useTransform(ringProgress, [0, 1], ["0%", "100%"])
  const planeX = useTransform(ringProgress, [0, 1], ["0%", "100%"])
  const waveX = useTransform(ringProgress, [0, 1], ["20px", "calc(100% + 20px)"])
  const trail1X = useTransform(ringProgress, [0, 1], ["-4%", "96%"])
  const trail2X = useTransform(ringProgress, [0, 1], ["-8%", "92%"])
  const trail3X = useTransform(ringProgress, [0, 1], ["-12%", "88%"])
  const trail4X = useTransform(ringProgress, [0, 1], ["-16%", "84%"])
  const trail1Opacity = useTransform(ringProgress, [0, 1], [0, 1])
  const trail2Opacity = useTransform(ringProgress, [0, 1], [0, 0.5])
  const trail3Opacity = useTransform(ringProgress, [0, 1], [0, 0.25])
  const [progressDone, setProgressDone] = useState(false)
  const [prevPath, setPrevPath] = useState(pathname)
  const [showLogo, setShowLogo] = useState(false)
  const [showTagline, setShowTagline] = useState(false)

  useLayoutEffect(() => {
    if (prevPath !== pathname && (pathname === "/" || pathname === "/moscow-express")) {
      setPrevPath(pathname)
      setPhase("loading")
      ringProgress.set(0)
      setProgressDone(false)
      setShowLogo(false)
      setShowTagline(false)
    } else if (prevPath !== pathname) {
      setPrevPath(pathname)
      setPhase("done")
    }
  }, [pathname, prevPath, ringProgress])

  useEffect(() => {
    if (!shouldShow || (phase !== "loading" && phase !== "ready")) return
    const t1 = setTimeout(() => setShowLogo(true), 50)
    const t2 = setTimeout(() => setShowTagline(true), 200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase, pathname, shouldShow])

  useEffect(() => {
    if (!shouldShow || (phase !== "loading" && phase !== "ready")) return
    const startTime = performance.now()
    const totalDuration = 4500
    let hiddenStart: number | null = null
    let running = true

    function tick() {
      if (!running) return
      if (document.hidden) {
        hiddenStart ??= performance.now()
        requestAnimationFrame(tick)
        return
      }
      if (hiddenStart) {
        hiddenStart = null
      }
      const elapsed = performance.now() - startTime
      const t = Math.min(elapsed / totalDuration, 1)
      ringProgress.set(1 - Math.pow(1 - t, 3))
      if (t < 1) requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => requestAnimationFrame(tick), 50)
    return () => { running = false; clearTimeout(timer) }
  }, [pathname, ringProgress, shouldShow])

  useEffect(() => {
    if (!shouldShow) return
    const unsub = ringProgress.on("change", (v) => {
      if (v >= 0.95) setProgressDone(true)
    })
    return () => unsub()
  }, [pathname, ringProgress, shouldShow])

  useEffect(() => {
    if (!shouldShow || phase !== "loading") return
    let t: ReturnType<typeof setTimeout>
    const fn = () => {
      if (document.hidden) {
        t = setTimeout(fn, 200)
      } else {
        setPhase("ready")
      }
    }
    t = setTimeout(fn, 3300)
    return () => clearTimeout(t)
  }, [pathname, phase, shouldShow])

  useEffect(() => {
    if (phase === "ready") {
      let t: ReturnType<typeof setTimeout>
      const fn = () => {
        if (document.hidden) {
          t = setTimeout(fn, 200)
        } else {
          setPhase("exit")
        }
      }
      t = setTimeout(fn, 600)
      return () => clearTimeout(t)
    }
  }, [phase])

  useEffect(() => {
    if (phase === "exit") {
      let t: ReturnType<typeof setTimeout>
      const fn = () => {
        if (document.hidden) {
          t = setTimeout(fn, 200)
        } else {
          setPhase("done")
        }
      }
      t = setTimeout(fn, 900)
      return () => clearTimeout(t)
    }
  }, [phase])

  const isVisible = (phase === "loading" || phase === "ready") && shouldShow

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${theme.bg}`}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: phase === "exit" ? 0.9 : 0 }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      {isVisible && (
        <div key={pathname} className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Static background layers */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.02, mixBlendMode: "overlay" }}>
              <filter id="grain3">
                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#grain3)" />
            </svg>
            <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGrad1}`} />
            <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGrad2}`} />
            <div className="absolute inset-0" style={{ background: theme.bgRadial }} />
          </div>

          {/* Star field */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {STARS.map((s) => (
              <div
                key={s.id}
                className="absolute rounded-full bg-white"
                style={{
                  width: s.size, height: s.size,
                  left: `${s.x}%`, top: `${s.y}%`,
                  opacity: 0,
                  animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Golden dust motes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {DUST.map((d) => (
              <div
                key={d.id}
                className="absolute rounded-full"
                style={{
                  width: d.size, height: d.size,
                  left: `${d.x}%`, bottom: "0%",
                  background: theme.dustOpacity,
                  animation: `dust-float ${d.duration}s ease-in-out ${d.delay}s infinite`,
                  ["--dust-drift" as string]: `${d.drift}px`,
                }}
              />
            ))}
          </div>

          {/* Aurora blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[450px] h-[450px] -left-[120px] -top-[120px] rounded-full aurora-drift-1"
              style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)" }}
            />
            <div
              className="absolute w-[550px] h-[300px] -right-[180px] bottom-[10%] rounded-full aurora-drift-2"
              style={{ background: "radial-gradient(circle, rgba(212,175,55,0.035) 0%, transparent 60%)" }}
            />
            <div
              className="absolute w-[350px] h-[350px] left-[35%] top-[15%] rounded-full aurora-pulse"
              style={{ background: "radial-gradient(circle, rgba(255,215,0,0.025) 0%, transparent 60%)" }}
            />
            <div
              className="absolute w-[300px] h-[300px] -left-[50px] bottom-[5%] rounded-full aurora-drift-3"
              style={{ background: "radial-gradient(circle, rgba(180,40,40,0.06) 0%, transparent 55%)" }}
            />
            <div
              className="absolute w-[400px] h-[250px] right-[10%] top-[40%] rounded-full aurora-drift-4"
              style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 55%)" }}
            />
          </div>

          {/* Decorative ring */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 600 600" className="w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] opacity-15">
              <circle
                cx="300" cy="300" r="275"
                fill="none" stroke={theme.ringStroke} strokeWidth="0.25"
                className="ring-spin-slow"
                style={{ transformOrigin: "300px 300px" }}
              />
              <circle
                cx="300" cy="300" r="230"
                fill="none" stroke={theme.ringStroke2} strokeWidth="0.4"
                className="ring-spin-reverse"
                style={{ transformOrigin: "300px 300px" }}
              />
            </svg>
          </div>

          {/* Gold ember particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {EMBERS.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size, height: p.size,
                  left: `${p.x}%`, top: "-10px",
                  background: `radial-gradient(circle, ${theme.particleMain} 0%, ${theme.particleSub} 50%, transparent 100%)`,
                  boxShadow: p.big ? theme.bigShadow : "none",
                  animation: `ember-fall ${p.duration}s ease-in-out ${p.delay}s infinite, ember-glint 1.8s ease-in-out ${p.delay + det(p.id, 61) * 1.5}s infinite`,
                  ["--drift" as string]: `${p.drift}px`,
                  willChange: "transform, opacity",
                }}
              />
            ))}
            {HERO_EMBERS.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size, height: p.size,
                  left: `${p.x}%`, top: "-10px",
                  background: `radial-gradient(circle, ${theme.heroParticle} 0%, ${theme.particleSub} 40%, transparent 100%)`,
                  boxShadow: `0 4px 8px ${theme.heroShadow}`,
                  animation: `ember-fall ${p.duration}s ease-in-out ${p.delay}s infinite, ember-glint 2.5s ease-in-out ${p.delay + det(p.id, 37) * 2}s infinite`,
                  ["--drift" as string]: `${p.drift}px`,
                  willChange: "transform, opacity",
                }}
              />
            ))}
          </div>

          {/* Initial golden pulse ring */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 4, height: 4,
              background: theme.pulseBg,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 120, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <div className="relative">
              {/* Glow aura */}
              <motion.div
                className="absolute -inset-20 rounded-full pointer-events-none"
                style={{ background: theme.glowBg }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative overflow-hidden">
                {/* Fade-in reveal */}
                <div style={{
                  opacity: showLogo ? 1 : 0,
                  filter: showLogo ? "blur(0px)" : "blur(36px)",
                  transition: "opacity 0.3s ease-out, filter 0.3s ease-out",
                }}>
                  <SiteLogo className="w-[240px] h-[124px] sm:w-[320px] sm:h-[165px] text-white drop-shadow-[0_0_40px_rgba(212,175,55,0.15)]" />
                </div>

                {/* Liquid gold on infinity */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <svg viewBox="0 0 155 80" className="w-full h-full">
                    <defs>
                      <clipPath id="infinity-shape-v3">
                        <path d={INFINITY_PATH} />
                      </clipPath>
                      <linearGradient id="gold-flow-h" x1="0" y1="0" x2="155" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={theme.goldFlowH[0]} />
                        <stop offset="30%" stopColor={theme.goldFlowH[1]} />
                        <stop offset="45%" stopColor={theme.goldFlowH[2]} />
                        <stop offset="55%" stopColor={theme.goldFlowH[3]} />
                        <stop offset="65%" stopColor={theme.goldFlowH[4]} />
                        <stop offset="80%" stopColor={theme.goldFlowH[5]} />
                        <stop offset="100%" stopColor={theme.goldFlowH[6]} />
                      </linearGradient>
                      <linearGradient id="gold-flow-v" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={theme.goldFlowV[0]} />
                        <stop offset="40%" stopColor={theme.goldFlowV[1]} />
                        <stop offset="50%" stopColor={theme.goldFlowV[2]} />
                        <stop offset="55%" stopColor={theme.goldFlowV[3]} />
                        <stop offset="60%" stopColor={theme.goldFlowV[4]} />
                        <stop offset="70%" stopColor={theme.goldFlowV[5]} />
                        <stop offset="100%" stopColor={theme.goldFlowV[6]} />
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="155" height="80" fill="url(#gold-flow-h)" clipPath="url(#infinity-shape-v3)"
                      className="gold-flow-h"
                    />
                    <rect x="0" y="0" width="155" height="80" fill="url(#gold-flow-v)" clipPath="url(#infinity-shape-v3)"
                      className="gold-flow-v"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tagline — word stagger */}
            <div className="mt-5 flex flex-col items-center gap-1 overflow-hidden">
              <div className="flex gap-3 sm:gap-4">
                {theme.tagline.map((word, i) => (
                  <span
                    key={word}
                    className={`${theme.gold} text-xs sm:text-sm tracking-[0.3em] uppercase font-medium`}
                    style={{
                      opacity: showTagline ? 1 : 0,
                      filter: showTagline ? "blur(0px)" : "blur(36px)",
                      transition: `opacity 0.3s ease-out ${i * 0.12}s, filter 0.3s ease-out ${i * 0.12}s`,
                      textShadow: theme.textGlow,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
              {/* Golden underline */}
              <div
                className="h-px overflow-hidden"
                style={{
                  width: "140px",
                  transform: showTagline ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.6s ease-out 0.5s",
                }}
              >
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background: theme.underlineGrad,
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 sm:w-72">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full blur-sm opacity-80" style={{ background: theme.progress, backgroundSize: "200% 100%" }} />
            {/* Track */}
            <div className="relative h-[3px] overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full w-full rounded-full origin-left"
                style={{
                  background: theme.progress,
                  backgroundSize: "200% 100%",
                  scaleX: ringProgress,
                }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-12 rounded-full pointer-events-none"
                style={{ left: waveX, background: `radial-gradient(ellipse at center, ${theme.particleMain}33 0%, transparent 70%)` }}
              />
              <motion.div
                className="absolute inset-0 w-full h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
                style={{
                  left: dotX,
                  background: theme.dotBg,
                  boxShadow: theme.dotShadow,
                }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
                style={{ left: dotX, border: `1px solid ${theme.particleMain}`, background: "transparent" }}
                animate={{ scale: [1, 3], opacity: [0.6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
                style={{ left: dotX, border: `1px solid ${theme.particleMain}`, background: "transparent" }}
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full pointer-events-none"
                style={{ left: trail1X, background: theme.particleMain, opacity: trail1Opacity }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full pointer-events-none"
                style={{ left: trail2X, background: theme.particleMain, opacity: trail2Opacity }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full pointer-events-none"
                style={{ left: trail3X, background: theme.particleMain, opacity: trail3Opacity }}
              />
              {progressDone && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 0.5, opacity: 0.6 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ background: theme.flashBg }}
                />
              )}
            </div>
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
              style={{ left: planeX }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={theme.particleMain} stroke={theme.particleMain} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(45deg)", transformOrigin: "center", filter: `drop-shadow(0 0 6px ${theme.particleMain})` }}>
                <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.5c.3.5.8.7 1.3.3l.5-.3c.4-.3.6-.7.5-1.2z" />
              </svg>
            </motion.div>
          </div>

          {/* Kremlin skyline illustration */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[520px] max-w-[90vw] pointer-events-none">
            <KremlinSkyline noBackground />
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes ember-fall {" +
            "0% { opacity: 0; transform: translateY(-30px) translateX(0) scale(0.1); }" +
            "5% { opacity: 0.7; transform: translateY(0) translateX(0) scale(1); }" +
            "30% { opacity: 0.5; transform: translateY(35vh) translateX(var(--drift)) scale(0.85); }" +
            "60% { opacity: 0.3; transform: translateY(70vh) translateX(calc(var(--drift) * 0.5)) scale(0.6); }" +
            "100% { opacity: 0; transform: translateY(130vh) translateX(0) scale(0.1); }" +
            "}@keyframes ember-glint {" +
            "0%, 100% { filter: brightness(1); }" +
            "25% { filter: brightness(1.6); }" +
            "50% { filter: brightness(0.7); }" +
            "75% { filter: brightness(1.3); }" +
             "}@keyframes dust-float {" +
            "0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.1); }" +
            "10% { opacity: 0.7; transform: translateY(-10vh) translateX(0) scale(1); }" +
            "40% { opacity: 0.5; transform: translateY(-40vh) translateX(var(--dust-drift)) scale(0.9); }" +
            "70% { opacity: 0.2; transform: translateY(-70vh) translateX(calc(var(--dust-drift) * 0.8)) scale(0.5); }" +
            "100% { opacity: 0; transform: translateY(-100vh) translateX(0) scale(0.1); }" +
            "}@keyframes star-twinkle {" +
            "0%, 100% { opacity: 0; }" +
            "30% { opacity: 0.3; }" +
            "60% { opacity: 0.1; }" +
            "}@keyframes aurora-drift-1 {" +
            "0%, 100% { transform: translate(0, 0); }" +
            "50% { transform: translate(50px, -40px); }" +
            "75% { transform: translate(-40px, 50px); }" +
            "}@keyframes aurora-drift-2 {" +
            "0%, 100% { transform: translate(0, 0); }" +
            "50% { transform: translate(-60px, 50px); }" +
            "75% { transform: translate(40px, -40px); }" +
            "}@keyframes aurora-pulse {" +
            "0%, 100% { transform: scale(1); }" +
            "50% { transform: scale(1.25); }" +
            "75% { transform: scale(0.9); }" +
            "}@keyframes aurora-drift-3 {" +
            "0%, 100% { transform: translate(0, 0); }" +
            "50% { transform: translate(40px, -20px); }" +
            "75% { transform: translate(-30px, 30px); }" +
            "}@keyframes aurora-drift-4 {" +
            "0%, 100% { transform: translate(0, 0); }" +
            "50% { transform: translate(-50px, 30px); }" +
            "75% { transform: translate(30px, -40px); }" +
            "}@keyframes ring-spin { to { transform: rotate(360deg); } }" +
            "@keyframes ring-spin-reverse { to { transform: rotate(-360deg); } }" +
            ".aurora-drift-1 { animation: aurora-drift-1 12s ease-in-out infinite; }" +
            ".aurora-drift-2 { animation: aurora-drift-2 14s ease-in-out infinite; }" +
            ".aurora-pulse { animation: aurora-pulse 8s ease-in-out infinite; }" +
            ".aurora-drift-3 { animation: aurora-drift-3 10s ease-in-out infinite; }" +
            ".aurora-drift-4 { animation: aurora-drift-4 11s ease-in-out infinite; }" +
            ".ring-spin-slow { animation: ring-spin 70s linear infinite; transform-origin: 300px 300px; }" +
            ".ring-spin-reverse { animation: ring-spin-reverse 55s linear infinite; transform-origin: 300px 300px; }",
        }}
      />
    </motion.div>
  )
}

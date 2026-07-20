let tickCtx: AudioContext | null = null

export const ensureAudio = () => {
  if (!tickCtx) {
    try { tickCtx = new (window.AudioContext || (window as any).webkitAudioContext)() } catch {}
  }
}

export const playClick = () => {
  try {
    ensureAudio()
    const ctx = tickCtx
    if (!ctx) return
    if (ctx.state === "suspended") ctx.resume()
    const t = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.value = 800 + Math.random() * 400

    gain.gain.setValueAtTime(1.5, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04)

    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.04)
  } catch {}
}

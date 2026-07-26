const ricFallback = (cb: () => void) => setTimeout(cb, 0) as unknown as number

export const ric: (cb: () => void) => number =
  typeof window !== "undefined" && "requestIdleCallback" in window
    ? (cb) => requestIdleCallback(cb) as unknown as number
    : ricFallback

export const cancelRic: (id: number) => void =
  typeof window !== "undefined" && "cancelIdleCallback" in window
    ? cancelIdleCallback
    : clearTimeout

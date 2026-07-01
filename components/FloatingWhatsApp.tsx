"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useRef, useCallback, useEffect } from "react";

const WHATSAPP_NUMBER = "917042987451";
const MESSAGE = "Hi Sveta! I'm interested in your Russia tours. Can you share more details?";

export default function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
  const x = useMotionValue(0);
  const ref = useRef<HTMLAnchorElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragging = useRef(false);

  const snap = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const mid = window.innerWidth / 2;
    const cur = x.get();

    if (cx < mid) {
      animate(x, cur + 24 - rect.left, { type: "spring", stiffness: 300, damping: 30 });
    } else {
      const orig = window.innerWidth - rect.width - 24;
      animate(x, cur + orig - rect.left, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [x]);

  const hide = useCallback(() => {
    if (dragging.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cur = x.get();
    const mid = window.innerWidth / 2;

    if (cx < mid) {
      animate(x, cur - rect.width + 12, { type: "spring", stiffness: 300, damping: 30 });
    } else {
      animate(x, cur + rect.width - 12, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [x]);

  const reveal = useCallback(() => {
    snap();
  }, [snap]);

  const onActivity = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    reveal();
    hideTimer.current = setTimeout(hide, 2000);
  }, [reveal, hide]);

  useEffect(() => {
    onActivity();
    const events = ["scroll", "mousemove", "touchstart", "click", "keydown", "wheel"];
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      events.forEach((e) => window.removeEventListener(e, onActivity));
    };
  }, [onActivity]);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3, ease: "easeOut" }}
      drag
      dragMomentum={false}
      onDragStart={() => { dragging.current = true; if (hideTimer.current) clearTimeout(hideTimer.current); }}
      onDragEnd={() => { dragging.current = false; snap(); onActivity(); }}
      onMouseEnter={() => { if (hideTimer.current) clearTimeout(hideTimer.current); reveal(); }}
      onMouseLeave={onActivity}
      className="fixed bottom-6 right-6 z-50 touch-none flex items-center gap-2 bg-whatsapp text-white px-5 py-3.5 rounded-full shadow-xl shadow-whatsapp/20 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:brightness-110 active:brightness-95 md:hover:scale-105"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-whatsapp/40"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <MessageCircle size={22} className="shrink-0 fill-white relative z-10" />
      <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline relative z-10">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}

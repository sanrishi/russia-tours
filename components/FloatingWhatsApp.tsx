"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useRef, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "917042987451";
const MESSAGE = "Hi Sveta! I'm interested in your Russia tours. Can you share more details?";

export default function FloatingWhatsApp() {
  const pathname = usePathname()
  if (pathname === "/moscow-express") return null

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
  const x = useMotionValue(0);
  const ref = useRef<HTMLAnchorElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragging = useRef(false);
  const hovering = useRef(false);

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
    if (!hovering.current) {
      hideTimer.current = setTimeout(hide, 1500);
    }
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
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        delay: 1,
        duration: 0.3,
        ease: "easeOut",
        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragMomentum={false}
      onDragStart={() => { dragging.current = true; hovering.current = false; if (hideTimer.current) clearTimeout(hideTimer.current); }}
      onDragEnd={() => { dragging.current = false; snap(); onActivity(); }}
      onMouseEnter={() => { hovering.current = true; if (hideTimer.current) clearTimeout(hideTimer.current); reveal(); }}
      onMouseLeave={() => { hovering.current = false; onActivity(); }}
      className="fixed bottom-6 right-6 z-50 touch-none flex items-center gap-2 text-white px-5 py-3.5 rounded-full shadow-xl shadow-whatsapp/20 cursor-pointer bg-whatsapp overflow-hidden group hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow duration-500"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffd700] via-[#ff1493] to-[#8b5cf6] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
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

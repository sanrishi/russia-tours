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
      animate(x, cur - rect.width + 8, { type: "spring", stiffness: 300, damping: 30 });
    } else {
      animate(x, cur + rect.width - 8, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [x]);

  const reveal = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    snap();
  }, [snap]);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(hide, 2000);
  }, [hide]);

  useEffect(() => {
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.offsetWidth;
      const cur = x.get();
      if (cur === 0) x.set(w - 8);
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragMomentum={false}
      onDragStart={() => { dragging.current = true; if (hideTimer.current) clearTimeout(hideTimer.current); }}
      onDragEnd={() => { dragging.current = false; snap(); scheduleHide(); }}
      onMouseEnter={reveal}
      onMouseLeave={scheduleHide}
      onFocus={reveal}
      onBlur={scheduleHide}
      className="fixed bottom-6 right-6 z-50 touch-none flex items-center gap-2 bg-whatsapp text-white px-5 py-3.5 rounded-full shadow-xl shadow-whatsapp/20 cursor-pointer"
    >
      <MessageCircle size={22} className="shrink-0 fill-white" />
      <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}

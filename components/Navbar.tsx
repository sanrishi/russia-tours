"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import CurrencyPopover from "@/components/CurrencyPopover";
import WeatherWidget from "@/components/WeatherWidget";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/places", label: "Places" },
  { href: "/visa", label: "Visa" },
  { href: "/tips", label: "Useful Tips" },
  { href: "/about", label: "About Me" },
  { href: "/partner", label: "Partner with Us", external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ru">("en");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1728px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gold">Trips to</span>
              <span className="text-white"> Russia</span>
            </span>
            <span className="text-[10px] text-white/40 tracking-widest uppercase">
              by Indosvetka
            </span>
          </div>
          <WeatherWidget />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-5">
            <div className="relative">
              <CurrencyPopover />
            </div>
            <span className="text-white/20 text-xs mx-1.5">|</span>
            <button
              onClick={() => setLang("en")}
              className={`text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded transition-colors ${
                lang === "en"
                  ? "text-gold"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              EN
            </button>
            <span className="text-white/20 text-xs">|</span>
            <button
              onClick={() => setLang("ru")}
              className={`text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded transition-colors ${
                lang === "ru"
                  ? "text-gold"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              RU
            </button>
          </div>
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden bg-gold text-charcoal font-semibold text-sm px-5 py-2.5 rounded-full transition-shadow hover:shadow-lg hover:shadow-gold/20"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffd700] via-[#ff1493] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Phone size={14} className="relative z-10" />
            <span className="relative z-10">Plan Your Tour</span>
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal/95 backdrop-blur-xl border-t border-white/5 overflow-visible"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="text-white/70 hover:text-white py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2 transition-colors ${
                      pathname === link.href
                        ? "text-gold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10 mt-2">
                <div className="relative">
                  <CurrencyPopover />
                </div>
                <span className="text-white/20 text-xs">|</span>
                <button
                  onClick={() => setLang("en")}
                  className={`text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded transition-colors ${
                    lang === "en"
                      ? "text-gold"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  EN
                </button>
                <span className="text-white/20 text-xs">|</span>
                <button
                  onClick={() => setLang("ru")}
                  className={`text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded transition-colors ${
                    lang === "ru"
                      ? "text-gold"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  RU
                </button>
              </div>
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-gold text-charcoal font-semibold text-sm px-5 py-3 rounded-full transition-all mt-2"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffd700] via-[#ff1493] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Phone size={14} className="relative z-10" />
                <span className="relative z-10">Plan Your Tour</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

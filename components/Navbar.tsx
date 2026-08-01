"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import CurrencyPopover from "@/components/CurrencyPopover";
import WeatherWidget from "@/components/WeatherWidget";
import SiteLogo from "@/components/SiteLogo";
import { playClick, ensureAudio } from "@/lib/sounds";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/places", label: "Places" },
  { href: "/visa", label: "E Visa" },
  { href: "/news", label: "News" },
  { href: "/tips", label: "Useful Tips" },
  { href: "/about", label: "About Me" },
  { href: "/partner", label: "Partner with Us", external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ru">("en");

  useEffect(() => { ensureAudio() }, [])

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
          <SiteLogo className="w-[100px] h-[52px] md:w-[155px] md:h-[80px] text-white" />
          <WeatherWidget />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.external ? (
              <div key={link.href} className="group relative overflow-hidden rounded-full px-3 py-2" onMouseEnter={playClick}>
                <div className="absolute inset-0 rounded-full bg-white/10 pointer-events-none scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={playClick} className="relative z-10 block text-sm overflow-hidden">
                  <span className="block text-white/60 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-white group-hover:[text-shadow:0_0_30px_rgba(255,255,255,0.8),0_0_60px_rgba(255,255,255,0.3)] group-hover:-translate-y-full">{link.label}</span>
                  <span className="absolute left-0 top-0 block text-white transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] translate-y-full group-hover:translate-y-0 group-hover:[text-shadow:0_0_30px_rgba(255,255,255,0.8),0_0_60px_rgba(255,255,255,0.3)]" aria-hidden>{link.label}</span>
                </a>
              </div>
            ) : (
              <div key={link.href} className="group relative overflow-hidden rounded-full px-3 py-2" onMouseEnter={playClick}>
                <div className="absolute inset-0 rounded-full bg-white/10 pointer-events-none scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                <Link href={link.href} onClick={playClick} className="relative z-10 block text-sm overflow-hidden">
                  <span className={`block transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full group-hover:text-white group-hover:[text-shadow:0_0_30px_rgba(255,255,255,0.8),0_0_60px_rgba(255,255,255,0.3)] ${pathname === link.href ? "text-gold" : "text-white/60"}`}>{link.label}</span>
                  <span className="absolute left-0 top-0 block text-white transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] translate-y-full group-hover:translate-y-0 group-hover:[text-shadow:0_0_30px_rgba(255,255,255,0.8),0_0_60px_rgba(255,255,255,0.3)]" aria-hidden>{link.label}</span>
                </Link>
              </div>
            ),
          )}
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-5">
            <div className="relative">
              <CurrencyPopover />
            </div>
            <span className="text-white/20 text-xs mx-1.5">|</span>
            <button
              onClick={(e) => { playClick(); setLang("en"); }}
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
              onClick={(e) => { playClick(); setLang("ru"); }}
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
            href="/moscow-express#booking"
            onClick={playClick}
            className="inline-flex items-center gap-2 bg-[#F4AA01] text-[#010101] font-semibold text-sm px-5 py-2.5 rounded-full active:scale-95 hover:bg-black hover:text-white transition-all duration-500 ease-in-out"
          >
            <Phone size={14} />
            <span>Plan Your Tour</span>
          </Link>
        </nav>

        <button
          onClick={(e) => { playClick(); setMobileOpen(!mobileOpen); }}
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
            className="md:hidden bg-white/5 backdrop-blur-2xl border-t border-white/5 overflow-visible"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { playClick(); setMobileOpen(false); }}
                    className="text-white/70 hover:text-white py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { playClick(); setMobileOpen(false); }}
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
                  onClick={(e) => { playClick(); setLang("en"); }}
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
                  onClick={(e) => { playClick(); setLang("ru"); }}
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
                href="/moscow-express#booking"
                onClick={(e) => { playClick(); setMobileOpen(false); }}
                className="inline-flex items-center justify-center gap-2 bg-[#F4AA01] text-[#010101] font-semibold text-sm px-5 py-3 rounded-full active:scale-95 hover:bg-black hover:text-white transition-all duration-500 ease-in-out mt-2"
              >
                <Phone size={14} />
                <span>Plan Your Tour</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles, ChevronRight, MessageCircle, Camera, Mail, Phone } from "lucide-react";
import CertificationsSection from "@/components/CertificationsSection";

const quickLinks = [
  { label: "Moscow Express", href: "/moscow-express" },
  { label: "Travel Tips", href: "/tips" },
  { label: "Visa Guide", href: "/tips/visa-guide" },
  { label: "About Us", href: "/about" },
];

const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const connectLinks = [
  { label: "WhatsApp", href: "https://wa.me/917042987451", external: true },
  { label: "Instagram", href: "https://www.instagram.com/indosvetka", external: true },
];

function GlassLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  const cls = "group flex items-center gap-2 text-[13px] text-slate-200 hover:text-white transition-all duration-300 py-1";
  const inner = (
    <>
      <ChevronRight size={10} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold" />
      <span className="group-hover:translate-x-0.5 transition-transform duration-300">{label}</span>
    </>
  );
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  }
  return <Link href={href} className={cls}>{inner}</Link>;
}

export default function Footer() {
  const pathname = usePathname()
  const isNews = pathname?.startsWith("/news")

  return (
    <footer className="relative">
      {!isNews && (
      /* ─── VIDEO PATTERN ─── */
      <div className="bg-[#0c0a0a] w-full max-w-[1380px] mx-auto flex justify-center mt-6 h-[130px] sm:h-[260px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 100%, #d4af37 0%, transparent 70%)",
          }}
        />
        <video
          autoPlay loop muted playsInline preload="auto"
          className="hidden sm:block w-full h-full object-cover"
          style={{
            WebkitMaskImage: "url(https://cdn.discover.moscow/images/pattern_black_en.svg)",
            maskImage: "url(https://cdn.discover.moscow/images/pattern_black_en.svg)",
            WebkitMaskSize: "contain", maskSize: "contain",
            WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
            WebkitMaskPosition: "bottom center", maskPosition: "bottom center",
          }}
        >
          <source src="/footer_video.mp4" type="video/mp4" />
          <source src="/footer_video.webm" type="video/webm" />
        </video>
        <video
          autoPlay loop muted playsInline preload="auto"
          className="block sm:hidden w-full h-full object-cover"
          style={{
            WebkitMaskImage: "url(https://cdn.discover.moscow/images/pattern_mobile_black_en.svg)",
            maskImage: "url(https://cdn.discover.moscow/images/pattern_mobile_black_en.svg)",
            WebkitMaskSize: "contain", maskSize: "contain",
            WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
            WebkitMaskPosition: "bottom center", maskPosition: "bottom center",
          }}
        >
          <source src="/footer_video.mp4" type="video/mp4" />
          <source src="/footer_video.webm" type="video/webm" />
        </video>
      </div>
      )}

      {/* ─── MAIN CONTENT: DUAL-CORNER AMBER-BLUE ─── */}
      <div className="relative bg-gradient-to-br from-amber-950 via-black to-blue-950">
        {/* Gradient fade from video section into matte black */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0c0a0a] to-transparent pointer-events-none" />

        {/* Gold accent divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-6" />

        <div className="max-w-[1728px] mx-auto px-6 py-12 sm:py-16">
          {/* ─── TOP ROW: Trust + CTA ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-10 border-b border-white/[0.08]">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                <Sparkles size={12} className="text-gold" />
                <p className="text-xs text-gold tracking-[0.2em] uppercase font-heading">Trusted by over 100+ Indian travelers</p>
              </div>
              <p className="text-sm text-slate-300 max-w-md leading-relaxed">Experience the magic of Russia with curated tours, local guides, and seamless support from India.</p>
            </div>
            <Link
              href="/moscow-express#booking"
              className="group relative inline-flex items-center gap-2.5 border border-gold/50 text-gold text-sm px-6 py-3 rounded-full overflow-hidden transition-all duration-500 hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/[0.08] to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2.5">
                Plan Your Moscow Adventure <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          {/* ─── LINK COLUMNS ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
            {[
              { title: "Quick Links", links: quickLinks },
              { title: "Support", links: supportLinks },
              { title: "Connect", links: connectLinks, contact: true },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="font-heading text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">{col.title}</h3>
                {col.title === "Connect" ? (
                  <div className="space-y-1">
                    <a href="https://wa.me/917042987451" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] text-slate-200 hover:text-white transition-all duration-300 py-1">
                      <MessageCircle size={14} className="text-slate-300 group-hover:text-gold transition-colors duration-300 shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                    <a href="https://www.instagram.com/indosvetka" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] text-slate-200 hover:text-white transition-all duration-300 py-1">
                      <Camera size={14} className="text-slate-300 group-hover:text-gold transition-colors duration-300 shrink-0" />
                      <span>Instagram</span>
                    </a>
                    <div className="mt-4 space-y-1">
                      <p className="flex items-center gap-2 text-[13px] text-slate-200 py-1">
                        <Mail size={14} className="text-slate-300 shrink-0" />
                        <span>Email: svetaindia07@gmail.com</span>
                      </p>
                      <p className="flex items-center gap-2 text-[13px] text-slate-200 py-1">
                        <Phone size={14} className="text-slate-300 shrink-0" />
                        <span>Tel: +91 7042987451</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {col.links.map((link: any) => <GlassLink key={link.label} {...link} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <CertificationsSection />

        {/* ─── BOTTOM BAR ─── */}
        <div className="mt-10">
          <div className="max-w-[1728px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-slate-400">
              &copy; {new Date().getFullYear()} Indosvetka. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-500">
              Crafted with precision in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import { Mail, Phone, MapPin, Heart, Users, Globe, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a0a] via-[#0c0a0a] to-gold/5" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 70% 30%, #d4af37 0.5px, transparent 0.5px)`, backgroundSize: "40px 40px" }} />
        <div className="relative max-w-[1728px] mx-auto px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-[0.15em] uppercase mb-4">
              <Heart size={14} /> About Me
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5">
              Your Guide to Russia
            </h1>
            <p className="text-gold/70 text-base sm:text-lg leading-relaxed max-w-2xl">
              Helping Indian travelers experience Russia with comfort, confidence,
              and a taste of home.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1728px] mx-auto px-6 pb-20 -mt-6 relative z-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Users, value: "100+", label: "Travelers Guided" },
            { icon: Globe, value: "2", label: "Countries Connected" },
            { icon: Star, value: "4.9", label: "Avg. Rating" },
            { icon: Heart, value: "Multiple", label: "India Visits" },
          ].map((s) => (
            <div key={s.label} className="group relative p-5 rounded-xl border border-white/10 bg-[#161412] hover:border-gold/20 transition-all duration-300">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                  <s.icon size={18} className="text-gold" />
                </div>
                <p className="text-2xl font-bold text-white tabular-nums">{s.value}</p>
                <p className="text-sm text-white/50">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Section */}
        <div className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-8 mb-6 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative grid md:grid-cols-5 gap-8 items-start">
            {/* Image */}
            <div className="md:col-span-2">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/5 group">
                <Image
                  src="/profile_sveta.JPG"
                  alt="Sveta — Indosvetka"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161412]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-bold">Sveta</p>
                  <p className="text-gold/70 text-xs">Founder & Tour Host</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-gold" />
                  About Sveta
                </h2>
                <div className="space-y-4 text-white/50 text-sm leading-relaxed">
                  <p>
                    Hi, I&apos;m Sveta. I have visited India many times and spent
                    a lot of time interacting with local people. These experiences
                    helped me understand Indian culture, traditions, and daily life
                    from the inside, not just as a tourist. I truly admire India
                    and feel a strong connection to its people.
                  </p>
                  <p>
                    During my travels, I often heard from Indians that they feel a
                    close cultural bond with Russia and are very interested in
                    visiting the country. This inspired me to create guided tours
                    in Russia specifically for Indian travelers.
                  </p>
                  <p>
                    My goal is to make travel in Russia comfortable, well-organized,
                    and stress-free. I personally accompany groups during tours,
                    stay available throughout the journey, and help with any
                    questions or situations that may arise — so guests can fully
                    enjoy their experience.
                  </p>
                  <p>
                    I speak English and have basic knowledge of Hindi (at a very
                    simple level). While I&apos;m not fluent, I&apos;m able to
                    communicate on a practical level and understand key expressions,
                    especially in travel and everyday situations.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-gold" />
                  Contact
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: Mail, label: "Email", value: "svetaindia07@gmail.com", href: "mailto:svetaindia07@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+91 70429 87451", href: "tel:+917042987451" },
                    { icon: Phone, label: "Alternate", value: "+91 77172 51915", href: "tel:+917717251915" },
                    { icon: MapPin, label: "Location", value: "Moscow / India" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                      <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <c.icon size={14} className="text-gold" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">{c.label}</p>
                        {c.href ? (
                          <a href={c.href} className="text-sm text-white/60 hover:text-gold transition-colors truncate block">
                            {c.value}
                          </a>
                        ) : (
                          <p className="text-sm text-white/60 truncate">{c.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

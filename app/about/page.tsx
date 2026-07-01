import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import CertificationsSection from "@/components/CertificationsSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-3xl mb-14">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            About Me
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Your Guide to Russia
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Helping Indian travelers experience Russia with comfort, confidence,
            and a taste of home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 relative bg-charcoal/50">
            <Image
              src="/profile_sveta.JPG"
              alt="Sveta — Indosvetka"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">
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

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
              <h3 className="text-white font-semibold text-sm">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Mail size={14} className="text-gold shrink-0" />
                  <span>svetaindia07@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Phone size={14} className="text-gold shrink-0" />
                  <span>+91 70429 87451</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Phone size={14} className="text-gold shrink-0" />
                  <span>+91 77172 51915</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <MapPin size={14} className="text-gold shrink-0" />
                  <span>Moscow / India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <CertificationsSection />
        </div>
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, IndianRupee } from "lucide-react";

interface TourCardData {
  city: string;
  tagline: string;
  description: string;
  image: string;
  gradient: string;
  price: string;
  href: string;
  comingSoon?: boolean;
}

interface Props {
  moscowTitle?: string;
  moscowTagline?: string;
  moscowDescription?: string;
  moscowImage?: string;
  moscowPrice?: string;
}

const fallbackDestinations: TourCardData[] = [
  {
    city: "Moscow",
    tagline: "The Imperial Pulse",
    description:
      "Red Square, Kremlin, world-class Indian restaurants, and halal dining in Russia's majestic capital.",
    image: "/moscow-hero.webp",
    gradient: "from-crimson/80 via-crimson/40 to-transparent",
    price: "₹1,60,000",
    href: "/moscow-express",
  },
  {
    city: "St. Petersburg",
    tagline: "The Cultural Soul",
    description:
      "Hermitage, canals, ballet — with Indian-friendly amenities in the Venice of the North.",
    image: "/stpetersburg-card.webp",
    gradient: "from-amber/80 via-amber/40 to-transparent",
    price: "TBD",
    href: "#",
    comingSoon: true,
  },
  {
    city: "Kazan",
    tagline: "The Crossroad of Worlds",
    description:
      "Russia's Muslim heritage, Kul Sharif Mosque, and a halal food paradise on the Volga.",
    image: "/kazan-card.webp",
    gradient: "from-emerald/80 via-emerald/40 to-transparent",
    price: "TBD",
    href: "#",
    comingSoon: true,
  },
];

export default function DestinationsGrid({ moscowTitle, moscowTagline, moscowDescription, moscowImage, moscowPrice }: Props) {
  const destinations: TourCardData[] = moscowPrice
    ? [
        {
          city: "Moscow",
          tagline: moscowTagline || fallbackDestinations[0].tagline,
          description: moscowDescription || fallbackDestinations[0].description,
          image: moscowImage || fallbackDestinations[0].image,
          gradient: "from-crimson/80 via-crimson/40 to-transparent",
          price: moscowPrice,
          href: "/moscow-express",
        },
        ...fallbackDestinations.slice(1),
      ]
    : fallbackDestinations;
  return (
    <section id="destinations" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
            Destinations
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mt-4">
            Three Cities. Infinite Stories.
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl mx-auto">
            Each city offers a unique flavor of Russia, curated for the Indian
            traveler.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {destinations.map((dest, i) => (
            <motion.a
              key={dest.city}
              href={dest.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative aspect-[3/4] md:aspect-auto md:h-[520px] rounded-2xl overflow-hidden bg-charcoal border border-white/5 hover:border-gold/20 transition-all duration-500"
            >
              <Image
                src={dest.image}
                alt={dest.city}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-b ${dest.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {dest.comingSoon && (
                  <span className="inline-flex items-center bg-gold text-charcoal text-xs font-bold px-3 py-1.5 rounded-full">
                    Coming Soon
                  </span>
                )}
                <span className="inline-flex items-center gap-1 bg-charcoal/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                  <IndianRupee size={11} />
                  {dest.price}/person
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <p className="text-gold text-xs font-medium tracking-[0.15em] uppercase mb-1">
                  {dest.tagline}
                </p>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {dest.city}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {dest.description}
                </p>
                <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                  Explore Tours <ArrowRight size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import SafetyCallout from "@/components/SafetyCallout";
import Link from "next/link";
import { ArrowRight, Sun, UtensilsCrossed, Lightbulb, Shield, FileText, Banknote, Map, Building, Plane, Globe, Wifi, Languages } from "lucide-react";

const articles = [
  {
    href: "/tips/weather-packing",
    icon: Sun,
    label: "Weather & Packing",
    title: "Moscow in August — What to Pack",
    desc: "Daytime 23°C, cool evenings, and exactly what to bring for your trip.",
  },
  {
    href: "/tips/indian-food",
    icon: UtensilsCrossed,
    label: "Indian Food Guide",
    title: "Indian & Halal Food Near Red Square",
    desc: "Authentic Indian restaurants within walking distance of the Kremlin.",
  },
  {
    href: "/tips/itineraries",
    icon: Map,
    label: "Itineraries",
    title: "Moscow in 1, 3 & 7 Days",
    desc: "Perfect plans for any trip length — from a quick layover to a full week.",
  },
  {
    href: "/tips/hotels",
    icon: Building,
    label: "Hotels",
    title: "Where to Stay in Moscow",
    desc: "Best areas and hotels for Indian travellers — with prices and tips.",
  },
  {
    href: "/tips/transport",
    icon: Plane,
    label: "Transport",
    title: "Getting Around Moscow",
    desc: "Airports, Aeroexpress, metro, taxis, and trains between cities.",
  },
  {
    href: "/tips/first-time",
    icon: Globe,
    label: "First-Time Guide",
    title: "A First-Time Visitor's Guide to Moscow",
    desc: "Visa, cash, safety, and daily life tips for your first trip to Russia.",
  },
  {
    href: "/tips/connectivity",
    icon: Wifi,
    label: "Connectivity",
    title: "SIM, VPN & Apps for Moscow",
    desc: "Stay connected — local SIMs, essential VPN setup, and must-have apps.",
  },
  {
    href: "/tips/phrasebook",
    icon: Languages,
    label: "Phrasebook",
    title: "Basic Russian for Indian Travellers",
    desc: "Essential words and phrases for greetings, food, shopping, and emergencies.",
  },
  {
    href: "/tips/practical-tips",
    icon: Lightbulb,
    label: "Practical Tips",
    title: "Payments, Internet, Metro & Language",
    desc: "Navigate Russia with confidence — cash, SIM cards, metro, and basic Russian phrases.",
  },
  {
    href: "/tips/safety",
    icon: Shield,
    label: "Safety Guide",
    title: "Safety for Indian Travelers",
    desc: "Emergency contacts, embassy info, health tips, and general safety advice.",
  },
  {
    href: "/tips/visa-guide",
    icon: FileText,
    label: "Visa Guide",
    title: "Russia E-Visa for Indian Citizens",
    desc: "Step-by-step process, documents required, and important notes for your application.",
  },
  {
    href: "/tips/currency",
    icon: Banknote,
    label: "Currency Guide",
    title: "Currency & Payments in Russia",
    desc: "Cash, Yoomoney card, and how to pay when VISA/Mastercard don't work.",
  },
];

export default function TipsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-3xl mb-14">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Useful Tips
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Travel Tips for Indian Visitors
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Weather, packing, food, safety, visa, currency — everything you need
            to know before visiting Russia.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.href}
                href={a.href}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-gold/20 hover:bg-white/[0.04] transition-all duration-500"
              >
                <Icon size={20} className="text-gold mb-3" />
                <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase">
                  {a.label}
                </span>
                <h2 className="text-base font-bold text-white mt-2 group-hover:text-gold transition-colors">
                  {a.title}
                </h2>
                <p className="text-sm text-white/50 mt-2 leading-relaxed">
                  {a.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-gold text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

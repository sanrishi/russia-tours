
import { Train, Bus, Car, Plane, Smartphone } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

const methods = [
  { icon: Train, title: "Metro", desc: "The fastest and most affordable way to get around Moscow.", items: ["Single ride: ₹80 (buy at ticket office or vending machines)", "Troika Card: ₹60/ride (tap at gates, refillable at any station)", "Unlimited pass: ₹2,500 for 3 days, ₹4,500 for 7 days (best for tourists)", "30+ stations are architectural masterpieces — take a dedicated metro tour", "Metro runs 5:30 AM to 1:00 AM. Trains every 2–5 minutes."] },
  { icon: Bus, title: "Buses & Trams", desc: "Covers areas the metro doesn't reach.", items: ["Use the same Troika card — tap on boarding", "Buses run 5:00 AM to midnight, night buses on major routes", "Google Maps and Yandex Maps work well for bus routes and real-time tracking", "Trolleybuses and trams are being modernized — air-conditioned on newer routes"] },
  { icon: Car, title: "Taxis (Yandex Go)", desc: "The most convenient option for late nights or luggage-heavy days.", items: ["Always use Yandex Go — NEVER hail taxis on the street. Fixed price shown before booking.", "A ride across the city centre: ₹400–₹800. Airport to centre: ₹2,500–₹4,000.", "Pay by cash or link your Yoomoney card. Some accept UnionPay.", "Comfort class: ₹1,200–₹1,800 for longer trips. Choose 'Comfort+' for more legroom."] },
  { icon: Plane, title: "Airport Transfers", desc: "Getting to/from Moscow's airports.", items: ["Sheremetyevo (SVO): Aeroexpress to Belorussky Station (35 min, ₹1,500)", "Domodedovo (DME): Aeroexpress to Paveletsky Station (45 min, ₹1,500)", "Vnukovo (VKO): Aeroexpress to Kievsky Station (35 min, ₹1,500)", "Taxi from airport: ₹2,500–₹4,000 via Yandex Go. Book airport transfer for comfort."] },
  { icon: Smartphone, title: "Essential Apps", desc: "Download these before your trip.", items: ["Yandex Go — taxis and ride-sharing (Moscow's Uber)", "Yandex Maps — offline maps and transit routes", "Yandex Metro — station maps and route planner", "Troika app — check card balance and top up", "Moscow Metro app — official station guide with art history"] },
];

export default function TransportPage() {
  return (
    <TipsArticleShell label="Transport Guide" title="Getting Around Moscow" description="Moscow has one of the world's best metro systems. Here's how to navigate the city by metro, bus, taxi, and airport transfers.">
      <Section>
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9]">
          <img src="/transport-hero.webp" alt="Moscow transport" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/20 to-transparent" />
        </div>
        <div className="space-y-5">
          {methods.map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.title} className="!p-6 sm:!p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0"><Icon size={18} className="text-gold" /></div>
                  <h2 className="text-xl font-bold text-white">{m.title}</h2>
                  <span className="text-xs text-white/40 ml-auto">{m.desc}</span>
                </div>
                <ul className="space-y-2 ml-[52px]">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0 mt-2" />{item}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Section>
    </TipsArticleShell>
  );
}

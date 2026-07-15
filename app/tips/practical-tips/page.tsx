
import { Sun, CloudSnow, Umbrella, Thermometer, Lightbulb } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

const seasons = [
  { season: "Winter (Dec–Feb)", icon: CloudSnow, temp: "-10°C to -5°C", note: "Layered clothing, thermal wear, insulated boots, gloves, and a warm hat are essential.", adv: "Fewer tourists, magical snow-covered views, ice skating in Gorky Park." },
  { season: "Spring (Mar–May)", icon: Umbrella, temp: "0°C to 15°C", note: "Temperatures vary widely — pack layers, a waterproof jacket, and comfortable walking shoes.", adv: "Parks turn green, longer daylight hours, city comes alive after winter." },
  { season: "Summer (Jun–Aug)", icon: Sun, temp: "18°C to 28°C", note: "Light clothing, sunglasses, and a hat. Evenings can be cool — carry a light jacket.", adv: "Best time for outdoor activities, river cruises, rooftop bars, and festivals." },
  { season: "Autumn (Sep–Nov)", icon: Thermometer, temp: "5°C to 15°C", note: "Temperatures drop quickly. Pack a warm jacket, scarf, and waterproof boots for rainy days.", adv: "Stunning autumn foliage in parks like Kolomenskoye and Gorky Park." },
];

export default function PracticalTipsPage() {
  return (
    <TipsArticleShell label="Practical Tips" title="Practical Tips for Moscow" description="What to wear, how to tip, connectivity, and other practicalities for a smooth trip.">
      <Section>
        <h2 className="text-2xl font-bold text-white mb-5">Weather & What to Pack</h2>
        <div className="space-y-4">
          {seasons.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.season} className="!p-5 sm:!p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0"><Icon size={15} className="text-gold" /></div>
                  <h3 className="text-white font-bold text-sm">{s.season}</h3>
                  <span className="text-gold text-xs font-medium ml-auto">{s.temp}</span>
                </div>
                <p className="text-white/60 text-sm ml-11">{s.note}</p>
                <p className="text-white/40 text-xs ml-11 mt-1">→ {s.adv}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold text-white mb-5 mt-10">Quick Reference</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Lightbulb, title: "Tipping", desc: "10% at restaurants if service charge not included. No tipping for taxis. Small tips for hotel staff." },
            { icon: Lightbulb, title: "Water", desc: "Don't drink tap water. Buy bottled at any supermarket (₹30–₹50)." },
            { icon: Lightbulb, title: "Toilets", desc: "Free at malls, restaurants, museums. Street toilets cost ~₹50–₹100." },
            { icon: Lightbulb, title: "Opening Hours", desc: "Shops 10 AM–9 PM. Museums closed on Mondays. Restaurants open till 11 PM." },
          ].map((t) => (
            <Card key={t.title}>
              <p className="text-white text-sm font-semibold mb-1">{t.title}</p>
              <p className="text-white/50 text-xs">{t.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </TipsArticleShell>
  );
}

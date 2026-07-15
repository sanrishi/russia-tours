
import { Sun, CloudRain, Umbrella } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

export default function WeatherPackingPage() {
  return (
    <TipsArticleShell
      label="Weather & Packing"
      title="Moscow in August — Weather & What to Pack"
      description="August is peak summer in Moscow — warm days, cool evenings, and occasional rain. Here's exactly what to expect and what to bring."
    >
      <Section>
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9]">
          <img src="https://lens.usercontent.google.com/banana?agsi=CmdnbG9iYWw6OjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAwZWI6MTo3Mjc1MjJmYzZmYmM3MmE1OjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAyZGI5ODYwMzM2ODowMDA2NTY0MWU5ODg2MGNmEAIYAQ==" alt="Moscow weather scene" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/20 to-transparent" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Sun, label: "Daytime", value: "23–24°C (73–75°F)" },
            { icon: CloudRain, label: "Evening", value: "12–15°C (54–59°F)" },
            { icon: Umbrella, label: "Rain", value: "Scattered showers" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-4 sm:p-5 rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] flex items-center gap-3">
                <Icon size={22} className="text-gold shrink-0" />
                <div>
                  <p className="text-xs text-white/40">{item.label}</p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <Card className="mb-6 !p-6 sm:!p-8">
          <h2 className="text-xl font-bold text-white mb-5">What to Pack</h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { item: "Light layers", detail: "T-shirts and breathable clothing for warm daytime exploring." },
              { item: "Light jacket or sweater", detail: "Evenings cool down to 12°C. Also handy for air-conditioned metro and restaurants." },
              { item: "Compact umbrella", detail: "August sees scattered rain showers. A small foldable umbrella fits in any bag." },
              { item: "Comfortable walking shoes", detail: "You'll be on your feet for Red Square, Kremlin grounds, and the limousine/rooftop evening." },
              { item: "Sunglasses & sunscreen", detail: "Sunny days can be bright, especially on the river cruise and open-air tours." },
              { item: "One smart-casual outfit", detail: "For the goodbye dinner and rooftop evening — restaurants expect neat attire." },
            ].map((p) => (
              <div key={p.item} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <h3 className="text-white font-semibold text-sm mb-1">{p.item}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section>
        <Card className="!p-6 sm:!p-8">
          <h2 className="text-xl font-bold text-white mb-4">Monthly Weather Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-white/40 font-medium py-2 pr-4">Month</th>
                  <th className="text-left text-white/40 font-medium py-2 pr-4">High</th>
                  <th className="text-left text-white/40 font-medium py-2 pr-4">Low</th>
                  <th className="text-left text-white/40 font-medium py-2">Rain</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: "June", high: "22°C", low: "12°C", rain: "Moderate" },
                  { month: "July", high: "25°C", low: "14°C", rain: "Moderate" },
                  { month: "August", high: "23°C", low: "12°C", rain: "Scattered" },
                  { month: "September", high: "16°C", low: "7°C", rain: "Increasing" },
                ].map((row) => (
                  <tr key={row.month} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4 text-white font-medium">{row.month}</td>
                    <td className="py-3 pr-4 text-white/60">{row.high}</td>
                    <td className="py-3 pr-4 text-white/60">{row.low}</td>
                    <td className="py-3 text-white/60">{row.rain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>
    </TipsArticleShell>
  );
}

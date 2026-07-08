import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sun, CloudRain, Wind, Umbrella } from "lucide-react";

export default function WeatherPackingPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <Link
          href="/tips"
          className="inline-flex items-center gap-1.5 text-gold text-sm hover:underline mb-8"
        >
          <ArrowLeft size={14} /> Back to all tips
        </Link>

        <div className="max-w-3xl mb-10">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Weather & Packing
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Moscow in August — Weather & What to Pack
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            August is peak summer in Moscow — warm days, cool evenings, and
            occasional rain. Here&apos;s exactly what to expect and what to
            bring.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Sun, label: "Daytime", value: "23–24°C (73–75°F)" },
            { icon: CloudRain, label: "Evening", value: "12–15°C (54–59°F)" },
            { icon: Umbrella, label: "Rain", value: "Scattered showers" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3"
              >
                <Icon size={20} className="text-gold shrink-0" />
                <div>
                  <p className="text-xs text-white/40">{item.label}</p>
                  <p className="text-white font-semibold text-sm">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            What to Pack
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                item: "Light layers",
                detail:
                  "T-shirts and breathable clothing for warm daytime exploring.",
              },
              {
                item: "Light jacket or sweater",
                detail:
                  "Evenings cool down to 12°C. Also handy for air-conditioned metro and restaurants.",
              },
              {
                item: "Compact umbrella",
                detail:
                  "August sees scattered rain showers. A small foldable umbrella fits in any bag.",
              },
              {
                item: "Comfortable walking shoes",
                detail:
                  "You'll be on your feet for Red Square, Kremlin grounds, and the limousine/rooftop evening.",
              },
              {
                item: "Sunglasses & sunscreen",
                detail:
                  "Sunny days can be bright, especially on the river cruise and open-air tours.",
              },
              {
                item: "One smart-casual outfit",
                detail:
                  "For the goodbye dinner and rooftop evening — restaurants expect neat attire.",
              },
            ].map((p) => (
              <div
                key={p.item}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <h3 className="text-white font-semibold text-sm mb-1">
                  {p.item}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5">
            <Image
              src="/moscow-summer-1.webp"
              alt="Saint Basil's Cathedral on a sunny summer day"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5">
            <Image
              src="/moscow-summer-2.webp"
              alt="Kremlin tower and Red Square in summer"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Monthly Weather Overview
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-white/40 font-medium py-2 pr-4">
                    Month
                  </th>
                  <th className="text-left text-white/40 font-medium py-2 pr-4">
                    High
                  </th>
                  <th className="text-left text-white/40 font-medium py-2 pr-4">
                    Low
                  </th>
                  <th className="text-left text-white/40 font-medium py-2">
                    Rain
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: "June", high: "22°C", low: "12°C", rain: "Moderate" },
                  { month: "July", high: "25°C", low: "14°C", rain: "Moderate" },
                  { month: "August", high: "23°C", low: "12°C", rain: "Scattered" },
                  { month: "September", high: "16°C", low: "7°C", rain: "Increasing" },
                ].map((row) => (
                  <tr
                    key={row.month}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-3 pr-4 text-white font-medium">
                      {row.month}
                    </td>
                    <td className="py-3 pr-4 text-white/60">{row.high}</td>
                    <td className="py-3 pr-4 text-white/60">{row.low}</td>
                    <td className="py-3 text-white/60">{row.rain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

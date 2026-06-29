import SafetyCallout from "@/components/SafetyCallout";

export default function TipsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-3xl mb-14">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Useful Tips
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Travel Tips for Indian Visitors
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Weather, packing, food, safety — everything you need to know before
            visiting Russia.
          </p>
        </div>

        {/* PLACEHOLDER — food guide: add Indian restaurant recommendations near key attractions */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-3">
            Indian Food in Russia
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Indian restaurant recommendations near Red Square, Arbat, and other
            key attractions will appear here once confirmed by the client.
          </p>
        </div>

        <SafetyCallout />

        {/* PLACEHOLDER — packing & weather tips: add seasonal guidance */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mt-6">
          <h2 className="text-xl font-bold text-white mb-3">
            Weather &amp; Packing
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Seasonal packing tips and weather guidance for Moscow &amp; St.
            Petersburg will appear here once confirmed.
          </p>
        </div>
      </div>
    </main>
  );
}

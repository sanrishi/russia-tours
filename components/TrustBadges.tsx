export default function TrustBadges() {
  return (
    <section className="border-y border-white/5 bg-charcoal/50 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-white/50">
          <span className="text-white/30 tracking-widest uppercase text-[10px] sm:text-xs">
            Trusted Partners
          </span>
          {/* PLACEHOLDER — replace with real Google rating from client's listing */}
          <span>★ 4.9 Google Rating</span>
          {/* PLACEHOLDER — replace with real traveler count */}
          <span>1,000+ Happy Indian Travelers</span>
          {/* PLACEHOLDER — replace once Russian tour license obtained */}
          <span>Registered Tour Operator</span>
        </div>
      </div>
    </section>
  );
}

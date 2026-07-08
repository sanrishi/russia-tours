import TripCard from "@/components/TripCard";
import CostEstimator from "@/components/CostEstimator";
import GroupBookingCallout from "@/components/GroupBookingCallout";
import TripGallery from "@/components/TripGallery";

export default function PlacesPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-3xl mb-14">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Upcoming Trips
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Explore Our Group Tours
          </h1>
          <p className="text-gold/70 text-base sm:text-lg leading-relaxed">
            Each trip includes visa assistance, Indian cuisine, basic Hindi support,
            and 24/7 WhatsApp support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TripCard />
          </div>

          <div className="space-y-6">
            <div className="lg:sticky lg:top-28 space-y-6">
              <CostEstimator />
              <GroupBookingCallout />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <TripGallery />
        </div>

        <section id="booking" className="mt-20 scroll-mt-24 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-[#161412] p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Check Availability
            </h2>
            <p className="text-white/50 text-sm mb-8">
              Fill in your details and we'll get back to you within 24 hours.
            </p>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Group Size</label>
                <select className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors">
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5 people</option>
                  <option value="6">6 people</option>
                  <option value="7">7 people</option>
                  <option value="8">8 people (full group)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Message (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any questions or special requests..."
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gold text-charcoal font-bold text-sm hover:brightness-110 transition-all duration-300"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

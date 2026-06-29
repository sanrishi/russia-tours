import TripCard from "@/components/TripCard";
import CostEstimator from "@/components/CostEstimator";
import GroupBookingCallout from "@/components/GroupBookingCallout";
import TripGallery from "@/components/TripGallery";

export default function PlacesPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-3xl mb-14">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Upcoming Trips
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Explore Our Group Tours
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
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
      </div>
    </main>
  );
}

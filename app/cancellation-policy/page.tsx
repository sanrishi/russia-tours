export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Cancellation Policy</h1>
        <div className="space-y-6 text-white/60 text-sm leading-relaxed">
          <p>
            At Indosvetka, we understand that plans can change. Our cancellation policy is designed to be fair
            while reflecting the costs incurred in organizing your bespoke travel experience.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">Cancellation by Traveler</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong className="text-white">More than 30 days before departure:</strong> Full refund minus a processing fee of ₹5,000 per person.</li>
            <li><strong className="text-white">15–30 days before departure:</strong> 50% refund of the total booking amount.</li>
            <li><strong className="text-white">7–14 days before departure:</strong> 25% refund of the total booking amount.</li>
            <li><strong className="text-white">Less than 7 days before departure:</strong> No refund.</li>
          </ul>

          <h2 className="text-lg font-semibold text-white mt-8">Cancellation by Indosvetka</h2>
          <p>
            In the unlikely event that we cancel a trip due to insufficient bookings or unforeseen circumstances,
            you will receive a full refund of all amounts paid. We are not responsible for any incidental expenses
            such as visa fees, flight tickets, or travel insurance.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">Amendments</h2>
          <p>
            Date changes are treated as cancellations and rebookings. Please contact us via WhatsApp or email
            to discuss options before canceling.
          </p>

          <p className="text-white/40 text-xs pt-6 border-t border-white/5">
            Last updated: July 2026
          </p>
        </div>
      </div>
    </main>
  );
}

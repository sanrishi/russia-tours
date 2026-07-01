import { Handshake, Globe, Users, ShieldCheck, ArrowRight } from "lucide-react";

export default function PartnerPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-full mx-auto px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
              Partner with Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Let&apos;s Grow Together
            </h1>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10">
              Indian travel agents — offer your clients curated Russia tours
              with full visa support, Indian cuisine, and English-speaking guides with basic Hindi support.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Handshake size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    Commission-Based Partnership
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Earn competitive commissions on every booking you refer.
                    No minimum quotas, no exclusivity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    Full Visa Support
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    We handle the visa process for your clients — invitation
                    letters, documentation, and guidance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Users size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    Indian-Friendly Tours
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    English-speaking guides with basic Hindi support, Indian meal options, and curated
                    experiences designed for Indian travelers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Globe size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    Co-Branded Options
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    White-label and co-branded tour packages available for
                    established agencies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PLACEHOLDER — contact form: replace with real form handler or mailto */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2">
              Get in Touch
            </h2>
            <p className="text-white/40 text-sm mb-6">
              Leave your details and we&apos;ll reach out with partnership
              terms.
            </p>

            {/* Form delivers to Sveta's inbox via FormSubmit */}
            <form
              action="https://formsubmit.co/ajax/svetaindia07@gmail.com"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Agency Name
                </label>
                <input
                  type="text"
                  name="agency"
                  required
                  placeholder="Your travel agency"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="agency@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your agency and expected volume..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                Send Enquiry
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Footer() {
  return (
    <footer className="relative">
      <div className="relative w-full overflow-hidden bg-charcoal min-h-[30vh] flex items-center justify-center">
        <div className="relative w-fit mx-auto">
          <video
            src="https://cdn.discover.moscow/videos/footer_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="relative z-10 w-full h-full bg-black text-white mix-blend-multiply flex flex-col sm:flex-row justify-center items-center gap-y-6 sm:gap-x-6 leading-[0.8] text-[15vw] sm:text-[9vw] font-black uppercase tracking-[calc(-0.06em)] select-none py-24">
            <span className="transform scale-y-[1.8] sm:scale-y-[2.2] origin-center">DISCOVER</span>
            <span className="transform scale-y-[1.8] sm:scale-y-[2.2] origin-center">MOSCOW</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/5 bg-charcoal py-6">
        <div className="max-w-[1728px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/30">
            &copy; {new Date().getFullYear()} Indosvetka. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/917042987451"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:svetaindia07@gmail.com"
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

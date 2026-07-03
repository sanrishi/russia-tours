export default function Footer() {
  return (
    <footer className="relative">
      <div className="relative w-full overflow-hidden flex justify-center items-center bg-charcoal min-h-[40vh]">
        <video
          src="https://cdn.discover.moscow/videos/footer_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative w-full bg-charcoal text-white mix-blend-multiply text-center py-20 flex items-center justify-center">
          <h1 className="text-[12vw] sm:text-[15vw] font-black uppercase tracking-tighter leading-none select-none">
            TRIPS TO RUSSIA
          </h1>
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

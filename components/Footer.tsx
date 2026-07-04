export default function Footer() {
  return (
    <footer className="relative">
      <div className="bg-transparent w-full max-w-[1380px] mx-auto flex justify-center mt-6 h-[130px] sm:h-[260px] relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden sm:block w-full h-full object-cover"
          style={{
            WebkitMaskImage: "url(https://cdn.discover.moscow/images/pattern_black_en.svg)",
            maskImage: "url(https://cdn.discover.moscow/images/pattern_black_en.svg)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "bottom center",
            maskPosition: "bottom center",
          }}
        >
          <source src="https://cdn.discover.moscow/videos/footer_video.mp4" type="video/mp4" />
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block sm:hidden w-full h-full object-cover"
          style={{
            WebkitMaskImage: "url(https://cdn.discover.moscow/images/pattern_mobile_black_en.svg)",
            maskImage: "url(https://cdn.discover.moscow/images/pattern_mobile_black_en.svg)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "bottom center",
            maskPosition: "bottom center",
          }}
        >
          <source src="https://cdn.discover.moscow/videos/footer_video.mp4" type="video/mp4" />
        </video>
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

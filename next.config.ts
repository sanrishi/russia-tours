import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
    // Capped at 1920: the Lenis maintainer's #1 scroll-jank rule is "don't
    // repaint ultra-high-res images every frame". A fullscreen hero never
    // displays more than ~1920px wide; 2560w only burned paint time.
    deviceSizes: [360, 640, 768, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  allowedDevOrigins: ["10.236.159.250"],
};

export default nextConfig;

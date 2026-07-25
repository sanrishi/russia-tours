import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  images: {
    qualities: [100, 90, 75],
    deviceSizes: [640, 1080, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
  },
  allowedDevOrigins: ["10.236.159.250"],
};

export default nextConfig;

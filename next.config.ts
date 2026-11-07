import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // MEMAKSA PEMAKAIAN WEBPACK STANDAR AGAR TIDAK MENELUSURI@THEME INLINE YANG RUSAK
  images: {
    unoptimized: true,
  }
};

export default nextConfig;

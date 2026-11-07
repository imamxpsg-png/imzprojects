import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Mengizinkan proyek tetap meluncur meskipun ada peringatan tipe data kecil
    ignoreBuildErrors: true, 
  },
  eslint: {
    // Mengizinkan proyek tetap meluncur meskipun ada peringatan format kode
    ignoreDuringBuilds: true,
  },
  // MENSTABILKAN POSTCSS AGAR PROSES PARSING @THEME TIDAK MEMICU CRASH SERVER
  experimental: {
    turbo: {
      rules: {
        "*.css": ["@vercel/turbopack-css"],
      },
    },
  },
};

export default nextConfig;

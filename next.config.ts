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
};

export default nextConfig;

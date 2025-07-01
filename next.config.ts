import type { NextConfig } from "next";

const nextConfig: NextConfig = {
// next.config.js
  experimental: {
    optimizeCss: false, 
},
eslint: {
    ignoreDuringBuilds: true,
  },



};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
        // destination: 'http://191.235.34.31:3000/:path*',
      },
    ];
  },
};

export default nextConfig;

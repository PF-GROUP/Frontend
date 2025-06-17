import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://191.235.34.31:3000/:path*', // Tu backend real
      },
    ];
  },
};

export default nextConfig;

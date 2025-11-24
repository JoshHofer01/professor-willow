import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.leekduck.com',
        pathname: '/assets/img/events/**',
      },
    ],
  },
};

export default nextConfig;

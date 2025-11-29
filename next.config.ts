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
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeMiners/pogo_assets/master/Images/Pokemon/**',
      },
    ],
  },
};

export default nextConfig;

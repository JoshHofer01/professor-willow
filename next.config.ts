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
        pathname: '/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/**',
      },
    ],
  },
};

export default nextConfig;

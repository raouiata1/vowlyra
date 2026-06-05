import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.audynia.com",
      },
    ],
  },
};

export default nextConfig;

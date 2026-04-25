import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.vowlyra.com",
      },
    ],
  },
};

export default nextConfig;

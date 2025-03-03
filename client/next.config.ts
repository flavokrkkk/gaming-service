import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "18x1mfzs55.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "friendly-memory-pjpq4rpv9rpc6wxr-3000.app.github.dev",
      ],
    },
  },
};

export default nextConfig;
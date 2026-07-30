import type { NextConfig } from "next";

const apiProxyTarget = (process.env.API_PROXY_TARGET ?? "http://localhost:5000").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

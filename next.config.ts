import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;

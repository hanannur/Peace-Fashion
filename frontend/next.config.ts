import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: any = {
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
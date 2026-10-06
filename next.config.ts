import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps `next dev` from rewriting AGENTS.md with its own text (it has an em dash).
  agentRules: false,
};

export default nextConfig;

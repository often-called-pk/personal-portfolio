import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps `next dev` from rewriting AGENTS.md with its own text (it has an em dash).
  agentRules: false,
  experimental: { optimizePackageImports: ['@phosphor-icons/react'] },
  // The CV is for the Download CV buttons, not for search results.
  async headers() {
    return [{ source: '/cv.pdf', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] }];
  },
};

export default nextConfig;

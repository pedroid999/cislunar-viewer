import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@cislunar/mission-engine', '@cislunar/space-data', '@cislunar/ui']
};

export default nextConfig;

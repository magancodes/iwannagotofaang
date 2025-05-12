/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Configure webpack to use memory caching instead of file system caching
  webpack: (config, { dev, isServer }) => {
    // Use memory caching in development
    if (dev) {
      config.cache = {
        type: 'memory'
      }
    }
    return config
  }
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Keep Mapbox bundles lean during dev while allowing tree-shaking.
    optimizePackageImports: ['mapbox-gl'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;

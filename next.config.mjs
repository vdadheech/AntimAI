/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server actions for future use
  experimental: {},
  // Suppress known warnings
  typescript: {
    // We handle type checking separately
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true,
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig

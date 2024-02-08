/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true,
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true
}

module.exports = nextConfig

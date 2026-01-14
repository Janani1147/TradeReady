/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/TradeReady",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

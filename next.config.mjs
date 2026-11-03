let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async redirects() {
    return [
      { source: '/sitemap-0.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/price-check', destination: '/prices', permanent: true },
      { source: '/appointment', destination: '/book', permanent: true },
      { source: '/quote/:path*', destination: '/prices', permanent: true },
      { source: '/repair/galaxy-a51', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a71', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a22', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a32', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a52', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a13', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a23', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a14', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a15', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a16', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a06', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a07', destination: '/prices#samsung', permanent: true },
      { source: '/repair/galaxy-a17', destination: '/prices#samsung', permanent: true },
      { source: '/accessories', destination: 'https://shop.phonetime.com.au/shop/category/accessories-8', permanent: false },
    ]
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig

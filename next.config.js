/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')();

const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ],
    unoptimized: true
  },
  experimental: {
    mdxRs: true,
    serverActions: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  transpilePackages: [
    '@mdx-js/react',
    '@next/mdx',
    'next-intl'
  ],
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  }
};

module.exports = withMDX(nextConfig);
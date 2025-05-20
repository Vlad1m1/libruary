const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Disable experimental features
  experimental: {
    turbo: false
  }
};

module.exports = withNextIntl(nextConfig);

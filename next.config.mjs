/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|html)$/i,
      type: 'asset/resource'
    });
    if (process.env.NODE_ENV === 'production') {
      config.externals = config.externals || [];
      config.externals.push('rebrowser-playwright-core');
      config.externals.push('@playwright/browser-chromium');
    }
    return config;
  },
  experimental: {
    serverMinification: false, // the server minification unfortunately breaks the selector class names
  },
};

export default nextConfig;

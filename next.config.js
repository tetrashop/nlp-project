/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  
  // رفع خطای 404 برای APIهای قدیمی
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },
  
  // پشتیبانی از RTL و فارسی
  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa',
  },
};

module.exports = nextConfig;

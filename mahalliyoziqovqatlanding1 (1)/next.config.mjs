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
  // Vercel uchun static export o'chirib qo'yamiz
  // output: 'export', // Bu qatorni comment qilamiz
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // distDir: 'out', // Bu ham kerak emas Vercel uchun
}

export default nextConfig

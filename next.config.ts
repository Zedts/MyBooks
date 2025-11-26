import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Ensure Prisma Client works correctly with server components
  serverExternalPackages: ['@prisma/client', 'prisma'],
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudinary.com', // Specific hostname
      },
      {
        protocol: 'https',
        hostname: '**', // Wildcard for all hostnames (use with caution)
      },
    ],
  },
};

export default nextConfig;

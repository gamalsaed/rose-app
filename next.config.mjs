/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "flower.elevateegy.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

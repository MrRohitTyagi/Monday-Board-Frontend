/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "stiltsoft.com",
      "res-console.cloudinary.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;

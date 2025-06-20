/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.shopify.com/**")],
  },
};

export default nextConfig;

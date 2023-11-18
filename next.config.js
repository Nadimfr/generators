/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    baseURL: process.env.baseURL,
  },
};

module.exports = nextConfig;

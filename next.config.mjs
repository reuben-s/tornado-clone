/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_RECIPIENT_ADDRESS: process.env.REACT_APP_RECIPIENT_ADDRESS
  }
};

export default nextConfig;

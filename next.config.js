/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://st.depositphotos.com/'],
  },
}

module.exports = nextConfig

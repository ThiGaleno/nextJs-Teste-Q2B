/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['st.depositphotos.com', 'depositphotos.com', 'www.st.depositphotos.com', 'www.depositphotos.com', 'https://st.depositphotos.com/'],
  },
}

module.exports = nextConfig

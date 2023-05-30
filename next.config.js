/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    env: {
        API_KEY: process.env.NEXT_PUBLIC_API_KEY,
        ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
    }
}

module.exports = nextConfig

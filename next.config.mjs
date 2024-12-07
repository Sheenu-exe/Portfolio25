/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/v0/b/portfolio-b6d2e.appspot.com/o/**',
        },
      ],
    },
  }

export default nextConfig;

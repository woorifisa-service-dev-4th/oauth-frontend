/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This will disable the automatic `tsconfig.json` management by Next.js
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@'] = path.resolve(__dirname);
    }
    return config;
  },
};

export default nextConfig;
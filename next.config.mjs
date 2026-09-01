/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }
    return config;
  },
  turbopack: {
    resolveAlias: {
      // অ্যাবসলিউট পাথের বদলে সিম্পল রিলেটিভ পাথ ব্যবহার করা হলো
      canvas: './src/empty-module.js',
    },
  },
};

export default nextConfig;

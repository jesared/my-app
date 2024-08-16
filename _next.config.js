module.exports = {
  images: {
    domains: ['unsplash.com'],
  },
  productionBrowserSourceMaps: process.env.NODE_ENV !== 'production',
  optimizeFonts: false,
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      use: ['html-loader'],
    });
    return config;
  },
};

/** @type {import('next').NextConfig} */

// next.config.js
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  // Vos plugins Next.js ici...

  // Ajoutez cette configuration pour gérer les fichiers HTML
  {
    webpack(config) {
      config.module.rules.push({
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      });

      return config;
    },
  },
]);

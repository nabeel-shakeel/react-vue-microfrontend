const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('../../../package.json');

module.exports = (config, context) => {
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        auth: 'auth@//localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@//localhost:8083/remoteEntry.js',
      },
      shared: {
        ...dependencies,
      },
    })
  );
  config.output.publicPath = 'http://localhost:8081/';
  config.module.rules = [
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(js|tsx|ts)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',
            '@babel/preset-typescript',
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    },
  ];

  return config;
};

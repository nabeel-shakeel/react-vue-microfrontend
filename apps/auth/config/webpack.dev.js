const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('../../../package.json');

module.exports = (config, context) => {
  config.context = process.cwd();
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': 'apps/auth/src/bootstrap',
      },
      shared: {
        ...dependencies,
      },
    })
  );
  config.optimization.runtimeChunk = false;
  config.output = {
    uniqueName: 'auth',
    publicPath: 'http://localhost:8082/',
    clean: true,
  };
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

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { VueLoaderPlugin } = require('vue-loader');
const { dependencies } = require('../../../package.json');

module.exports = (config, context) => {
  config.context = process.cwd();
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': 'apps/dashboard/src/bootstrap',
      },
      shared: {
        ...dependencies,
      },
    }),
    new VueLoaderPlugin()
  );
  config.optimization.runtimeChunk = false;
  config.output = {
    uniqueName: 'dashboard',
    publicPath: 'http://localhost:8083/',
    filename: '[name][contenthash].js',
    clean: true,
  };
  config.devServer.headers = { 'Access-Control-Allow-Origin': '*' };
  config.resolve.extensions = ['.vue', '.js'];
  config.module.rules = [
    {
      test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
      use: [{ loader: 'file-loader' }],
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: ['file-loader'],
    },
    {
      test: /\.vue$/,
      use: 'vue-loader',
    },
    {
      test: /\.scss|\.css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ];

  return config;
};

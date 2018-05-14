const webpack = require('webpack');
const path = require('path');
const applications = require('./portal/microapps.config.json');
const PORT = 8110;

const devApplications = {
  // menu: 'http://localhost:4200',
};

module.exports = {
  entry: [
    __dirname + '/portal/main.js',
    __dirname + '/portal/main.css'
  ],
  output: {
    path: process.cwd() + '/build',
    filename: '[name].js',
    publicPath: '/build/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: PORT,
    publicPath: '/build/',
    contentBase: './',
    historyApiFallback: true,
    proxy: getProxyConfig(applications, devApplications),
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, './'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules|svelte/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: getBabelConfig(),
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
  ],
};

function getBabelConfig() {
  return {
    presets: [
      ['babel-preset-env', {
        targets: {
          'browsers': ['last 2 versions'],
        },
      }],
    ],
    plugins: [
      'transform-object-rest-spread',
      'transform-class-properties',
      'syntax-dynamic-import',
      'transform-function-bind',
    ],
  };
}
function getProxyConfig(applications, devApplications) {
  const proxy = {};
  for (app of applications) {
    const path = app.baseHref + '/';
    let target = `http://localhost:${PORT}/build/${path}`;
    if (devApplications.hasOwnProperty(app.name)) {
      target = devApplications[app.name];
    }
    proxy[path] = {
      target: target,
      pathRewrite: {
        [path]: ''
      },
      bypass: function (req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          return '/index.html';
        }
      }
    };
  }
  return proxy;
}
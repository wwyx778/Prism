const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  mode: isDev ? 'development' : 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist/'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [new HtmlWebpackPlugin({ title: 'Jehu Blog', template: './index.sample.html' })],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.(css|less)$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/source',
      },
    ],
  },
};

if (isDev) {
  Object.assign(config, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: 'dist',
      hot: true,
    },
  });
} else {
  Object.assign(config, {
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
  });
}

module.exports = config;

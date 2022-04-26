const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname, './src'),
    compress: true,
    port: 8080,
    open: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      // { test: /\.json$/i, loader: 'json-loader' },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          { loader: 'postcss-loader' },
        ],
        exclude: '/node_modules/',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

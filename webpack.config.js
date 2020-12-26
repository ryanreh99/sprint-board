const path = require('path');

const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: __dirname,
  entry: [
    './static/js/main.js',
    './static/css/style.scss',
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9000/',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Extracts a CSS file per JS string
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
};
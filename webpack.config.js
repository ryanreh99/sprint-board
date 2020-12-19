const path = require('path');

const BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  entry: [
    './static/js/main.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9000/',
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
};
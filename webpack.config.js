const path = require("path");

const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const source_map_options = {
  options: {
    sourceMap: true,
  },
};

module.exports = {
  context: __dirname,
  mode: "development",
  entry: {
    main: "./static/js/app.js",
    style: ["./static/css/bootstrap.scss", "./static/css/style.scss"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:9000/",
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Extracts a CSS file per JS string
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            ...source_map_options,
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            ...source_map_options,
          },
        ],
      },
    ],
  },
  plugins: [
    new BundleTracker({ filename: "./webpack-stats.json" }),
    new MiniCssExtractPlugin(),
    new RemoveEmptyScriptsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true,
  },
};

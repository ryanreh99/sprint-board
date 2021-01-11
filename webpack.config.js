const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
    main: "./static/js/client.js",
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
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
    ],
  },
  plugins: [
    new BundleTracker({ filename: "./webpack-stats.json" }),
    new MiniCssExtractPlugin(),
    new RemoveEmptyScriptsPlugin(),
    new HtmlWebpackPlugin({
      favicon: "static/public/favicon.ico",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    compress: true,
    port: 9000,
    hot: true,
  },
};

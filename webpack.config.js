const path = require('path');
const webpack = require('webpack');
const autoprefixer = require("autoprefixer");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const extractMiniCss = new MiniCssExtractPlugin({
  filename: "stylesheets/[name].css"
});

module.exports = {
  entry: {
    application: './source/javascripts/index.js',
    styles: './source/stylesheets/_application.sass'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'source/stylesheets'),
      path.join(__dirname, 'source/javascripts'),
      "node_modules"
    ]
  },
  output: {
    path: path.resolve(__dirname, '.tmp/dist'),
    filename: 'javascripts/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.s[ac]ss/,
        use: 'import-glob-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    extractMiniCss,
    new MinifyPlugin(),
    new CompressionPlugin({
      cache: true
    })
  ]
};

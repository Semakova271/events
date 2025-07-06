const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production', // Для деплоя лучше использовать production
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/', // Критически важно для GitHub Pages!
    assetModuleFilename: 'assets/[hash][ext][query]' // Упорядочиваем ассеты
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader' // Добавляем postcss для автоматических префиксов
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]' // Все изображения в папку images
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true // Минифицируем HTML для production
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css' // Добавляем хэш для кэширования
    }),
    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.js'),
      extensions: ['js'],
      fix: true,
      emitWarning: true,
      failOnError: false
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true // Важно для SPA на GitHub Pages
  }
};
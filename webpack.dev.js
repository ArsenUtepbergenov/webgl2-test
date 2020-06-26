const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              experimentalWatchApi: true,
            },
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    stats: 'errors-only',
    clientLogLevel: 'warning',
    host: 'localhost',
    port: 3030,
    hot: true,
    compress: true,
    inline: true,
    progress: true,
    open: true,
    overlay: true
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
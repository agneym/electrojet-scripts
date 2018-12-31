const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = ({ env }) => ({
  mode: env,
  entry: path.join(process.cwd(), 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(process.cwd(), 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
});
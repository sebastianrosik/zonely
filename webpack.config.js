const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ContextReplacementPlugin } = require('webpack');
module.exports = {
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/index'],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-react-loader'
        }
      }
    ]
  },
  plugins: [
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};

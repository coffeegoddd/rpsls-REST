const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './client/src/index.jsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './client/public/dist'),
    filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: './dist'
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, 
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
}

module.exports = config;
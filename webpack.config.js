var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var extractCSS = new ExtractTextPlugin('style.css', { allChunks: false })
var copyFiles = new CopyWebpackPlugin(
  [
    {
      from: 'src',
      to: ''
    }
  ], {
    ignore: [    
      'src/styles',
      'src/js'
    ]
  })

module.exports = {
  resolve: {
    extensions: ['', '.js', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.(scss|css)$/,
        include: /src/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style?sourceMap', `css!postcss!sass-loader`)
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(svg)$/,
        loader: 'url-loader?limit=100000' //loader: 'file-loader'
      }
    ]
  },
  entry: {
    main: ['./src/js/index.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    extractCSS,
    copyFiles
  ]
}

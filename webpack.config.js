
var themeName = require('./package').theme.name
var path = require('path')
var webpack = require('webpack')
var isProduction = process.env.NODE_ENV === 'production'
var outputFolder = isProduction ? 'dist/' + themeName : 'build'
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var extractCSS = new ExtractTextPlugin('style.css', { allChunks: false })
var copyFiles = new CopyWebpackPlugin(
  [
    {
      from: 'src',
      to: '',
    }
  ], {
    ignore: [
      {
        dot: true,
        glob: 'styles/**/*'
      },
      {
        dot: true,
        glob: 'scripts/**/*'
      }
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
        loader: ExtractTextPlugin.extract('style-loader?sourceMap', `css-loader!postcss!sass-loader`)
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
    main: ['./src/scripts/index.js'],
  },
  output: {
    path: path.join(__dirname, outputFolder),
    filename: 'bundle.js'
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    extractCSS,
    copyFiles
  ]
}

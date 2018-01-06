const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const env = require('yargs').argv.env
const target = require('yargs').argv.target

let nodeModulesPath = path.resolve(__dirname, 'node_modules')
let libraryName = 'tupper'
let options = {
  entry: './src/index.js',
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryExport: 'default',
    filename: libraryName
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [/(node_modules|dist)/, nodeModulesPath]
      }
    ]
  },
  stats: {
    colors: true
  },
  plugins: []
}

if (target === 'web') {
  options.devtool = 'source-map'
  options.output.library = libraryName
  options.output.filename += '.web'
} else {
  options.output.libraryTarget = 'commonjs'
}

if (env === 'build') {
  options.plugins.push(new UglifyJsPlugin({ minimize: true }))
  options.output.filename += '.min.js'
} else {
  options.output.filename += '.js'
}

module.exports = options

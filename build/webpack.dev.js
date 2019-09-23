const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const Webpackbar = require('webpackbar')
const os = require('os')
const portfinder = require('portfinder')
const PORT = 8080
const iptools = function () {
  let ip = '0.0.0.0'
  let interfaces = os.networkInterfaces()
  for (let key in interfaces) {
    const items = interfaces[key]
    for (let item of items) {
      if (item.family === 'IPv4' && !item.internal && item.address !== '127.0.0.1') {
        ip = item.address
        return ip
      }
    }
  }
}

const config = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    hot: true,
    open: false,
    contentBase: false,
    quiet: true,
    progress: false,
    clientLogLevel: 'none',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  mode: 'development',
  plugins: [
    new Webpackbar({ color: '#ff8c00' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})

module.exports = new Promise(async (resolve, reject) => {
  portfinder.basePort = process.env.PORT || PORT || 8080
  portfinder.getPort((err, port) => {
    if (err) return reject(err)
    config.devServer.port = port
    config.plugins.push(
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your project is running at http://localhost:${port}`],
          notes: [`Your project is also running at http://${iptools()}:${port}`]
        },
        clearConsole: true
      })
    )
    resolve(config)
  })
})

const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')
console.log('\x1B[33m%s\x1b[0m:', '生产构建开始...')
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})

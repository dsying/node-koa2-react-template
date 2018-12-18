require('babel-core/register')()
require('babel-polyfill')
require('./server/index.js')

console.log('当前运行时环境env: ', process.env.NODE_ENV)
var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"oa2.midairen.com"'
})
var HOST=process.env.API_ROOT
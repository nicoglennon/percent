process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
environment.plugins.get('OptimizeCSSAssets').options.cssProcessorOptions.safe = true

module.exports = environment.toWebpackConfig()

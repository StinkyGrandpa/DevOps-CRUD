// karma.conf.js
process.env.CHROME_BIN = require('puppeteer').executablePath() // IMPORTANT!

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher')
    ],
  })
}
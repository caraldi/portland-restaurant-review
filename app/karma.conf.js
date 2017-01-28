const webpackConfig = require( './webpack.config' );
webpackConfig.entry = {};

module.exports = function(config) {
  const options = {
    basePath: '',

    frameworks: ['mocha', 'chai'],

    files: [
      './src/main.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './test/**/*.js' 
    ],

    webpack: webpackConfig,

    preprocessors: {
      './src/main.js': [ 'webpack' ],
      './test/**/*.js': [ 'babel' ]
    },

    browsers: ['Chrome', 'Safari'],

    reporters: ['spec'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    concurrency: Infinity
  };

  if (process.env.TRAVIS) {
    options.customLaunchers = {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    options.browsers = ['Chrome_travis_ci', 'Firefox']; // Don't forget karma-firefox-launcher!
    options.singleRun = true;
  }

  config.set(options);
};

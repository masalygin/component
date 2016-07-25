module.exports = function(config) {
  config.set({

    frameworks: ['mocha'],
    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [{
          test: /.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        }]
      }
    },


    webpackMiddleware: {
      noInfo: true
    },



    plugins: [
      require("karma-webpack"),
      require("karma-phantomjs-launcher"),
      require('karma-mocha')
    ],

    browsers: ['PhantomJS'],

    autoWatch: true,

  })
};

// Karma configuration
// Generated on Thu Sep 03 2015 11:24:37 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //angular
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
   //   'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-route.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-animate.js',
      'https://code.angularjs.org/1.4.0/angular-mocks.js',
      'https://code.angularjs.org/1.4.5/angular-cookies.js',
      'client/app/lib/angular-ui-bootstrap/ui-bootstrap-0.13.4.js',
      'client/app/lib/angular-ui-router/build/angular-ui-router.js',
      
       'client/**/*.module.js',
       'client/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox', 'PhantomJS2', 'PhantomJS2_custom'],

        // you can define custom flags 
    customLaunchers: {
      'PhantomJS2_custom': {
        base: 'PhantomJS2',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },
        phantomjs2Launcher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom) 
      exitOnResourceError: true
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}

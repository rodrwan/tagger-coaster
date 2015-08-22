// Karma configuration
// Generated on Thu Jun 19 2014 16:39:53 GMT-0400 (Eastern Daylight Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            'public/bower_components/angular/angular.js',
            'public/bower_components/angular-animate/angular-animate.js',
            'public/bower_components/angular-cache/dist/angular-cache.js',
            'public/bower_components/angular-flash-alert/dist/angular-flash.js',
            'public/bower_components/angular-sanitize/angular-sanitize.js',
            'public/bower_components/angular-ui-router/release/angular-ui-router.js',
            'public/bower_components/a0-angular-storage/dist/angular-storage.js',
            'public/bower_components/lodash/lodash.js',
            'public/bower_components/restangular/dist/restangular.js',
            'public/bower_components/angular-mocks/angular-mocks.js',
            'public/build/app/HackerNewCharts.js',
            'src/app/**/*.test.js'
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
        port: 3000,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        //A list of log appenders to be used. See the documentation for log4js for more information.
        loggers: [{type: 'console'}],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};

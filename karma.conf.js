// Karma configuration
// Generated on Thu Apr 07 2016 11:10:59 GMT+0200 (South Africa Standard Time)

module.exports = function(config) {
  config.set({

    basePath: './',
    frameworks: ['jasmine'],

    files: [
      'public/vendor/jquery/dist/jquery.js',
      'public/vendor/angular/angular.js',
      'public/vendor/angular-resource/angular-resource.js',
      'public/vendor/angular-ui-router/release/angular-ui-router.js',
      'test/unit/**/*.js'
    ],

    exclude: [],
    autoWatch: true,
    browsers: ['Chrome'],

    plugins : [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine'
    ]
  });
}

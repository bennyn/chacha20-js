module.exports = function(grunt) {
  // Helpers
  var testHeadLess = function() {
    var scriptLanguage = grunt.task.current.name.split('_')[2];
    grunt.task.run([
      'build_main_' + scriptLanguage,
      'build_test_' + scriptLanguage,
      'jasmine:test_headless_' + scriptLanguage
    ]);
  };

  var testBrowser = function(browserName) {
    var supportedBrowsers = ['Chrome', 'Firefox', 'IE', 'PhantomJS'];

    if (browserName) {
      var isSupported = false;
      for (var length = supportedBrowsers.length, i = 0; i < length; i++) {
        if (browserName === supportedBrowsers[i]) {
          isSupported = true;
        }
      }

      if (isSupported) {
        var scriptLanguage = grunt.task.current.name.split('_')[2];
        var testName = 'test_browser';
        grunt.config('karma.' + testName + '.browsers', [browserName]);

        grunt.task.run([
          'build_main_' + scriptLanguage,
          'build_test_' + scriptLanguage,
          'karma:' + testName
        ]);
      } else {
        grunt.log.writeln('Unsupported browser. Please use one of these: ' + supportedBrowsers.join(', '));
      }


    } else {
      grunt.log.writeln('Please specify a browser like "Chrome" or "Firefox"');
    }
  };

  var testSpec = function(testName) {
    if (testName) {
      var scriptLanguage = grunt.task.current.name.split('_')[2];
      if (scriptLanguage !== 'js') {
        // Everything except JavaScript needs transpilation
        grunt.task.run([
          'newer:' + scriptLanguage + ':build_main_' + scriptLanguage,
          'newer:' + scriptLanguage + ':build_test_' + scriptLanguage
        ]);
      }

      var nextTask = 'test_headless_' + scriptLanguage;
      var value = '<%= dir.build_test_' + scriptLanguage + '_jasmine_specs %>/' + testName + '.js';

      grunt.config('jasmine.' + nextTask + '.options.specs', value);
      grunt.task.run(nextTask);
    } else {
      grunt.log.writeln('Please specify the relative path for a Jasmine specification like "Util/MyUtilSpec"');
    }
  };

  // CoffeeScript
  grunt.registerTask('test_browser_coffee', testBrowser);
  grunt.registerTask('test_headless_coffee', testHeadLess);
  grunt.registerTask('test_spec_coffee', testSpec);

  // JavaScript
  grunt.registerTask('test_browser_js', testBrowser);
  grunt.registerTask('test_headless_js', testHeadLess);
  grunt.registerTask('test_spec_js', testSpec);


  // TypeScript
  grunt.registerTask('test_browser_ts', testBrowser);
  grunt.registerTask('test_headless_ts', testHeadLess);
  grunt.registerTask('test_spec_ts', testSpec);

  // Default
  grunt.registerTask('test', function(option, scriptLanguage) {
    grunt.log.writeln('=== ' + grunt.task.current.name.toUpperCase() + ' ===');

    if (option === undefined) {
      option = 'headless';
    }

    var parts = [
      grunt.task.current.name,
      option,
      scriptLanguage || grunt.config('script')
    ];

    grunt.task.run(parts.join('_'));
  });
};

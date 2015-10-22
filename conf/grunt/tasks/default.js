module.exports = function(grunt) {
  grunt.registerTask('default', 'Test app, transpile code and run development environment', function() {
    /**
     grunt.task.run([
     'eslint:src',
     'test:phantom:false',
     'dist',
     'sass',
     'dev'
     ]);
     **/
    grunt.task.run([
      'init',
      // Check
      'check:main',
      'check:test',
      'check:demo',
      // Build
      'build:main',
      'build:test',
      'build:demo'
    ]);
  });
};

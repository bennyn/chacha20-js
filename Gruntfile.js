module.exports = function (grunt) {
  // Dependencies
  require('load-grunt-tasks')(grunt, {
    pattern: [
      'grunt-*',
      '!grunt-template-jasmine-istanbul'
    ]
  });

  // Helper functions
  function concatenateFiles(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function (option) {
      key = option.replace(/\.js$/, '');
      object[key] = require(path + option);
    });

    return object;
  }

  // Configuration
  var config = {
    dir: grunt.file.readJSON('./conf/grunt/globals/dir.json'),
    pkg: grunt.file.readJSON('package.json'),
    server_port: grunt.file.readJSON('./conf/grunt/globals/server_port.json')
  };

  // Initialization
  grunt.util._.extend(config, concatenateFiles('./conf/grunt/options/'));
  grunt.initConfig(config);
  grunt.loadTasks('./conf/grunt/tasks');
};

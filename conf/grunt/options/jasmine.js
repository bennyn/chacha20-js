module.exports = {
  options: {
    vendor: []
  },
  test_headless_coffee: {
    src: ['<%= dir.build_main_coffee %>/**/*.js'],
    options: {
      specs: ['<%= dir.build_test_coffee %>/**/*Spec.js']
    }
  },
  test_headless_js: {
    src: ['<%= dir.source_main_js %>/**/*.js'],
    options: {
      specs: ['<%= dir.source_test_js %>/**/*Spec.js']
    }
  }
};

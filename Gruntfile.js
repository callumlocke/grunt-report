'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    report: {
      test: {
        url: 'http://localhost:3000/index.html'
      },
      wiki: {
        url: 'http://www.wikipedia.org/'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
};

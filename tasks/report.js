'use strict';

var urlReport = require('url-report'),
    chalk = require('chalk'),
    _ = require('underscore');

var defaults = {
  consoleMessages: 'warn',
  javascriptErrors: 'error',
  resourceErrors: 'error'
};

module.exports = function (grunt) {
  grunt.registerMultiTask('report', 'Checks a live web page for problems', function () {
    var done = this.async();

    var options = this.options(defaults);
    var url = this.data.url;

    urlReport.load(url, function (report) {
      var failed = false;
      var failIf = function (answer) {
        failed = (failed || answer); // keep it true if it's already true
      };
      var level;

      // Report load status
      grunt.log.subhead('Summary for ' + url);
      if (report.loadStatus === 'success')
        grunt.log.ok('Page loaded ✔');
      else {
        failIf(true);
        grunt.log.error('Page failed to load ✘');
      }

      // Report stats
      // TODO (pending changes to url-report module)

      // Report JS errors
      grunt.log.subhead('JavaScript errors');
      if (!report.javascriptErrors.length)
        grunt.log.ok('None ✔');
      else {
        level = options.javascriptErrors;
        failIf(level !== 'ok');

        grunt.log[level](report.javascriptErrors.length + ' occurred:');
        report.javascriptErrors.forEach(function (jsError) {

          // Print a trace of the error
          console.log('    ' + chalk.red(jsError.message));
          jsError.trace.forEach(function (details) {

            var str = '      at ';
            var fileAndLine = details.file + ':' + details.line;
            if (details['function'].length)
              str += details['function'] + ' (' + fileAndLine + ')';
            else
              str += fileAndLine;

            console.log(chalk.gray(str));
          });
        });
      }

      // Report console messages
      grunt.log.subhead('Console messages');
      if (!report.consoleMessages.length)
        grunt.log.ok('None ✔');
      else {
        level = options.consoleMessages;
        failIf(level !== 'ok');

        grunt.log[level](report.consoleMessages.length + ' messages:');
        report.consoleMessages.forEach(function (details) {
          console.log('    ' + chalk.grey(details.message));
        });
      }

      // Report failed downloads
      grunt.log.subhead('Failed downloads');
      if (!report.resourceErrors.length)
        grunt.log.ok('None ✔');
      else {
        level = options.resourceErrors;
        failIf(level !== 'ok');

        grunt.log[level](report.resourceErrors.length + ' problems:');
        report.resourceErrors.forEach(function (details) {
          var resource = _.findWhere(report.resources, {id: details.id});
          console.log('    ' + chalk.blue(resource.status) + ' ' + chalk.grey(resource.url));
        });
      }

      // If anything failed, tell grunt
      if (failed) {
        console.error('\n');
        grunt.fatal('Problems were found.');
      }

      done();
    });
  });
};

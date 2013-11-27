grunt-report [![Build Status](https://travis-ci.org/callumlocke/grunt-report.png?branch=master)](https://travis-ci.org/callumlocke/grunt-report)
============

Grunt task that prints out a health report for a live URL, alerting you to any problems.

Intended for used at the end of an automated production deploy process, to verify that a page can be loaded without any of the following issues:

* JavaScript errors
* console messages
* failed resource downloads


Usage
-----

```js
grunt.initConfig({
  report: {
    options: {
      consoleMessages: 'ok' // see below for explanation
    },
    wiki: {
      url: 'http://www.wikipedia.org/'
    }
  }
})
```

![Terminal output](http://s22.postimg.org/cyft8y369/Screenshot_2013_11_27_17_01_04.png)

Notes:

* If there are any JavaScript errors, you get a stack trace with line numbers.
* Console messages get printed out in full
* If there are failed downloads, you get the URLs and status codes
* If any of the above problems are encountered, grunt will halt after this task (unless you use `--force`).


Options
-------

You can use options to tell the grunt how much to care about each problem type:

* `consoleMessages` (default: `"warn"`)
* `javascriptErrors` (default: `"error"`)
* `resourceErrors` (default: `"error"`)

All three options accept any of the following values, which correspond to grunt error levels:

* `ok`
* `warn`
* `error`

`ok` means (a) this type of problem won't cause grunt to halt, and (b) the terminal output will look green and soothing.

For example: if you don't mind console messages in production, you could set `consoleMessages: "ok"`. You'll still see console logs in your terminal, but they won't cause grunt to halt.

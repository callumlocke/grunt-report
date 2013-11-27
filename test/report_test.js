/*global describe, before, it*/

var path = require('path'),
    expect = require('chai').expect,
    exec = require('child_process').exec,
    connect = require('connect'),
    http = require('http');

describe('report task', function () {
  this.timeout(5000);

  var err, stdout, stderr;
  before(function (done) {
    // Serve the test directory from the url-report module
    var webDir = path.normalize(path.join(
      __dirname, '..', 'node_modules', 'url-report', 'test', 'www'
    ));
    var app = connect().use(connect.static(webDir));
    var server = http.createServer(app).listen(3000);

    exec('grunt report:test', function (_err, _stdout, _stderr) {
      server.close();

      err = _err;
      stdout = _stdout;
      stderr = _stderr;

      done();
    });
  });

  // These assertions are a very basic starting point, more work is needed...

  it('command exits with an error', function() {
    // console.log('STDOUT\n', stdout);
    expect(err).to.exist && expect(err.code).to.equal(1);
  });

  it('prints information to stdout', function() {
    // console.log('STDOUT', stdout);
    expect(stdout).to.be.ok;
  });

  it('prints errors to stderr', function() {
    // console.log('STDERR', stderr);
    expect(stderr).to.be.ok;
  });
});

var path = require('path');
var express = require('express');
var http = require('http');
var webpack = require('webpack');
var fs = require('fs');
var config = require('./webpack.config.dev');
var proxy = require('express-http-proxy');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var sys = require('sys');
var exec = require('child_process').exec;

var app = express();
var server = http.Server(app);

var compiler = webpack(config);
var dashboard = new Dashboard();
compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(express.static('public'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  quiet: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {log: () => {}}));

var feConfig = JSON.parse(fs.readFileSync('public/config.json'));

// Inspect the first request in order to setup runtime configuration
var hasInitialRequest = false;
function setupRuntime(req, res, next) {
  function echo(error, stdout, stderr) {
    sys.puts(stdout)
  }
  var host = req.get('host');

  if (!hasInitialRequest) {
    hasInitialRequest = true;
    var script = feConfig.runtimeSetupScript;
    if (typeof script !== 'undefined' && script.length > 0) {
      fs.stat(script, function (err) {
        if (err != null){
          console.log(`An error (${err.code}) occurred when trying to execute the setupRuntimeScript named ${script}`);
        } else {
          exec(`sh ${script} ${host}`, echo);
        }
      });
    }
  }
  next();
}
app.use(setupRuntime);

// Setup proxy routes to use on Hosts that only expose one external port (i.e.
// Heroku)
app.use('/xenia', proxy(feConfig.xeniaHost));
app.use('/ask', proxy(feConfig.askHost));
app.use('/elkhorn', proxy(feConfig.elkhornHost));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var port = process.env.PORT || 3000;
server.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:'+port);
});

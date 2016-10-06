var path = require('path');
var express = require('express');
var http = require('http');
var webpack = require('webpack');
var fs = require('fs');
var config = require('./webpack.config.dev');
var proxy = require('express-http-proxy');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

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

// Setup proxy routes to use on Hosts that only expose one external port (i.e.
// Heroku)
var feConfig = JSON.parse(fs.readFileSync('public/config.json'));
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

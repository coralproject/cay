var path = require('path');
var express = require('express');
var http = require('http');
var webpack = require('webpack');
var sio = require('socket.io');
var sockets = require('./sockets');
var config = require('./webpack.config.dev');

var app = express();
var server = http.Server(app);
var io = sio(server);

sockets(io);

var compiler = webpack(config);
app.use(express.static('public'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});

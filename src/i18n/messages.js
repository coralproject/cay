/*
  This script collects each file on the lang dir and exports it
  as a module export using the filename as key.
  It is used by webpack to compile translations into the build.
  Ref: https://webpack.github.io/docs/context.html (require.context)
*/
var req = require.context('../../lang', true, /\.json.*$/);
var exports = {};

req.keys().forEach(function (file) {
  var locale = file.replace('./', '').replace('.json', '');
  exports[locale] = req(file);
});

module.exports = exports;

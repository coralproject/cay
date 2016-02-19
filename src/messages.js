var req = require.context('../lang', true, /\.json.*$/);  
var exports = {};

req.keys().forEach(function (file) {
  var locale = file.replace('./', '').replace('.json', '');
  exports[locale] = req(file);
});

module.exports = exports;

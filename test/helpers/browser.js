var jsdom = require('jsdom').jsdom;
var fs = require('fs');

global.document = jsdom(fs.readFileSync(__dirname + '/index.test.html'));
global.window = document.defaultView;

// these lines are required for react-mdl
global.window.CustomEvent = undefined;
require('react-mdl/extra/material');

global.Element = global.window.Element;

global.navigator = {
  userAgent: 'node.js'
};

global.documentRef = document;
global.localStorage = {};

global.Headers = function(headers) {
  return headers;
};

var jsdom = require('jsdom').jsdom;
var fs = require('fs');

// jsdom.defaultDocumentFeatures = {
//   FetchExternalResources   : ['script'],
//   ProcessExternalResources : ['script'],
//   MutationEvents           : '2.0',
//   QuerySelector            : false
// };

var exposedProperties = ['window', 'navigator', 'document'];

console.log(__dirname + '/index.test.html');
global.document = jsdom(fs.readFileSync(__dirname + '/index.test.html'));
global.window = document.defaultView;

global.window.CustomEvent = undefined;
require('react-mdl/extra/material');
// Object.keys(document.defaultView).forEach(function (property) {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView;
//   }
// });

global.Element = global.window.Element;

global.navigator = {
  userAgent: 'node.js'
};

global.documentRef = document;
global.localStorage = {};

global.Headers = function(headers) {
  return headers;
};

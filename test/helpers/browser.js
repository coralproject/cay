var jsdom = require('jsdom').jsdom

var exposedProperties = ['window', 'navigator', 'document']

global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach(function (property) {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView
  }
})

global.navigator = {
  userAgent: 'node.js'
}

global.documentRef = document

global.Headers = function(headers) {
	return headers
}

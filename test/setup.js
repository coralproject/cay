var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = document._defaultView.window; // who knows if this is correct

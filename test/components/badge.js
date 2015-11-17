var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var assert = require('assert');
var Badge = require('../../src/components/badge');

describe('Badge component', function () {
  before('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Badge>15</Badge>
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'i');

    this.inputElement = inputComponent;
  });

  it('<i> should have some textContent', function () {

  });
});

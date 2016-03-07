var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var assert = chai.assert;
var Badge = require('../../src/components/Badge');

describe('Badge component', function () {
  before('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Badge count={15} />
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'i');

    this.inputElement = inputComponent;
  });

  it('<i> should have some textContent', function () {
    assert.equal(this.inputElement.textContent, '15');
  });

  it('should merge provided styles with defaults', function () {

  });
});

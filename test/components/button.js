var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var assert = chai.assert;
var Button = require('../../src/components/button');
var settings = require('../../src/settings.js');

describe('Button component', function () {

  before('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Button size="small" category="warning">sample test</Button>
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'button'
    );

    this.inputElement = inputComponent/*.getDOMNode()*/;
  });

  it('<button> should be a of type "button"', function () {
    assert.equal(this.inputElement.getAttribute('type'), 'button');
  });

  it('<button> should have some textContent', function () {
    assert.equal(this.inputElement.textContent, 'sample test');
  });

  it('<button> should have a background color of ' + settings.warningColor, function () {
    assert.equal(this.inputElement.style.backgroundColor, settings.warningColor);
  });

  it('<button> should be a small button with a "size" attribute provided', function () {
    assert.equal(this.inputElement.style.padding, '0.5rem');
  });

  it('<button> should merge provided styles with defaults', function () {
    var renderedButton = ReactTestUtils.renderIntoDocument(
      React.createElement(Button, {style: {backgroundColor: 'red'}})
    );

    var button = ReactTestUtils.findRenderedDOMComponentWithTag(renderedButton, 'button');

    assert.equal(button.style.backgroundColor, 'red');
  });
});

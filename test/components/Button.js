var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var assert = chai.assert;
var Button = require('../../src/components/Button');
var settings = require('../../src/settings.js');

describe('Button component', function () {

  beforeEach('render and locate element', function () {
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

  it('<button> should merge provided styles with defaults', function () {
    var renderedButton = ReactTestUtils.renderIntoDocument(
      React.createElement(Button, {style: {backgroundColor: 'red'}})
    );

    var button = ReactTestUtils.findRenderedDOMComponentWithTag(renderedButton, 'button');

    assert.equal(button.style.backgroundColor, 'red');
  });
});

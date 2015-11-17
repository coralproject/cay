var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var assert = require('assert');
var Button = require('../../src/components/button');

describe('Button component', function () {

  before('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Button size="small" category="warning">sample test</Button>
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'button'
    )

    this.inputElement = inputComponent/*.getDOMNode()*/;
  });

  it('<button> should be a of type "button"', function () {
    assert(this.inputElement.getAttribute('type') === 'button');
  });

  it('<button> should have some textContent', function () {
    assert(this.inputElement.textContent === "sample test");
  })
});

var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var assert = require('chai').assert;
var Paper = require('../../src/components/Paper');

describe('Paper component', function () {
  beforeEach('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Paper />
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'div'
    );

    this.inputElement = inputComponent;
  });

  it('should merge provided styles with defaults', function () {
    var renderedPaper = ReactTestUtils.renderIntoDocument(
      React.createElement(Paper, {style: {backgroundColor: 'red'}})
    );

    var paper = ReactTestUtils.findRenderedDOMComponentWithTag(renderedPaper, 'div');

    assert.equal(paper.style.backgroundColor, 'red');
  });
});

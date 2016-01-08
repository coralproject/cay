'use strict';

var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var assert = require('chai').assert;
var Slider = require('../src/components/slider');

describe('Slider component', function () {
  beforeEach('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Slider min={10} max={20} defaultValue={15} />
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'button'
    );

    this.inputElement = inputComponent/*.getDOMNode()*/;
  });

  it('should have a minimum value of 0 if no min is provided', function () {

  });

  it('should have a non-zero minimum if a value is provided', function () {

  });

  it('should have a maximum value of 1 if no max is provided', function () {

  });

  it('should have a non-zero maximum if a value is provided', function () {

  });

  it('should disallow default values outside of the provided range', function () {

  });

  it('should merge provided styles with defaults', function () {

  });
});

'use strict';

var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var assert = chai.assert;

var Card = require('../../../src/components/cards/Card');

describe('Card component', function () {

  beforeEach('render and locate Card node', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Card>
        <div className="foo" />
      </Card>
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'card'
    );

    this.inputElement = inputComponent;
  });

  it('should merge provided styles with defaults', function () {
    var renderedCard = ReactTestUtils.renderIntoDocument(
      React.createElement(Card, {style: {backgroundColor: 'red'}})
    );

    var card = ReactTestUtils.findRenderedDOMComponentWithTag(renderedCard, 'div');

    assert.equal(card.style.backgroundColor, 'red');
  });

  it('should render provided children', function () {
    var renderedCard = ReactTestUtils.renderIntoDocument(
      React.createElement(
        Card,
        {},
        <div className="foo" />,
        <div className="foo" />
      )
    );

    var divs = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedCard, 'foo');

    assert.lengthOf(divs, 2);
  });
});

'use strict';

var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var assert = chai.assert;

var Card = require('../../../src/components/cards/card');
var CardHeader = require('../../../src/components/cards/card-header');
var CardTitle = require('../../../src/components/cards/card-title');
var settings = require('../../../src/settings');

describe('Card component', function () {

  before('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Card>
        <CardHeader title="Card Title" />
      </Card>
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'div'
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
});

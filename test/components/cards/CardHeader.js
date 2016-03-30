var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var assert = require('chai').assert;
var Card = require('../../../src/components/cards/Card');
var CardHeader = require('../../../src/components/cards/CardHeader');

describe('CardHeader component', function () {
  beforeEach('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Card>
        <CardHeader subtitle="Test Subtitle">Test Title</CardHeader>
      </Card>
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'card-header'
    );

    this.inputElement = inputComponent;
  });

  it('CardHeader should show a title', function () {
    assert.equal(this.inputElement.firstChild.textContent, 'Test Title');
  });
});

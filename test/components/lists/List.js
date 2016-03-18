var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var List = require('../../../src/components/lists/List');

describe('List component', function () {

  before('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <List></List>
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'div'
    );

    this.inputElement = inputComponent;
  });
});

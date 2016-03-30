var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var assert = require('chai').assert;

var Avatar = require('../../src/users/Avatar');

describe('Avatar component', function () {
  beforeEach('render and locate element', function () {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <Avatar
        src="http://lorempixel.com/100/100/"
        size="small"
        roundCorners={true}
      />
    );

    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'div'
    );

    this.inputElement = inputComponent;
  });

  it('should render an image as a child', function () {
    assert.equal(this.inputElement.firstChild.tagName, 'IMG');
  });

  it('should render a round image if "roundCorners is true"', function () {
    assert.equal(this.inputElement.style.borderRadius, '20px');
  });

  it('should merge provided styles into the defaults', function () {
    var renderedAvatar = ReactTestUtils.renderIntoDocument(
      React.createElement(Avatar, {style: {border: '2px solid red'}})
    );

    var avatar = ReactTestUtils.findRenderedDOMComponentWithTag(renderedAvatar, 'div');

    assert.equal(avatar.style.border, '2px solid red');
  });

  it('should be a different size if "size" attribute is provided', function () {

  });
});

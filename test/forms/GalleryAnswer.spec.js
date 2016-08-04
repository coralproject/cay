import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import GalleryAnswer from '../../src/forms/GalleryAnswer';

describe('<GalleryAnswer/>', function () {

  /*
  these are product-level specs for designers and devs alike
  */

  it ('should have an edit button', function () {
    const wrapper = mount(<GalleryAnswer editAnswer={() => {}} removeSubmission={() => {}}/>);
    console.log(wrapper);
    expect(wrapper.find('.editButton')).to.have.length(1);
  });

  it('should have a "remove from gallery" button', function () {

  });

  it('should expect a callback to edit the answer', function () {

  });

  it('should expect a callback to remove the submission', function () {

  });

  it('should have an up arrow button', function () {

  });

  it('should have a down arrow button', function () {

  });

  it('should display identity answers if they\'re passed', function () {

  });

  it('should render multiple choice answers', function () {

  });

  it('should render the Other option if enabled on multiple choice', function () {

  });

  /*
  this is where TDD stuff lives
  */

  it('should call componentDidMount', function () {
    const wrapper = mount(<GalleryAnswer/>);
    expect(GalleryAnswer.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});

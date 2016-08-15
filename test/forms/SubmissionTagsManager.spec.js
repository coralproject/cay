import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import SubmissionTagsManager from '../../src/forms/SubmissionTagsManager';

describe('<SubmissionTagsManager/>', function () {

  /*
  these are product-level specs for designers and devs alike
  */

  it ('should have display a title and a subtitle', function () {
    const wrapper = mount(<SubmissionTagsManager tags={['hi', 'there']} />);
    expect(wrapper.text()).to.contain('Tag submission');
    expect(wrapper.text()).to.contain('Press \'enter\' to add a tag');
  });

  it('should handle not to pass tags', function () {
    const wrapper = mount(<SubmissionTagsManager />);
    expect(wrapper.find('.submissionTag')).to.have.length(0);
    expect(wrapper.props().tags).to.be.an('undefined');
  });

  it('should ignore flagged and bookmarked flags', function () {
    const wrapper = mount(<SubmissionTagsManager tags={['my', 'tags', 'with', 'flagged', 'bookmarked']} />);
    expect(wrapper.find('.submissionTag')).to.have.length(3);
    expect(wrapper.props().tags).to.be.a('array');
    expect(wrapper.props().tags).to.eql(['my', 'tags', 'with', 'flagged', 'bookmarked']);
  });

  /**
   * Todo for when we have integration tests
   */
  it('should return the value on add and empty the input box', function () {
  });

  it('should call onRemove when clicking on a tag close', function () {
  });

});

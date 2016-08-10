import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import GalleryAnswerNumber from '../../src/forms/GalleryAnswerNumber';

describe('<GalleryAnswerNumber/>', function () {

  beforeEach(function () {
    const mock = {
      edited: null,
      answer: {
        value: 17
      }
    };
    this.instance = <GalleryAnswerNumber answer={mock} />;
  });

  it('should display a number as text', function () {
    const wrapper = shallow(this.instance);
    expect(wrapper.find('div').text()).to.contain('17');
  });

  it('should render the edited number as text if present', function () {
    const mock = {
      edited: 42,
      answer: {
        text: 17
      }
    };

    const wrapper = mount(<GalleryAnswerNumber answer={mock} />);
    expect(wrapper.find('div').text()).to.contain('42');
  });

  it('should have (required) props for text', function () {
    const wrapper = mount(this.instance);
    expect(wrapper.props().answer.answer.value).to.not.be.undefined;
    expect(wrapper.props().answer.edited).to.not.be.undefined;
  });
});

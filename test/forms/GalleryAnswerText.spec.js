import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import GalleryAnswerText from '../../src/forms/GalleryAnswerText';

describe('<GalleryAnswerText/>', function () {

  beforeEach(function () {
    const mock = {
      edited: null,
      answer: {
        text: 'clark kent'
      }
    };
    this.instance = <GalleryAnswerText answer={mock} />;
  });

  it('should display some text', function () {
    const wrapper = shallow(this.instance);
    expect(wrapper.find('div').text()).to.contain('clark kent');
  });

  it('should render the edited text if present', function () {
    const mock = {
      edited: 'superman',
      answer: {
        text: 'clark kent'
      }
    };

    const wrapper = mount(<GalleryAnswerText answer={mock} />);
    expect(wrapper.find('div').text()).to.contain('superman');
  });

  it('should have (required) props for text', function () {
    const wrapper = mount(this.instance);
    expect(wrapper.props().answer.answer.text).to.not.be.undefined;
    expect(wrapper.props().answer.edited).to.not.be.undefined;
  });
});

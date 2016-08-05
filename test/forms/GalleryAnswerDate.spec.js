import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import GalleryAnswerDate from '../../src/forms/GalleryAnswerDate';

describe('<GalleryAnswerDate/>', function () {
  it('should display some text as a formatted date', function () {
    const mock = {
      edited: null,
      answer: {
        value: '01-15-2016'
      }
    };

    const wrapper = shallow(<GalleryAnswerDate answer={mock}/>);
    expect(wrapper.find('div').text()).to.contain('15 Jan 2016');
  });

  it('should render the text anyway if the date is invalid', function () {
    const mock = {
      edited: null,
      answer: {
        value: 'Yesterday'
      }
    };

    const wrapper = shallow(<GalleryAnswerDate answer={mock}/>);
    expect(wrapper.find('div').text()).to.contain('Yesterday');
  });

  it('should have the required props for a date', function () {
    const mock = {
      edited: null,
      answer: {
        value: '02-07-1983'
      }
    };

    const wrapper = mount(<GalleryAnswerDate answer={mock}/>);
    expect(wrapper.props().answer.answer.value).to.not.be.undefined;
    expect(wrapper.props().answer.edited).to.not.be.undefined;
  });
});

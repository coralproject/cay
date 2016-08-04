import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Avatar from '../../src/users/Avatar';

describe('<Avatar/>', function () {
  it('should have (required) props for src', function () {
    // this fails if we call shallow here? why?
    const wrapper = mount(<Avatar src='http://placehold.it/350x150'/>);
    expect(wrapper.props().src).to.not.be.undefined;
  });

  it('should have an image to display the gravatar', function () {
    const wrapper = shallow(<Avatar src='http://placehold.it/350x150'/>);
    expect(wrapper.find('img')).to.have.length(1);
    expect(wrapper.find('.avatar')).to.have.length(1);
  });
});

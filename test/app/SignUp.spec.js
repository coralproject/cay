import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import SignUp from '../../src/app/SignUp';

describe('<SignUp/>', function () {

  it('should display a Facebook sign up button', function () {
    const wrapper = mount(<SignUp />);
    expect(wrapper.find('.facebook')).to.have.length(1);
    expect(wrapper.find('.facebook').text()).to.contain('Sign up with Facebook');
  });

  it('should display a GitHub sign up button', function () {

  });

  it('should display a Twitter sign up button', function () {

  });

  it('should have email sign up form', function () {

  });

  it('should have a Forgot Password link', function () {

  });

  it('should have a link to sign in for existing users', function () {

  });

  it('should say Sign up at the top', function () {

  });

  it('should have a Create an Account prompt at the botom', function () {

  });
});

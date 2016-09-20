import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import SignUp from '../../src/app/SignUp';

describe('<SignUp/>', function () {

  beforeEach(function () {
    this.mountedInstance = mount(<SignUp />);
  });

  it('should display a Facebook sign up button', function () {
    // const wrapper = mount(<SignUp />);
    expect(this.mountedInstance.find('.facebook')).to.have.length(1);
    expect(this.mountedInstance.find('.facebook').text()).to.contain('Sign up with Facebook');
  });

  it('should display a GitHub sign up button', function () {
    expect(this.mountedInstance.find('.github')).to.have.length(1);
    expect(this.mountedInstance.find('.github').text()).to.contain('Sign up with Github');
  });

  it('should display a Twitter sign up button', function () {
    expect(this.mountedInstance.find('.twitter')).to.have.length(1);
    expect(this.mountedInstance.find('.twitter').text()).to.contain('Sign up with Twitter');
  });

  it('should have email sign up form', function () {
    expect(this.mountedInstance.find('.emailSignUp')).to.have.length(1);
    expect(this.mountedInstance.find('.emailSignUp').text()).to.equal('Email address');
    expect(this.mountedInstance.find('.emailSignUpPassword')).to.have.length(1);
    expect(this.mountedInstance.find('.emailSignUpPassword').text()).to.equal('Password');
    expect(this.mountedInstance.find('.emailSignUpPasswordConfirm')).to.have.length(1);
    expect(this.mountedInstance.find('.emailSignUpPasswordConfirm').text()).to.equal('Confirm password');
  });

  it('should have a Forgot Password link', function () {
    expect(this.mountedInstance.find('.forgotPassword')).to.have.length(1);
    expect(this.mountedInstance.find('.forgotPassword').text()).to.equal('Forgot your password?');
  });

  it('should have a link to sign in for existing users', function () {
    expect(this.mountedInstance.find('.linkToSignIn')).to.have.length(1);
    expect(this.mountedInstance.find('.linkToSignIn').text()).to.equal('Sign in.');
  });

  it('should say Sign up at the top', function () {
    expect(this.mountedInstance.find('.cta').text()).to.equal('Sign up');
  });

  it('should have a Create an Account prompt at the botom', function () {
    expect(this.mountedInstance.find('.signUpTrigger')).to.have.length(1);
    expect(this.mountedInstance.find('.signUpTrigger').text()).to.contain('Sign up');
  });
});

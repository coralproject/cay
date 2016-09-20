import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import SignIn from '../../src/app/SignIn';

describe('<SignIn/>', function () {

  beforeEach(function () {
    this.mountedInstance = mount(
      <SignIn
        signInFB={() => {}}
        signInGH={() => {}}
        signInTwitter={() => {}}
        />
    );
  });

  it('should have all the required props defined', function () {
    expect(this.mountedInstance.props().signInFB).to.not.be.undefined;
    expect(this.mountedInstance.props().signInGH).to.not.be.undefined;
    expect(this.mountedInstance.props().signInTwitter).to.not.be.undefined;
  });

  it('should display a Facebook sign in button', function () {
    // const wrapper = mount(<SignUp />);
    expect(this.mountedInstance.find('.facebook')).to.have.length(1);
    expect(this.mountedInstance.find('.facebook').text()).to.contain('Sign in with Facebook');
  });

  it('should display a GitHub sign in button', function () {
    expect(this.mountedInstance.find('.github')).to.have.length(1);
    expect(this.mountedInstance.find('.github').text()).to.contain('Sign in with Github');
  });

  it('should display a Twitter sign in button', function () {
    expect(this.mountedInstance.find('.twitter')).to.have.length(1);
    expect(this.mountedInstance.find('.twitter').text()).to.contain('Sign in with Twitter');
  });

  it('should have email sign in form', function () {
    expect(this.mountedInstance.find('.emailSignIn')).to.have.length(1);
    expect(this.mountedInstance.find('.emailSignIn').text()).to.equal('Email address');
    expect(this.mountedInstance.find('.emailSignInPassword')).to.have.length(1);
    expect(this.mountedInstance.find('.emailSignInPassword').text()).to.equal('Password');
  });

  it('should have a Forgot Password link', function () {
    expect(this.mountedInstance.find('.forgotPassword')).to.have.length(1);
    expect(this.mountedInstance.find('.forgotPassword').text()).to.equal('Forgot your password?');
  });

  it('should say Sign in at the top', function () {
    expect(this.mountedInstance.find('.cta').text()).to.equal('Sign in');
  });

  it('should have a Create an Account prompt at the botom', function () {
    expect(this.mountedInstance.find('.linkToRegister')).to.have.length(1);
    expect(this.mountedInstance.find('.linkToRegister').text()).to.contain('Register.');
  });


});

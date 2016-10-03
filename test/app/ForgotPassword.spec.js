import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import ForgotPassword from '../../src/app/ForgotPassword';

describe('<ForgotPassword />', function () {

  beforeEach(function () {
    this.instance = mount(<ForgotPassword />);
  });

  it('should say Forgot Password? at the top', function () {
    expect(this.instance.find('.cta').text()).to.contain('Forgot Password');
  });

  it('should have an input for your email', function () {
    expect(this.instance.find('.emailInput')).to.have.length(1);
    expect(this.instance.find('.emailInput').text()).to.contain('Email');
  });

  it('should have a Get Reset Link button', function () {
    expect(this.instance.find('.requestResetLink')).to.have.length(1);
    expect(this.instance.find('.requestResetLink').text()).to.contain('Send me a reset link');
  });

  it('should fire an action when the button is clicked', function () {

  });
});

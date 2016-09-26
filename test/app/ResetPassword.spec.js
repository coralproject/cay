import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import ResetPassword from '../../src/app/ResetPassword';

describe('<ResetPassword />', function () {
  beforeEach(function () {
    this.instance = mount(<ResetPassword />);
  });

  it('should say Reset Password at the top', function () {
    expect(this.instance.find('.cta').text()).to.contain('Reset Password');
  });

  it('should show 2 password input fields', function () {
    expect(this.instance.find('.passwordInput input')).to.be.length(2);
    expect(this.instance.find('.passwordInput input').forEach(node => {
      expect(node.prop('type')).to.equal('password');
    }));
    expect(this.instance.find('.passwordInput.first').text()).to.equal('Password');
    expect(this.instance.find('.passwordInput.confirm').text()).to.equal('Confirm Password');
  });

  it('should have a button to reset the password', function () {
    expect(this.instance.find('.resetPassword')).to.have.length(1);
    expect(this.instance.find('.resetPassword').text()).to.contain('Reset Password');
  });

  it('should fire a callback when the button is clicked', function () {

  });
});

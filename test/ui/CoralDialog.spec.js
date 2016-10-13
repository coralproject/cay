import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai, { expect } from 'chai'

import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

import { CoralDialog } from '../../src/components/ui';

describe('<CoralDialog>', () => {

  it('renders the dialog', () => {
    const wrapper = mount(<CoralDialog></CoralDialog>);
    expect(wrapper.find('dialog')).to.have.length(1);
  });

  it('adds style to it', () => {
    const wrapper = mount(<CoralDialog style={{ backgroundColor: 'red' }}></CoralDialog>);
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('red');
  });

  it('adds a title', () => {
    const wrapper = mount(<CoralDialog title="Publish Options"></CoralDialog>);
    expect(wrapper.find('.mdl-dialog__title').text()).to.equal('Publish Options');
  });
});

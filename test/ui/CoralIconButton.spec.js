import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai, { expect } from 'chai'

import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

import { CoralIconButton } from '../../src/components/ui';

describe('<CoralIconButton>', () => {

  it('adds an icon', () => {
    const wrapper = shallow(<CoralIconButton icon="done" />);
    expect(wrapper.text()).to.equal('done');
    expect(wrapper.find('.material-icons').text()).to.equal('done');
  });

  it('adds style', () => {
    const wrapper = mount(<CoralIconButton icon="done" style={{ backgroundColor: 'red' }} />);
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('red');
  });

  it('it disables the button', () => {
    const wrapper = mount(<CoralIconButton icon="done" disabled={true} />);
    expect(wrapper).to.be.disabled();
  });
});

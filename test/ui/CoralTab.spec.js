import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai, { expect } from 'chai'

import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

import { CoralTab } from '../../src/components/ui';

describe('<CoralTab>', () => {

  it('renders the tab', () => {
    const wrapper = mount(<CoralTab></CoralTab>);
    expect(wrapper.find('a')).to.have.length(1);
  });

  it('adds style', () => {
    const wrapper = mount(<CoralTab style={{ backgroundColor: 'red' }}></CoralTab>);
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('red');
  });

  it('renders and checks the label (children) passed', () => {
    const wrapper = shallow(<CoralTab>Test</CoralTab>);
    expect(wrapper.props().children).to.be.defined;
    expect(wrapper.text()).to.equal('Test');
  });
});

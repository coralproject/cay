import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai, { expect } from 'chai'

import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

import { CoralTabBar, CoralTab } from '../../src/components/ui';

describe('<CoralTabBar>', () => {

  it('renders the tabbar', () => {
    const wrapper = mount(<CoralTabBar></CoralTabBar>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('adds style', () => {
    const wrapper = mount(<CoralTabBar style={{ backgroundColor: 'red' }}></CoralTabBar>);
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('red');
  });

  it('renders and checks the label (children) passed', () => {
    const wrapper = shallow(<CoralTabBar><CoralTab>item</CoralTab><CoralTab>item2</CoralTab><CoralTab>item3</CoralTab><CoralTab>item4</CoralTab></CoralTabBar>);
    expect(wrapper.props().children).to.be.defined;
    expect(wrapper.props().children).to.have.length(4);
  });

  it('has an activeTab', () => {
    const wrapper = mount(<CoralTabBar><CoralTab>item</CoralTab><CoralTab>item2</CoralTab></CoralTabBar>);
    wrapper.setProps({ activeTab: 0 });
    expect(wrapper).to.have.exactly(2).descendants('.mdl-tabs__tab');
    expect(wrapper).to.have.exactly(1).descendants('.active');
    expect(wrapper.find('.active')).to.have.text('item');
  });
});

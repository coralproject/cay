import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai, { expect } from 'chai'

import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

import { CoralButton } from '../../src/components/ui';

describe('<CoralButton>', () => {

  it('renders the button', () => {
    const wrapper = shallow(<CoralButton></CoralButton>);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('renders checks the label (children) passed', () => {
    const wrapper = shallow(<CoralButton>Success</CoralButton>);
    expect(wrapper.props().children).to.be.defined;
    expect(wrapper.props().children).to.have.length(1);
    expect(wrapper.text()).to.equal('Success');
  });

  it('sets the type and checks the type style', () => {
    const wrapper = shallow(<CoralButton type="success">Success</CoralButton>);
    expect(wrapper.props().style).to.be.defined;
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('#00796B');

    wrapper.setProps({ type: 'primary' });
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('#0e62eb');

    wrapper.setProps({ type: 'default' });
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('rgba(158,158,158,.2)');
  });

  it('sets the button to active', () => {
    const wrapper = shallow(<CoralButton active={true}>Success</CoralButton>);
    // This button should be type default
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('#F36451');

    wrapper.setProps({ active: false });
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('rgba(158,158,158,.2)');
  });

  it('adds style to it', () => {
    const wrapper = mount(<CoralButton style={{ backgroundColor: 'red' }}>Success</CoralButton>);
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('red');
  });

  it('style should override type styles', () => {
    const wrapper = mount(<CoralButton type="primary" style={{ backgroundColor: 'red' }}>Success</CoralButton>);

    expect(wrapper.props().style).to.have.property('backgroundColor').and.not.equal('#0e62eb');
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('red');
  });

  it('adds an icon', () => {
    const wrapper = mount(<CoralButton icon="done">Success</CoralButton>);
    expect(wrapper.find('.material-icons').text()).to.equal(' done ');
  });

  it('it disables the button', () => {
    const wrapper = mount(<CoralButton disabled={true}>Success</CoralButton>);
    expect(wrapper).to.be.disabled();
  });

});

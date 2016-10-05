import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai, { expect } from 'chai'

import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

import { CoralIcon } from '../../src/components/ui';

describe('<CoralIcon>', () => {

  it('renders an icon', () => {
    const wrapper = shallow(<CoralIcon icon="done" />);
    expect(wrapper.text()).to.equal('done');
    expect(wrapper.find('.material-icons').text()).to.equal('done');
  });

  it('adds style', () => {
    const wrapper = mount(<CoralIcon icon="done" style={{ backgroundColor: 'red' }} />);
    expect(wrapper.props().style).to.have.property('backgroundColor').and.equal('red');
  });
});

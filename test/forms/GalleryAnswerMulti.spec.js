import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import GalleryAnswerMulti from '../../src/forms/GalleryAnswerMulti';

describe('<GalleryAnswerMulti/>', function () {

  beforeEach(function () {
    const mock = {
      answer: {
        options: [
          {index: 0, title: 'Apples'}
        ]
      },
      props: {
        multipleChoice: false,
        otherAllowed: false,
        options: [
          {title: 'Apples'},
          {title: 'Oranges'},
          {title: 'Bananas'},
          {title: 'None of the above'}
        ]
      }
    };

    this.darkerGrey = '#34383C';
    this.instance = <GalleryAnswerMulti answer={mock} />;
  });

  it('should render multiple choice options', function () {
    const wrapper = shallow(this.instance);
    expect(wrapper.find('li')).to.have.length(4);
    expect(wrapper.find('li').first().text()).to.contain('Apples');
    expect(wrapper.find('li').last().text()).to.contain('None of the above');
  });

  it('should render boxes with a number prefixed', function () {
    const wrapper = shallow(this.instance);
    expect(wrapper.find('li').first().text()).to.equal('1. Apples');
  });

  it('should render light colored box when not selected', function () {
    const wrapper = mount(this.instance);
    const wrapperStyle = wrapper.find('li').last().props().style;

    expect(wrapperStyle.backgroundColor).to.equal('white');
    expect(wrapperStyle.color).to.equal(this.darkerGrey);
  });

  it('should render dark colored box when option selected', function () {
    const wrapper = mount(this.instance);
    const wrapperStyle = wrapper.find('li').first().props().style;

    expect(wrapperStyle.backgroundColor).to.equal(this.darkerGrey);
    expect(wrapperStyle.color).to.equal('white');
  });

  it('should render more than one selected if multipleChoice === true', function () {
    const mock = {
      answer: {
        options: [
          {index: 0, title: 'Apples'},
          {index: 1, title: 'Oranges'}
        ]
      },
      props: {
        multipleChoice: true,
        otherAllowed: false,
        options: [
          {title: 'Apples'},
          {title: 'Oranges'},
          {title: 'Bananas'},
          {title: 'None of the above'}
        ]
      }
    };

    const wrapper = mount(<GalleryAnswerMulti answer={mock}/>);
    const boxes = wrapper.find('li');
    expect(boxes).to.have.length(4);
    expect(boxes.first().props().style.backgroundColor).to.equal(this.darkerGrey);
    expect(boxes.at(1).props().style.backgroundColor).to.equal(this.darkerGrey);
    expect(boxes.at(2).props().style.backgroundColor).to.equal('white');
  });

  it('should render Other option if defined', function () {
    const mock = {
      answer: {
        options: [
          {index: 0, title: 'Red'},
          {index: 2, title: 'Blue'},
          {index: 3, title: 'Periwinkle blue'} // the Other option
        ]
      },
      props: {
        multipleChoice: true,
        otherAllowed: true,
        options: [
          {title: 'Red'},
          {title: 'Green'},
          {title: 'Blue'}
          // this is the problem. we don't know the text for Other unless it's selected.
        ]
      }
    };

    const wrapper = mount(<GalleryAnswerMulti answer={mock}/>);
    const boxes = wrapper.find('li');
    const otherBox = boxes.at(3);
    expect(boxes).to.have.length(4);
    expect(boxes.first().props().style.backgroundColor).to.equal(this.darkerGrey);
    expect(boxes.at(1).props().style.backgroundColor).to.equal('white');
    expect(otherBox.props().style.backgroundColor).to.equal(this.darkerGrey);
    expect(otherBox.text()).to.equal('Other: Periwinkle blue');
    expect(otherBox.props().style.width).to.equal('99%');
    expect(otherBox.props().style.marginRight).to.equal('1%');
  });

  it('should have required props', function () {
    const wrapper = mount(this.instance);
    expect(wrapper.props().answer.answer.options).to.not.be.undefined;
    expect(wrapper.props().answer.props.otherAllowed).to.not.be.undefined;
    expect(wrapper.props().answer.props.multipleChoice).to.not.be.undefined;
    // I'm not sure how to test arrayOf propTypes. any help would be appreciated.
  });
});

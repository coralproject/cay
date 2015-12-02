import React from 'react';
import Radium from 'radium';

import RadioButtonGroup from './form/radio-button-group';
import RadioButton from './form/radio-button';
import Checkbox from './form/checkbox';

import settings from '../settings';

import ContentHeader from './content-header';

@Radium
export default class Dashboard extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <ContentHeader title="Dashboard" />
        <div style={styles.base}>
          <Checkbox label="this is a checkbox label"/>
          <RadioButtonGroup>
            <RadioButton value="luke skywalker" label="Luke" />
            <RadioButton value="obi wan kenobi" label="Obi Wan" />
            <RadioButton value="leia organa" label="Leia" />
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
}

var styles = {
  base: {
    minHeight: '250px',
    padding: '15px',
    // margin-right: auto;
    // margin-left: auto;
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  wrapper: {
    marginLeft: '230px',
    backgroundColor: '#ecf0f5',
    minHeight: (window.innerHeight - 50) + 'px'
  }
}

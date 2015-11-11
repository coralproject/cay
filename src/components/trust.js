import React from 'react';
import Radium from 'radium';

import Button from './button';
import Checkbox from './checkbox';
import List from './lists/list';
import ListItem from './lists/list-item';
import Icon from './icon';
import Avatar from './avatar';

import settings from '../settings';

@Radium
export default class Trust extends React.Component {
  getFilters() {
    const filters = ['All Users', 'New Users', 'Warned Users', 'Trusted Contributors', 'Trolls']
    return filters.map((filter, i) => {
      return (
          <ListItem
          key={i}
          rightAvatar={<Icon name="fa-battery-3" />}
          leftAvatar={<Avatar src="/img/jack_sparrow.jpg" />}
        >{filter}</ListItem>
      );
    });
  }

  render() {
    return (
      <div style={styles}>
        <List>
          {this.getFilters()}
        </List>
      </div>
    );
  }
}

var styles = {
  minHeight: '250px',
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft: 15,
  paddingRight: 15 // why do I have to write these all out?
};

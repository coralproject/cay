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

  handleClick(e) {
    console.log('Trust', e);
  }

  getFilters() {
    const filters = ['All Users', 'New Users', 'Warned Users', 'Trusted Contributors', 'Trolls']
    return filters.map((filter, i) => {
      console.log(this.handleClick);


      return (
          <ListItem
          onClick={this.handleClick.bind(this)}
          key={i}
          leftAvatar={<Avatar src="/img/jack_sparrow.jpg" />}
          rightAvatar={<Icon size="medium" color="#BDBDBD" name="fa-filter" />}
        >{filter}</ListItem>
      );
    });
  }

  render() {
    return (
      <div style={styles}>
        <Button size="small">No category size small</Button>
        <Button category="default">Default</Button>
        <Button category="primary">Primary</Button>
        <Button category="success">Success</Button>
        <Button category="info">Info</Button>
        <Button category="warning">Warning</Button>
        <Button category="danger">Danger</Button>
        <Button category="link">Link</Button>
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

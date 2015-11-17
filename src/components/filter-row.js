import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';
import ListItem from './lists/list-item';
import Badge from './badge';
import Icon from './icon';

@Radium
export default class FilterRow extends React.Component {
  render() {
    return (
      <ListItem
        style={[this.props.style, styles.base]}
        onClick={this.props.onClick}
        leftAvatar={<Icon size="medium" inverse={true} color={settings.coralPink} name="fa-folder" />}
      >
        <Badge count={Math.random().toString().slice(-2)} style={styles.badge}/>
        {this.props.filter}
      </ListItem>
    );
  }
}

var styles = {
  base: {},
  badge: {
    position: 'absolute',
    top: 5,
    left: 36
  }
};

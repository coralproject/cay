import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';
import ListItem from './lists/list-item';
import Badge from './badge';
import Icon from './icon';

@Radium
export default class FilterRow extends React.Component {

  static propTypes = {
    onFilterClick: PropTypes.func.isRequired
  }

  handleClick(e) {
    this.props.onFilterClick(this.props.id);
  }

  render() {
    return (
      <ListItem
        style={[
          this.props.style,
          styles.base,
          this.props.active && styles.active
        ]}
        onClick={this.handleClick.bind(this)}
        leftAvatar={<Icon size="medium" inverse={true} color={settings.coralPink} name="fa-folder" />}
      >
        <Badge count={Math.random().toString().slice(-2)} style={styles.badge}/>
        {this.props.filter}
      </ListItem>
    );
  }
}

var styles = {
  base: {
    cursor: 'pointer'
  },
  badge: {
    position: 'absolute',
    top: 5,
    left: 36
  },
  active: {
    backgroundColor: settings.lightGrey
  }
};

import React, {PropTypes} from 'react';
import Radium from 'radium';

import {Link} from 'react-router';

import settings from '../settings';
import ListItem from './lists/ListItem';
import Badge from './Badge';
// import {MdFolder} from 'react-icons';


@Radium
export default class PipelineRow extends React.Component {

  render() {
    return (
      <ListItem
        onClick={this.props.onClick}
        style={[
          this.props.style,
          styles.base,
          this.props.active && styles.active
        ]}
      >
        <Link style={styles.link} to={`/user-manager/${this.props.id}`}>
          {this.props.pipeline.name}
        </Link>

        <Badge count={Math.random().toString().slice(-2)} style={styles.badge}/>

      </ListItem>
    );
  }
}

const styles = {
  icon: {
    fill: settings.brandColor
  },
  base: {
    cursor: 'pointer'
  },
  link: {
    textDecoration: 'none',
    color: settings.darkGrey
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

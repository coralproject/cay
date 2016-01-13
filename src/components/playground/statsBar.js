import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import settings from '../../settings';

import Icon from '../../components/icon';

@connect(state => state.playground)
@Radium
class StatsBar extends React.Component {

  render() {

    return (
      <div style={ styles.statsBar }>
        <Icon size="medium" name="fa-thumbs-o-up" /> { this.props.likes } Likes
      </div>
    );

  }
}

// same as the @connect decorator above
export default StatsBar;

var styles = {
  statsBar: {
    padding: '10px 0',
    fontSize: '11pt',
    color: settings.grey
  }
};
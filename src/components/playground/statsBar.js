import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Icon from '../../components/Icon';

@connect(state => state.playground)
@Radium
class StatsBar extends React.Component {

  likeClickHandler() {
    if (!this.state.alreadyLiked) {
      this.setState({ alreadyLiked: true });
    }
  }

  render() {

    return (
      <div style={ styles.statsBar }>
        { 
          this.props.togglerGroups['interaction'].togglers['likes'].status ? 
            <div onClick={ this.likeClickHandler.bind(this) } style={ styles.like }>
              <Icon size="medium" name="fa-thumbs-o-up" /> 
              { this.props.likes } Likes
            </div>
          : ''
        }
      </div>
    );

  }
}

// same as the @connect decorator above
export default StatsBar;

var styles = {
  statsBar: {
    padding: '10px 0',
    fontSize: '12pt',
    color: '#999'
  },
  like: {
    cursor: 'pointer'
  }
};
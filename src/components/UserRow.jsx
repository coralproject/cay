import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import ListItem from './lists/ListItem';
import CharacterIcon from './CharacterIcon';

@connect(state => state.pipelines)
@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  handleClick() {
    this.props.onClick(this.props.user);
  }

  render() {
    const {user} = this.props;
    const leftAvatar = (
      <CharacterIcon size="medium" color={"#1f77b4"}>
        { user.name.charAt(0).toUpperCase() }
      </CharacterIcon>
    );

    return (
      <ListItem
        style={[this.props.style, styles.base]}
        onClick={this.handleClick.bind(this)}
        leftAvatar={leftAvatar}>
        {user.name}
        <p style={styles.sub}>
          Rating | accept ratio {user.statistics.comments.all.all.accept_ratio} | Comments {user.statistics.comments.all.all.count}
        </p>
      </ListItem>
    );
  }
}

const styles = {
  base: {
    cursor: 'pointer'
  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  }
};

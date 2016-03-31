import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from 'settings';

@Radium
export default class ModalHeader extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    cancelAction: PropTypes.func.isRequired
  }

  render() {
    return (
      <div style={styles.base}>
        <span>{this.props.title}</span>
        <span style={styles.ex} onClick={this.props.cancelAction}>×</span>
      </div>
    );
  }
}

const styles = {
  base: {
    padding: 8,
    borderBottom: '1px solid ' + settings.mediumGrey,
    paddingBottom: 16
  },
  ex: {
    fontSize: 40,
    lineHeight: '14px',
    float: 'right',
    display: 'block',
    fontWeight: 'bold',
    color: settings.darkGrey,
    cursor: 'pointer',
    ':hover': {
      color: settings.darkestGrey
    }
  }
};

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
      <div style={styles.titleDivider}>
        <div style={styles.title}>{this.props.title}</div>
        <span style={styles.close} onClick={this.props.cancelAction}>×</span>
      </div>
    );
  }
}

const styles = {
  close: {
    fontSize: 30,
    lineHeight: '14px',
    top: '4px',
    right: '30px',
    position: 'absolute',
    display: 'block',
    fontWeight: 'bold',
    color: settings.darkColorBase,
    cursor: 'pointer',
    ':hover': {
      color: settings.darkColorBase
    }
  },
  title: {
    fontWeight: 'bold',
    margin: '20px 30px',
    fontSize: '1.25em'
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '1.1em'
  },
  subHeading: {
    fontWeight: 'bold',
    fontSize: '1em'
  },
  paragraphText: {
    fontSize: '1em',
    fontWeight: 'regular'
  },
  links: {
    fontSize: '1em',
    color: '#4285F4'
  },
  textArea: {
    fontSize: '1em',
    fontWeight: 'regular',
    borderRadius: '4px',
    padding: '10px'
  },
  textField: {
    fontWeight: 'regular',
    borderRadius: '4px',
    padding: '5px 10px'
  },
  titleDivider: {
    borderBottom: '1px solid #d4d4d4',
    position: 'relative'
  }
};

import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import FaClose from 'react-icons/lib/fa/close';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';

import { showFlashMessage, hideFlashMessage } from 'flashmessages/FlashMessagesActions';

@connect(({ flashMessages }) => ({ flashMessages }))
class FlashMessages extends React.Component {

  onCloseClick() {
    this.props.dispatch(hideFlashMessage());
  }

  getStyles() {
    return Object.assign({},
      styles.base,
      styles[this.props.flashMessages.type]
    );
  }

  render() {
    let { show, message, type } = this.props.flashMessages;
    return (
      show
      ? <div
        className="flashmessage"
        style={ this.getStyles() }
        >
        <span style={ styles.message }>
          {
            type == 'success'
            ? <span style={ styles.check }><FaCheckCircle /></span>
            : null
          }
          { message }
        </span>
        <span onClick={ this.onCloseClick.bind(this) } style={ styles.closeButton }>
          <FaClose />
        </span>
      </div>
      : null
    );
  }
}

export default FlashMessages;

const styles = {
  base: {
    position: 'absolute',
    background: '#EEE',
    height: '50px',
    top: '50px',
    zIndex: '100',
    width: '100%'
  },
  warning: {
    backgroundColor: '#FEDF98',
    color: 'black'
  },
  success: {
    backgroundColor: '#4CA57C',
    color: 'white'
  },
  message: {
    lineHeight: '50px',
    fontWeight: 'bold',
    paddingLeft: '20px'
  },
  closeButton: {
    position: 'absolute',
    height: '50px',
    width: '50px',
    lineHeight: '45px',
    textAlign: 'center',
    right: '5px',
    cursor: 'pointer'
  },
  check: {
    marginRight: '10px'
  }
};

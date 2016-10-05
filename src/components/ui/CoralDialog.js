import React, { Component,  PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';

@Radium
export default class CoralDialog extends Component {
  static propTypes = {
  };

  componentDidMount(){
    const dialog = ReactDOM.findDOMNode(this.refs.dialog);
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <dialog
        ref="dialog"
        className="mdl-dialog"
        style={[styles.base]}
        {...rest}
      >
        {children}
      </dialog>
    )
  }
}

const styles = {
  back: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  base: {
    backgroundColor: '#ffffff',
    boxShadow: 'rgb(155, 155, 155) 0px 1px 3px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottom: '2px solid rgb(216, 216, 216)',
    position: 'fixed'
  }
};
import React, { Component,  PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import dialogPolyfill from 'dialog-polyfill';
import settings from 'settings';

@Radium
export default class CoralDialog extends Component {
  
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    style: {},
    onCancel: e => e.preventDefault(),
    onClose: e => e.preventDefault()
  };

  componentDidMount(){
    const dialog = ReactDOM.findDOMNode(this.refs.dialog);
    dialogPolyfill.registerDialog(dialog);

    if (this.props.open) {
      dialog.showModal();
    }

    dialog.addEventListener('close', this.props.onClose);
    dialog.addEventListener('cancel', this.props.onCancel);
  }

  componentDidUpdate(prevProps) {
    const dialog = ReactDOM.findDOMNode(this.refs.dialog);
    if (this.props.open !== prevProps.open) {
      if (this.props.open) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }

  componentWillUnmount() {
    const dialog = ReactDOM.findDOMNode(this.refs.dialog);
    dialog.removeEventListener('cancel', this.props.onCancel);
  }

  render() {
    const { children, title, onCancel, onClose, open, style, ...rest } = this.props;

    return (
      <dialog
        ref="dialog"
        className="mdl-dialog"
        style={[styles.base, ...style]}
        {...rest}
        >
        <div style={[styles.header]}>
          <h4 className="mdl-dialog__title" style={[styles.title]} >{title}</h4>
          <span style={styles.close} onClick={onCancel}>×</span>
        </div>
        <div className="mdl-dialog__content" style={[styles.content]}>
          {children}
        </div>
      </dialog>
    )
  }
}

const styles = {
  base: {
    width: 700,
    borderRadius: 4,
    padding: '0 0 10px'
  },
  content: {
    padding: '0 10px'
  },
  header: {
    padding: '15px 20px 10px',
    borderBottom: '1px solid rgb(216, 216, 216)'
  },
  title: {
    padding: 0,
    margin: 0,
    fontWeight: 'bold'
  },
  close: {
    fontSize: 30,
    lineHeight: '14px',
    top: '22px',
    right: '20px',
    position: 'absolute',
    display: 'block',
    fontWeight: 'bold',
    color: settings.darkColorBase,
    cursor: 'pointer',
    ':hover': {
      color: settings.darkColorBase
    }
  }
};
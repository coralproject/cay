import React, { Component,  PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import dialogPolyfill from 'dialog-polyfill';

@Radium
export default class CoralDialog extends Component {
  static propTypes = {
    className: PropTypes.string,
    onCancel: PropTypes.func,
    open: PropTypes.bool
  };

  static defaultProps = {
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
    if (this.props.open) {
      dialog.showModal();
    }
  }

  componentWillUnmount() {
    const dialog = ReactDOM.findDOMNode(this.refs.dialog);
    dialog.removeEventListener('cancel', this.props.onCancel);
  }

  render() {
    const { children, title, onCancel, onClose, open, ...rest } = this.props;

    return (
      <dialog
        ref="dialog"
        className="mdl-dialog"
        style={[styles.base]}
        {...rest}
        >
        <div style={[styles.header]}>
          <h4 className="mdl-dialog__title" style={[styles.title]} >{title}</h4>
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
    padding: 0,
    borderRadius: 4
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
  }
};
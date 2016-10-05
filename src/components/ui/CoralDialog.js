import React, { Component,  PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';

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
    const { children, title, onCancel, open, ...rest } = this.props;

    return (
      <dialog
        ref="dialog"
        className="mdl-dialog"
        style={[styles.base]}
        {...rest}
        >
        <h4 className="mdl-dialog__title">{title}</h4>
        <div className="mdl-dialog__content">
          {children}
        </div>
      </dialog>
    )
  }
}

const styles = {
  base: {
    width: 700,
  }
};
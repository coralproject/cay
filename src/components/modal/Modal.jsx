import React, {PropTypes} from 'react';
import Radium from 'radium';

import Card from '../cards/Card';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

@Radium
export default class Modal extends React.Component {
  static propTypes = {
    cancelAction: PropTypes.func.isRequired,
    confirmAction: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <div style={[
        !this.props.isOpen && styles.isClosed,
        styles.backdrop,
        this.props.style
      ]}>
        <Card style={styles.modalContainer}>
          <ModalHeader title={this.props.title} cancelAction={this.props.cancelAction} />
          {this.props.children}
          <ModalFooter
            confirmText={this.props.confirmText}
            cancelAction={this.props.cancelAction}
            confirmAction={this.props.confirmAction} />
        </Card>
      </div>
    );
  }
}

const styles = {
  backdrop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  modalContainer: {
    width: '50%',
    marginTop: 30,
    marginBottom: 50,
    maxWidth: 500
  },
  isClosed: {
    display: 'none',
    visibility: 'hidden'
  }
};

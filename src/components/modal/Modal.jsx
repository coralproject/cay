import React, {PropTypes} from 'react';
import Radium from 'radium';

import Card from '../cards/Card';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

@Radium
export default class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    cancelAction: PropTypes.func.isRequired
  }

  render() {
    return (
      <div style={[
        !this.props.isOpen && styles.isClosed,
        styles.backdrop,
        this.props.style
      ]}>
        <Card style={[
          styles.modalContainer,
          this.props.style && this.props.style.modalContainer
        ]}>
          <ModalHeader title={this.props.title} cancelAction={this.props.cancelAction} />
          <div style={styles.modalContentPadder}>
            {this.props.children}
          </div>
          {
            this.props.noFooter
            ? null
            : <ModalFooter
              confirmText={this.props.confirmText}
              cancelAction={this.props.cancelAction}
              confirmAction={this.props.confirmAction} />
          }
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
    position: 'fixed',
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  modalContainer: {
    width: '0%',
    minWidth: 800,
    marginTop: 30,
    position: 'relative',
    marginBottom: 50,
    padding: '0'
  },
  modalContentPadder: {
    padding: '20px'
  },
  isClosed: {
    display: 'none',
    visibility: 'hidden'
  }
};

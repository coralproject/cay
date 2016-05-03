import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from 'settings';
import Button from 'components/Button';

@Radium
export default class ModalFooter extends React.Component {

  static propTypes = {
    confirmText: PropTypes.string,
    cancelAction: PropTypes.func.isRequired,
    confirmAction: PropTypes.func.isRequired
  }

  render() {
    return (
      <div style={styles.base}>
        <Button
          category="primary"
          onClick={this.props.confirmAction}
          style={styles.confirmButton}>{this.props.confirmText || 'Confirm'}</Button>
        <Button
          onClick={this.props.cancelAction}
          style={styles.cancelButton}>Cancel</Button>
      </div>
    );
  }
}

const styles = {
  base: {
    borderTop: '1px solid ' + settings.mediumGrey,
    paddingTop: 16,
    marginTop: 16
  },
  cancelButton: {
    float: 'right'
  },
  confirmButton: {
    float: 'right',
    marginLeft: 8
  }
};

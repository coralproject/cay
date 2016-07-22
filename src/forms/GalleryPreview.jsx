import React, {PropTypes} from 'react';
import Radium from 'radium';
import onClickOutside from 'react-onclickoutside';

@onClickOutside
@Radium
export default class GalleryPreview extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    closePreview: PropTypes.func.isRequired
  }

  handleClickOutside() {
    this.props.closePreview();
  }

  getStyles() {
    return {
      backgroundColor: 'blue',
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100%',
      width: this.props.open ? 500 : 100
    };
  }

  render() {
    return (
      <div id="ask-gallery" style={this.getStyles()}>GalleryPreview</div>
    );
  }
}

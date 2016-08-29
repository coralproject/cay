import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from 'settings';

@Radium
export default class GalleryPreview extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    closePreview: PropTypes.func.isRequired
  }

  render() {
    const gallery = this.props[this.props.activeGallery];
    if (!gallery) return null;

    if (gallery.config.baseUrl) {
      var script = document.createElement('script');
      var url = `${gallery.config.baseUrl}${this.props.activeGallery}.js`;
      script.type = 'application/javascript';
      // the id of the gallery is always the same. send a param to prevent caching
      script.src = `${url}?t=${Date.now()}`;
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    return (
      <div
        style={[
          styles.previewBkd,
          {display: this.props.open ? 'block' : 'none'}
        ]}>
        <div style={styles.drawer}>
          <div style={styles.header}>Preview</div>
          <div id="ask-gallery" />
        </div>
        <div onClick={this.props.closePreview} style={styles.closeButton}>×</div>
      </div>
    );
  }
}

const styles = {
  previewBkd: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .2)'
  },
  drawer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: 500,
    overflowY: 'scroll'
  },
  header: {
    backgroundColor: settings.brandColor,
    color: 'white',
    padding: 20
  },
  closeButton: {
    borderRadius: '4px 0 0 4px',
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#888',
    fontWeight: 'bold',
    fontSize: '40px',
    width: 40,
    height: 40,
    textAlign: 'right',
    position: 'absolute',
    right: 500,
    top: 25,
    paddingRight: 10,
    ':hover': {
      color: 'black'
    }
  }
};

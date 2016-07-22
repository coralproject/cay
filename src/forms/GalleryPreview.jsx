import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class GalleryPreview extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    closePreview: PropTypes.func.isRequired
  }

  render() {

    if (this.props.galleryUrl) {
      var script = document.createElement('script');
      script.type = 'application/javascript';
      // the id of the gallery is always the same. send a param to prevent caching
      script.src = `${this.props.galleryUrl}?t=${Date.now()}`;
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    return (
      <div
        onClick={this.props.closePreview}
        style={[
          styles.previewBkd,
          {display: this.props.open ? 'block' : 'none'}
        ]}>
        <div id="ask-gallery" style={styles.preview} />
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
  preview: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: 500
  }
};

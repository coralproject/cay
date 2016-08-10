import React from 'react';
import Radium from 'radium';

class Avatar extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
    size: React.PropTypes.string,
    roundCorners: React.PropTypes.bool
  }

  getStyles(size) {
    let s = {};
    let edge;

    if (size === 'small') {
      edge = 38;
    } else if (size === 'medium') {
      edge = 48;
    } else if (size === 'large') {
      edge = 78;
    }

    if (Number.isInteger(size)) {
      edge = size - 2;
    }

    s = {width: edge, height: edge};

    if (this.props.roundCorners) {
      s = Object.assign({}, s, {borderRadius: s.width / 2 + 1});
    }

    return s;
  }

  render() {
    return (
      <div style={[
        styles.base,
        this.getStyles(this.props.size),
        this.props.style
      ]}>
        <img className='avatar' style={styles.image} src={this.props.src} />
      </div>
    );
  }
}

export default Avatar;

const styles = {
  base: {
    border: '1px solid rgba(0, 0, 0, .08)',
    overflow: 'hidden'
  },
  image: {
    width: '100%'
  }
};

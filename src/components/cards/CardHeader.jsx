/*
CardHeader is always meant to go at the top of a Card.
*/

import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

class CardHeader extends React.Component {

  getVisible() {
    return {
      display: this.props.subtitle ? 'block' : 'none'
    };
  }

  render() {
    return (
      <div className="card-header" style={[styles.base, this.props.style]}>
        <p style={styles.title}>{this.props.children}</p>
        <p style={[styles.subtitle, this.getVisible()]}>{this.props.subtitle}</p>
      </div>
    );
  }
}

CardHeader.propTypes = {
  subtitle: PropTypes.string
};

export default Radium(CardHeader);

const styles = {
  base: {
    height: 32,
    position: 'relative',
    lineHeight: '24px'
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  subtitle: {
    color: settings.grey,
    fontSize: 14
  }
};

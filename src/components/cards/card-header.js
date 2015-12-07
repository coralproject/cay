import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class CardHeader extends React.Component {
  render() {
    return (
      <div style={[styles.base, this.props.style]}>
        <p style={styles.title}>{this.props.title}</p>
        <p style={styles.subtitle}>{this.props.subtitle}</p>
      </div>
    );
  }
}

const styles = {
  base: {
    height: 72,
    padding: 16,
    position: 'relative',
    lineHeight: '24px'
  },
  title: {
    fontSize: 15
  },
  subtitle: {
    color: settings.grey,
    fontSize: 14
  }
};

import React from 'react';
import Radium from 'radium';

class ContentHeader extends React.Component {
  render() {
    return (
      <section style={styles.base}>
        <h1 style={styles.header}>
          {this.props.title}
          <small style={styles.subhead}>Optional Subhead Description</small>
        </h1>
      </section>
    );
  }
}

var styles = {
  base: {
    position: 'relative',
    padding: '15px 15px 0 15px'
  },
  header: {
    fontSize: '24px'
  },
  subhead: {
    fontSize: '15px',
    display: 'inline-block',
    paddingLeft: '4px',
    fontWeight: 300,
    color: '#777',
    lineHeight: 1
  }
}

export default ContentHeader;

import React from 'react';
import Radium from 'radium';

import Header from './header';

class ContentHeader extends React.Component {
  render() {
    return (
      <section style={styles.base}>
        <Header size="large" subhead="some optional subhead">{this.props.title}</Header>
      </section>
    );
  }
}

var styles = {
  base: {
    position: 'relative',
    padding: '15px 15px 0 15px'
  }
}

export default ContentHeader;

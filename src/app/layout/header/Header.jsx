import React from 'react';
import Radium from 'radium';
import settings from 'settings';

export default Radium(() => (
  <nav style={styles.nav}></nav>
));

const styles = {
  nav: {
    marginBottom: 0,
    border: 'none',
    minHeight: 50,
    borderRadius: 0,
    backgroundColor: settings.bgColorTopNav
  }
};

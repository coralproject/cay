
/**
 * Module dpedendencies
 */

import React from 'react';
import Radium from 'radium';
import { bgColorTopNav } from 'settings';

export default Radium(() => <nav style={styles.nav}></nav>);

const styles = {
  nav: {
    marginBottom: 0,
    border: 'none',
    minHeight: 50,
    borderRadius: 0,
    backgroundColor: bgColorTopNav
  }
};

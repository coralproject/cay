import React from 'react';
import Radium from 'radium';

@Radium
class ModuleItem extends React.Component {
  render() {
    return (
      <li style={styles.base}>
        <a style={styles.link} href="#">
          <i></i>
          <span>ModuleItem</span>
          <i></i>
        </a>
      </li>
    );
  }
}

var styles = {
  base: {
    backgroundColor: '#F77160',
    ':hover': {
      backgroundColor: '#F66350'
    }
  },
  link: {
    color: 'white',
    padding: '12px 5px 12px 15px',
    display: 'block',
    textDecoration: 'none'
  }
};

export default ModuleItem;

import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

var RadiumLink = Radium(Link);

export default Radium(({ target, icon, name, onClick }) => (
  <li style={styles.base}>
    <RadiumLink style={styles.link} onClick={onClick}
      to={target} activeStyle={styles.base[':hover']}>
      <span style={ styles.icon }>{icon}</span>
      <span style={styles.text}>{name}</span>
    </RadiumLink>
  </li>
));


const styles = {
  base: {
    transition: 'all .4s',
    backgroundColor: 'transparent'
  },
  link: {
    padding: 20,
    display: 'block',
    textDecoration: 'none',
    color: '#9b9b9b',
    fontWeight: 'bold',
    fontSize: 14,
    ':hover': {
      color: '#4a4a4a'
    }
  },
  icon: {
    textAlign: 'center',
    display: 'inline-block',
    fontSize: 24
  },
  text: {
    marginLeft: 20
  }
};

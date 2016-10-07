
/**
 * Module dependencies
 */

import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

/**
 * Expose Menu Item module
 */

export default Radium(({ target, icon, label, onClick, style = {}, externalLink }) => (
  <li style={styles.base}>
    { externalLink
      ? <a style={{...styles.link, ...style}} href={target} target="_blank">
          { icon ? <span style={styles.icon}>{icon}</span> : null }
          <span style={styles.text}>{label}</span>
        </a>
      : <RadiumLink style={{...styles.link, ...style}} onClick={onClick}
        to={target} activeStyle={styles.activeLink}>
        { icon ? <span style={styles.icon}>{icon}</span> : null }
        <span style={styles.text}>{label}</span>
      </RadiumLink>
    }
  </li>
));

/**
 * Radium enhanced links
 */

const RadiumLink = Radium(Link);

/**
 * Module styles
 */

const styles = {
  base: {
    transition: 'all .4s',
    backgroundColor: 'transparent',
    position: 'relative'
  },
  link: {
    padding: '12px 10px 10px 50px',
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
    color: '#9b9b9b',
    fontWeight: '400',
    fontSize: 14,
    margin: 10,
    borderRadius: 5,
    minHeight: 47,
    lineHeight: 1.5,
    ':hover': {
      color: '#4a4a4a'
    }
  },
  activeLink: {
    color: '#4a4a4a',
    backgroundColor: '#d8d8d8'
  },
  icon: {
    textAlign: 'center',
    display: 'inline-block',
    fontSize: 24,
    position: 'absolute',
    left: 24,
    top: 3
  }
};

import React, { Component,  PropTypes } from 'react';
import Radium from 'radium';

/**
 * Tab
 *
 * Material Design Reference: https://github.com/google/material-design-lite/tree/mdl-1.x/src/tabs
 */
@Radium
export default class CoralTab extends Component {

  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    tabId: PropTypes.number,
    style: PropTypes.object
  };

  render() {
    const {
      active,
      className,
      children,
      onClick,
      style,
      tabId,
      ...rest
      } = this.props;
    return (
      <a
        style={[
          styles.base,
          active ? styles.active : {},
          style
          ]}
        className={`mdl-tabs__tab ${active ? 'active': ''} ${className ? className : ''}`}
        onClick={() => onClick(tabId)}
        { ...rest }
      >
        { children }
      </a>
    )
  }
}


const styles = {
  base: {
    textTransform: 'none',
    fontSize: '0.9em',
    paddingBottom: '3px',
    height: 30,
    lineHeight: '30px',
    ':hover': {
      cursor: 'pointer'
    }
  },
  active: {
    fontWeight: '600',
    lineHeight: '32px',
    borderBottom: 'solid 2px #F67D6F'
  }
};
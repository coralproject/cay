import React, { Component,  PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';

import { card as cardSettings } from '../../settings';
import CoralIconButton from './CoralButton';

@Radium
export default class CoralCard extends Component {
  static propTypes = {
  };

  render() {
    const { children, title, description, actions, ...rest } = this.props;
    <div
      className="CoralCard"
      style={styles.base}
      {...rest}
    >
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
      <div className="actions">
        { actions.map((action, i) => (
          <CoralIconButton key={i} icon={action.icon} onClick={action.handleClick} />
        ))}
      </div>
    </div>
  }
}

const styles = {
  base: {
    width: '100%',
    marginBottom: 20,
    borderWidth: '1px 1px 2px',
    borderStyle: 'solid',
    borderColor: 'rgb(216, 216, 216)',
    borderImage: 'initial',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgb(155, 155, 155) 0px 1px 3px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    ...cardSettings.base
  }
};

import React from 'react';
import Radium from 'radium';

import TableHead from './TableHead';
import TableBody from './TableBody';
import FaSpinner from 'react-icons/lib/fa/spinner';

import settings from '../../settings';

@Radium
export default class Table extends React.Component {

  renderChildren() {
    return React.Children.map(this.props.children, function (child) {
      if (child.type === TableHead || child.type === TableBody)
        return React.cloneElement(child, {
          multiSelect: this.props.multiSelect,
          hasActions: this.props.hasActions,
          striped: this.props.striped
        });
      else
        return child;
    }.bind(this));
  }

  render() {
    return (
      <table style={[ styles.base, this.props.style ]}>
        {
          this.props.isLoading ?
            <tr>
              <td style={ styles.loading }>
                <span style={ styles.spinner }><FaSpinner /></span>
                <span>{ this.props.loadingMessage || 'Loading...' }</span>
              </td>
            </tr>
          :
            this.renderChildren()
        }
      </table>
    );
  }
}

const styles = {
  base: {
    margin: '20px 0',
    borderRadius: '4px',
    border: '1px solid ' + settings.blueGrey,
    background: 'white',
    padding: '20px'
  },
  loading: {
    padding: '40px',
    fontSize: '20px',
    color: '#999'
  },
  spinner: {
    display: 'inline-block',
    animationName: 'spin',
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  }

};

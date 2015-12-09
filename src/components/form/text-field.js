import React from 'react';
import Radium from 'radium';
import settings from '../../settings';

@Radium
export default class TextField extends React.Component {

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div style={[styles.base, this.props.style]}>
        <label style={styles.label}>{this.props.label}</label>
        <input
          placeholder="Hint Text"
          style={styles.input}
          type="text"
          onChange={this.handleChange.bind(this)} />
        <hr style={styles.underline} />
        <hr style={styles.underlineHighlight} />
        <div style={styles.errorMessage}>{this.props.error}</div>
      </div>
    );
  }
}

const styles = {
  base: {
    fontSize: '16px',
    lineHeight: '24px',
    width: 256,
    height: 72,
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'transparent'
  },
  label: {
    display: 'block',
    position: 'absolute',
    lineHeight: '22px',
    opacity: 1,
    color: settings.grey,
    fontSize: '.8em',
    top: 20
  },
  input: {
    padding: 0,
    position: 'relative',
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    marginTop: 14,
    fontSize: 'inherit',
    color: settings.darkerGrey
  },
  underline: {
    position: 'absolute',
    border: 'none',
    borderBottom: '1px solid ' + settings.lightGrey,
    width: '100%',
    bottom: 0,
    height: 0,
    boxSizing: 'content-box',
    borderColor: settings.coralPink
  },
  underlineHighlight: {
    border: 'none'
  },
  errorMessage: {

  }
}

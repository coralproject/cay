import React from 'react';
import Radium from 'radium';
import settings from '../../settings';

@Radium
export default class TextField extends React.Component {

  componentDidMount() {
    if (this.props.defaultValue) {
      this.setState({value: this.props.defaultValue});
    }
    if (this.props.focusOnMount) {
      React.findDOMNode(this.refs.textFieldInput).focus(); 
    }
  }

  constructor(props) {
    super(props);
    this.state = {value: '', focused: false};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  handleKeyPress(event) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }
  }

  handleFocus(event) {
    this.setState({focused: true});
  }

  handleBlur(event) {
    this.setState({focused: false});
  }

  render() {
    return (
      <div style={[styles.base, this.props.style]}>
        <label style={[
          styles.label,
          this.state.value.length && styles.labelWithValue,
          this.state.focused && styles.focusedLabel
        ]}>
          {this.props.label}
        </label>
        <input
          placeholder={this.props.label}
          style={styles.input}
          value={this.state.value}
          ref="textFieldInput"
          onKeyPress={this.handleKeyPress.bind(this)}
          type={this.props.type || 'text'}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
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
    display: 'none',
    position: 'absolute',
    lineHeight: '22px',
    opacity: 1,
    color: settings.grey,
    fontSize: '.8em',
    top: 15
  },
  labelWithValue: {
    display: 'block'
  },
  focusedLabel: {
    color: settings.infoColor
  },
  input: {
    padding: 0,
    position: 'relative',
    width: '100%',
    height: '100%',
    borderColor: 'transparent',
    outline: 'none',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    marginTop: 14,
    fontSize: 'inherit',
    color: settings.darkerGrey
  },
  underline: {
    position: 'absolute',
    borderColor: 'transparent',
    borderBottom: '1px solid ' + settings.grey,
    width: '100%',
    bottom: -4,
    height: 0,
    boxSizing: 'content-box'
  },
  underlineHighlight: {
    borderColor: 'transparent',
    borderBottomColor: settings.brandColor,
    width: 0, // somehow transition this to 100%
    height: 0,
    bottom: -3,
    borderBottomWidth: 2,
    position: 'absolute',
    boxSizing: 'content-box'
  },
  errorMessage: {
    position: 'absolute',
    fontSize: 12,
    bottom: -17,
    color: settings.dangerColor
  }
};

import React from 'react';
import Radium from 'radium';
import Color from 'color';
import settings from '../../settings';

@Radium
export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      active: false
    };
  }

  static defaultProps = {
    checked: true,
    clickHandler: (x) => { return x },
    color: settings.darkGray
  }

  activeHandler () {
    this.setState({ active: !this.state.active });
  }

  clickHandler () {
    this.setState({ checked: !this.state.checked });
    if (this.props.clickHandler) { this.props.clickHandler(); }
  }

  getWrapperStyles () {
    return {
      display: "block",
      marginBottom: 10,
      position: "relative"
    };
  }

  getLabelWrapperStyles () {
    return {
      color: this.props.labelWrapperColor,
      cursor: "pointer",
      display: "inline-block",
      fontFamily: settings.fontFamilySansSerif,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "20px",
      paddingLeft: 22,
      "-webkit-user-select": "none"
    };
  }

  getLabelStyles () {
    return {
      display: "inline",
      left: -12,
      marginRight: 4,
      position: "relative"
    };
  }

  getHelpTextStyles () {
    return {
      color: "#ccc",
      cursor: "pointer",
      display: "inline",
      fontFamily: settings.fontFamilySansSerif,
      fontSize: 12,
      fontWeight: 200,
      lineHeight: "20px",
      marginLeft: 5
    };
  }

  getCheckboxStyles() {
    const activeColor = Color(this.props.color).lighten(0.2).hexString();

    return {
      base: {
        backgroundColor: '#ccc',
        border: '2px solid ' + settings.darkBlueGrey,
        borderRadius: 2,
        display: 'inline-block',
        height: 16,
        left: -17,
        position: 'relative',
        top: 1,
        transition: 'background-color ease .3s',
        width: 16
      },
      checked: {
        backgroundColor: this.props.color
      },
      active: {
        backgroundColor: activeColor
      }
    }
  }

  render() {
    const checkboxStyles = this.getCheckboxStyles();

    return (
      <div style={this.getWrapperStyles()}>
        <span
          style={this.getLabelWrapperStyles()}
          onClick={this.clickHandler.bind(this)}
          onMouseDown={this.activeHandler.bind(this)}
          onMouseUp={this.activeHandler.bind(this)}>
          <span style={[
            checkboxStyles.base,
            this.state.checked && checkboxStyles.checked,
            this.state.active && checkboxStyles.active
          ]}>
          </span>
          <span style={this.getLabelStyles()}>
            {this.props.label}
            {this.props.helpText ? (
              <span style={this.getHelpTextStyles()}>
                ({this.props.helpText})
              </span>
            ) : null }
          </span>
        </span>
      </div>
    );
  }
}

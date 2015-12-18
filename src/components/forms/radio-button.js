import React, {PropTypes} from 'react';
import Radium from 'radium';
import Color from 'color';

import settings from '../../settings';

@Radium
export default class RadioButton extends React.Component {

  static propTypes = {
    value: PropTypes.any.isRequired
  }

  getWrapperStyles() {
    return {
      display: 'block',
      marginBottom: 10,
      position: 'relative'
    };
  }

  activeHandler() {

  }

  getLabelWrapperStyles() {
    return {
      color: this.props.labelWrapperColor,
      cursor: 'pointer',
      display: 'inline-block',
      fontFamily: settings.fontFamilySansSerif,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '20px',
      paddingLeft: 22,
      WebkitUserSelect: 'none'
    };
  }

  getLabelStyles() {
    return {
      display: "inline",
      left: -12,
      marginRight: 4,
      position: "relative"
    };
  }

  getHelpTextStyles() {

  }

  clickHandler(e) {
    this.props.handleClick(this.props.order, this.props.value);
  }

  getRadioButtonStyles() {
    const activeColor = Color(this.props.color).lighten(0.2).hexString();

    return {
      base: {
        backgroundColor: settings.lightestGrey,
        border: '2px solid ' + settings.darkBlueGrey,
        borderRadius: 8,
        display: 'inline-block',
        height: 16,
        left: -17,
        position: 'relative',
        top: 1,
        transition: 'background-color ease .3s',
        width: 16
      },
      checked: {
        backgroundColor: settings.grey
      },
      active: {
        backgroundColor: activeColor
      }
    }
  }

  render() {

    const radioButtonStyles = this.getRadioButtonStyles();

    return (
      <div style={this.getWrapperStyles()}>
        <span
          style={this.getLabelWrapperStyles()}
          onClick={this.clickHandler.bind(this)}
          onMouseDown={this.activeHandler.bind(this)}
          onMouseUp={this.activeHandler.bind(this)}>
          <span style={[
            radioButtonStyles.base,
            this.props.checked && radioButtonStyles.checked,
            this.state.active && radioButtonStyles.active
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

import React from 'react';
import Radium from 'radium';
import Color from 'color';
import settings from '../../settings';

@Radium
export default class Switch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      active: false
    };
  }

  static defaultProps = {
    checked: false,
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

  getInnerStyles() {
    return {
      base: {
        position: 'absolute',
        top: '0',
        left: '-35px',
        width: '100px',
        transition: 'all .5s'
      },
      checked: {
        left: '0px'
      },
      innerCircle: {
        width: '20px',
        height: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        lineHeight: '30px',
        margin: '5px 0px',
        display: 'inline-block',
        boxShadow: '0 0 4px rgba(0,0,0,.5)',
        'float': 'left'
      },
      sideLabels: {
        width: '40px',
        fontSize: '17px',
        textAlign: 'center',
        height: '30px',
        lineHeight: '30px',
        display: 'inline-block',
        'float': 'left',
        color: 'white',
        fontWeight: 'bold'
      }
    }
  }

  getSwitchStyles() {
    const activeColor = Color(this.props.color).lighten(0.2).hexString();

    return {
      base: {
        borderRadius: '20px',
        height: '32px', // 30 + 2 border pixels
        width: '68px',
        display: 'block',
        position: 'relative',
        border: '1px solid #aaa',
        overflow: 'hidden',
        backgroundColor: '#999',
        cursor: 'pointer'
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
    const switchStyles = this.getSwitchStyles();
    const innerStyles = this.getInnerStyles();

    return (
      <div style={[
          switchStyles.base,
          this.state.checked && switchStyles.checked,
          this.state.active && switchStyles.active,
          this.props.extraStyles
        ]} 
        onClick={this.clickHandler.bind(this)}
        onMouseDown={this.activeHandler.bind(this)}
        onMouseUp={this.activeHandler.bind(this)}>
        <div style={[
            innerStyles.base,
            this.state.checked && innerStyles.checked,
            this.state.active && innerStyles.active
          ]}>
          <span style={ innerStyles.sideLabels }>ON</span>
          <span style={ innerStyles.innerCircle }></span>
          <span style={ innerStyles.sideLabels }>OFF</span>
        </div>
      </div>
    );
  }
}

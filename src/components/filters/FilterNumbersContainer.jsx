import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
// import Flex from '../layout/Flex';

import Slider from '../Slider';

const style = {
  // symbol: {
  //   padding: '8px 10px',
  //   backgroundColor: 'rgb(240,240,240)',
  //   margin: 5,
  //   color: 'rgb(100,100,100)',
  //   borderRadius: 3,
  //   fontWeight: 300
  // },
  sliderInput: {
    backgroundColor: 'rgb(245, 245, 245)',
    border: 'none',
    textAlign: 'center',
    padding: '10px 0px',
    width: 50,
    fontSize: 14,
    margin: '0px 5px',
    borderRadius: 4,
    // 'focus': {
    //   outline: 0
    // }
  }
};

// @connect(state => {
//   return state.FOO;
// })
@Radium
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'GTLT',
      absoluteMin: 0,
      absoluteMax: 1000,
      userMin: 30,
      userMax: 800,
      equals: null
    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    /* component api */
    getValues: React.PropTypes.func
  }
  static defaultProps = {
    fieldName: 'UNDEFINED___'
  }

  handleSymbolClick(){
    const newSymbol = this.state.symbol === 'GTLT' ? 'EQUALS' : 'GTLT';
    this.setState({symbol: newSymbol});
  }
  handleGTChanged(e) {
    this.setState({userMin: e.target.value});
  }
  handleLTChanged(e) {
    this.setState({userMax: e.target.value});
  }
  // handleEqualChanged(e) {
  //   this.setState({equals: e.target.value});
  // }
  handleGTKeyDown(e) {
    if (e.which === 38) {
      this.setState({
        userMin: this.state.userMin += 1
      });
    }
    if (e.which === 40) {
      this.setState({
        userMin: this.state.userMin -= 1
      });
    }
  }
  handleLTKeyDown(e) {
    if (e.which === 38) {
      this.setState({
        userMax: this.state.userMax += 1
      });
    }
    if (e.which === 40) {
      this.setState({
        userMax: this.state.userMax -= 1
      });
    }
  }
  updateSlider(values) {
    this.setState({
      userMin: values[0],
      userMax: values[1]
    });
  }
  renderGTLT() {
    return (
      <div>
        <span> is </span>
        <span style={style.symbol} onClick={this.handleSymbolClick.bind(this)}>{'greater than'}</span>
        <input
          onFocus={this.pop_Slider}
          style={style.sliderInput}
          onKeyDown={this.handleGTKeyDown.bind(this)}
          onChange={this.handleGTChanged.bind(this)}
          value={this.state.userMin}/>
        <span> and </span>
        <span style={style.symbol} onClick={this.handleSymbolClick.bind(this)}>{'less than'}</span>
        <input
          onFocus={this.pop_Slider}
          style={style.sliderInput}
          onKeyDown={this.handleLTKeyDown.bind(this)}
          onChange={this.handleLTChanged.bind(this)}
          value={this.state.userMax}/>
        <div style={{marginTop: 10}}>
          <Slider
            min={this.state.absoluteMin}
            max={this.state.absoluteMax}
            defaultValue={[this.state.userMin, this.state.userMax]}
            value={[this.state.userMin, this.state.userMax]}
            onChange={this.updateSlider.bind(this)}
            withBars/>
        </div>
      </div>
    );
  }
  renderEQUALS() {
    return (
      <div>
        {/* will be a component */}
        <span> {this.props.fieldName} </span>
        <span style={style.symbol} onClick={this.handleSymbolClick.bind(this)}>{'='}</span>
        <input
          onFocus={this.popEqualsSlider}
          style={style.sliderInput}
          onChange={this.handleEqualChanged.bind(this)}
          value={this.state.equals || this.props.min}/>
      </div>
    );
  }
  render() {
    return (
      <div style={{padding: 10, border: 0, backgroundColor: 'white', borderRadius: 3, width: 400}}>
        <p style={{fontSize: 24, color: 'rgb(100,100,100)'}}>{this.props.fieldName}  </p>
        {
          this.state.symbol === 'GTLT' ?
            this.renderGTLT() :
            this.renderEQUALS()
        }
      </div>
    );
  }
}

export default Filter;

/*

propTypes: {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // Anything that can be rendered: numbers, strings, elements or an array
    // (or fragment) containing these types.
    optionalNode: React.PropTypes.node,

    // A React element.
    optionalElement: React.PropTypes.element,

    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalMessage: React.PropTypes.instanceOf(Message),

    // You can ensure that your prop is limited to specific values by treating
    // it as an enum.
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // An object that could be one of many types
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // An array of a certain type
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // An object with property values of a certain type
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: React.PropTypes.func.isRequired,

    // A value of any data type
    requiredAny: React.PropTypes.any.isRequired,

*/

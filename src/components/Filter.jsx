import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
import Flex from './layout/Flex';
// import { connect } from 'react-redux';
// import { FOO } from '../actions';
import Slider from './Slider';

const style = {
  symbol: {
    padding: '8px 10px',
    backgroundColor: 'rgb(240,240,240)',
    margin: 5,
    color: 'rgb(100,100,100)',
    borderRadius: 3,
    fontWeight: 700
  },
  sliderInput: {
    backgroundColor: 'rgb(240, 240, 240)',
    border: 'none',
    textAlign: 'center',
    padding: '10px 0px',
    fontSize: 16,
    width: 100,
    borderRadius: 4
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
      gt: null,
      lt: null,
      equals: null
    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    /* component api */
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    getValues: React.PropTypes.func
  }
  static defaultProps = {
    fieldName: 'number of replies',
    min: 0,
    max: 1000
  }

  handleSymbolClick(){
    const newSymbol = this.state.symbol === 'GTLT' ? 'EQUALS' : 'GTLT';
    this.setState({symbol: newSymbol});
  }
  handleGTChanged(e) {
    this.setState({gt: e.target.value});
  }
  handleLTChanged(e) {
    this.setState({lt: e.target.value});
  }
  handleEqualChanged(e) {
    this.setState({equals: e.target.value});
  }
  pop_Slider(e) {
    console.log('focus', e.target);
  }

  renderGTLT() {
    return (
      <div>
        {/* will be a component */}
        <p style={{fontSize: 24, color: 'rgb(100,100,100)', marginBottom: 10}}>{this.props.fieldName}  </p>

        <Slider/>
        <span style={style.symbol} onClick={this.handleSymbolClick.bind(this)}>{'>='}</span>
        <input
          onFocus={this.pop_Slider}
          style={style.sliderInput}
          onChange={this.handleGTChanged.bind(this)}
          value={this.state.gt || this.props.min}/>

        <span style={{margin: "0px 10px"}}> AND </span>

        {/* will be a component */}
        {/* this.props.fieldName*/}
        <span style={style.symbol} onClick={this.handleSymbolClick.bind(this)}>{'<='}</span>
        <input
          onFocus={this.pop_Slider}
          style={style.sliderInput}
          onChange={this.handleLTChanged.bind(this)}
          value={this.state.lt || this.props.max}/>
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

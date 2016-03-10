import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {filterChanged} from '../../actions';
import _ from 'lodash';
// import Flex from '../layout/Flex';

import Card from '../cards/Card';
import CardHeader from '../cards/CardHeader';

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
    borderRadius: 4
    // 'focus': {
    //   outline: 0
    // }
  }
};

@connect(state => state.filters)
@Radium
export default class FilterNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'GTLT',
      step: props.userMax - props.userMin <= 5 ? 0.01 : 1,
      equals: null
    };
  }

  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    /* component api */
    getValues: React.PropTypes.func,
    description: React.PropTypes.string,
    isPercentage: React.PropTypes.bool
  }
  static defaultProps = {
    fieldName: 'UNDEFINED___'
  }

  handleSymbolClick(){
    const newSymbol = this.state.symbol === 'GTLT' ? 'EQUALS' : 'GTLT';
    this.setState({symbol: newSymbol});
  }
  handleGTChanged(e) {
    this.props.dispatch(filterChanged(this.props.fieldName, {userMin: e.target.value}));
  }
  handleLTChanged(e) {
    this.props.dispatch(filterChanged(this.props.fieldName, {userMax: e.target.value}));
  }
  // handleEqualChanged(e) {
  //   this.setState({equals: e.target.value});
  // }
  handleGTKeyDown(e) {
    let userMin;
    if (e.which === 38) {
      userMin = Math.min(this.props.userMin + this.state.step, this.props.max);
      this.props.dispatch(filterChanged(this.props.fieldName, {userMin, userMax: this.props.userMax}));
    }
    if (e.which === 40) {
      userMin = Math.max(this.props.userMin - this.state.step, this.props.min);
      this.props.dispatch(filterChanged(this.props.fieldName, {userMin, userMax: this.props.userMax}));
    }
  }
  handleLTKeyDown(e) {
    let userMax;
    if (e.which === 38) {
      userMax = Math.min(this.props.userMax + this.state.step, this.props.max);
      this.props.dispatch(filterChanged(this.props.fieldName, {userMax, userMin: this.props.userMin}));
    }
    if (e.which === 40) {
      userMax = Math.max(this.props.userMax - this.state.step, this.props.min);
      this.props.dispatch(filterChanged(this.props.fieldName, {userMax, userMin: this.props.userMin}));
    }
  }
  updateSlider(values) {
    this.props.dispatch(filterChanged(this.props.fieldName, {userMin: values[0], userMax: values[1]}));
  }
  renderGTLT() {

    var min = (this.props.isPercentage) ? Math.floor(this.props.userMin * 100) : this.props.userMin;
    var max = (this.props.isPercentage) ? Math.floor(this.props.userMax * 100) : this.props.userMax;

    return (
      <div>
        <span style={{float: 'left', position: 'relative', top: -6}}> {min} - {max}{this.props.isPercentage ? '%' : ''}</span>
        <div style={{marginTop: 12, marginLeft: 70, width: 200}}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            step={this.state.step}
            defaultValue={[this.props.userMin, this.props.userMax]}
            value={[this.props.userMin, this.props.userMax]}
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
        <span> {this.props.description} </span>
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
      <Card>
        <CardHeader>{this.props.description}</CardHeader>
        {
          this.state.symbol === 'GTLT' ?
            this.renderGTLT() :
            this.renderEQUALS()
        }
      </Card>
    );
  }
}


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

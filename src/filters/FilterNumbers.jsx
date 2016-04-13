import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {filterChanged} from 'filters/FiltersActions';
import {clamp} from 'components/utils/math';
// import Flex from '../layout/Flex';

import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

import Slider from 'components/Slider';

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
  },
  minMaxInputs: {
    padding: "7px 10px",
    border: "1px solid lightgrey",
    borderRadius: 3


  }
};

@connect(state => state.filters)
@Radium
export default class FilterNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'GTLT',
      step: (props.type === 'floatRange' || props.type === 'percentRange') ? 0.01 : 1,
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

  componentWillReceiveProps(props) {
    this.setState({step: (props.type === 'floatRange' || props.type === 'percentRange') ? 0.01 : 1});
  }

  handleSymbolClick(){
    const newSymbol = this.state.symbol === 'GTLT' ? 'EQUALS' : 'GTLT';
    this.setState({symbol: newSymbol});
  }
  onMinChanged() {
    return (e) => {
      const clampedUserMax = clamp(this.props.userMax, this.props.min, this.props.max);
      const max = (this.props.isPercentage) ? Math.floor(clampedUserMax * 100) : clampedUserMax;
      const value = e.target.value > max ? max : e.target.value;

      this.props.dispatch(filterChanged(this.props.fieldName, {userMin: value}));
    };
  }
  onMaxChanged() {
    return (e) => {
      const clampedUserMin = clamp(this.props.userMin, this.props.min, this.props.max);
      const min = (this.props.isPercentage) ? Math.floor(clampedUserMin * 100) : clampedUserMin;
      const value = e.target.value < min ? min : e.target.value;

      this.props.dispatch(filterChanged(this.props.fieldName, {userMax: value}));
    };
  }
  updateSlider(values) {
    this.props.dispatch(filterChanged(this.props.fieldName, {userMin: values[0], userMax: values[1]}));
  }
  renderGTLT() {

    const clampedUserMin = clamp(this.props.userMin, this.props.min, this.props.max);
    const clampedUserMax = clamp(this.props.userMax, this.props.min, this.props.max);

    var min = (this.props.isPercentage) ? Math.floor(clampedUserMin * 100) : clampedUserMin;
    var max = (this.props.isPercentage) ? Math.floor(clampedUserMax * 100) : clampedUserMax;

    return (
      <div>
        <div>
          <input
            onChange={this.onMinChanged().bind(this)}
            style={style.minMaxInputs}
            type="text"
            value={`${min > max ? max : min}${this.props.isPercentage ? '%' : ''}`}/>
          {` - `}
          <input
            onChange={this.onMaxChanged().bind(this)}
            style={style.minMaxInputs}
            type="text"
            value={`${max}${this.props.isPercentage ? '%' : ''}`}/>

        </div>
        <div style={{marginTop: 12, width: '90%'}}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            step={this.state.step}
            defaultValue={[clampedUserMin, clampedUserMax]}
            value={[clampedUserMin, clampedUserMax]}
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



// handleEqualChanged(e) {
//   this.setState({equals: e.target.value});
// }
// handleGTKeyDown(e) {
//   let userMin;
//   if (e.which === 38) {
//     userMin = Math.min(this.props.userMin + this.state.step, this.props.max);
//     this.props.dispatch(filterChanged(this.props.fieldName, {userMin, userMax: this.props.userMax}));
//   }
//   if (e.which === 40) {
//     userMin = Math.max(this.props.userMin - this.state.step, this.props.min);
//     this.props.dispatch(filterChanged(this.props.fieldName, {userMin, userMax: this.props.userMax}));
//   }
// }
// handleLTKeyDown(e) {
//   let userMax;
//   if (e.which === 38) {
//     userMax = Math.min(this.props.userMax + this.state.step, this.props.max);
//     this.props.dispatch(filterChanged(this.props.fieldName, {userMax, userMin: this.props.userMin}));
//   }
//   if (e.which === 40) {
//     userMax = Math.max(this.props.userMax - this.state.step, this.props.min);
//     this.props.dispatch(filterChanged(this.props.fieldName, {userMax, userMin: this.props.userMin}));
//   }
// }

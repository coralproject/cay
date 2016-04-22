import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {filterChanged} from 'filters/FiltersActions';
import {clamp} from 'components/utils/math';
// import Flex from '../layout/Flex';

import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';
import Sparkline from 'filters/Sparkline';

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
    padding: '7px 10px',
    border: '1px solid lightgrey',
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
      // const clampedUserMax = clamp(this.props.userMax, this.props.min, this.props.max);
      // const max = (this.props.isPercentage) ? Math.floor(clampedUserMax * 100) : clampedUserMax;
      // const value = e.target.value > max ? max : e.target.value;

      this.props.dispatch(filterChanged(this.props.fieldName, {userMin: e.target.value}));
    };
  }
  onMaxChanged() {
    return (e) => {
      // const clampedUserMin = clamp(this.props.userMin, this.props.min, this.props.max);
      // const min = (this.props.isPercentage) ? Math.floor(clampedUserMin * 100) : clampedUserMin;
      // const value = e.target.value < min ? min : e.target.value;

      this.props.dispatch(filterChanged(this.props.fieldName, {userMax: e.target.value}));
    };
  }
  updateSlider(values) {
    this.props.dispatch(filterChanged(this.props.fieldName, {userMin: values[0], userMax: values[1]}));
  }
  renderHelpText() {
    let help = "";

    if (this.props.userMax < this.props.userMin) {
      help = "Max cannot be less than min"
    }

    return help;
  }
  render() {
    const clampedUserMin = clamp(this.props.userMin, this.props.min, this.props.max);
    const clampedUserMax = clamp(this.props.userMax, this.props.min, this.props.max);

    const min = clampedUserMin;
    const max = clampedUserMax;
    console.log('num',this.props.distributions[this.props[this.props.fieldName].field])

    return (
      <Card>
        <div style={{
          marginTop: 0,
          marginBottom: 10,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between"
        }}>
        <span style={{marginBottom: 10, marginRight: 20}}>{this.props.description}</span>
        {
          this.props.distributions ?
          <Sparkline
            distribution={
              this.props.distributions[this.props[this.props.fieldName].field]
            }/> :
            ""
        }
        </div>
        <div>
          <input
            onChange={this.onMinChanged().bind(this)}
            style={style.minMaxInputs}
            type='text'
            value={
             `${this.props.userMin}`
            }/>
          {` - `}
          <input
            onChange={this.onMaxChanged().bind(this)}
            style={style.minMaxInputs}
            type='text'
            value={
             `${this.props.userMax}`
            }/>     ​
        </div>
        <p style={{marginTop: 10, color: "red"}}>{this.renderHelpText()}</p>
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

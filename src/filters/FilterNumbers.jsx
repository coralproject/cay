import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import maxBy from "lodash.maxby";
import minBy from "lodash.minby";


import Card from 'components/cards/Card';
import Sparkline from 'filters/Sparkline';

@connect(state => state.filters)
@Radium
export default class FilterNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'GTLT',
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

  renderHelpText() {
    let help = '';

    if (this.props.userMax > this.props.max) {
      help = `Max cannot be greater than ${this.props.max}`;
    }

    if (this.props.userMin < this.props.min) {
      help = `Min cannot be less than ${this.props.min}`;
    }

    if (this.props.userMin > this.props.userMax) {
      help = 'Min cannot be greater than max';
    }

    return help;
  }
  render() {
    return (
      <div style={styles.base}>
        <span style={styles.description}>{this.props.description}</span>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
        {
          this.props.distributions ?
          <Sparkline
            description={this.props.description}
            distributionMax={maxBy(this.props.distributions[this.props[this.props.fieldName].field], d => return d.total )}
            distributionMin={minBy(this.props.distributions[this.props[this.props.fieldName].field], d => return d.total )}
            distribution={this.props.distributions[this.props[this.props.fieldName].field]}/> :
            ''
        }
        </div>
        <div>
          <input
            onChange={event => this.props.onChange(this.props.fieldName, 'userMin', +event.target.value)}
            style={styles.minMaxInputs}
            type='number'
            value={this.props.userMin}/>
          {` - `}
          <input
            onChange={event => this.props.onChange(this.props.fieldName, 'userMax', +event.target.value)}
            style={styles.minMaxInputs}
            type='number'
            value={this.props.userMax}/>
        </div>
        <p style={{marginTop: 10, color: 'red'}}>{this.renderHelpText()}</p>
        </div>
    );
  }
}

const styles = {
  base: {
    marginBottom: 20
  },
  description: {
    fontWeight: 500,
    marginBottom: 10,
    color: 'rgb(130,130,130)',
    fontSize: 16
  },
  minMaxInputs: {
    padding: '7px 10px',
    border: '1px solid lightgrey',
    borderRadius: 3
  },

};

import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
// import Flex from '../layout/Flex';

//import Sparkline from 'filters/Sparkline';

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

  renderHelpText() {
    let help = '';

    if (this.props.userMax > this.props.max) {
      help = `Max cannot be greater than ${parseInt(this.props.max * 100, 10)}`;
    }

    if (this.props.userMin < this.props.min) {
      help = `Min cannot be less than ${parseInt(this.props.min * 100, 10)}`;
    }

    if (this.props.userMin > this.props.userMax) {
      help = `Min cannot be greater than max (${parseInt(this.props.max * 100, 10)})`;
    }

    return help;
  }
  render() {

    return (
      <div style={[styles.base, this.props.style]}>
        <p style={styles.description}>{this.props.description}</p>
        <div>
          <input
            onChange={event => this.props.onChange(this.props.fieldName, 'userMin', event.target.value/100)}
            style={styles.minMaxInputs}
            type='number'
            value={Math.floor(this.props.userMin*100)}/>
          {` - `}
          <input
            onChange={event => this.props.onChange(this.props.fieldName, 'userMax', event.target.value/100)}
            style={styles.minMaxInputs}
            type='number'
            value={Math.floor(this.props.userMax*100)}/>
          <p style={{marginTop: 10, color: 'red'}}>{this.renderHelpText()}</p>
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    padding: '4px 8px'
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
  }
};

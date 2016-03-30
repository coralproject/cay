import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
// import Flex from './layout/Flex';
// import moment from 'moment';
// import {connect} from 'react-redux';

// const style = {
// };

@Radium
class Sentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  getStyles() {
    return {
      container: {

      }
    };
  }

  isDefault(filterName) {
    const f = this.props[filterName];
    const maxDifferent = f.userMax !== f.max && f.userMax < f.max;
    const minDifferent = f.userMin !== f.min;
    return !(maxDifferent || minDifferent);
  }

  formatName(name) {
    /* removes hyphen */
    name = name.replace("-", " ")
    /* title case */
    return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  getSpecific() {
    let breakdown = " in all authors and sections";
    if (this.props.specificBreakdown) {
      breakdown = (
        <span>
        {` users who submitted comments to ${this.props.breakdown} ${this.formatName(this.props.specificBreakdown)} `}
        </span>
      );
    }
    return breakdown;
  }

  randomColor(i) {
    const flatColors = [
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf'
    ];
    return flatColors[i];
  }

  getFilters() {
    let nonDefaultFilters = [];
    let indexOfLastNonDefault;
    this.props.filterList.map((filterName, i) => {
      if (!this.isDefault(filterName)) {
        indexOfLastNonDefault = i;
      }
    });

    this.props.filterList.map((filterName, i) => {
      if (!this.isDefault(filterName)) {
        nonDefaultFilters.push(
          <span style={{color: this.randomColor(i)}}>
            {i === indexOfLastNonDefault ? ` and between` : ` between`}
            {
              this.props[filterName].type === 'percentRange' ?
              ` ${Math.floor(this.props[filterName].userMin * 100)}` :
              ` ${this.props[filterName].userMin}`
            }
            {` and`}
            {
              this.props[filterName].type === 'percentRange' ?
              ` ${Math.floor(this.props[filterName].userMax * 100)}` : 
              ` ${this.props[filterName].userMax}`
            }
            {` ${this.props[filterName].description}`}
            {i === indexOfLastNonDefault ? `.` : `, `}
          </span>
        );
      }
    });
    return nonDefaultFilters;
  }

  render() {
    console.log('sentence sees', this.props);
    const styles = this.getStyles();
    const filters = this.getFilters();
    return (
      <div style={[
        styles.container,
        this.props.style
      ]}>
        <p>
          Users
          {this.getSpecific()}
          {filters.length > 0 ? ' with ' : ''}
          {filters}
        </p>
      </div>
    );
  }
}

export default Sentence;

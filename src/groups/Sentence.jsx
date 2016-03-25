import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
// import Flex from './layout/Flex';
import moment from 'moment';
import {connect} from 'react-redux';

// const style = {
// };

@connect(state => state.filters)
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

  isDefault (filterName) {
    let isDefault = true;
    const maxDifferent = this.props[filterName].userMax != this.props[filterName].max;
    const minDifferent = this.props[filterName].userMin != this.props[filterName].min;
    if (maxDifferent || minDifferent) {
      isDefault = false;
    }
    return isDefault;
  }

  getFilters() {
    let nonDefaultFilters = [];
    this.props.filterList.map((filterName) => {
      if (!this.isDefault(filterName)) {
        nonDefaultFilters.push(
          <span>
            {` ${this.props[filterName].description}`}
            {` between`}
            {` ${this.props[filterName].userMin}`}
            {` &`}
            {` ${this.props[filterName].userMax}`}
          </span>
        );
      }
    });
    return nonDefaultFilters;
  }

  render() {
    console.log('sentence sees', this.props);
    const styles = this.getStyles();
    return (
      <div style={[
        styles.container,
        this.props.style
      ]}>
        <p>
          Users with {this.getFilters()}
        </p>
      </div>
    );
  }
}

export default Sentence;

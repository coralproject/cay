import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
// import Flex from './layout/Flex';
// import moment from 'moment';
import {connect} from 'react-redux';
import PercentClause from './PercentClause';
import IntClause from './IntClause';
import DateRangeClause from './DateRangeClause';

import settings from 'settings';

// const style = {
// };

@connect(state => state.filters)
@Radium
class Clauses extends React.Component {
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
    // foo: 'bar'
  }
  getStyles() {
    return {
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 20
      },
      clause: {
        backgroundColor: settings.darkGrey,
        color: 'white',
        padding: '10px 20px',
        margin: '20px 20px 0px 0px',
        borderRadius: 4
      }
    };
  }

  userChangedFilter(filterName) {
    const f = this.props[filterName];
    const maxDifferent = f.userMax !== f.max && f.userMax < f.max;
    const minDifferent = f.userMin !== f.min;
    return {
      either: maxDifferent || minDifferent,
      both: !(maxDifferent && minDifferent)
    };
  }

  formatName(name) {
    /* removes hyphen */
    name = name.replace('-', ' ');
    /* title case */
    return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  getSpecific() {
    if (this.props.specificBreakdown) {
      return (
        <span style={this.getStyles().clause}>
          {`${this.props.breakdown} ${this.formatName(this.props.specificBreakdown)} `}
        </span>
      );
    }
  }

  getFilters() {
    return this.props.filterList.map((filterName) => {
      if (this.userChangedFilter(filterName).either) {
        switch (this.props[filterName].type) {
        case 'dateRange':
          return <DateRangeClause {...this.props[filterName]}/>
        case 'percentRange':
          return <PercentClause {...this.props[filterName]}/>;
        default:
          return <IntClause {...this.props[filterName]}/>;
        }
      }
    });
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={[
        styles.container,
        this.props.style
      ]}>
        {this.getSpecific()}
        {this.getFilters()}
      </div>
    );
  }
}

export default Clauses;

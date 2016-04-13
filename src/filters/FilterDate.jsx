import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {filterChanged} from 'filters/FiltersActions';
import Radium from 'radium';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

import Slider from 'components/Slider';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

@connect()
@Radium
export default class FilterDate extends React.Component {

  static propTypes = {
    userMin: PropTypes.instanceOf(Date),
    userMax: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    fieldName: PropTypes.string.isRequired
  }

  // called after either <DatePicker /> changes
  updateDateRange(ref, m) {
    let newRange;
    if (ref === 'date_start') {
      newRange = {userMin: m.toDate(), userMax: this.props.userMax};
    } else {
      newRange = {userMin: this.props.userMin, userMax: m.toDate()};
    }
    this.props.dispatch(filterChanged(this.props.fieldName, newRange));
  }

  // {values} is an array of unix timestamps
  // [timestampStart, timestampEnd]
  updateSlider(values) {
    const newRange = {userMin: new Date(values[0]), userMax: new Date(values[1])};
    this.props.dispatch(filterChanged(this.props.fieldName, newRange));
  }

  render() {

    return (
      <Card style={[styles.base, this.props.style]}>
        <CardHeader>{this.props.description}</CardHeader>

        {
          _.isDate(this.props.userMin) && _.isDate(this.props.userMax) ?
          <Slider
            min={this.props.min.getTime()}
            max={this.props.max.getTime()}
            defaultValue={[this.props.userMin.getTime(), this.props.userMax.getTime()]}
            value={[this.props.userMin.getTime(), this.props.userMax.getTime()]}
            onChange={this.updateSlider.bind(this)}
            withBars /> : 'loading date ranges'
        }



        <div style={styles.row}>
          <div style={styles.cell}>
            <p style={styles.label}>between</p>
            <DatePicker
              selected={moment(this.props.userMin)}
              onChange={this.updateDateRange.bind(this, 'date_start')} />
          </div>
          <div style={styles.cell}>
            <p style={styles.label}>and</p>
            <DatePicker
              selected={moment(this.props.userMax)}
              onChange={this.updateDateRange.bind(this, 'date_end')} />
          </div>
        </div>
      </Card>
    );
  }
}

const styles = {
  base: {

  },
  row: {
    display: 'flex'
  },
  cell: {
    flex: 1
  }
};

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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     min: moment(props.min),
  //     max: moment(props.max),
  //     userMin: moment(props.userMin),
  //     userMax: moment(props.userMax)
  //   };
  // }

  componentWillReceiveProps(props) {
    // set local state?
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
    console.log('updateDateRange', ref, moment);
    // if (ref === 'date_start') {
    //   this.setState({start: moment});
    // } else {
    //   this.setState({end: moment});
    // }
  }

  // {values} is an array of unix timestamps
  // [timestampStart, timestampEnd]
  updateSlider(values) {
    console.log('updateSlider', values);
    const newRange = {userMin: new Date(values[0]), userMax: new Date(values[1])};
    this.props.dispatch(filterChanged(this.props.fieldName, newRange));
    // this.setState({
    //   userMin: moment.unix(values[0]),
    //   userMax: moment.unix(values[1])
    // });
  }

  render() {

    return (
      <Card style={[styles.base, this.props.style]}>
        <CardHeader>{this.props.fieldName}</CardHeader>

        {
          _.isDate(this.props.userMin) && _.isDate(this.props.userMax) ?
          <Slider
            min={this.props.userMin.getTime()}
            max={this.props.userMax.getTime()}
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

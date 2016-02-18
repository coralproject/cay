import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {filterChanged} from '../../actions';
import Radium from 'radium';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Slider from '../Slider';
import Card from '../cards/Card';
import CardHeader from '../cards/CardHeader';

@connect(state => state.filters)
@Radium
export default class FilterDate extends React.Component {

  static propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    absMin: PropTypes.string,
    absMax: PropTypes.string,
    fieldName: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      absMin: moment('2003-05-13'),
      absMax: moment('2015-01-01'),
      start: moment('2013-01-01'),
      end: moment('2013-01-02')
    };
  }

  // called after either <DatePicker /> changes
  updateDateRange(ref, moment) {
    if (ref === 'date_start') {
      this.setState({start: moment});
    } else {
      this.setState({end: moment});
    }
  }

  updateSlider(values) {
    this.props.dispatch(filterChanged(this.props.fieldName, values));
    this.setState({
      start: moment.unix(values[0]),
      end: moment.unix(values[1])
    });
  }

  render() {

    return (
      <Card style={[styles.base, this.props.style]}>
        <CardHeader>{this.props.fieldName}</CardHeader>

        <Slider
          min={this.state.absMin.unix()}
          max={this.state.absMax.unix()}
          defaultValue={[this.state.start.unix(), this.state.end.unix()]}
          value={[this.state.start.unix(), this.state.end.unix()]}
          onChange={this.updateSlider.bind(this)}
          withBars />

        <div style={styles.row}>
          <div style={styles.cell}>
            <p style={styles.label}>between</p>
            <DatePicker
              selected={this.state.start}
              onChange={this.updateDateRange.bind(this, 'date_start')} />
          </div>
          <div style={styles.cell}>
            <p style={styles.label}>and</p>
            <DatePicker
              selected={this.state.end}
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

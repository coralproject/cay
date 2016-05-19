import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

@connect(state => state.filters)
@Radium
export default class FilterDateProximity extends React.Component {

  dayDiff(a, b) {
    // not all days are 24 hours, but I don't care.
    const day = 1000 * 60 * 60 * 24;
    return Math.ceil(Math.abs((a - b) / day));
  }

  onMinChanged(e) {
    const val = e.target.value;
    const date = new Date();
    date.setDate(date.getDate() - val);
    this.props.onChange(this.props.fieldName, 'userMin', date);
  }

  onMaxChanged(e) {
    const val = e.target.value;
    const date = new Date();
    date.setDate(date.getDate() - val);
    this.props.onChange(this.props.fieldName, 'userMax', date);
  }

  render() {

    const now = new Date();

    return (
      <Card>
        <CardHeader>
          <span style={styles.description}>{this.props.description}</span>
        </CardHeader>
        <div>
          <input
            onChange={this.onMinChanged.bind(this)}
            style={styles.minMaxInputs}
            type="number"
            value={this.dayDiff(now, this.props.userMin)} />
          {' - '}
          <input
            onChange={this.onMaxChanged.bind(this)}
            style={styles.minMaxInputs}
            type="number"
            value={this.dayDiff(now, this.props.userMax)} />
        </div>
      </Card>
    );
  }
}

const styles = {
  minMaxInputs: {
    padding: '7px 10px',
    border: '1px solid lightgrey',
    borderRadius: 3
  },
  description: {
    marginBottom: 10,
    marginRight: 20
  }
};

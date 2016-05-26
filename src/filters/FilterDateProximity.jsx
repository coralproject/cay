import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

@connect(state => state.filters)
@Radium
export default class FilterDateProximity extends React.Component {

  onMaxChanged(e) {
    this.props.onChange(this.props.fieldName, 'userMax', +e.target.value);
  }

  render() {

    return (
      <Card>
        <CardHeader>
          <span style={styles.description}>{this.props.description}</span>
        </CardHeader>
        <div>
          <input
            onChange={this.onMaxChanged.bind(this)}
            style={styles.minMaxInputs}
            type="number"
            value={this.props.userMax} />
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

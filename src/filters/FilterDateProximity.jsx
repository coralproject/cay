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
          <span style={styles.description}>
            {this.props.description.split('_')[0]}
            <input
              onChange={this.onMaxChanged.bind(this)}
              style={styles.minMaxInputs}
              type="number"
               />
             {this.props.description.split('_')[1]}
          </span>
        </CardHeader>

      </Card>
    );
  }
}

const styles = {
  minMaxInputs: {
    padding: '7px 3px',
    border: '1px solid lightgrey',
    width: 50,
    borderRadius: 3
  },
  description: {
    marginBottom: 10,
    marginRight: 20
  }
};

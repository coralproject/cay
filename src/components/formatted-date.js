import React, {PropTypes} from 'react';
import Radium from 'radium';

import Icon from './icon';


@Radium
export default class FormattedDate extends React.Component {
  static propTypes = {
    date: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Icon name="fa-clock-o" />
        {this.props.date.toTimeString()}</div>
    );
  }
}

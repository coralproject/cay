import React, {PropTypes} from 'react';
import Radium from 'radium';

import Card from './cards/Card';
import CardHeader from './cards/CardHeader';
import Icon from './Icon';

@Radium
export default class CommentCard extends React.Component {
  render() {
    return (
      <Card style={[styles.base, this.props.style]}>
        <CardHeader title="User Name" />
        <p>{this.props.body}</p>
      </Card>
    );
  }
}

const styles = {

};

import React, {PropTypes} from 'react';
import Radium from 'radium';

import DateTime from './utils/DateTime';
import Card from './cards/Card';
import CardHeader from './cards/CardHeader';

@Radium
export default class CommentDetail extends React.Component {

  render() {
    return (
      <Card style={[styles.base, this.props.style]}>
        <CardHeader title={this.props.user.user_name} />
        <p>Created {DateTime.format(new Date(this.props.comment.date_created))}</p>
        <p>Approved {DateTime.format(new Date(this.props.comment.date_approved))}</p>
        <p dangerouslySetInnerHTML={{__html: this.props.comment.body}} />
      </Card>
    );
  }
}

const styles = {
  base: {

  }
};

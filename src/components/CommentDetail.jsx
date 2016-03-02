import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';
import DateTime from './utils/DateTime';
import Card from './cards/Card';
import CardHeader from './cards/CardHeader';

@Radium
export default class CommentDetail extends React.Component {


  render() {

    const approvedDate = this.props.comment.date_approved ?
      DateTime.format(new Date(this.props.comment.date_approved)) :
      ' - Not Approved';

    return (
      <Card style={[styles.base, this.props.style]}>
        <CardHeader>{this.props.user.name}</CardHeader>
        <p>Created <strong style={styles.date}>{DateTime.format(new Date(this.props.comment.date_created))}</strong></p>
        <p>Approved <strong style={styles.date}>{approvedDate}</strong></p>
        <p dangerouslySetInnerHTML={{__html: this.props.comment.body}} />
      </Card>

    );
  }
}

const styles = {
  base: {

  },
  date: {
    fontWeight: 'bold',
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: '1px solid #ddd'
  },
  commentContent: {
    color: 'black',
    fontSize: '11pt'
  },
  commentLegend: {
    color: settings.grey
  }
};

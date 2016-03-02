import React, {PropTypes} from 'react';
import Radium from 'radium';

import DateTime from './utils/DateTime';
import Card from './cards/Card';
import CardHeader from './cards/CardHeader';

@Radium
export default class CommentDetail extends React.Component {

  render() {

    return (
      <div style={[styles.base, this.props.style]}>
        {/*<CardHeader>{this.props.user.user_name}</CardHeader>*/}
        <p style={ styles.commentLegend }>Created {DateTime.format(new Date(this.props.comment.date_created))}</p>
        {
          (typeof this.props.comment.date_approved != "undefined") ?
            <p style={ styles.commentLegend }>Approved {DateTime.format(new Date(this.props.comment.date_approved))} { this.props.comment.date_approved } </p>
          : 
            null
        }
        <p style={ styles.commentContent } dangerouslySetInnerHTML={{__html: this.props.comment.body}} />
      </div>
    );
  }
}

const styles = {
  base: {
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: '1px solid #ddd'
  },
  commentContent: {
    color: 'black',
    fontSize: '11pt'
  },
  commentLegend: {
    color: "#888"
  }
};

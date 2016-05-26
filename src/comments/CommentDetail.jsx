import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from 'settings';
import DateTime from 'components/utils/DateTime';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

@Radium
export default class CommentDetail extends React.Component {


  render() {

    const approvedDate = this.props.comment.date_approved ?
      DateTime.format(new Date(this.props.comment.date_approved)) :
      ' - Not Approved';

    return (
      <div style={[styles.base, this.props.style]}>
        <p
          style={styles.commentContent}
          dangerouslySetInnerHTML={{__html: this.props.comment.body}} />
        <p>
          {"Created "}
          <span
            style={styles.innerDate}>
            {DateTime.format(new Date(this.props.comment.date_created))}
          </span>
        </p>
      </div>

    );
  }
}

const styles = {
  base: {
    borderLeft: "3px solid rgb(130,130,130)",
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  commentContent: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5
  },
  date: {
    marginBottom: 10,
  },
};

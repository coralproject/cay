import React, {PropTypes, Component} from 'react';
import Radium from 'radium';
import _ from 'lodash';

import Stat from 'components/stats/Stat';
import Heading from 'components/Heading';
import CommentDetailList from 'comments/CommentDetailList';
import FAClose from 'react-icons/lib/fa/close';

import { Lang } from 'i18n/lang';

@Lang
@Radium
export default class UserDetail extends Component {
  static propTypes = {
    commentsLoading: PropTypes.bool.isRequired,
    breakdown: PropTypes.string,
    specificBreakdown: PropTypes.string,
    onClose: PropTypes.func.isRequired
  }

  getStats() {
    let {breakdown, specificBreakdown, user} = this.props;

    let statsList = [];
    specificBreakdown = specificBreakdown || 'all';
    if (specificBreakdown === 'all') breakdown = 'all';

    let dimension = user.statistics.comments[breakdown][specificBreakdown];

    // Dont break the counts while loading
    if (dimension && specificBreakdown !== 'all') {
      dimension = dimension.all;
    } else {
      dimension = user.statistics.comments.all.all;
    }

    if (dimension) {
      statsList = statsList.concat([
        <Stat term="Total comment count" description={dimension.count} />,
        <Stat term="Total replies received" description={dimension.replied_count} />,
        <Stat term="Total replies written" description={dimension.reply_count} />,
        <Stat term="% comments that are replies" description={Math.floor(dimension.reply_ratio * 100) + '%'} />
      ]);

      if (specificBreakdown === 'all' && _.has(this.props, 'user.statistics.comments.all.CommunityFlagged')) {
        statsList.push(<Stat term="Community flagged"
          description={this.props.user.statistics.comments.all.CommunityFlagged.count}
        />);
      }
      return statsList;
    } else {
      return <Stat term="Commenter Stat" description="select a commenter to see details" />;
    }
  }
  createDetailsMarkup() {
    return (
      <div>
        <div style={styles.topPart}>
          <Heading size="medium">{this.props.user.name}</Heading>
        </div>
        <div style={styles.statsContainer}>
          { this.getStats() }
        </div>
        {
          this.props.commentsLoading || !this.props.comments.length ?
          'Loading Comments...' :
          (
            <CommentDetailList
              user={this.props}
              comments={this.props.comments} />
          )
        }
      </div>
    );
  }
  renderSpinner() {
    return (
      <span>No user selected</span>
    );
  }
  render() {

    return (
      <div style={[styles.base, this.props.style]}>
        <span style={styles.close} onClick={this.props.onClose}><FAClose /></span>
        {
          !this.props.user ? this.renderSpinner() : this.createDetailsMarkup()
        }
      </div>
    );
  }
}

const styles = {
  base: {
    background: 'white',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20
  },
  topPart: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center'
  },
  avatar: {
    marginRight: 10,
    width: 75,
    height: 75
  },
  stats: {
    flex: 1
  },
  statsContainer: {
    marginBottom: 20
  },
  tabs: {
    marginTop: 20,
    clear: 'both'
  },
  tags: {
    clear: 'both',
    paddingTop: '20px'
  },
  loadingComments: {
    padding: '10px'
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer'
  }
};

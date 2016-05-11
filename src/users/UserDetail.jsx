import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';

import Avatar from 'users/Avatar';
import Tab from 'components/tabs/Tab';
import Tabs from 'components/tabs/Tabs';
import Stats from 'components/stats/Stats';
import Stat from 'components/stats/Stat';
import Heading from 'components/Heading';
import MdLocalOffer from 'react-icons/lib/md/local-offer';

// import Tagger from './forms/Tagger';
import Select from 'react-select';

import CommentDetailList from 'comments/CommentDetailList';

import { Lang } from 'i18n/lang';

@Lang
@Radium
export default class UserDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedTags: []};
  }

  static propTypes = {
    commentsLoading: PropTypes.bool.isRequired
  }

  // componentWillMount() {
  //   // comments might have been loaded for another user.
  //   this.props.dispatch(fetchAllTags());
  // }
  //
  // componentWillUpdate(nextProps) {
  //   if (nextProps.comments.items === null) {
  //     nextProps.dispatch(fetchCommentsByUser(nextProps._id));
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps._id) {
  //     this.setState({selectedTags: nextProps.tags});
  //   }
  // }

  getTags() {
    return [];
    return this.props.tags.map(tag => {
      return {label: tag.name, value: tag.name};
    });
  }

  updateTags(tags) {
    this.setState({selectedTags: tags.map(tag => tag.value)});
    if (_.has(this.props, '_id')) {
      var s = this.props;
      var preparedUser = {
        id: s._id,
        name: s.user_name,
        avatar: s.avatar,
        status: s.status,
        tags: this.state.selectedTags.slice()
      };
      // this.props.dispatch(upsertUser(preparedUser));
    }
  }

  getStats() {
    let statsList = [];
    if (_.has(this.props, 'user.statistics.comments.all.all')) {
      statsList = statsList.concat([
        <Stat term="Total comment count" description={this.props.user.statistics.comments.all.all.count} />,
        <Stat term="Total replies received" description={this.props.user.statistics.comments.all.all.replied_count} />,
        <Stat term="Total replies written" description={this.props.user.statistics.comments.all.all.reply_count} />,
        <Stat term="% comments that are replies" description={Math.floor(this.props.user.statistics.comments.all.all.reply_ratio * 100) + '%'} />
      ]);

      if (_.has(this.props, 'user.statistics.comments.all.CommunityFlagged')) {
        statsList.push(<Stat term="Community flagged" description={this.props.user.statistics.comments.all.CommunityFlagged.count} />);
      }
      return statsList;
    } else {
      return <Stat term="Commenter Stat" description="select a commenter to see details" />;
    }
  }
  createDetailsMarkup() {
    return (
      <div>
        <Heading size="medium">{this.props.user.name}</Heading>
        <div style={styles.topPart}>
          <Avatar style={styles.avatar} src="/img/user_portrait_placeholder.png" size={100} />
        </div>
        <p><MdLocalOffer /> Add/remove Tags for this Commenter</p>
        <Select
          multi={true}
          value={this.state.selectedTags}
          onChange={this.updateTags.bind(this)}
          options={this.getTags()}
        />
        <Tabs initialSelectedIndex={0} style={styles.tabs}>
          <Tab title="About">
            <Stats>
              { this.getStats() }
            </Stats>
          </Tab>
          <Tab title="Activity">

            {
              this.props.commentsLoading || !this.props.comments.length ?
              'Loading Comments...' :
              (
                <CommentDetailList
                  user={this.props}
                  comments={this.props.comments} />
              )
            }
          </Tab>
        </Tabs>
      </div>
    );
  }
  renderSpinner() {
    return (
      <span>Select a user to see details</span>
    );
  }
  render() {

    return (
      <div style={[styles.base, this.props.style]}>
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
    paddingLeft: 20,
    marginTop: 50
  },
  topPart: {
    display: 'flex',
    marginBottom: 10
  },
  avatar: {
    marginRight: 10
  },
  stats: {
    flex: 1
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
  }
};

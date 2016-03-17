import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import {connect} from 'react-redux';

import {fetchAllTags} from 'tags/TagActions';
import {upsertUser} from 'users/UsersActions';
import {fetchCommentsByUser, clearUserDetailComments} from 'comments/CommentsActions';

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

@connect(state => state.groups)
@Lang
@Radium
export default class UserDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedTags: []};
  }

  componentWillMount() {
    // comments might have been loaded for another user.
    this.props.dispatch(clearUserDetailComments());
    this.props.dispatch(fetchAllTags());
  }

  componentWillUpdate(nextProps) {
    if (nextProps.selectedUser && nextProps.userDetailComments === null) {
      nextProps.dispatch(fetchCommentsByUser(nextProps.selectedUser._id));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser) {
      this.setState({selectedTags: nextProps.selectedUser.tags});
    }
  }

  // getUserTags(user) {
  //   console.log('\n\n', user);
  //   var tags = [];
  //   if (user && user.tags && user.tags.length) {
  //     for (var i in user.tags) {
  //       tags.push({
  //         id: user.tags[i] + Math.random(),
  //         text: user.tags[i]
  //       });
  //     }
  //   }
  //   return tags;
  // }

  // onTagsChange(tags) {
  //   if (this.props.selectedUser && this.props.selectedUser._id) {
  //     var preparedUser = {};
  //     preparedUser.id = this.props.selectedUser._id;
  //     preparedUser.name = this.props.selectedUser.user_name;
  //     preparedUser.avatar = this.props.selectedUser.avatar;
  //     preparedUser.status = this.props.selectedUser.status;
  //     preparedUser.tags = tags.map(tag => tag.text);
  //     this.props.dispatch(upsertUser(preparedUser));
  //   }
  // }

  getTags() {
    return this.props.tags.map(tag => {
      return {label: tag.name, value: tag.name};
    });
  }

  updateTags(tags) {
    this.setState({selectedTags: tags.map(tag => tag.value)});
    if (this.props.selectedUser && this.props.selectedUser._id) {
      var s = this.props.selectedUser;
      var preparedUser = {
        id: s._id,
        name: s.user_name,
        avatar: s.avatar,
        status: s.status,
        tags: this.state.selectedTags.slice()
      };
      this.props.dispatch(upsertUser(preparedUser));
    }
  }

  getStats() {
    let statsList = [];
    if (this.props.selectedUser &&  _.has(this.props, 'statistics.comments.all.all')) {
      statsList = statsList.concat([
        <Stat term="Total comment count" description={this.props.statistics.comments.all.all.count} />,
        <Stat term="Total replies received" description={this.props.statistics.comments.all.all.replied_count} />,
        <Stat term="Total replies written" description={this.props.statistics.comments.all.all.reply_count} />,
        <Stat term="% comments that are replies" description={Math.floor(this.props.statistics.comments.all.all.reply_ratio * 100) + '%'} />
      ]);

      if (_.has(this.props, 'statistics.comments.all.CommunityFlagged')) {
        statsList.push(<Stat term="Community flagged" description={this.props.statistics.comments.all.CommunityFlagged.count} />);
      }
      return statsList;
    } else {
      return <Stat term="Commenter Stat" description="select a commenter to see details" />;
    }
  }

  render() {

    /*
    var tagger = this.props.tags ?
      <div style={ styles.tags }>
        <Tagger
          onChange={ this.onTagsChange.bind(this) }
          tagList={ this.props.tags }
          tags={ this.getUserTags(this.props.selectedUser) }
          freeForm={ false }
          type="user"
          id={
            this.props.selectedUser && this.props.selectedUser._id ?
              this.props.selectedUser._id :
              1
            }
          />
      </div>
    : null;
    */

    return (
      <div style={[styles.base, this.props.style]}>
      {
        this.props.name ?
          <div>
            <Heading size="medium">{this.props.name}</Heading>
            <div style={styles.topPart}>
              <Avatar style={styles.avatar} src="./img/user_portrait_placeholder.png" size={100} />
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
                  this.props.loadingUserComments || !this.props.userDetailComments ?
                  'Loading Comments...' :
                  (
                    <CommentDetailList
                      user={this.props.selectedUser}
                      comments={this.props.userDetailComments} />
                  )
                }
              </Tab>
              <Tab title="Notes">
                <p>Watch out for her comments on Climate stories, she often corrects mistakes.</p>
              </Tab>
            </Tabs>
          </div>
        :
          <span>Select a user to see details</span>
      }
      </div>
    );
  }
}

const styles = {
  base: {
    background: 'white',
    padding: 20,
    marginTop: '50px'
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

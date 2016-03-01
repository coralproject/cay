import React from 'react';
import Radium from 'radium';

import {connect} from 'react-redux';

import {fetchAllTags, upsertUser, fetchCommentsByUser, clearUserDetailComments} from '../actions';

import Avatar from './Avatar';
import Tab from './tabs/Tab';
import Tabs from './tabs/Tabs';
import Stats from './stats/Stats';
import Stat from './stats/Stat';
import Heading from './Heading';
import MdLocalOffer from 'react-icons/lib/md/local-offer';
// import Tagger from './forms/Tagger';
import Select from 'react-select';

import CommentDetailList from './CommentDetailList';

import { Lang } from '../lang';

@connect(state => state.pipelines)
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
    console.log('UserDetail.componentWillUpdate', nextProps);
    if (nextProps.selectedUser && nextProps.userDetailComments === null) {
      console.log('loading comments for user ' + nextProps.selectedUser._id);
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

  render() {

    let comments = this.props.userDetailComments === null ?
      'Loading Comments...' :
      (<CommentDetailList user={this.props.selectedUser} comments={this.props.userDetailComments} />);

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
        <Heading size="medium">{this.props.name || 'Select a user to see details'}</Heading>
        <div style={styles.topPart}>
          <Avatar style={styles.avatar} src={this.props.avatar || ''} size={200} />
        </div>
        <p><MdLocalOffer /> Add / Remove Tags for this Commenter</p>
        <Select
          multi={true}
          value={this.state.selectedTags}
          onChange={this.updateTags.bind(this)}
          options={this.getTags()}
        />
        <Tabs initialSelectedIndex={0} style={styles.tabs}>
          <Tab title="About">
            <Stats>
              {
                this.props.selectedUser ?
                  ([
                    <Stat term="total comment count" description={this.props.statistics.comments.all.all.count} />,
                    <Stat term="replied count" description={this.props.statistics.comments.all.all.replied_count} />,
                    <Stat term="reply count" description={this.props.statistics.comments.all.all.reply_count} />,
                    <Stat term="reply ratio" description={this.props.statistics.comments.all.all.reply_ratio} />,
                    <Stat term="community flagged" description={this.props.statistics.comments.all.CommunityFlagged.count} />
                  ]) :
                  <Stat term="Commenter Stat" description="select a commenter to see details" />
              }
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
  }
};

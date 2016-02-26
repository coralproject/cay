import React from 'react';
import Radium from 'radium';

import settings from '../settings';
import {connect} from 'react-redux';

import {fetchAllTagsUserDetail, upsertUser, fetchCommentsByUser, clearUserDetailComments} from '../actions';

import Avatar from './Avatar';
import Tab from './tabs/Tab';
import Tabs from './tabs/Tabs';
import Stats from './stats/Stats';
import Stat from './stats/Stat';
import Card from './cards/Card';
import Heading from './Heading';
import Tagger from './forms/Tagger';

import CommentDetailList from './CommentDetailList';

import { Lang } from '../lang';

@connect(state => state.pipelines)
@Lang
@Radium
export default class UserDetail extends React.Component {

  componentWillMount() {
    // comments might have been loaded for another user.
    this.props.dispatch(clearUserDetailComments());
    this.props.dispatch(fetchAllTagsUserDetail());

    this.updateTagsList(this.props.selectedUser);
    
  }

  componentWillUpdate(nextProps) {
    console.log('UserDetail.componentWillUpdate', nextProps);
    if (nextProps.selectedUser && nextProps.userDetailComments === null) {
      console.log('loading comments for user ' + nextProps.selectedUser._id);
      nextProps.dispatch(fetchCommentsByUser(nextProps.selectedUser._id));
    }
    this.updateTagsList(nextProps.selectedUser);
  }

  updateTagsList(user) {
    this.tags = [];
    if (user && user.tags && user.tags.length) {
      for (var i in user.tags) {
        this.tags.push({
          id: user.tags[i] + Math.random(),
          text: user.tags[i]
        });
      }
    }
  }

  onTagsChange(tags) {
    if (this.props.selectedUser && this.props.selectedUser._id) {
      var preparedUser = {};
      preparedUser['id'] = this.props.selectedUser._id;
      preparedUser['name'] = this.props.selectedUser.user_name;
      preparedUser['avatar'] = this.props.selectedUser.avatar;
      preparedUser['status'] = this.props.selectedUser.status;
      preparedUser['tags'] = [];
      for(var i in tags) {
        preparedUser['tags'].push(tags[i].text);
      }
      this.props.dispatch(upsertUser(preparedUser));
    }
  }

  render() {

    console.log('UserDetail.render', this.props);

    console.log(this.tags);

    let comments = this.props.userDetailComments === null ?
      'Loading Comments...' :
      (<CommentDetailList user={this.props.selectedUser} comments={this.props.userDetailComments} />);

    var tagger = this.props.tags ?
      <div style={ styles.tags }>
        <Tagger onChange={ this.onTagsChange.bind(this) } tagList={ this.props.tags } tags={ this.tags } freeForm={ false } type="user" id={ this.props.selectedUser && this.props.selectedUser._id ? this.props.selectedUser._id : 1 } />
      </div>
    : null;

    return (
      <div style={[styles.base, this.props.style]}>
        <Heading size="medium">{this.props.user_name}</Heading>
        <div style={styles.topPart}>
          <Avatar style={styles.avatar} src={this.props.avatar || ''} size={200} />
          <Stats style={styles.stats}>
            <Stat term={ L.t("Status") } description="subscriber" />
            <Stat term={ L.t("Last Login") } description={ L.date("", "LLLL") } />
            <Stat term={ L.t("Member Since") } description={ L.relativeDate() } />
            <Stat term={ L.t("Warnings") } description="0" />
            { tagger }
          </Stats>
        </div>
        <Tabs initialSelectedIndex={0} style={styles.tabs}>
          <Tab title="About"> {comments} </Tab>
          <Tab title="Activity">Tab Bravo Content</Tab>
          <Tab title="Messages">Tab Charlie Content</Tab>
        </Tabs>
      </div>
    );
  }
}

const styles = {
  base: {
    background: 'white',
    padding: '20px',
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
    clear: 'both'
  },
  tags: {
    clear: 'both',
    paddingTop: '20px'
  }
};


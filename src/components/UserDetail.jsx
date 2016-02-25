import React from 'react';
import Radium from 'radium';

import settings from '../settings';
import {connect} from 'react-redux';

import {fetchCommentsByUser, clearUserDetailComments} from '../actions';

import Avatar from './Avatar';
import Tab from './tabs/Tab';
import Tabs from './tabs/Tabs';
import Stats from './stats/Stats';
import Stat from './stats/Stat';
import Card from './cards/Card';
import Heading from './Heading';

import CommentDetailList from './CommentDetailList';

import { Lang } from '../lang';

@connect(state => state.pipelines)
@Lang
@Radium
export default class UserDetail extends React.Component {

  componentWillMount() {
    // comments might have been loaded for another user.
    this.props.dispatch(clearUserDetailComments());
  }

  componentWillUpdate(nextProps) {
    console.log('UserDetail.componentWillUpdate', nextProps);
    if (nextProps.selectedUser && nextProps.userDetailComments === null) {
      console.log('loading comments for user ' + nextProps.selectedUser._id);
      nextProps.dispatch(fetchCommentsByUser(nextProps.selectedUser._id));
    }
  }

  render() {

    console.log('UserDetail.render', this.props);

    let comments = this.props.userDetailComments === null ?
      'Loading Comments...' :
      (<CommentDetailList user={this.props.selectedUser} comments={this.props.userDetailComments} />);

    return (
      <div style={[styles.base, this.props.style]}>
        <Heading size="medium">{this.props.user_name}</Heading>
        <div style={styles.topPart}>
          <Avatar style={styles.avatar} src={this.props.avatar || ''} size={200} />
          <Stats style={styles.stats}>
            <Stat term={ window.L.t('Status') } description="subscriber" />
            <Stat term={ window.L.t('Last Login') } description={ window.L.date('', 'LLLL') } />
            <Stat term={ window.L.t('Member Since') } description={ window.L.relativeDate() } />
            <Stat term={ window.L.t('Warnings') } description="0" />
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
  }
};

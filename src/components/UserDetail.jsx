import React from 'react';
import Radium from 'radium';

import settings from '../settings';
import {connect} from 'react-redux';

import {fetchCommentsByUser} from '../actions';

import Avatar from './Avatar';
import Tab from './tabs/Tab';
import Tabs from './tabs/Tabs';
import Stats from './stats/Stats';
import Stat from './stats/Stat';
import Card from './cards/Card';
import Heading from './Heading';

import CommentDetailList from './CommentDetailList';


@connect(state => state.pipelines)
@Radium
export default class UserDetail extends React.Component {

  componentWillMount() {
    this.setState({userDetailComments: []}); // clear comments from any other views.
  }

  componentWillUpdate(nextProps) {
    console.log('UserDetail.componentWillUpdate', nextProps);
    if (nextProps.selectedUser &&
      nextProps.selectedUser.stats.comments.total !== 0 && // don't try to load comments on a user that has none
      nextProps.userDetailComments.length === 0) {
      console.log('loading comments for user ' + nextProps.selectedUser._id);
      nextProps.dispatch(fetchCommentsByUser(nextProps.selectedUser._id));
    }
  }

  render() {

    console.log('UserDetail.render', this.props);

    let comments = this.props.userDetailComments.length === 0 ?
      'Loading Comments...' :
      (<CommentDetailList comments={this.props.userDetailComments} />);

    return (
      <Card style={[styles.base, this.props.style]}>
        <Heading size="medium">{this.props.user_name}</Heading>
        <div style={styles.topPart}>
          <Avatar style={styles.avatar} src={this.props.avatar || ''} size={200} />
          <Stats style={styles.stats}>
            <Stat term="Trust Score" description="87" />
            <Stat term="Status" description="subscriber" />
            <Stat term="Last Login" description={new Date().toISOString()} />
            <Stat term="Member Since" description={new Date().toISOString()} />
            <Stat term="Warnings" description="0" />
          </Stats>
        </div>
        <Tabs initialSelectedIndex={0} style={styles.tabs}>
          <Tab title="About"> {comments} </Tab>
          <Tab title="Activity">Tab Bravo Content</Tab>
          <Tab title="Messages">Tab Charlie Content</Tab>
        </Tabs>
      </Card>
    );
  }
}

const styles = {
  base: {
    borderTopColor: settings.primaryColor,
    paddingLeft: 10,
    paddingRight: 10
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

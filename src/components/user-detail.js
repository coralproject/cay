import React from 'react';
import Radium from 'radium';

import settings from '../settings';

import Avatar from './avatar';
import Tab from './tabs/tab';
import Tabs from './tabs/tabs';
import Stats from './stats/stats';
import Stat from './stats/stat';
import Card from './card';
import Header from './header';

import CommentDetail from './comment-detail';

@Radium
export default class UserDetail extends React.Component {
  render() {

    console.log('UserDetail', this.props);

    return (
      <Card style={[styles.base, this.props.style]}>
        <Header size="medium">{this.props.name}</Header>
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
          <Tab title="About">
            <CommentDetail />
          </Tab>
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

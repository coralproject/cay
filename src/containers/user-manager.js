import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import {setFilter, selectUser, fetchUsers} from '../actions';

import MainHeader from '../components/main-header';
import Sidebar from '../components/sidebar';
import Trust from '../components/trust';

import settings from '../settings';

@connect(state => {
  return state.users;
})
@Radium
export default class UserManager extends React.Component {
  render() {
    const {dispatch} = this.props;

    console.log('UserManager', this.props);

    return (
      <div style={styles}>
        <MainHeader />
        <Sidebar />
        <Trust
          {...this.props}
          onFilterClick={id => {
            dispatch(setFilter(id));
            dispatch(fetchUsers('foo=bar'));
          }}
          onUserClick={user => dispatch(selectUser(user))} />
      </div>
    );
  }
}

var styles = {
  backgroundColor: settings.coralPink
}

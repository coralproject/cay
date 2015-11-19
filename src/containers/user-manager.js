import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import {setFilter, selectUser} from '../actions';

import MainHeader from '../components/main-header';
import Sidebar from '../components/sidebar';
import Trust from '../components/trust';

@connect(state => {
  console.log('connect', state);
  return state.users;
})
@Radium
class UserManager extends React.Component {
  render() {

    const {dispatch} = this.props;

    return (
      <div className="wrapper">
        <MainHeader />
        <Sidebar />
        <Trust
          onFilterClick={id => dispatch(setFilter(id))}
          onUserClick={id => dispatch(selectUser(id))} />
      </div>
    );
  }
}

export default UserManager;

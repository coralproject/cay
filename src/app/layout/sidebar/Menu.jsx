import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MenuItem from 'app/layout/sidebar/MenuItem';

import FaGroup from 'react-icons/lib/fa/group';
import FaDashboard from 'react-icons/lib/fa/dashboard';
import FaListAlt from 'react-icons/lib/fa/list-alt';
import FaCog from 'react-icons/lib/fa/cog';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';

import { Lang } from 'i18n/lang';
import settings from 'settings';

@connect(({ app }) => ({ app }))
@Lang
@Radium
class Menu extends React.Component {

  render() {
    const { app, open, onToggleSidebar } = this.props;
    const features = app.features || {};
    return (
      <div style={styles.sidebarWrapper}>
        <Link to="/" style={styles.logo}>
          <img width="30" height="30" src="/img/logo_white.png" />
          <span style={styles.logoText}>The Coral Project</span>
        </Link>
        <div style={styles.menuWrapper}>
          <TopMenu open={open} features={features} />
          <BottomMenu onToggleSidebar={onToggleSidebar} open={open} />
        </div>
      </div>
    );
  }
}

const stopAndBubble = fn => evt => {
  evt.preventDefault();
  evt.stopPropagation();
  fn();
};

const TopMenu = ({ features }) => (
  <ul>
    <MenuItem name={ window.L.t('Create search') } target="/search-creator" icon={<FaGroup />} />
    <MenuItem name={ window.L.t('Saved Searches') } target="/saved-searches" icon={<FaDashboard />} />
    { features.ask ? <MenuItem open={open} name="View Forms" target="/forms" icon={<FaListAlt />}/> : null }
  </ul>
);

const BottomMenu = ({ open, onToggleSidebar }) => (
  <ul>
    <MenuItem name="Settings" target='#' onClick={stopAndBubble(()=>{})}
      icon={<FaCog />} />
    <MenuItem name="Collapse menu" target='#' onClick={stopAndBubble(onToggleSidebar)}
      icon={open ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />} />
  </ul>
);

const styles = {
  logo: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: settings.bgColorLogo,
    color: 'white',
    fontSize: '1em',
    // padding: '0 20px 0 35px',
    textDecoration: 'none',
    height: 50,
    lineHeight: '50px',
    padding: 10,
    paddingLeft: 17
  },
  logoText: {
    marginLeft: 15,
    width: 128
  },
  sidebarWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    overflowX: 'hidden'
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  }
};

export default Menu;

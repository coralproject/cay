
/**
 * Module dependencies
 */

import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import MenuItem from 'app/layout/Sidebar/MenuItem';
import FaGroup from 'react-icons/lib/fa/group';
import FaDashboard from 'react-icons/lib/fa/dashboard';
import FaListAlt from 'react-icons/lib/fa/list-alt';
import FaCog from 'react-icons/lib/fa/cog';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';
import MdBuild from 'react-icons/lib/md/build';
import { Lang } from 'i18n/lang';
import { bgColorLogo } from 'settings';

/**
 * Sidebar menu component
 */

export default Radium(({ open, features, onToggleSidebar }) => (
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
));

/**
 * Top menu nav
 */

const TopMenu = ({ features }) => (
  <ul>
    { features.trust === false ? null : <MenuItem name={ window.L.t('Create Search') } target="/search-creator" icon={<FaGroup />} />}
    { features.trust === false ? null : <MenuItem name={ window.L.t('Saved Searches') } target="/saved-searches" icon={<FaDashboard />} />}
    { features.ask ? <MenuItem open={open} name="Create Form" target="/forms/create" icon={<MdBuild />} /> : null }
    { features.ask ? <MenuItem open={open} name="View Forms" target="/forms" icon={<FaListAlt />}/> : null }
  </ul>
);

/**
 * Bottom menu nav
 */

const BottomMenu = ({ open, onToggleSidebar }) => (
  <ul>
    <MenuItem name="Collapse menu" target='#' onClick={stopAndBubble(onToggleSidebar)}
      icon={open ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />} />
  </ul>
);

/**
 * Stop propagation and execute function
 */

const stopAndBubble = fn => evt => {
  evt.preventDefault();
  evt.stopPropagation();
  fn();
};

/**
 * Module styles
 */

const styles = {
  logo: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: bgColorLogo,
    color: 'white',
    fontSize: '1em',
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
    overflowX: 'hidden',
    position: 'fixed',
    backgroundColor: 'rgb(240, 240, 240)'
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  }
};

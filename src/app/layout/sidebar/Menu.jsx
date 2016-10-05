
/**
 * Module dependencies
 */

import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import MenuItem from 'app/layout/sidebar/MenuItem';
import FaCog from 'react-icons/lib/fa/cog';
import FaBug from 'react-icons/lib/fa/bug';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';
import L from 'i18n';
import { bgColorLogo } from 'settings';

import { AskIcon } from 'components/icons/AskIcon';
import { TrustIcon } from 'components/icons/TrustIcon';

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
    { features.trust === false ? null : <MenuItem name={ L.t('Trust') } target="/search-creator" icon={<TrustIcon wh="24px" fill="rgb(155, 155, 155)" stroke="rgb(155, 155, 155)" />} />}
    {/**features.trust === false ? null : <MenuItem name={ L.t('Saved Searches') } target="/saved-searches" icon={<FaDashboard />} />**/}
    {/** features.ask ? <MenuItem open={open} name="Create Form" target="/forms/create" icon={<MdBuild />} /> : null **/}
    { features.ask ? <MenuItem open={open} name="Ask" target="/forms" icon={<AskIcon wh="24px" fill="rgb(155, 155, 155)" stroke="rgb(155, 155, 155)" />}/> : null }
  </ul>
);

/**
 * Bottom menu nav
 */

const BottomMenu = ({ open, onToggleSidebar }) => (
  <ul>
    <MenuItem name="Report bug / Give Feedback" externalLink={true} target="https://coralproject.net/contribute.html#other-ideas-and-bug-reports"
      icon={<FaBug />} />
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
    width: 128,
    fontWeight: 400
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

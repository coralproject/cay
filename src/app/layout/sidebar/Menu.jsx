import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

import MenuItem from 'app/layout/sidebar/MenuItem';

import MdBuild from 'react-icons/lib/md/build';
import MdSettings from 'react-icons/lib/md/settings';
import MdInfoOutline from 'react-icons/lib/md/info-outline';
import MdGroup from 'react-icons/lib/md/group';

import { Lang } from 'i18n/lang';
import settings from 'settings';

@Lang
@Radium
class Menu extends React.Component {

  render() {
    return (
      <div>
        <Link to="/" style={styles.logo}>The Coral Project</Link>
        <ul style={ styles.sideBarMenu }>
          {/*<MenuItem name="Dashboard" target="/" icon={<MdInsertChart />} />*/}
          {/*<MenuItem name="Explore" target="/explore" icon={<MdTimeline />} />*/}
          <MenuItem name={ window.L.t('Saved Searches') } target="/saved-searches" icon={<MdGroup />} />
          <MenuItem name={ window.L.t('Search Creator') } target="/search-creator" icon={<MdBuild />} />
          <MenuItem name={ window.L.t('Tag Manager') } target="/tag-manager" icon={<MdSettings />}/>
          <MenuItem name={ window.L.t('About') } target="/about" icon={<MdInfoOutline />}/>
          {/*<MenuItem name="Settings" target="/settings" icon={<MdSettings />} />*/}
        </ul>
      </div>
    );
  }
}

var styles = {
  logo: {
    backgroundImage: 'url(/img/logo_white.png)',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 14px',
    backgroundColor: settings.brandColor,
    color: 'white',
    fontSize: '1em',
    padding: '0 20px 0 35px',
    textDecoration: 'none',
    display: 'block',
    height: '50px',
    lineHeight: '50px'
  },
  sideBarMenu: {
    borderTop: '1px solid rgba(255,255,255,.5)'
  }
};

export default Menu;

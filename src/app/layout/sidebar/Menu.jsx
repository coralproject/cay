import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MenuItem from 'app/layout/sidebar/MenuItem';

import MdBuild from 'react-icons/lib/md/build';
import MdSettings from 'react-icons/lib/md/settings';
import MdInfoOutline from 'react-icons/lib/md/info-outline';
import MdGroup from 'react-icons/lib/md/group';
import MdForum from 'react-icons/lib/md/forum';
import MdArtTrack from 'react-icons/lib/md/art-track';

import { Lang } from 'i18n/lang';
import settings from 'settings';

@connect(({ app }) => ({ app }))
@Lang
@Radium
class Menu extends React.Component {

  render() {
    const { app } = this.props;
    const features = app.features || {};
    return (
      <div>
        <Link to="/" style={styles.logo}></Link>
        <ul>
          {/*<MenuItem name="Dashboard" target="/" icon={<MdInsertChart />} />*/}
          {/*<MenuItem name="Explore" target="/explore" icon={<MdTimeline />} />*/}
          <MenuItem name={ window.L.t('Search Creator') } target="/search-creator" icon={<MdBuild />} />
          <MenuItem name={ window.L.t('Saved Searches') } target="/saved-searches" icon={<MdGroup />} />
          {/*<MenuItem name={ window.L.t('Tag Manager') } target="/tag-manager" icon={<MdSettings />}/>*/}
          {
            features.ask ?
              <MenuItem
                name="View Forms"
                target="/forms"
                icon={<MdArtTrack/>}/> :
                null
          }
          {
            features.ask ?
              <MenuItem name={ window.L.t('Create Form') } target="/forms/create" icon={<MdForum />} /> :
              null
          }
          {/*<MenuItem name={ window.L.t('About') } target="/about" icon={<MdInfoOutline />}/>*/}
          {/*<MenuItem name="Settings" target="/settings" icon={<MdSettings />} />*/}
        </ul>
      </div>
    );
  }
}

var styles = {
  logo: {
    backgroundImage: 'url(/img/logo_white.png)',
    backgroundSize: '40px 40px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 10px',
    backgroundColor: settings.brandColor,
    color: 'white',
    fontSize: '1em',
    // padding: '0 20px 0 35px',
    textDecoration: 'none',
    display: 'block',
    height: '60px',
    lineHeight: '50px'
  },

};

export default Menu;

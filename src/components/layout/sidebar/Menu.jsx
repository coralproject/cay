import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

import MenuItem from './MenuItem';

import MdSupervisorAccount from 'react-icons/lib/md/supervisor-account';
import MdSettings from 'react-icons/lib/md/settings';

import { Lang } from '../../../lang';

@Lang
@Radium
class Menu extends React.Component {

  render() {
    return (
      <div>
        <Link to="/" style={styles.logo}>Coral Project</Link>
        <ul>
          {/*<MenuItem name="Dashboard" target="/" icon={<MdInsertChart />} />*/}
          {/*<MenuItem name="Explore" target="/explore" icon={<MdTimeline />} />*/}
          <MenuItem name={ L.t("User Manager") } target="/user-manager" icon={<MdSupervisorAccount />} />
          <MenuItem name={ L.t("Settings") } target="/tag-manager" icon={<MdSettings />}/>
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
    backgroundPosition: '10px 10px',
    color: 'white',
    fontSize: '1em',
    padding: '12px 20px 12px 35px',
    textDecoration: 'none',
    display: 'block'
  }
};

export default Menu;

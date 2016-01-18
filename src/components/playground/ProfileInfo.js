import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import settings from '../../settings';
import Icon from '../../components/icon';

@connect(state => state.playground)
@Radium
class ProfileInfo extends React.Component {

  render() {

    return (
      <div style={ styles.profileInfo }>
        <div style={ styles.profileLeftPane }>
          <h3 style={ styles.userName }>coolcat23</h3><br />
          <div style={ styles.profileBullet }><Icon size="medium" name="fa-clock-o" /> Member for 2 years</div>
          <div style={ styles.profileBullet }><Icon size="medium" name="fa-map-marker" /> Portland, OR</div>
          <div style={ styles.profileBullet }><Icon size="medium" name="fa-mortar-board" /> Ph. D. Economics</div>
        </div>
        <div style={ styles.profileCenterPane }>
          <div>
            <div style={ styles.profileStat }>
              <span style={ styles.profileTotal }>1254</span><br/>comments
            </div>
            <div style={ styles.profileStat }>
              <span style={ styles.profileTotal }>4533</span><br/>points
            </div>
            <div style={ styles.profileStat }>
              <span style={ styles.profileTotal }>89%</span><br/>upvotes
            </div>
            <div style={ styles.clearfix }></div>
          </div>
          <div>
            <div><Icon size="medium" name="fa-clock-o" /> Verified identity</div>
            <div><Icon size="medium" name="fa-clock-o" /> Top 5% contributors</div>
          </div>
        </div>
        <div style={ styles.profileRightPane }>
          <div><Icon size="medium" name="fa-comments-o" /></div>
          <div><Icon size="medium" name="fa-hand-paper-o" /></div>
          <div style={ styles.moreActions }><Icon size="medium" name="fa-ellipsis-h" /></div>
        </div>
        <div style={ styles.clearfix }></div>
      </div>
    );

  }
}

// same as the @connect decorator above
export default ProfileInfo;

var styles = {
  userName: {
    fontSize: '12pt',
    fontWeight: 'bold',
    padding: '10px'
  },
  profileInfo: {
    background: settings.lightGrey,
    position: 'relative',
    minHeight: '100px',
    fontSize: '9pt',
    display: 'table',
    width: '100%'
  },
  profileLeftPane: {
    display: 'table-cell',
    width: '200px',
    minHeight: '150px',
    borderRight: '1px solid ' + settings.grey,
    verticalAlign: 'top'
  },
  profileCenterPane: {
    display: 'table-cell',
    minHeight: '150px',
    borderRight: '1px solid ' + settings.grey,
    verticalAlign: 'top'
  }, 
  profileRightPane: {
    display: 'table-cell',
    width: '40px',
    minHeight: '150px',
    verticalAlign: 'top',
    position: 'relative',
    textAlign: 'center'
  }, 
  profileStat: {
    'float': 'left',
    width: '30%',
    padding: '1.5%',
    textAlign: 'center'
  },
  profileTotal: {
    fontSize: '14pt',
    fontWeight: 'bold'
  },
  moreActions: {
    position: 'absolute',
    bottom: '5px',
    left: '5px'
  },
  clearfix: {
    'clear': 'both'
  }
};

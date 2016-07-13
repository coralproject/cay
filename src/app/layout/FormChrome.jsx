import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';
import {connect} from 'react-redux';
import {updateInactiveMessage} from 'forms/FormActions';
import Badge from 'components/Badge';
import color from 'color';
import AngleDownIcon from 'react-icons/lib/fa/angle-down';
import AngleUpIcon from 'react-icons/lib/fa/angle-up';
import SaveIcon from 'react-icons/lib/fa/floppy-o';
import onClickOutside from 'react-onclickoutside';

import Button from 'components/Button';
import RadioButton from 'components/forms/RadioButton';

import settings from 'settings';

@connect()
@onClickOutside
@Radium
export default class FormChrome extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    activeTab: PropTypes.oneOf(['builder', 'submissions', 'gallery']).isRequired,
    form: PropTypes.object,
    gallery: PropTypes.object,
    updateStatus: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {statusDropdownOpen: false, updatingInactiveMessage: false};
  }

  buildForm() { // navigate to the form builder or editor
    if (this.props.activeTab === 'builder') return;

    if (this.props.form) { // edit the current form
      return this.context.router.push(`/forms/${this.props.form.id}`);
    }

    // build a new form
    this.context.router.push('/forms/create');
  }

  reviewSubmissions() {
    if (this.props.activeTab === 'submissions' || !this.props.form) return;

    this.context.router.push(`/forms/${this.props.form.id}/submissions`);
  }

  manageGallery() {
    if (this.props.activeTab === 'gallery' || !this.props.form) return;

    this.context.router.push(`/forms/${this.props.form.id}/gallery`);
  }

  galleryBadge() {
    return this.props.gallery ? <Badge style={styles.badge} count={this.props.gallery.answers.length} /> : '';
  }

  submissionBadge() {
    return this.props.submissions ? <Badge style={styles.badge} count={this.props.submissions.length} /> : '';
  }

  toggleDropdown() {
    this.setState({statusDropdownOpen: !this.state.statusDropdownOpen});
  }

  getStatusDropdownStyles() {
    return {
      display: this.state.statusDropdownOpen ? 'block' : 'none',
      zIndex: 2,
      position: 'absolute',
      top: 55,
      right: 5,
      background: 'white',
      border: '1px solid ' + settings.mediumGrey,
      borderRadius: 4,
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
      overflow: 'hidden',
      width: 370
    };
  }

  getStatusSelectStyle() {
    return {
      padding: '12px 12px 0',
      borderRadius: 5,
      cursor: 'pointer',
      userSelect: 'none',
      backgroundColor: this.state.statusDropdownOpen ? '#d8d8d8' : '#fff'
    };
  }

  getAngleBtn() {
    return this.state.statusDropdownOpen ? <AngleUpIcon /> : <AngleDownIcon />;
  }

  setInactiveMessage(e) { // onBlur handler for the message textarea
    this.setState({inactiveMessageDraft: e.target.value});
  }

  updateInactiveMessage() {
    this.setState({updatingInactiveMessage: true})
    this.props.dispatch(updateInactiveMessage(this.state.inactiveMessageDraft, this.props.form))
      .then(() => {
        this.setState({statusDropdownOpen: false, updatingInactiveMessage: false});
      });
  }

  handleClickOutside(evt) {
    this.setState({statusDropdownOpen: false});
  }

  getLoaderStyles(isBackground = false) {
    const base = {
      display: this.state.updatingInactiveMessage ? 'block' : 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    if (isBackground) {
      return {
        ...base,
        backgroundColor: 'rgba(0, 0, 0, .2)'
      };
    } else {
      return {
        ...base,
        animation: 'load 2s infinite ease',
        backgroundImage: 'url(/img/apple-icon-120x120.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      };
    }

  }

  render() {
    let name = _.has(this.props, 'form.header.title') ? this.props.form.header.title :
      this.props.create ? 'Untitled Form' : '';

    if (name.length > 15) {
      name = name.split(' ').slice(0, 4).join(' ') + '…'; // use ellipsis character
    }

    const {form} = this.props;

    return (
      <div style={styles.base}>
        <div style={styles.menu}>

          <div style={styles.formName}>{name}</div>

          <div style={styles.formControls}>
            <div key="huey" style={[
              styles.option,
              this.props.activeTab === 'builder' && styles.active]}
              onClick={this.buildForm.bind(this)}>
              {this.props.create ? 'Build Form' : 'Edit Form'}
            </div>
            <div key="dewey" style={[
              styles.option,
              this.props.activeTab === 'submissions' && styles.active,
              this.props.create && styles.disabled]}
              onClick={this.reviewSubmissions.bind(this)}>
              Submissions {this.submissionBadge()}
            </div>
            <div key="louie" style={[
              styles.option,
              this.props.activeTab === 'gallery' && styles.active,
              this.props.create && styles.disabled]}
              onClick={this.manageGallery.bind(this)}>
              Gallery {this.galleryBadge()}
            </div>
          </div>

          {
            form ?
              <div style={this.getStatusSelectStyle()} onClick={this.toggleDropdown.bind(this)}>
                <span style={{fontWeight: 'bold'}}>Form Status:</span> {form.status} {this.getAngleBtn()}
              </div> :
              null
          }

          {
            form ?
              <div style={this.getStatusDropdownStyles()}>
                <div style={styles.tabBkd} />
                <div style={styles.tab} />
                <RadioButton
                  style={styles.openRadio}
                  label="Open"
                  value="open"
                  checked={form.status === 'open'}
                  onClick={this.props.updateStatus} />
                <div style={styles.closeStatusHolder}>
                  <RadioButton
                    value="closed"
                    label="Closed"
                    style={styles.closeRadio}
                    checked={form.status === 'closed'}
                    onClick={this.props.updateStatus} />
                  <textarea
                    onBlur={this.setInactiveMessage.bind(this)}
                    style={styles.statusMessage}></textarea>
                  <Button
                    style={{float: 'left', marginRight: 10}}
                    category={this.state.updatingInactiveMessage ? 'disabled' : 'success'}
                    onClick={this.updateInactiveMessage.bind(this)}
                    >Save <SaveIcon /></Button>
                  <p>The message will appear to readers when you close the form and are no longer collecting submissions.</p>
                  <div style={this.getLoaderStyles(this, true)} />
                  <div style={this.getLoaderStyles()} />
                </div>
              </div> :
              null
          }

        </div>

      </div>
    );
  }
}

const styles = {
  base: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -50,
    padding: 5
  },
  formName: {
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
    fontSize: '20px',
    flex: 1,
    cursor: 'auto',
    ':hover': {
      backgroundColor: 'transparent'
    }
  },

  formControls: {
    display: 'flex',
    flex: 2
  },

  menu: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  option: {
    fontSize: '16px',
    transition: 'all 300ms',
    cursor: 'pointer',
    borderRadius: 4,
    marginRight: 5,
    padding: '12px 12px 0 12px',
    color: 'white',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: settings.brandColor
    }
  },
  active: {
    backgroundColor: settings.brandColor,
    color: 'white'
  },
  disabled: {
    display: 'none'
  },
  badge: {
    backgroundColor: color(settings.brandColor).darken(0.1).hexString(),
    fontSize: '14px',
    color: 'white'
  },
  tab: {
    display: 'block',
    content: '',
    width: 16,
    height: 16,
    borderTop: '8px solid transparent',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '8px solid white',
    position: 'absolute',
    top: -16,
    right: 30
  },
  tabBkd: {
    display: 'block',
    content: '',
    width: 18,
    height: 18,
    borderTop: '9px solid transparent',
    borderRight: '9px solid transparent',
    borderLeft: '9px solid transparent',
    borderBottom: '9px solid ' + settings.mediumGrey,
    position: 'absolute',
    top: -18,
    right: 29
  },
  openRadio: {
    width: '100%',
    padding: 20,
    borderBottom: '1px solid ' + settings.mediumGrey
  },
  closeStatusHolder: {
    padding: 20
  },
  closeRadio: {
    marginBottom: 15
  },
  statusMessage: {
    width: '100%',
    border: '1px solid ' + settings.mediumGrey,
    height: 50,
    borderRadius: 4,
    fontSize: '14px',
    marginBottom: 10
  }
};

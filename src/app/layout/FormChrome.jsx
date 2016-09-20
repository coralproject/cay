import React, {PropTypes} from 'react';
import Radium from 'radium';
import has from 'lodash/object/has';
import {connect} from 'react-redux';
import {saveForm} from 'forms/FormActions';
import { showFlashMessage } from 'flashmessages/FlashMessagesActions';
import Badge from 'components/Badge';
import color from 'color';
import AngleDownIcon from 'react-icons/lib/fa/angle-down';
import AngleUpIcon from 'react-icons/lib/fa/angle-up';
import onClickOutside from 'react-onclickoutside';

import RadioButton from 'components/forms/RadioButton';
import Spinner from 'components/Spinner';
import { Button } from 'react-mdl';

import settings from 'settings';

@connect(({ forms }) => ({ forms }))
@onClickOutside
@Radium
export default class FormChrome extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    activeTab: PropTypes.oneOf(['builder', 'submissions', 'gallery']).isRequired,
    form: PropTypes.object,
    gallery: PropTypes.object,
    updateStatus: PropTypes.func.isRequired,
    updateInactive: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {statusDropdownOpen: false};
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onApplyClick = this.onApplyClick.bind(this);
    this.setInactiveMessage = this.setInactiveMessage.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.reviewSubmissions = this.reviewSubmissions.bind(this);
    this.manageGallery = this.manageGallery.bind(this);
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
    return this.props.gallery && this.props.gallery.answers ?
      <Badge style={styles.badge} count={this.props.gallery.answers.length} /> : '';
  }

  submissionBadge() {
    return this.props.form && this.props.form.stats ? <Badge style={styles.badge} count={this.props.form.stats.responses} /> : '';
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
      backgroundColor: this.state.statusDropdownOpen ? '#fff' : '#d8d8d8'
    };
  }

  getAngleBtn() {
    return this.state.statusDropdownOpen ? <AngleUpIcon /> : <AngleDownIcon />;
  }

  setInactiveMessage(e) {
    this.props.updateInactive(e.target.value);
  }

  handleClickOutside() {
    this.setState({statusDropdownOpen: false});
  }

  onApplyClick() {
    const { forms, dispatch } = this.props;
    const { form, widgets, activeForm } = forms;

    dispatch(saveForm(activeForm ? forms[activeForm] : form, widgets))
      .then(response => {
        this.setState({statusDropdownOpen: false});
        if (response.data && response.data.id) {
          this.props.dispatch(showFlashMessage('Your form saved.', 'success'));
        } else {
          this.props.dispatch(showFlashMessage('Uh-oh, we can\'t save your form. Try again or report the error to your technical team', 'warning', 4000));
        }
      })
      .catch(err => {
        this.setState({statusDropdownOpen: false});
        this.props.dispatch(showFlashMessage('Uh-oh, we can\'t save your form. Try again or report the error to your technical team', 'warning', 4000));
      });
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

  getColoredStatus() {
    const { form } = this.props;
    let statusColor = form.status === 'open' ? 'green' : '#D30D26';
    return (
      <span style={ { color: statusColor }}>
        { form.status === 'open' ? 'Live' : 'Closed' } <span style={ styles.statusBullet(statusColor) }></span>
      </span>
    );
  }

  render() {
    const { form, create, activeTab, forms } = this.props;
    let name = has(this.props, 'form.header.title') ? form.header.title : '';

    if (name.length > 15) {
      name = name.split(' ').slice(0, 4).join(' ') + '…'; // use ellipsis character
    }

    return (
      <div style={styles.base}>

        <p style={styles.formName}>{name}</p>

        {!create ?
          <div style={styles.formControls}>
            <div key="huey" style={[
              styles.option,
              this.props.activeTab === 'builder' && styles.active]}
              onClick={this.buildForm}> Edit Form
            </div>
            <div key="dewey" style={[
              styles.option,
              activeTab === 'submissions' && styles.active]}
              onClick={this.reviewSubmissions}>
              Submissions {this.submissionBadge()}
            </div>
            <div key="louie" style={[
              styles.option,
              activeTab === 'gallery' && styles.active]}
              onClick={this.manageGallery}>
              Gallery {this.galleryBadge()}
            </div>
          </div> : null }

        {
          form ?
            <div style={this.getStatusSelectStyle()} onClick={this.toggleDropdown} className="form-status-toggle" >
              <span style={ styles.formStatusText }>Form Status:</span>
              {this.getColoredStatus()}
              {this.getAngleBtn()}
            </div> :
            null
        }

        {
          form ?
            <div className="form-status-dropdown" style={this.getStatusDropdownStyles()}>
              <div style={styles.tabBkd}></div>
              <div style={styles.tab}></div>
              <RadioButton
                style={styles.openRadio}
                label="Live"
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
                  onChange={this.setInactiveMessage}
                  style={styles.statusMessage}
                  defaultValue={form.settings.inactiveMessage}></textarea>
                <div style={styles.forceRight}>
                  <Button raised onClick={ this.onApplyClick }>
                    { forms.savingForm
                      ? <span><Spinner /> </span>
                      : null
                    }
                    Apply
                  </Button>
                </div>
                <div style={this.getLoaderStyles(this, true)}></div>
                <div style={this.getLoaderStyles()}></div>
              </div>
            </div> :
            null
        }
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
    padding: 5,
    height: 50,
    display: 'flex',
    justifyContent: 'space-between'
  },
  formName: {
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
    fontSize: '20px',
    flex: 1,
    cursor: 'auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginRight: 20,
    ':hover': {
      backgroundColor: 'transparent'
    }
  },

  formControls: {
    display: 'flex',
    flex: 2
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
    border: '1px solid ' + settings.mediumGrey,
    fontSize: '14px',
    marginBottom: 10,
    resize: 'none',
    padding: 10,
    marginLeft: '8%',
    width: '92%'
  },
  forceRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  statusBullet: (color) => (
    {
      backgroundColor: color,
      borderRadius: 10,
      height: 10,
      width: 10,
      display: 'inline-block',
      marginRight: 10
    }
  ),
  formStatusText: {
    paddingRight: 10
  }
};

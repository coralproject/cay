import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from 'settings';

@Radium
export default class FormChrome extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    activeTab: PropTypes.oneOf(['builder', 'submissions', 'gallery']).isRequired,
    formId: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  buildForm() {
    if (this.props.activeTab === 'builder') return;

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

  render() {
    return (
      <div style={styles.base}>
        <ul style={styles.menu}>
          <li style={[styles.option, styles.formName]}>{this.props.name || 'Untitled Form'}</li>
          <li key="huey" style={[
            styles.option,
            this.props.activeTab === 'builder' && styles.active]}
            onClick={this.buildForm.bind(this)}>
            Build Form
          </li>
          <li key="dewey" style={[
            styles.option,
            this.props.activeTab === 'submissions' && styles.active]}
            onClick={this.reviewSubmissions.bind(this)}>
            Review Submissions
          </li>
          <li key="louie" style={[
            styles.option,
            this.props.activeTab === 'gallery' && styles.active]}
            onClick={this.manageGallery.bind(this)}>
            Manage Gallery
          </li>
        </ul>
      </div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: settings.mediumGrey,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    padding: 5
  },
  formName: {
    fontWeight: 'bold'
  },
  menu: {
    display: 'flex'
  },
  option: {
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: settings.mediumGrey,
    ':hover': {
      backgroundColor: settings.darkBlueGrey
    }
  },
  active: {
    backgroundColor: settings.grey,
    color: 'white'
  }
};

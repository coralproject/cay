import React from 'react';
import Radium from 'radium';

import MdLanguage from 'react-icons/lib/md/language';
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop_down';
import MdCheck from 'react-icons/lib/md/check';

import { Lang } from 'i18n/lang';

@Lang
@Radium
class LanguageSwitcher extends React.Component {

  componentDidMount() {
    // Since bind() will wrap onClickOutside, we need a proper ref
    // to the wrapped function to efectively remove the listener on unmount.
    this.bindedFunction = this.onClickOutside.bind(this);
    window.addEventListener('click', this.bindedFunction, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.bindedFunction);
  }

  switchLanguage(locale, event) {
    event.stopPropagation();
    window.L.setLocale(locale);
    window.L.processQueue();
  }

  onClickOutside(event) {
    this.setState({ ...this.state, dropdownActive: false });
  }

  onTogglerClick(event) {
    event.stopPropagation();
    this.setState({ ...this.state, dropdownActive: !this.state.dropdownActive });
  }

  onMouseLeave() {
    this.setState({ ...this.state, dropdownActive: false });
  }

  render() {

    var dropdown = this.state.dropdownActive ?
      <ul style={ styles.dropdown } onMouseLeave={ this.onMouseLeave.bind(this) }>
        <li style={ styles.dropdownOption }>
          <button key={ 1 } style={ styles.languageButton } onClick={ this.switchLanguage.bind(this, 'en') }>
            English
            {
              this.props.currentLocale == 'en' ?
                <span style={ styles.check }><MdCheck /></span>
              : null
            }
          </button>
        </li>
        <li style={ styles.dropdownOption }>
          <button key={ 2 } style={ styles.languageButton } onClick={ this.switchLanguage.bind(this, 'de') }>
            Deutsch
            {
              this.props.currentLocale == 'de' ?
                <span style={ styles.check }><MdCheck /></span>
              : null
            }
          </button>
        </li>
        <li style={ styles.dropdownOption }>
          <button key={ 3 } style={ styles.languageButton } onClick={ this.switchLanguage.bind(this, 'es') }>
            Spanish
            {
              this.props.currentLocale == 'es' ?
                <span style={ styles.check }><MdCheck /></span>
              : null
            }
          </button>
        </li>
      </ul>
    : null;

    return (
      <div style={ styles.languageSwitcher }>
        <button onClick={ this.onTogglerClick.bind(this) } style={ styles.toggler }>
          <MdLanguage />
            <span style={ styles.togglerText }>{ window.L.t('Language') }</span>
          <MdArrowDropDown />
        </button>
        { dropdown }
      </div>
    );
  }
}

const styles = {
  languageSwitcher: {
    'float': 'right',
    position: 'relative'
  },
  languageButton: {
    margin: '0px',
    borderBottom: '1px solid #ccc',
    borderRight: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    background: '#f0f0f0',
    padding: '0 10px',
    display: 'block',
    textAlign: 'left',
    width: '120px',
    cursor: 'pointer',
    height: '50px',
    lineHeight: '50px',
    outline: 'none',
    ':hover': {
      background: '#fff'
    }
  },
  toggler: {
    borderLeft: '1px solid rgba(255,255,255,.4)',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    color: 'white',
    height: '50px',
    lineHeight: '50px',
    padding: '0 10px',
    fontSize: '12pt',
    background: 'none',
    outline: 'none',
    cursor: 'pointer'
  },
  togglerText: {
    padding: '0 20px 0 10px'
  },
  dropdown: {
    position: 'absolute',
    right: '20px',
    top: '50px',
    zIndex: '99999',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd'
  },
  check: {
    color: "#0A0",
    'float': 'right'
  }
}

export default LanguageSwitcher;

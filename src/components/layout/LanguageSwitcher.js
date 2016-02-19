import React from 'react';
import Radium from 'radium';

@Radium
class LanguageSwitcher extends React.Component {

  switchLanguage(locale) {
    L.setLocale(locale);
    L.processQueue();
  }

  render() {
    return (
      <div>
        <ul>
          <li><button style={ styles.languageButton } onClick={ this.switchLanguage.bind(this, "de-DE") }>German</button></li>
          <li><button style={ styles.languageButton } onClick={ this.switchLanguage.bind(this, "en-US") }>English</button></li>
        </ul>
      </div>
    );
  }
}

const styles = {
  languageButton: {
    margin: '10px',
    border: '1px solid #888',
    background: '#eee',
    padding: '10px',
    display: 'block',
    textAlign: 'center',
    width: '100px',
    cursor: 'pointer'
  }
}

export default LanguageSwitcher;

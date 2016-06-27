import Polyglot from 'node-polyglot';
import moment from 'moment';
import React from 'react';

/*
  This is currently using two anti-patterns on purpose,
  a global, and a pseudo-isMounted property on the decorator,
  for some details about it, read: https://github.com/coralproject/cay/issues/9
*/

export default class LangSugar {

  translations = {};
  polyglot = new Polyglot();
  locale = getDefaultLocale();
  moment = moment;
  renderParent = {};
  componentQueue = [];

  enqueue(component) {
    this.componentQueue.push(component);
  }

  unqueue(component) {
    var i = this.componentQueue.indexOf(component);
    this.componentQueue.splice(i, 1);
  }

  t(phrase, vars) {
    if (process && process.env.NODE_ENV !== 'production') {
      if (Object.keys(this.translations[this.locale]).indexOf(phrase) < 0) {
        console.warn(`Translation for the key [${phrase}] on locale [${this.locale}] is missing. Please add it to [lang/${this.locale}.json].`);
      }
    }
    return this.polyglot.t(phrase, vars);
  }

  date(time, format) {
    time = time ? time : new Date();
    return this.moment(time).format(format);
  }

  relativeDate(time) {
    time = time ? time : new Date();
    return this.moment(time).fromNow();
  }

  setLocale(locale) {
    // Attempt to store it on localStorage
    try { localStorage.locale = locale; } catch(err) {
      console.warn('Failed to set locale into localStorage');
    }
    this.locale = locale;
    this.polyglot.replace(this.translations[locale]);
    this.moment.locale(locale);
  }

  addTranslations(messages, locale) {
    this.translations[locale] = messages;
  }

  setRenderParent(renderParent) {
    this.renderParent = renderParent;
  }

  processQueue() {
    //this.renderParent.setState({ locale: this.locale });
    for (var i in this.componentQueue) {
      if(this.componentQueue[i]._langIsMounted) {
        this.componentQueue[i].setState({ ...this.componentQueue[i].state, currentLocale: this.locale });
      }
    }
  }

}

export var Lang = ComposedComponent => class extends React.Component {

  constructor(props) {
    super(props);
    // native React's isMounted is discouraged as anti-pattern,
    // the reasoning behind this implementation is in: https://github.com/coralproject/cay/issues/9
    this._langIsMounted = false;
    this.state = { currentLocale: window.L.locale || 'en' };
  }

  componentWillUnmount() {
    window.L.unqueue(this);
    this._langIsMounted = false;
  }

  componentDidMount() {
    window.L.enqueue(this);
    this._langIsMounted = true;
  }

  render() {
    return <ComposedComponent {...this.props} currentLocale={ this.state.currentLocale } />;
  }

};

function getDefaultLocale() {
  try {
    return localStorage.locale || 'en';
  } catch(err) {
    return 'en';
  }
}

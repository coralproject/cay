import Polyglot from 'node-polyglot';
import moment from 'moment';
import React from "react";

export default class LangSugar {

  translations = {};
  polyglot = new Polyglot();
  locale = "en-US";
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
    return this.polyglot.t(phrase, vars);
  }

  date(time, format) {
    var time = !!time ? time : new Date();
    return this.moment(time).format(format);
  }

  relativeDate(time) {
    var time = !!time ? time : new Date();
    return this.moment(time).fromNow(); 
  }

  setLocale(locale) {
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
    this._langIsMounted = false;
  }

  componentWillUnmount() {
    L.unqueue(this);
    this._langIsMounted = false;
  }

  componentDidMount() {
    L.enqueue(this);
    this._langIsMounted = true;
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }

};


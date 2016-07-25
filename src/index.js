import $ from 'jquery';
import EventEmitter from 'events';



export default class Component extends EventEmitter {

  ns = 'component';
  el = 'body';
  ui = {};
  _sortedUI = [];
  events = {};


  constructor() {
    super();
    this.$el = $(this.el);
  }


  $(selector) {
    return this.$el.find(selector);
  }


  template() {}


  render() {
    this.undelegateEvents();
    this.$el.html(this.template(this));
    this.bindUI();
    this.delegateEvents();
    return this;
  }


  bindUI() {
    this.$ui = {};
    this._sortedUI = [];
    $.each(this.ui, (key, selector) => {
      this.$ui[key] = this.$(selector);
      this._sortedUI.push({key, selector, re: new RegExp(`@ui.${key}`, 'g')});
    });
    this._sortedUI.sort((a, b) => b.key.length - a.key.length);
    return this;
  }


  delegateEvents() {
    let self = this;
    $.each(this.events, (key, method) => {
      let {eventName, selector} = this._resolveEventKey(key);
      this.delegate(eventName, selector, function(e) {
        return self::self[method]($(this), e);
      });
    });
    return this;
  }


  undelegateEvents() {
    this.$el.off('.${this.ns}');
    return this;
  }


  delegate(eventName, selector, listener) {
    this.$el.on(`${eventName}.${this.ns}`, selector, listener);
    return this;
  }


  undelegate(eventName, selector, listener) {
    this.$el.on(`${eventName}.${this.ns}`, selector, listener);
    return this;
  }


  _resolveEventKey(key) {
    let index = key.indexOf(' ');
    let eventName = key.slice(0, index);
    let selector = key.slice(index + 1);
    $.each(this._sortedUI, (index, item) => {
      selector = selector.replace(item.re, item.selector);
    });
    return {eventName, selector};
  }


}

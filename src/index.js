import $ from 'jquery';
import EventEmitter from 'events';


export default class Component extends EventEmitter {

  ns = 'component';
  el = 'body';
  ui = {};
  _sortedUI = [];
  events = {};


  /**
   *
   */
  constructor() {
    super();
    this.$el = $(this.el);
  }


  /**
   *
   * @param selector
   * @returns {*}
     */
  $(selector) {
    return this.$el.find(selector);
  }


  /**
   *
   */
  template() {
  }


  /**
   *
   * @returns {Component}
     */
  render() {
    this.undelegateEvents();
    this.$el.html(this.template(this));
    this.bindUI();
    this.delegateEvents();
    return this;
  }


  /**
   *
   * @returns {Component}
     */
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


  /**
   *
   * @returns {Component}
     */
  delegateEvents() {
    let self = this;
    $.each(this.events, (key, method) => {
      let {eventName, selector} = this._resolveEventKey(key);
      this.delegate(eventName, selector, function (e) {
        return self::self[method]($(this), e);
      });
    });
    return this;
  }


  /**
   *
   * @returns {Component}
     */
  undelegateEvents() {
    this.$el.off(`.${this.ns}`);
    return this;
  }


  /**
   *
   * @param eventName string
   * @param selector string
   * @param listener function
   * @returns {Component}
     */
  delegate(eventName, selector, listener) {
    this.$el.on(`${eventName}.${this.ns}`, selector, listener);
    return this;
  }


  /**
   *
   * @param eventName string
   * @param selector string
   * @returns {Component}
     */
  undelegate(eventName, selector) {
    this.$el.off(`${eventName}.${this.ns}`, selector);
    return this;
  }


  /**
   *
   * @param key string
   * @returns {{eventName: (string), selector: (string)}}
   * @private
     */
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

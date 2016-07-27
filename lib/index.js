'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_EventEmitter) {
  _inherits(Component, _EventEmitter);

  /**
   *
   */
  function Component() {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this));

    _this.ns = 'component';
    _this.el = 'body';
    _this.ui = {};
    _this._sortedUI = [];
    _this.events = {};

    _this.$el = (0, _jquery2.default)(_this.el);
    return _this;
  }

  /**
   *
   * @param selector
   * @returns {*}
     */


  _createClass(Component, [{
    key: '$',
    value: function $(selector) {
      return this.$el.find(selector);
    }

    /**
     *
     */

  }, {
    key: 'template',
    value: function template() {}

    /**
     *
     * @returns {Component}
       */

  }, {
    key: 'render',
    value: function render() {
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

  }, {
    key: 'bindUI',
    value: function bindUI() {
      var _this2 = this;

      this.$ui = {};
      this._sortedUI = [];
      _jquery2.default.each(this.ui, function (key, selector) {
        _this2.$ui[key] = _this2.$(selector);
        _this2._sortedUI.push({ key: key, selector: selector, re: new RegExp('@ui.' + key, 'g') });
      });
      this._sortedUI.sort(function (a, b) {
        return b.key.length - a.key.length;
      });
      return this;
    }

    /**
     *
     * @returns {Component}
       */

  }, {
    key: 'delegateEvents',
    value: function delegateEvents() {
      var _this3 = this;

      var self = this;
      _jquery2.default.each(this.events, function (key, method) {
        var _resolveEventKey2 = _this3._resolveEventKey(key);

        var eventName = _resolveEventKey2.eventName;
        var selector = _resolveEventKey2.selector;

        _this3.delegate(eventName, selector, function (e) {
          return self[method].call(self, (0, _jquery2.default)(this), e);
        });
      });
      return this;
    }

    /**
     *
     * @returns {Component}
       */

  }, {
    key: 'undelegateEvents',
    value: function undelegateEvents() {
      this.$el.off('.' + this.ns);
      return this;
    }

    /**
     *
     * @param eventName string
     * @param selector string
     * @param listener function
     * @returns {Component}
       */

  }, {
    key: 'delegate',
    value: function delegate(eventName, selector, listener) {
      this.$el.on(eventName + '.' + this.ns, selector, listener);
      return this;
    }

    /**
     *
     * @param eventName string
     * @param selector string
     * @returns {Component}
       */

  }, {
    key: 'undelegate',
    value: function undelegate(eventName, selector) {
      this.$el.off(eventName + '.' + this.ns, selector);
      return this;
    }

    /**
     *
     * @param key string
     * @returns {{eventName: (string), selector: (string)}}
     * @private
       */

  }, {
    key: '_resolveEventKey',
    value: function _resolveEventKey(key) {
      var index = key.indexOf(' ');
      var eventName = key.slice(0, index);
      var selector = key.slice(index + 1);
      _jquery2.default.each(this._sortedUI, function (index, item) {
        selector = selector.replace(item.re, item.selector);
      });
      return { eventName: eventName, selector: selector };
    }
  }]);

  return Component;
}(_events2.default);

exports.default = Component;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncTime = exports.wait = exports.time = exports.num2txt = exports.txt2num = exports.bin2char = exports.char2bin = exports.hex2char = exports.char2hex = exports.keyTable = exports.lookfor = exports.toSameLength = exports.mkArray = exports.genStr = exports.s2date = exports.date2s = exports.dateDiff = exports.num2date = exports.date2num = exports.dayOfWeek = exports.dateTime = exports.txt2date = exports.date2txt = exports.getTimestamp = exports.getDate = exports.getTime = exports.Copy = exports.exist = exports.isNon = exports.getArrayType = exports.isTypedArray = exports.is2dArray = exports.getType = exports.getCustomType = exports.getNativeType = exports.isCustomType = exports.isType = exports.isNativeType = exports.exclude = exports.includeOnce = exports.Element = exports.entries = exports.values = exports.keys = exports.$n = exports.$e = exports.$f = exports.getKey = exports.displayTime = exports.loadTime = exports.say = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module essence
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @description Core module of the framework
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {(number|string)} NumberLike
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {(number|number[])} Nums
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {(string|string[])} Str
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {(number|boolean)} Bool
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {(Array|object|string)} List
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {(Array|object)} dict
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {(XML|string)} code
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {(Node|TreeNode|NTreeNode|Vertex)} Node
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @requires data
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 1.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _data = require('./data');

var data = _interopRequireWildcard(_data);

var _ui = require('./ui');

var ui = _interopRequireWildcard(_ui);

var _misc = require('./misc');

var misc = _interopRequireWildcard(_misc);

var _maths = require('./maths');

var maths = _interopRequireWildcard(_maths);

var _dsa = require('./dsa');

var dsa = _interopRequireWildcard(_dsa);

var _dom = require('./dom');

var dom = _interopRequireWildcard(_dom);

var _qtest = require('./qtest');

var qtest = _interopRequireWildcard(_qtest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description Essence's console logger.
 * @param {*} message Message
 * @param {string} [type] Log type (info/error/warn/succ/quest/fulltime/time/colour)
 * @param {...string} [style] Additional style
 * @public
 * @since 1.0
 * @function
 */
var say = exports.say = function say(message, type) {
  for (var _len = arguments.length, style = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    style[_key - 2] = arguments[_key];
  }

  var _console, _console2, _console3, _console4, _console5, _console6;

  var STYLES = {
    header: 'font-weight: bold; display: block',
    headerEnd: 'font-weight: normal; display: inline-block',
    info: 'background: #00008f; color: #000',
    error: 'background: #8f0000; color: #000',
    warn: 'background: #f8c808; color: #000',
    succ: 'background: #008f00; color: #000',
    quest: 'background: #0000f8; color: #000'
  };
  switch (type) {
    case 'info':
      (_console = console).info.apply(_console, [message, STYLES.info].concat(style));
      break;
    case 'error':
      (_console2 = console).error.apply(_console2, [message, STYLES.error].concat(style));
      break;
    case 'warn':
      (_console3 = console).warn.apply(_console3, [message, STYLES.warn].concat(style));
      break;
    case 'succ':
      (_console4 = console).log.apply(_console4, [message, STYLES.succ].concat(style));
      break;
    case 'quest':
      (_console5 = console).log.apply(_console5, [message, STYLES.quest].concat(style));
      break;
    case 'fulltime':
      console.log('%c' + getTimestamp(true) + '%c  ' + message, STYLES.header, STYLES.headerEnd);
      break;
    case 'time':
      console.log('%c[' + getTime(true) + ']%c  ' + message, STYLES.header, STYLES.headerEnd);
      break;
    case 'colour':
      console.log('%cr%cg%cb%c(%c' + ui.clrToArr(message).join(', %c') + '%c)', 'color: #f00', 'color: #0f0', 'color: #00f', 'color: #00f', 'color: #000', 'color: #f00', 'color: #0f0', 'color: #00f', 'color: #00f', 'color: #000');
      break;
    default:
      (_console6 = console).log.apply(_console6, [message].concat(style));
  }
};

/**
 * @description Time taken by the DOM to load via the time taken to window.onload to happen.
 * @type {number}
 * @public
 * @since 1.0
 */
var loadTime = exports.loadTime = 0;

/**
 * @description Time taken by the browser to draw the UI via the time taken to window.onpageshow to
 * happen.
 * @type {number}
 * @public
 * @since 1.0
 */
var displayTime = exports.displayTime = 0;

/**
 * @description Start the first mark of the page-loading timer.
 * @protected
 * @since 1.0
 * @function
 * @see module:essence~loadTime
 */
window.onload = function () {
  return exports.loadTime = loadTime = new Date().getTime();
};

/**
 * @description Start the second mark of the page-loading timer.
 * @protected
 * @since 1.0
 * @function
 * @see module:essence~displayTime
 */
window.onpageshow = function () {
  return exports.displayTime = displayTime = new Date().getTime();
};

/**
 * @description Get the information about the key pressed
 * @param {*} keyStroke Keystroke
 * @param {boolean} [toLowerCase=false] To lower case
 * @returns {Array} Keystroke information
 * @public
 * @since 1.0
 * @function
 */
var getKey = exports.getKey = function getKey(keyStroke, toLowerCase) {
  var code = document.all ? event.keyCode : keyStroke.which;
  var char = toLowerCase ? String.fromCharCode(code).toLowerCase() : String.fromCharCode(code);
  return [char, code];
};

/**
 * @description Empty function.
 * @global
 * @type {Function}
 * @public
 * @since 1.0
 */
var $f = exports.$f = function $f() {};

/**
 * @description Element selector
 * @param {string} selector A CSS selector
 * @param {boolean} [silence=false] Flag to use when <code>selector</code> doesn't exist yet
 * (end.g: a particular selector used by a JS object/function which may not be in the page yet).
 * @returns {?Element} Element
 * @public
 * @since 1.0
 * @function
 */
var $e = exports.$e = function $e(selector, silence) {
  if (silence) {
    try {
      return new Element(selector);
    } catch (e) {
      say('%c$e(\'' + selector + '\')%c isn\'t there (yet).', 'warn', 'color: #f00', 'color: #000');
      return null;
    }
  } else return new Element(selector);
};

/**
 * @description Element's node
 * @param {string} selector A CSS selector
 * @param {boolean} [silence=false] Flag to use when <code>selector</code> doesn't exist yet
 * (e.g.: a particular selector used by a JS object/function which may not be in the page yet).
 * @returns {HTMLElement} Element node
 * @public
 * @since 1.0
 * @function
 */
var $n = exports.$n = function $n(selector, silence) {
  return silence && isNon($e(selector, silence)) ? null : $e(selector).node;
};

/**
 * @description Get the keys of an object.
 * @param {*} obj Object
 * @returns {Array} Keys
 * @public
 * @since 1.0
 * @function
 */
var keys = exports.keys = function keys(obj) {
  return Object.keys(obj);
};

/**
 * @description Get the values of an object.
 * @param {*} obj Object
 * @returns {Array} Values
 * @public
 * @since 1.0
 * @function
 */
var values = exports.values = function values(obj) {
  return Object.values(obj);
};

/**
 * @description Get the entries of an object.
 * @param {*} obj Object
 * @returns {Array} Entries
 * @public
 * @since 1.0
 * @function
 */
var entries = exports.entries = function entries(obj) {
  return Object.entries(obj);
};

/**
 * @description Element
 * @param {string} selector A CSS selector
 * @this Element
 * @returns {Element} Element object
 * @constructor
 * @public
 * @since 1.0
 * @throws {InvalidParamError} Invalid parameter
 * @property {HTMLElement} Element.node Node
 * @property {string} Element.selector Selector
 * @property {boolean} Element.isNodeList Is the element targeting a node-list or just on node ?
 * @property {function(boolean, boolean): (NumberLike|XML)} Element.val Get the node's value
 * @property {function(): number} Element.size Get the node's value's size
 * @property {function(): boolean} Element.isEmpty Check if the node's value is empty
 * @property {function(*, boolean, boolean)} Element.write Write something to the node
 * @property {function(*, boolean, boolean)} Element.before Write something to the node before its value
 * @property {function(*, boolean, boolean)} Element.after Write something to the node after its value
 * @property {function(string, ?string)} Element.remove Remove a character/string from the node's value and optionally insert jointers
 * @property {function(string, string)} Element.setCSS Set a CSS rule or change a CSS property
 * @property {function(string, string)} Element.setInlineCSS Set a CSS rule or change a CSS property inline to a righty of elements
 * @property {function(string[])} Element.styles Set multiple CSS rules
 * @property {function(): string} Element.styles Get All the CSS rules ruling this element
 * @property {function(string): NumberLike} Element.css Get the value of a CSS property
 * @property {function(string): boolean} Element.hasClass Check if the node is affiliated to a class
 * @property {function(string): boolean} Element.hasCSS Check if the node's CSS include a particular rule
 * @property {function(string)} Element.addClass Affiliate the node to a particular class
 * @property {function(string)} Element.rmClass Disjoin the node from a particular class
 * @property {function(string, (Str|Nums), number)} Element.toggleCSS Toggle a CSS property
 * @property {Function} Element.show Show the node
 * @property {Function} Element.hide Hide the node
 * @property {function(string)} Element.on Event handler
 * @property {function(): string} Element.toString String representation of the element
 * @property {function(): string} Element.tagName Tag-name of the element
 * @property {Function} Element.scrollBottom Scroll to the bottom of the node
 * @property {Function} Element.scrollTop Scroll to the top of the node
 * @property {Function} Element.scrollLeft Scroll to the left of the node
 * @property {Function} Element.scrollRight Scroll to the right of the node
 * @property {function(number, number)} Element.scroll Scroll in any directions
 * @property {function(string, number)} Element.autoScroll Auto scrolling animation
 * @property {function(string, *): *} Element.attr Get/set the attribute of the node
 * @property {function(string)} Element.rmAttr Remove an attribute from the node
 * @property {Function} Element.invColour Invert the colour and background colour (by negation)
 * @property {function(): string[]} Element.classes Get an array of classes of the element
 * @property {function(function(HTMLElement))} Element.multi Execute a callback on all nodes of a $e('*...') element
 * @property {function(string, Array)} Element.multiElm Execute a method on all elements of a $e('*...') element
 * @property {function()} Element.delete Self-destruction of the element by self-removal of the DOM
 * @property {function(String, String, boolean, boolean)} Element.replace Replace a string in the element's value by a new one
 * @todo All the CSS implementations on $e('*..') must always be wrote in a CSS place and not inline (like now).
 * Maybe do something with $n(...).scrollIntoView()
 * @property {function()} Element.moveCSS Move the inline-CSS into the current stylesheet
 */

var Element = exports.Element = function () {
  function Element(selector) {
    _classCallCheck(this, Element);

    if (/^([#.*_-`~&]\W*|\S|undefined|null|)$/.test(selector)) throw new qtest.InvalidParamError('Element cannot accept the selector \'' + selector + '\' as its invalid.'); //Reject invalid selectors
    if (selector[0] === '#') this.node = document.querySelector(selector) || document.getElementById(selector.slice(1, selector.length)); //Id
    else if (selector[0] === '.') this.node = document.querySelector(selector) || document.getElementByClassName(selector.slice(1, selector.length)); //Class
      else if (selector[0] === '*') this.node = document.querySelectorAll(selector.slice(1, selector.length)) || document.getElementsByTagName(selector.slice(1, selector.length)); //Node list
        else this.node = document.querySelector(selector);
    if (this.node === null) throw new Error('The node $n(\'' + selector + '\') doesn\'t exist !!');
    this.selector = selector;
  }

  _createClass(Element, [{
    key: 'isNodeList',
    value: function isNodeList() {
      return isNativeType(this.node, 'NodeList');
    }
  }, {
    key: 'val',
    value: function val(getHTML, withTags) {
      if (this.isNodeList()) {
        var arr = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.node[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var node = _step.value;

            if (node.value && !getHTML && !withTags) arr.push(node.value);else if (node.innerHTML && getHTML && !withTags) arr.push(node.innerHTML);else if (node.innerText && !getHTML && !withTags) arr.push(node.innerText);else if (node.outerHTML && !getHTML && withTags) arr.push(node.outerHTML);else arr.push(node.value ? node.value : node.innerText);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return arr;
      }
      if (this.node.value && !getHTML && !withTags) return this.node.value;else if (this.node.innerHTML && getHTML && !withTags) return this.node.innerHTML;else if (this.node.innerText && !getHTML && !withTags) return this.node.innerText;else if (this.node.outerHTML && !getHTML && withTags) return this.node.outerHTML;else return this.node.value ? this.node.value : this.node.innerText;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return isNon(this.val());
    }
  }, {
    key: 'write',
    value: function write(value, parseToHTML, incTags) {
      if (typeof this.val(true) === 'undefined') this.node.innerText = '?';
      if (this.isNodeList()) {
        for (var i in this.node) {
          if (this.node.has(i)) {
            if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isNativeType(value, 'Array') ? value[i] : value;else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isNativeType(value, 'Array') ? value[i] : value;else if (this.node[i].innerText && !parseToHTML && !incTags) this.node[i].innerText = isNativeType(value, 'Array') ? value[i] : value;else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML = isNativeType(value, 'Array') ? value[i] : value;else this.node[i].value ? this.node[i].value = isNativeType(value, 'Array') ? value[i] : value : this.node[i].innerText = isNativeType(value, 'Array') ? value[i] : value;
          }
        }
      }

      if (this.node.value && !parseToHTML && !incTags) this.node.value = value;else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = value;else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText = value;else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = value;else this.node.value ? this.node.value = value : this.innerText = value;
    }
  }, {
    key: 'before',
    value: function before(value, parseToHTML, incTags) {
      if (typeof this.val(true) === 'undefined') this.node.innerText = '?';
      if (this.isNodeList()) {
        for (var i in this.node) {
          if (this.node.has(i)) {
            if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isNativeType(value, 'Array') ? value[i] + this.node[i].value : value + this.node[i].value;else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isNativeType(value, 'Array') ? value[i] + this.node[i].innerHTML : value + this.node[i].innerHTML;else if (this.node[i].innerText && !parseToHTML && !incTags) this.node[i].innerText = isNativeType(value, 'Array') ? value[i] + this.node[i].innerText : value + this.node[i].innerText;else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML = isNativeType(value, 'Array') ? value[i] + this.node[i].outerHTML : value + this.node[i].outerHTML;else this.node[i].value ? this.node[i].value = isNativeType(value, 'Array') ? value[i] + this.node[i].value : value + this.node[i].value : this.node[i].innerText = isNativeType(value, 'Array') ? value[i] + this.node[i].innerText : value + this.node[i].innerText;
          }
        }
      }

      if (this.node.value && !parseToHTML && !incTags) this.node.value = value + this.node.value;else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = value + this.node.innerHTML;else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText = value + this.node.innerText;else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = value + this.node.outerHTML;else this.node.value ? this.node.value = value + this.node.value : this.innerText = value + this.innerText;
    }
  }, {
    key: 'after',
    value: function after(value, parseToHTML, incTags) {
      if (typeof this.val(true) === 'undefined') this.node.innerText = '?';
      if (this.isNodeList()) {
        for (var i in this.node) {
          if (this.node.has(i)) {
            if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value += isNativeType(value, 'Array') ? value[i] : value;else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML += isNativeType(value, 'Array') ? value[i] : value;else if (this.node[i].innerText && !parseToHTML && !incTags) this.node[i].innerText += isNativeType(value, 'Array') ? value[i] : value;else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML += isNativeType(value, 'Array') ? value[i] : value;else this.node[i].value ? this.node[i].value += isNativeType(value, 'Array') ? value[i] : value : this.node[i].innerText += isNativeType(value, 'Array') ? value[i] : value;
          }
        }
      }

      if (this.node.value && !parseToHTML && !incTags) this.node.value += value;else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML += value;else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText += value;else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML += value;else this.node.value ? this.node.value += value : this.innerText += value;
    }
  }, {
    key: 'remove',
    value: function remove(character) {
      var replacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (this.isNodeList()) {
        for (var i = 0; i < this.size(); i++) {
          if (this.val()[i] === character) this.write(this.val().slice(0, i).concat(this.val().slice(i + 1, this.size())));
        }
      }
      this.write(this.val().split(character).join(replacement));
    }
  }, {
    key: 'setCSS',
    value: function setCSS(prop, val) {
      if (this.isNodeList()) ui.addCSSRule(/\*\S/.test(this.selector) ? this.selector.get(1) : this.selector, misc.camelCaseTo(prop, 'hyphen') + ': ' + val);else this.node.style[prop] = val;
    }
  }, {
    key: 'setInlineCSS',
    value: function setInlineCSS(prop, vals) {
      for (var i = 0; i < this.node.length; i++) {
        this.node[i].style[prop] = isNativeType(vals, 'Array') ? vals[i] : vals;
      }
    }
  }, {
    key: 'css',
    value: function css(prop) {
      return this.isNodeList() ? Array.from(this.node).map(function (node) {
        return node.style[prop];
      }) : this.node.style[prop];
    }
  }, {
    key: 'hasClass',
    value: function hasClass(className) {
      return this.isNodeList() ? Array.from(this.node).map(function (node) {
        return new RegExp(' ' + className + ' ').test(' ' + node[className] + ' ');
      }) : new RegExp(' ' + className + ' ').test(' ' + this.node[className] + ' ');
    }
  }, {
    key: 'hasCSS',
    value: function hasCSS(prop) {
      return this.isNodeList() ? Array.from(this.node).map(function (node) {
        return new RegExp(' ' + prop + ' ').test(' ' + node.style[prop] + ' ');
      }) : new RegExp(' ' + prop + ' ').test(' ' + this.node.style[prop] + ' ');
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      this.isNodeList() ? this.node.map(function (node) {
        return node.className += ' ' + className;
      }) : this.node.className += ' ' + className;
    }
  }, {
    key: 'rmClass',
    value: function rmClass(className) {
      var newClass = ' ' + this.node.className.replace(/[\t\r\n]/g, ' ') + ' ';
      if (this.isNodeList()) {
        this.node.map(function (node) {
          newClass = ' ' + node.className.replace(/[\t\r\n]/g, ' ') + ' ';
          if (node.hasClass(className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
              newClass = newClass.replace(' ' + className + ' ', ' ');
            }node.className = newClass.replace(/^\s+|\s+$/g, '');
          }
        });
      } else if (this.hasClass(className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
          newClass = newClass.replace(' ' + className + ' ', ' ');
        }this.node.className = newClass.replace(/^\s+|\s+$/g, '');
      }
    }
  }, {
    key: 'toggleCSS',
    value: function toggleCSS(prop, params) {
      var stackLayer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (this.css(prop) === '' && stackLayer < 1) this.toggleCSS(prop, params, stackLayer + 1);
      if (prop === 'visibility') {
        this.css('visibility') === 'visible' ? this.setCSS('visibility', 'hidden') : this.setCSS('visibility', 'visible');
      } else if (prop === 'enabled') {
        this.css('enabled') === 'enabled' ? this.setCSS('enabled', 'disabled') : this.setCSS('enabled', 'enabled');
      } else if (prop === 'display') {
        this.css('display') === 'block' || this.css('display') === params ? this.setCSS('display', 'none') : this.setCSS('display', params || 'block');
      } else if (!isNon(prop) && !isNon(params)) {
        //For color, bgcolor, opacity, font-size, ...
        if (isNon(this.css(prop))) this.setCSS(prop, params[0]);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = params[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var i = _step2.value;
            //Slide through the parameters and go to the next one if the one already set is present
            if (this.css(prop) === params[i]) {
              this.setCSS(prop, params[(i + 1) % params.length]);
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this.setCSS('opacity', 1);
      this.setCSS('display', 'block');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setCSS('opacity', 0);
      this.setCSS('display', 'none');
    }
  }, {
    key: 'on',
    value: function on(event) {
      var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $f;

      var events = ['abort', 'autocomplete', 'autocompleteerror', 'beforeunload', 'blur', 'cancel', 'canplay', 'canplaythrough', 'change', 'click', 'close', 'contextmenu', 'cuechange', 'dblclick', 'devicemotion', 'deviceorientation', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'error', 'focus', 'hashchange', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'languagechange', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'message', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'offline', 'online', 'pagehide', 'pageshow', 'pause', 'play', 'playing', 'popstate', 'progress', 'ratechange', 'reset', 'resize', 'scroll', 'search', 'seeked', 'seeking', 'select', 'show', 'stalled', 'storage', 'submit', 'suspend', 'timeupdate', 'toggle', 'transitionend', 'unload', 'volumechange', 'waiting', 'webkitanimationend', 'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend', 'wheel'];
      if (events.contains(event.normal())) {
        this.isNodeList() ? Array.from(this.node).map(function (node) {
          return node.addEventListener(event.normal(), handler);
        }) : this.node.addEventListener(event.normal(), handler);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '[object Element]';
    }
  }, {
    key: 'tagName',
    value: function tagName() {
      return this.node.tagName.toLowerCase();
    }
  }, {
    key: 'scrollTop',
    value: function scrollTop() {
      this.node.scrollTop = this.node.offsetTop;
    }
  }, {
    key: 'scrollBottom',


    //noinspection JSUnusedGlobalSymbols
    value: function scrollBottom() {
      this.node.scrollTop = this.node.offsetHeight - this.node.offsetTop;
    }
  }, {
    key: 'scrollLeft',
    value: function scrollLeft() {
      this.node.scrollLeft = this.node.offsetLeft;
    }
  }, {
    key: 'scrollRight',


    //noinspection JSUnusedGlobalSymbols
    value: function scrollRight() {
      this.node.scrollLeft = this.node.offsetWidth - this.node.offsetLeft;
    }
  }, {
    key: 'scroll',
    value: function scroll() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      //noinspection JSAnnotator
      this.node.scrollLeft += x;
      this.node.scrollTop += y;
    }
  }, {
    key: 'autoScroll',


    //noinspection JSUnusedGlobalSymbols
    value: function autoScroll() {
      var _this = this;

      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'd';
      var speed = arguments[1];

      var interval = setInterval(function () {
        switch (direction.toLowerCase()[0]) {
          case 'l':
            _this.scroll(-1, 0);
            if (_this.node.scrollLeft === _this.node.offsetLeft) clearInterval(interval);
            break;
          case 'r':
            _this.scroll(1, 0);
            if (_this.node.scrollLeft === _this.node.offsetWidth - _this.node.offsetLeft) clearInterval(interval);
            break;
          case 'u':
            self.scroll(0, -1);
            if (self.node.scrollTop === self.node.offsetTop) clearInterval(interval);
            break;
          default:
            //d
            self.scroll(0, 1);
            if (self.node.scrollTop === self.node.scrollHeight - self.node.offsetTop) clearInterval(interval);
        }
      }, speed || 50);
    }
  }, {
    key: 'attr',
    value: function attr(name, value) {
      if (this.isNodeList()) return this.node.map(function (node) {
        return isNon(value) ? node.getAttribute(name) : node.setAttribute(name, value);
      });else return isNon(value) ? this.node.getAttribute(name) : this.node.setAttribute(name, value);
    }
  }, {
    key: 'rmAttr',


    //noinspection JSUnusedGlobalSymbols
    value: function rmAttr(name) {
      this.isNodeList() ? this.node.map(function (node) {
        return node.removeAttribute(name);
      }) : this.node.removeAttribute(name);
    }
  }, {
    key: 'invColour',
    value: function invColour() {
      //First make sure there's a colour and a background colour specified on the affect element(s)
      if (isNativeType(this.css('color'), 'Array') || isNativeType(this.css('backgroundColor'), 'Array')) {
        Array.from(this.node).filter(function (node) {
          return node.style.color === '';
        }).map(function (node) {
          return node.style.color = 'inherit';
        });
        Array.from(this.node).filter(function (node) {
          return node.style.backgroundColor === '';
        }).map(function (node) {
          return node.style.backgroundColor = 'inherit';
        });
      } else {
        if (this.css('color') === '') this.setCSS('color', 'inherit'); //if the colour wasn't set or is only known to CSS as the default inherited value
        if (this.css('backgroundColor') === '') this.setCSS('backgroundColor', 'inherit');
      }
      ui.negateColour(this.selector, 'color', 'a');
      ui.negateColour(this.selector, 'backgroundColor', 'a');
    }
  }, {
    key: 'classes',
    value: function classes() {
      return this.node.className.split(' ');
    }
  }, {
    key: 'multi',
    value: function multi(callback) {
      var nodes = Array.from(this.node);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var node = _step3.value;
          callback(node);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'multiElm',


    //noinspection JSUnusedGlobalSymbols
    value: function multiElm(method) {
      var nodes = Array.from(this.node);

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _$e;

          var node = _step4.value;
          (_$e = $e(ui.cssPath(node)))[method].apply(_$e, args);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: 'delete',
    value: function _delete() {
      this.write('', false, true); //Or this.node.parentElement.removeChild(this.node);
    }
  }, {
    key: 'replace',
    value: function replace(oldVal, newVal, parseToHTML, incTags) {
      this.write(this.val(parseToHTML, incTags).replace(oldVal, newVal), parseToHTML, incTags);
    }
  }, {
    key: 'moveCSS',
    value: function moveCSS() {
      ui.addCSSRule(this.selector, this.attr('style'));
      this.rmAttr('style');
    }
  }, {
    key: 'size',
    get: function get() {
      return this.val().length;
    }
  }, {
    key: 'styles',
    set: function set(sAndV) {
      //Style and vals: [style0, val0, style1, val1, ...]
      for (var i = 0; i < sAndV.length - 1; i += 2) {
        this.setCSS(sAndV[i], sAndV[i + 1]);
      }
    },
    get: function get() {
      return this.attr('style');
    }
  }]);

  return Element;
}();

/**
 * @description Include an external file/resource as a child of the document
 * @param {string} file Filename
 * @param {string} [type='link'] Type of the file
 * @public
 * @since 1.0
 * @function
 * @example
 * include('script.js'); //It will include the script.js just like include('script.js', 'script');
 * include('style.css'); //same as include('style.css', 'link') and include('style.css', 'stylesheet');
 */


function include(file) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'link';

  var elm = document.createElement(type);
  if (type === 'script') elm.src = file;else {
    elm.href = file;
    elm.rel = 'stylesheet';
  }
  elm.type = type === 'script' ? 'text/javascript' : 'text/css';
  document.head.appendChild(elm);
}

/**
 * @description Avoid including a file if it's already included
 * @param {string} file Filename
 * @param {string} [type='link"' Type of the file
 * @param {string} [parentPath=''] Parent path
 * @returns {undefined|boolean} False flag or nothing
 * @public
 * @since 1.0
 * @function
 * @see module:essence~include
 */
var includeOnce = exports.includeOnce = function includeOnce(file) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'link';
  var parentPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var rsc = type === 'script' ? dom.gatherScripts(true) : dom.gatherStylesheets(true);
  if (parentPath && (rsc.has(parentPath + file) || rsc.contains(parentPath + file)) || rsc.has(file) || rsc.contains(file)) return false;else include(file, type);
};

/**
 * @description Removes an external resource
 * @param {string} file File name
 * @param {string} [type='link'] Type of the file
 * @since 1.0
 * @public
 * @function
 * @example
 * exclude('script.js'); //will remove the reference to the script.js script.
 */
var exclude = exports.exclude = function exclude(file) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'link';

  var elm = document.createElement(type);
  type === 'script' ? elm.src = file : elm.href = file;
  elm.type = type === 'script' ? 'text/javascript' : 'text/css';
  document.head.removeChild(elm);
};

/**
 * @description Counts how many times a character/property/number <code>c</code> is present in the object
 * @param {(string|Bool)} character Character data
 * @this Object
 * @returns {number} Number of occurrences of <code>c</code> in the object
 * @public
 * @since 1.0
 * @method
 * @example
 * 'Hello world'.count('o'); //2
 * [4, 2, 0, -4, 1, 2, 3].count(0); //1
 * @memberof Object.prototype
 * @external Object
 */
Object.prototype.count = function (character) {
  return Array.from(undefined).filter(function (x) {
    return x === character;
  }).length;
};

/**
 * @description Get all the positions of a character/property/number c.
 * @param {NumberLike} character Character/property/number
 * @this Object
 * @returns {number[]} Array of positions
 * @public
 * @since 1.0
 * @method
 * @example
 * 'AbcdAbc'.positions('A'); //[0, 4]
 * @memberof Object.prototype
 * @external Object
 */
Object.prototype.positions = function (character) {
  var pos = [];
  //noinspection JSUnresolvedVariable
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = undefined[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var item = _step5.value;

      if (item === character) pos.push(item);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
};

/**
 * @description Check if an object is iterable hence if it's a string/array/object.
 * @this Object
 * @returns {boolean} Iterability check result
 * @public
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 * @example
 * let myStr = 'Hello', myNum = 1.4142, myBool = true, myArr = range(3), myObj = {a: 0, b: 1};
 * myStr.isIterable(); //true
 * myNum.isIterable(); //false
 * myBool.isIterable(); //false
 * myArr.isIterable(); //true
 * myObj.isIterable(); //true
 */
Object.prototype.isIterable = function () {
  return isNativeType(undefined, 'String') || isNativeType(undefined, 'Array') || isNativeType(undefined, 'Object');
};

/**
 * @description Self-destruction of the object.<br />
 * Source: {@link https://Google.github.io/styleguide/javascriptguide.xml?showone=delete#delete}
 * @this Object
 * @public
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 */
Object.prototype.delete = function () {
  undefined.property = undefined;
};

/**
 * @summary Equality check.
 * @description Check if obj and the current object are the same
 * @param {*} obj Object to compared to
 * @this Object
 * @returns {boolean} Equality check result
 * @public
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 * @example
 * let a = 'Hello', b = 'hello', c = ['h', 'e', 'l', 'l', 'o'];
 * a.equals(b); //false
 * a.toLowerCase().equals(b); //true
 * c.join('').equals(a); //true
 * c.equals(a); //false
 */
Object.prototype.equals = function (obj) {
  return undefined.toString() === obj.toString() || undefined.toLocaleString() === obj.toLocaleString() || undefined === obj;
};

/**
 * @description Multiple replacement.
 * @param {Array[]} rules Rules containing (RegExp|String)/(RegExp|String) pairs
 * @this Object
 * @returns {*} Resulting object
 * @public
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 * @example
 * 'Hello world !'.multiReplace([[/[A-Za-z]/g, '1'], [/(\s|\!)/, '0']]); //'1111101111100'
 */
Object.prototype.multiReplace = function (rules) {
  var res = this.replace(rules[0][0], rules[0][1]);
  for (var i = 1; i < rules.length; i++) {
    res = res.replace(rules[i][0], rules[i][1]);
  }return res;
};

/**
 * @description Comparison check.
 * @param {*} obj Object to be compared to
 * @this Object
 * @returns {number} Comparison check result
 * @public
 * @since 1.0
 * @method
 * @throws {TypeError} Type difference between this and obj
 * @memberof Object.prototype
 * @external Object
 * @example
 * let a = 2, b = 5;
 * a.compareTo(b) === -1 //a < b
 * b.compareTo(a) === 1 //b > a
 * a.compareTo(a) === 0 //a = a
 */
Object.prototype.compareTo = function (obj) {
  if (getNativeType(undefined) != getNativeType(obj)) throw new TypeError(undefined + ' and ' + obj + ' aren\'t of the same type, so can\'t be compared.');
  if (getNativeType(undefined) === 'Object' && getCustomType(undefined) === getCustomType(obj) || getNativeType(undefined) === getNativeType(obj)) {
    return undefined.equals(obj) ? 0 : undefined.toString() < obj.toString() || undefined.toLocaleString() < obj.toLocaleString() ? -1 : 1;
  } else throw new TypeError(' ' + undefined + ' and ' + obj + ' aren\'t of the same custom type, so can\'t be compared.');
};

/**
 * @description Check if an object has a property
 * @param {string} prop Property
 * @returns {boolean} Containment check result
 * @memberof Object.prototype
 * @external Object
 * @public
 * @since 1.0
 * @this Object
 * @method
 * @example
 * let a = {name: 'A', size: 8}, b = ['1', '4', '9', 'h', 'w', '_'];
 * a.has('name'); //true
 * a.has('value'); //false
 * b.has('w'); //true
 * b.has(' '); //false
 */
Object.prototype.has = function (prop) {
  return Object.prototype.hasOwnProperty.call(undefined, prop);
}; //Better than this[prop] != undefined

/**
 * @description Emptiness check on the object.
 * Source: {@link https://stackoverflow.com/a/679937/5893085|SO}
 * @return {boolean} Emptiness state
 * @memberof Object.prototype
 * @external Object
 * @this Object
 * @public
 * @since 1.0
 * @method
 * @example
 * let a = {}, b = new Object(), c = {x: 5}, d = '';
 * a.isEmpty(); //true
 * b.isEmpty(); //true
 * c.isEmpty(); //false
 * d.isEmpty(); //true
 */
Object.prototype.isEmpty = function () {
  return !undefined.length;
};

/**
 * @description High level inheritance.
 * @param {*} parent Parent
 * @memberof Object.prototype
 * @external Object
 * @this Object
 * @public
 * @since 1.0
 * @method
 */
Object.prototype.inherits = function (parent) {
  undefined.prototype = Object.create(parent.prototype);
  undefined.prototype.constructor = undefined;
};

/**
 * @description Allows to create methods without directly calling the prototype.
 * @param {string} name Name of the method
 * @param {Function} func Function (body of the method)
 * @returns {Function}
 * @memberof Function.prototype
 * @external Function
 * @this Function
 * @public
 * @since 1.0
 * @method
 * @deprecated
 * @todo Find a stable way to use it without having this=window (note: the ES5 way on {@link https://stackoverflow.com/questions/6868883/augmenting-types-in-javascript} works)
 */
Function.prototype.method = function (name, func) {
  undefined.prototype[name] = func;
  return undefined;
};

/**
 * @description Inheritance.<br />
 * Source: Somewhere
 * @param {*} parentClassOrObj Parent
 * @returns {Function} this Current function/constructor
 * @public
 * @since 1.0
 * @method
 * @memberof Function.prototype
 * @external Function
 */
Function.prototype.inheritsFrom = function (parentClassOrObj) {
  if (parentClassOrObj.constructor === Function) {
    //Normal Inheritance
    undefined.prototype = new parentClassOrObj();
    undefined.prototype.constructor = undefined;
    undefined.prototype.parent = parentClassOrObj.prototype;
  } else {
    //Pure Virtual Inheritance
    undefined.prototype = parentClassOrObj;
    undefined.prototype.constructor = undefined;
    undefined.prototype.parent = parentClassOrObj;
  }
  //noinspection JSValidateTypes
  return undefined;
};

/**
 * @description Check if an array contains a value.
 * @param {*} value Value
 * @return {boolean} Containment check result
 * @this Array
 * @method
 * @since 1.0
 * @memberof Array.prototype
 * @external Array
 * @see module:essence~Array.prototype.miss
 */
Array.prototype.contains = function (value) {
  return undefined.indexOf(value) > -1;
};

/**
 * @description Check if an array doesn't contains a value.
 * @param {*} value Value
 * @return {boolean} Non-containment check result
 * @this Array
 * @method
 * @since 1.0
 * @memberof Array.prototype
 * @external Array
 * @see module:essence~Array.prototype.contains
 */
Array.prototype.miss = function (value) {
  return undefined.indexOf(value) === -1;
};

/**
 * @description Get the first element of the array.
 * @param {*} [value] New value of the first element
 * @this Array
 * @returns {*} First element
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.first = function (value) {
  return isNon(value) ? undefined[0] : undefined[0] = value;
};

/**
 * @description Get the last element of the array.
 * @param {*} [value] New value of the last element
 * @this Array
 * @returns {*} Last element
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.last = function (value) {
  return isNon(value) ? undefined[undefined.length - 1] : undefined[undefined.length - 1] = value;
};

/**
 * @description Line of a 2D array.
 * @param {number} [n=0] Index
 * @returns {Array} Line
 * @public
 * @since 1.0
 * @this Array
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.line = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return undefined.map(function (i) {
    if (n < 0) n = undefined[i].length - n;
    return i[n];
  });
};

/**
 * @description Block of a 2D array.
 * @param {number} [start=0] Starting index
 * @param {number} [end=this.length-1] Ending index
 * @returns {Array} Block
 * @this Array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.block = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined.length - 1;
  return undefined.map(function (i) {
    return i.get(start, end);
  });
};

/**
 * @description Returns the last index of the array.
 * @this Array
 * @returns {number} Last index
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.lastIndex = function () {
  return undefined.length - 1;
};

/**
 * @description Returns the middle index of the array.
 * @param {boolean} [under=false] Indicates if we want the value under the virtual value
 * @this Array
 * @returns {number} Middle index
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.midIndex = function (under) {
  return under ? Math.floor(undefined.length / 2) - 1 : Math.floor(undefined.length / 2);
};

/**
 * @description Returns the values of the array that are in an even position.
 * @this Array
 * @returns {Array} Array of elements
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.even = function () {
  return undefined.filter(function (item, i) {
    return i % 2 === 0;
  });
};

/**
 * @description Returns the values of the array that are in an odd position.
 * @this Array
 * @returns {Array} Array of elements
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.odd = function () {
  return undefined.filter(function (item, i) {
    return i % 2 != 0;
  });
};

/**
 * @description Get the maximum value of the array.
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {*} Maximum value
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.max = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined.length - 1;

  var max = undefined[start];
  if (!start && !end || start === 0 && end >= undefined.length - 1) for (var i = 1; i < undefined.length; i++) {
    max = Math.max(max, undefined[i]);
  } else if (start && !end) for (var _i = start + 1; _i < undefined.length; _i++) {
    max = Math.max(max, undefined[_i]);
  } else for (var _i2 = start + 1; _i2 <= end; _i2++) {
    max = Math.max(max, undefined[_i2]);
  }return max;
};

/**
 * @description Get the maximum value of the array.
 * @param {number} [start=0] Starting position
 * @param {number} [n=this.length-1] Number of values
 * @this Array
 * @returns {*} Maximum value
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxOf = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined.length - 1;

  var max = undefined[start];
  for (var i = start + 1; i <= n; i++) {
    max = Math.max(max, undefined[i]);
  }return max;
};

/**
 * @description Get the median value of the array
 * @param {*} [value] New value of the median cell
 * @this Array
 * @returns {*} Median
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.median = function (value) {
  var arr = undefined.sort(function (a, b) {
    return a - b;
  });
  var half = Math.floor(arr.length / 2);
  return arr.length % 2 ? value ? arr[half] = value : arr[half] : (arr[half - 1] + arr[half]) / 2;
};

/**
 * @description Get the minimum value of the array.
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {*} Minimum value
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.min = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined.length - 1;

  var min = undefined[start];
  if (!start && !end || start === 0 && end >= undefined.length - 1) for (var i = 1; i < undefined.length; i++) {
    min = Math.min(min, undefined[i]);
  } else if (start && !end) for (var _i3 = start + 1; _i3 < undefined.length; _i3++) {
    min = Math.min(min, undefined[_i3]);
  } else for (var _i4 = start + 1; _i4 <= end; _i4++) {
    min = Math.min(min, undefined[_i4]);
  }return min;
};

/**
 * @description Get the minimum value of the array.
 * @param {number} [start=0] Starting position
 * @param {number} [n=this.length-1] Number of values
 * @this Array
 * @returns {*} Minimum value
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.minOf = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined.length - 1;

  var min = undefined[start];
  for (var i = start + 1; i <= n; i++) {
    min = Math.min(min, undefined[i]);
  }return min;
};

/**
 * @description Shuffles the array.
 * @param {number} [n=this.length] Number of shuffles
 * @this Array
 * @returns {Array} Shuffled array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.shuffle = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined.length;

  /* eslint no-unused-vars: "off" */
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = n[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var i = _step6.value;
      var _ref = [undefined[maths.randTo(undefined.length - 1)], undefined[maths.randTo(undefined.length - 1)]];
      undefined[maths.randTo(undefined.length - 1)] = _ref[0];
      undefined[maths.randTo(undefined.length - 1)] = _ref[1];
    }
    /* eslint no-unused-vars: "error" */
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return undefined;
};

/**
 * @description Return the length of the longest row.
 * @this Array
 * @returns {number} Max length
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxLength = function () {
  var ml = 0;
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = undefined[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var row = _step7.value;
      ml = Math.max(ml, row.length);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return ml;
};

/**
 * @description Return the length of the shortest row.
 * @this Array
 * @returns {number} Min length
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.minLength = function () {
  var ml = undefined[0].length;
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = undefined[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var row = _step8.value;
      ml = Math.min(ml, row.length);
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  return ml;
};

/**
 * @description fill() for 2D arrays.
 * @param {*} character Data
 * @this Array
 * @return {Array} The array post-modification
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.Fill2D = function (character) {
  return undefined.fill(new Array(undefined.length).fill(character));
};

/**
 * @description Remove a character/number/string from the array with(out) affecting the initial array.<br />
 * It will automatically remove undefined and it goes bunckers when trying to remove objects
 * @param {*} [character] Data to remove
 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
 * @this Array
 * @returns {Array} Array after the operation
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.remove = function (character, preserveInitial) {
  if (preserveInitial) {
    return isNativeType(character, 'Array') ? character.map(function (c) {
      return undefined.filter(function (x) {
        return x != c || x != undefined;
      });
    }) : undefined.filter(function (x) {
      return x != character || x != undefined;
    });
  } else {
    var pos = Copy(undefined.positions(character));
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = pos[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var i = _step9.value;
        undefined.splice(i, 1);
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9.return) {
          _iterator9.return();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }

    return undefined;
  }
};

/**
 * @description Debug an array by displaying in the console each of its elements
 * @this Array
 * @returns {undefined}
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.debug = function () {
  say('%cDebugging the following array:%c ' + undefined, 'text-decoration: bold', 'text-decoration: none');
  undefined.map(function (cell, i) {
    return say(i + ': ' + cell);
  });
};

/**
 * @description Get the number of occurrences of each elements in array as well as the position(s) of each occurrences
 * @param {boolean} [simplified=false] Simplify the output
 * @todo Fix the thingy with the occurrences' positions not showing up
 * @this Array
 * @returns {Array} Result
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.getOccurrences = function () {
  var simplified = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var arr = misc.rmDuplicates(undefined),
      res = [];
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = arr[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var cell = _step10.value;
      res.push(cell + ': ' + undefined.count(cell) + ' {' + undefined.positions(cell).toStr(true) + '}');
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10.return) {
        _iterator10.return();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }

  if (simplified) {
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
      for (var _iterator11 = res[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
        var item = _step11.value;
        item = parseInt(item.replace(/(?:.*?):(\d+)\{(.*?)}/g, '$1'));
      }
    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11.return) {
          _iterator11.return();
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
    }
  }
  return res;
};

/**
 * @description Replace a character with another.
 * @param {*} Ci Initial character
 * @param {*} Cf Final character
 * @param {boolean} toStr String representation
 * @this Array
 * @returns {Array|string} Result
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.replace = function (Ci, Cf) {
  var toStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _iteratorNormalCompletion12 = true;
  var _didIteratorError12 = false;
  var _iteratorError12 = undefined;

  try {
    for (var _iterator12 = this[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
      var item = _step12.value;

      if (item === Ci || isNativeType(Ci, 'RegExp') && Ci.test(item)) item = Cf;
    }
  } catch (err) {
    _didIteratorError12 = true;
    _iteratorError12 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion12 && _iterator12.return) {
        _iterator12.return();
      }
    } finally {
      if (_didIteratorError12) {
        throw _iteratorError12;
      }
    }
  }

  return toStr ? this.toString() : this;
};

/**
 * @description Sum of every elements of the array.
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {number} Sum
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.sum = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined.length - 1;

  var s = 0;
  if (!start && !end || start === 0 && end >= undefined.length - 1) {
    var _iteratorNormalCompletion13 = true;
    var _didIteratorError13 = false;
    var _iteratorError13 = undefined;

    try {
      for (var _iterator13 = undefined[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
        var _num = _step13.value;
        s += _num;
      }
    } catch (err) {
      _didIteratorError13 = true;
      _iteratorError13 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion13 && _iterator13.return) {
          _iterator13.return();
        }
      } finally {
        if (_didIteratorError13) {
          throw _iteratorError13;
        }
      }
    }
  } else if (start && !end) for (var i = start; i < undefined.length; i++) {
    s += undefined[i];
  } else for (var _i5 = start; _i5 <= end; _i5++) {
    s += undefined[_i5];
  }return s;
};

/**
 * @description Product of every elements of the array.
 * @param {number} [start=0] Staring position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {number} Product
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.prod = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined.length - 1;

  var p = 0;
  if (!start && !end || start === 0 && end >= undefined.length - 1) {
    var _iteratorNormalCompletion14 = true;
    var _didIteratorError14 = false;
    var _iteratorError14 = undefined;

    try {
      for (var _iterator14 = undefined[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
        var _num2 = _step14.value;
        p *= _num2;
      }
    } catch (err) {
      _didIteratorError14 = true;
      _iteratorError14 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion14 && _iterator14.return) {
          _iterator14.return();
        }
      } finally {
        if (_didIteratorError14) {
          throw _iteratorError14;
        }
      }
    }
  } else if (start && !end) for (var i = start; i < undefined.length; i++) {
    p *= undefined[i];
  } else for (var _i6 = start; _i6 <= end; _i6++) {
    p *= undefined[_i6];
  }return p;
};

/**
 * @description Sum for 2D arrays.
 * @param {number[]} [start=[0, 0]] Starting position
 * @param {number[]} [end=[this.length-1, this[this.length-1].length-1]] Ending positions
 * @returns {number} Sum
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.sum2d = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [undefined.length - 1, undefined.last().length - 1];

  var s = 0;
  if (!start && !end || start.equals([0, 0]) && end >= undefined.length - 1) {
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
      for (var _iterator15 = undefined[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
        var i = _step15.value;
        var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = undefined[i][Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var j = _step16.value;
            s += undefined[i][j];
          }
        } catch (err) {
          _didIteratorError16 = true;
          _iteratorError16 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion16 && _iterator16.return) {
              _iterator16.return();
            }
          } finally {
            if (_didIteratorError16) {
              throw _iteratorError16;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError15 = true;
      _iteratorError15 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion15 && _iterator15.return) {
          _iterator15.return();
        }
      } finally {
        if (_didIteratorError15) {
          throw _iteratorError15;
        }
      }
    }
  } else if (start && !end) {
    for (var _i7 = start[0]; _i7 < undefined.length; _i7++) {
      for (var _j = start[1]; _j < undefined[_i7].length; _j++) {
        s += undefined[_i7][_j];
      }
    }
  } else {
    for (var _i8 = start[0]; _i8 < end[0]; _i8++) {
      for (var _j2 = start[1]; _j2 < end[1]; _j2++) {
        s += undefined[_i8][_j2];
      }
    }
  }
  return s;
};

/**
 * @description Mean of each elements or a portion of it.
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @returns {number} Mean
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.mean = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined.length - 1;

  var sum = undefined.sum(start, end);
  return (sum / undefined.get(start, end).length).toNDec(nbDec);
};

/**
 * @description Mean of each elements.
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting position
 * @param {number} [n=this.length-start-1] Number of values to take into account
 * @returns {number} Mean of N
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.meanOf = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined.length - start - 1;

  var sum = 0;
  for (var i = 0; i < n; i++) {
    sum += undefined[start + i];
  }return (sum / n).toNDec(nbDec);
};

/**
 * @description Minimum mean of n of all the means of the values.
 * @param {number} [n=this.length-1] Number of values for the mean of n
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Minimum Mean of N
 * @public
 * @since 1.0
 * @method
 * @throws {Error} n should be less than or equal to this.length
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.minMean = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined.length - 1;
  var nbDec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (undefined.length - (n - 1) < 0) throw new Error('You\'re expecting a minimum mean with more values than the are.');
  var means = [];
  for (var i = 0; i < n; i++) {
    means.push(undefined.mean(nbDec, i, i + n - 1));
  }return means.min();
};

/**
 * @description Maximum mean of n of all the means of the values.
 * @param {number} [n=this.length-1] Number of values for the mean of n
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Maximum Mean of N
 * @public
 * @since 1.0
 * @method
 * @throws {Error} n should be less than or equal to this.length
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxMean = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined.length - 1;
  var nbDec = arguments[1];

  if (undefined.length - (n - 1) < 0) throw new Error('You\'re expecting a maximum mean with more values than the are.');
  var means = [];
  for (var i = 0; i < n; i++) {
    means.push(undefined.mean(nbDec, i, n + i - 1));
  }return means.max();
};

/**
 * @description Timewise (Speedcubing) average of each times.
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting positions
 * @param {number} [end=this.length-1] Ending positions
 * @returns {number} Average
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.avg = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined.length - 1;

  var sum = undefined.sum(start, end) - undefined.max(start, end) - undefined.min(start, end);
  return (sum / (undefined.get(start, end).length - 2)).toNDec(nbDec);
};

/**
 * @description Timewise (Speedcubing) average of n times.
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting positions
 * @param {number} [n=this.length-start-1] Ending positions
 * @returns {number} Average Of N
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.avgOf = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined.length - start - 1;

  var sum = 0;
  for (var i = 0; i < n; i++) {
    if (undefined[start + i] != undefined.maxOf(start, n) || undefined[start + i] != undefined.minOf(start, n + 1)) sum += undefined[start + i];
  }
  return (sum / (n - 2)).toNDec(nbDec);
};

/**
 * @description Minimum time-wise average of n of all the means of the times.
 * @param {number} [n=this.length-1] Number of times for the mean of n
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Minimum Average of N
 * @public
 * @since 1.0
 * @method
 * @throws {Error} n should be less than or equal to this.length
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.minAvg = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined.length - 1;
  var nbDec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (undefined.length - (n - 1) < 0) throw new Error('You\'re expecting a minimum average with more values than the are.');
  var avgs = [];
  for (var i = 0; i < n; i++) {
    avgs.push(undefined.avg(nbDec, i, i + n - 1));
  }return avgs.min();
};

/**
 * @description Maximum time-wise average of n of all the means of the times.
 * @param {number} [n=this.length-1] Number of times for the mean of n
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Maximum Average of N
 * @public
 * @since 1.0
 * @method
 * @throws {Error} n should be less than or equal to this.length
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxAvg = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined.length - 1;
  var nbDec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (undefined.length - (n - 1) < 0) throw new Error('You\'re expecting a maximum average with more values than the are.');
  var avgs = [];
  for (var i = 0; i < n; i++) {
    avgs.push(undefined.avg(nbDec, i, n + i - 1));
  }return avgs.max();
};

/**
 * @description Variance.
 * @this Array
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Variance
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.letiance = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return (maths.sumPow2(undefined, nbDec) / undefined.length - Math.pow(undefined.mean(nbDec), 2)).toNDec(nbDec);
};

/**
 * @description Standard deviation.
 * @this Array
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Standard deviation
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.stddev = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return Math.sqrt(undefined.letiance(nbDec)).toNDec(nbDec);
};

/**
 * @description Get a random cell of the array.
 * @param {number} [n] Number of random elements to be returned
 * @this Array
 * @returns {*} Random element(s)
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.rand = function (n) {
  if (n && n > 0) {
    var res = [];
    for (var i = 0; i < n; i++) {
      res.push(undefined.rand());
    }return res;
  } else return undefined[maths.lenRand(undefined.length)];
};

/**
 * @description Quartile (Q<sub>1</sub>, Q<sub>2</sub>, Q<sub>3</sub>).
 * @param {number} n Nth quartile
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {*} Nth quartile
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.quartile = function (n) {
  var nbDec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return undefined.length % 2 === 0 ? ((undefined[Math.floor(n * undefined.length / 4) - 1] + undefined[Math.floor(n * undefined.length / 4)]) / 2).toNDec(nbDec) : undefined[Math.floor(n * undefined.length / 4)].toNDec(nbDec);
};

/**
 * @description Quintile (Q<sub>1</sub>, ..., Q<sub>4</sub>)
 * @param {number} n Nth quintile
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {*} Nth quintile
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.quintile = function (n) {
  var nbDec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return undefined.length % 2 === 0 ? ((undefined[Math.floor(n * undefined.length / 5) - 1] + undefined[Math.floor(n * undefined.length / 5)]) / 2).toNDec(nbDec) : undefined[Math.floor(n * undefined.length / 5)].toNDec(nbDec);
};

/**
 * @description Decile (D<sub>1</sub>, ..., D<sub>9</sub>).
 * @param {number} n Nth decile
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {*} Nth decile
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.decile = function (n) {
  var nbDec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return undefined.length % 2 === 0 ? ((undefined[Math.floor(n * undefined.length / 10) - 1] + undefined[Math.floor(n * undefined.length / 10)]) / 2).toNDec(nbDec) : undefined[Math.floor(n * undefined.length / 10)].toNDec(nbDec);
};

/**
 * @description Percentile (P<sub>1</sub>, ..., P<sub>99</sub>).
 * @param {number} n Nth percentile
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {*} Nth percentile
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.percentile = function (n) {
  var nbDec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return undefined.length % 2 === 0 ? ((undefined[Math.floor(n * undefined.length / 100) - 1] + undefined[Math.floor(n * undefined.length / 100)]) / 2).toNDec(nbDec) : undefined[Math.floor(n * undefined.length / 100)].toNDec(nbDec);
};

/**
 * @description Get the average increment between the values of the array.
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {Number} Increment
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.getIncrement = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return nbDec == 0 ? parseInt((undefined.max() - undefined.min()) / (undefined.length - 1)) : ((undefined.max() - undefined.min()) / (undefined.length - 1)).toNDec(nbDec);
};

/**
 * @description Increment every elements by n.
 * @param {number} [n=1] Increment value
 * @returns {undefined}
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.increment = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var _iteratorNormalCompletion17 = true;
  var _didIteratorError17 = false;
  var _iteratorError17 = undefined;

  try {
    for (var _iterator17 = undefined[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
      var num = _step17.value;
      num += n;
    }
  } catch (err) {
    _didIteratorError17 = true;
    _iteratorError17 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion17 && _iterator17.return) {
        _iterator17.return();
      }
    } finally {
      if (_didIteratorError17) {
        throw _iteratorError17;
      }
    }
  }
};

/**
 * @description Inter Quartile Range.
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {number} IQR
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.iqr = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return undefined.quartile(3, nbDec) - undefined.quartile(1, nbDec).toNDec(nbDec);
};

/**
 * @description Get the sub/full-array.
 * @param {number} [start=0] Starting position
 * @param {number} end Ending position
 * @this Array
 * @returns {Array} Resulting sub-array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 * @see module:dsa~get
 */
Array.prototype.get = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments[1];
  return dsa.get(undefined, start, end);
};

/**
 * @description Clean the array by removing undesirable items.
 * @param {boolean} [noDuplic=false] No duplicates
 * @this Array
 * @returns {Array} Cleaned array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.clean = function () {
  var noDuplic = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var arr = undefined.filter(function (x) {
    return !isNon(x);
  });
  return noDuplic ? misc.rmDuplicates(arr).remove() : arr; //Take off (or not) duplicates of actual values and double clean it
};

/**
 * @description Substitute every elements from <code>start</code> to <code>end</code> with from <code>s</code> to
 * <code>end</code> of the array <code>arr</code>.
 * @param {Array} arr Array
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {Array} Modified array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.chg = function (arr) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined.length - 1;

  var thisArr = undefined.get(start, end),
      otherArr = arr.get(start, end);
  return thisArr.map(function (item, i) {
    return otherArr[i];
  });
};

/**
 * @description Rotate an array by $deg%90 deg
 * @param {number} deg Degree of rotation
 * @todo Finish the section for 4x4+ matrices
 * @this Array
 * @returns {Array} Rotated array
 * @public
 * @since 1.0
 * @method
 * @throws {Error} deg isn't a multiple of 90°
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.rot = function (deg) {
  if (deg % 90 != 0) throw new Error('The absolute degree of rotation must be either 90° or 180°');
  if (undefined.numElm() === 4 && undefined.length === 2) {
    //2x2 matrix
    if (deg === 90) {
      ;
      var _ref2 = [this[1][0], this[1][1], this[0][1], this[0][0]];
      this[0][0] = _ref2[0];
      this[1][0] = _ref2[1];
      this[1][1] = _ref2[2];
      this[0][1] = _ref2[3];
    } else if (deg === -90) {
      ;
      var _ref3 = [this[0][1], this[1][1], this[1][0], this[0][0]];
      this[0][0] = _ref3[0];
      this[0][1] = _ref3[1];
      this[1][1] = _ref3[2];
      this[1][0] = _ref3[3];
    } else if (Math.abs(deg) === 180) {
      ;
      var _ref4 = [this[1][1], this[0][0], this[1][0], this[0][1]];
      this[0][0] = _ref4[0];
      this[1][1] = _ref4[1];
      this[0][1] = _ref4[2];
      this[1][0] = _ref4[3];
    }
  } else if (undefined.numElm() === 9 && undefined.length === 3) {
    //3x3 matrix
    if (deg === 90) {
      var _ref5 = [undefined[2][0], undefined[2][2], undefined[0][2], undefined[0][0]];
      undefined[0][0] = _ref5[0];
      undefined[2][0] = _ref5[1];
      undefined[2][2] = _ref5[2];
      undefined[0][2] = _ref5[3];
      var _ref6 = [undefined[1][0], undefined[2][1], undefined[1][2], undefined[0][1]];
      undefined[0][1] = _ref6[0];
      undefined[1][0] = _ref6[1];
      undefined[2][1] = _ref6[2];
      undefined[1][2] = _ref6[3];
    } else if (deg == -90) {
      var _ref7 = [undefined[0][2], undefined[2][2], undefined[2][0], undefined[0][0]];
      undefined[0][0] = _ref7[0];
      undefined[0][2] = _ref7[1];
      undefined[2][2] = _ref7[2];
      undefined[2][0] = _ref7[3];
      var _ref8 = [undefined[1][2], undefined[2][1], undefined[1][0], undefined[0][1]];
      undefined[0][1] = _ref8[0];
      undefined[1][2] = _ref8[1];
      undefined[2][1] = _ref8[2];
      undefined[1][0] = _ref8[3];
    } else if (Math.abs(deg) === 180) {
      var _ref9 = [undefined[2][2], undefined[0][0], undefined[2][0], undefined[0][2]];
      undefined[0][0] = _ref9[0];
      undefined[2][2] = _ref9[1];
      undefined[0][2] = _ref9[2];
      undefined[2][0] = _ref9[3];
      var _ref10 = [undefined[2][1], undefined[0][1], undefined[1][2], undefined[1][0]];
      undefined[0][1] = _ref10[0];
      undefined[2][1] = _ref10[1];
      undefined[1][0] = _ref10[2];
      undefined[1][2] = _ref10[3];
    }
  } else if (undefined.numElm() === 16 && undefined.length === 4) {
    //4x4 matrix although I'm trying to make this as responsive as I can for 4x4+ matrices
    if (deg === 90) {
      var tmp = undefined[0].get(-1); //Get all but the last element of the first row
      /**
       * @todo fix the weird error here and replace 1 by this.length/2 or whatever suits better
       */
      for (var j = 0; j < 1 /*this.length / 2*/; j++) {
        //Weird error
        tmp = undefined[j].get(-1);
        for (var i = 0; i < undefined.maxLength() - 1; i++) {
          //if (j > 0) Essence.say('#' + i);
          //if (j > 0) Essence.say(this[j][i] + '<-' +  this[this.length - 1 - i][j]);
          undefined[j][i] = undefined[undefined.length - 1 - i][j];
          //if (j > 0) Essence.say(this[this.length - 1 - i][j] + '<-' +  this[this.length - 1 - j][this.length - 1 - i]);
          undefined[undefined.length - 1 - i][j] = undefined[undefined.length - 1 - j][undefined.length - 1 - i];
          //if (j > 0) Essence.say(this[this.length - 1 - j][this.length - 1 - i] + '<-' +  this[i][this.length - 1 - j]);
          undefined[undefined.length - 1 - j][undefined.length - 1 - i] = undefined[i][undefined.length - 1 - j];
          //if(j > 0) Essence.say(this[i][this.length - 1 - j] + '<-' +  tmp[i]);
          undefined[i][undefined.length - 1 - j] = tmp[i];
        }
      }
    } else if (deg === -90) {
      var _tmp = [undefined[0][0], undefined[0][1]];
      undefined[0][0] = undefined[0].last();
      undefined[0].last(undefined.last().last());
      undefined.last().last(undefined.last()[0]);
      undefined.last()[0] = _tmp[0];
      undefined[0][1] = undefined[1].last();
      undefined[1].last(undefined.last()[1]);
      undefined.last()[1] = undefined[1][0];
      undefined[1][0] = _tmp[1];
    } else if (Math.abs(deg) === 180) {
      var _tmp2 = [undefined[0][0], undefined[0][1], undefined[0].last(), undefined[1][0]];
      undefined[0][0] = undefined.last().last();
      undefined.last().last(_tmp2[0]);
      undefined[0].last(undefined.last()[0]);
      undefined.last()[0] = _tmp2.last();
      undefined[0][1] = undefined.last()[1];
      undefined.last()[1] = _tmp2[1];
      undefined[1][0] = undefined[1].last();
      undefined[1].last(_tmp2[3]);
    }
  } else throw 'Unsupported matrix. Please wait or contact the developer to add this matrix\' support.';
  return undefined;
};

/**
 * @description Number of elements.
 * @this Array
 * @returns {number} Number of elements
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.numElm = function () {
  return undefined.linearise().length;
};
/* Or
 this.reduce((memo, item, index) => {
 const flatten = memo.concat(item);
 flat[index] = flatten;
 return flatten;
 });
 */

/**
 * @description Size of the array.
 * @summary Get the width * height size of the array
 * @param {boolean} [str=false] String format or not
 * @this Array
 * @returns {string|number[]} Size
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.size = function (str) {
  return str ? undefined.length + 'x' + undefined.maxLength() : [undefined.length, undefined.maxLength()];
};

/**
 * @description Determinant of the matrix.
 * @this Array
 * @returns {number} Determinant
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.det = function () {
  var d = 0;
  if (undefined.numElm() === 4 && undefined.length === 2) d = undefined[0][0] * undefined[1][1] - undefined[0][1] * undefined[1][0];else if (undefined.numElm() === 9 && undefined.length === 3) {
    d = undefined[0][0] * (undefined[1][1] * undefined.last().last() - undefined[1].last() * undefined.last()[1]) - undefined[0][1] * (undefined[1][0] * undefined.last().last() - undefined[1].last() * undefined.last()[0]) + undefined[0].last() * (undefined[1][0] * undefined.last()[1] - undefined[1][1] * undefined.last()[0]);
  } else throw new Error('Unsupported matrix format');
  return d;
};

/**
 * @description Translate the array.
 * @this Array
 * @returns {Array} Translated array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.translate = function () {
  if (this.size()[0] === this.size()[1]) {
    //NxN
    for (var i = 0; i < Math.round(this.length / 2); i++) {
      for (var j = 0; i < this[0].length; j++) {
        if (!(1 === i && 0 === j && this[0].length > 2)) {
          ;
          var _ref11 = [this[j][i], this[i][j]];
          this[i][j] = _ref11[0];
          this[j][i] = _ref11[1];
        }
      }
    }
    if (this.size(true) === '4x4') {
      var elA = this.last()[2],
          elB = this[2].last();
      var _ref12 = [elA, elB];
      elB = _ref12[0];
      elA = _ref12[1];
    }
  } else {
    //NxM
    var arr = new Array(this.maxLength()).fill([]);
    for (var _i9 = 0; _i9 < this.maxLength(); _i9++) {
      arr[_i9] = this.line(_i9);
    }return arr;
  }
  return this;
};

/**
 * @description Look for some <code>x</code> in the array.
 * @param {*} x Element looked for
 * @returns {number} Position of the element
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.lookFor = function (x) {
  var _iteratorNormalCompletion18 = true;
  var _didIteratorError18 = false;
  var _iteratorError18 = undefined;

  try {
    for (var _iterator18 = undefined[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
      var item = _step18.value;

      if (item === x || item.equals(x)) return item;
    }
  } catch (err) {
    _didIteratorError18 = true;
    _iteratorError18 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion18 && _iterator18.return) {
        _iterator18.return();
      }
    } finally {
      if (_didIteratorError18) {
        throw _iteratorError18;
      }
    }
  }

  return -1;
};

/**
 * @description Divide the array into an array with n-sized cells.
 * @this Array
 * @param {number} n Size of each chunks
 * @returns {Array} Resulting array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.divide = function (n) {
  var res = new Array(Math.round(undefined.length / n)).fill(''),
      k = 0;
  var _iteratorNormalCompletion19 = true;
  var _didIteratorError19 = false;
  var _iteratorError19 = undefined;

  try {
    for (var _iterator19 = res[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
      var num = _step19.value;

      for (var j = 0; j < n; j++) {
        num += undefined[k++];
      }
    }
  } catch (err) {
    _didIteratorError19 = true;
    _iteratorError19 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion19 && _iterator19.return) {
        _iterator19.return();
      }
    } finally {
      if (_didIteratorError19) {
        throw _iteratorError19;
      }
    }
  }

  return res;
};

/**
 * @description Adjoint of the matrix.
 * @this Array
 * @returns {Array} Adjoint matrix
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 * @todo Add the support for 4x4+ matrices
 */
Array.prototype.getAdjoint = function () {
  var m = undefined.translate(),
      res = mkArray(undefined.length, 2, maths.EPS);
  //+-+
  //-+-
  //+-+
  if (m.numElm() === 4 && m.length === 2) {
    res[0] = [m[1][1], -m[1][0]];
    res[1] = [-m[0][1], m[0][1]];
  } else if (m.numElm() === 9 && m.length === 3) {
    res[0] = [m[1][1] * m.last().last() - m[1].last() * m.last()[1], -(m[1][0] * m.last().last() - m[1].last() * m.last()[0]), m[1][0] * m.last()[1] - m[1][1] * m.last()[0]];
    res[1] = [-(m[0][1] * m[1].last() - m[0].last() * m[1][1]), m[0][0] * m.last().last() - m[0].last() * m.last()[0], -(m[0][0] * m.last()[1] - m[0][1] * m.last()[0])];
    res.last([m[0][1] * m[1].last() - m[0].last() * m[1][1], -(m[0][0] * m[1].last() - m[0].last() * m[1][0]), m[0][0] * m[1][1] - m[0][1] * m[1][0]]);
  } else throw new Error('Unsupported matrix format');
  return res;
};

/**
 * @description Invertibility check.
 * @this Array
 * @returns {boolean} Is it invertible ?
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.isInvertible = function () {
  return undefined.det() != 0;
};

/**
 * @description Dot product.
 * @param {number} scalar Scalar
 * @this Array
 * @returns {Array} Resulting array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.dotProd = function (scalar) {
  var res = [];
  for (var i = 0; i < undefined.length; i++) {
    res[i] = [];
    for (var j = 0; j < undefined[i].length; j++) {
      res[i][j] = undefined[i][j] * scalar;
    }
  }
  return res;
};

/**
 * @description Dot addition.
 * @param {number} scalar Scalar
 * @this Array
 * @returns {Array} Resulting array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.dotAdd = function (scalar) {
  var res = [];
  for (var i = 0; i < undefined.length; i++) {
    res[i] = [];
    for (var j = 0; j < undefined[i].length; j++) {
      res[i][j] = scalar + undefined[i][j];
    }
  }
  return res;
};

/**
 * @description Dot subtraction.
 * @param {number} scalar Scalar
 * @param {string} [order='a-b'] Order (a-b: scalar-this[...], b-a: this[...]-a)
 * @this Array
 * @returns {Array} Resulting array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.dotSub = function (scalar) {
  var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'a-b';

  var res = [];
  for (var i = 0; i < undefined.length; i++) {
    res[i] = [];
    for (var j = 0; i < undefined[i].length; j++) {
      res[i][j] = order === 'a-b' ? scalar - undefined[i][j] : undefined[i][j] - scalar;
    }
  }
  return res;
};

/**
 * @description Dot fraction.
 * @param {number} scalar Scalar
 * @param {string} [order='a/b'] Order (a/b: scalar/this[...], b/a: this[...]/a)
 * @this Array
 * @returns {Array} Resulting array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.dotFrac = function (scalar) {
  var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'a/b';

  var res = [];
  for (var i = 0; i < undefined.length; i++) {
    res[i] = [];
    for (var j = 0; i < undefined[j].length; j++) {
      res[i][j] = order === 'a/b' ? scalar / undefined[i][j] : undefined[i][j] / scalar;
    }
  }
  return res;
};

/**
 * @description Array[]([]) to String.
 * @param {boolean} [clean=false] Clean output
 * @this Array
 * @returns {string} String representation
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toStr = function () {
  var clean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (is2dArray(undefined)) {
    var str = '';
    var _iteratorNormalCompletion20 = true;
    var _didIteratorError20 = false;
    var _iteratorError20 = undefined;

    try {
      for (var _iterator20 = undefined[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
        var i = _step20.value;

        str += clean ? undefined[i].join(', ') : undefined[i].join('');
      }
    } catch (err) {
      _didIteratorError20 = true;
      _iteratorError20 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion20 && _iterator20.return) {
          _iterator20.return();
        }
      } finally {
        if (_didIteratorError20) {
          throw _iteratorError20;
        }
      }
    }

    return str;
  } else return undefined.join(clean ? ', ' : '');
};

/**
 * @description Number[] to Number.
 * @returns {number} Integer representation
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toInt = function () {
  var n = 0;
  var _iteratorNormalCompletion21 = true;
  var _didIteratorError21 = false;
  var _iteratorError21 = undefined;

  try {
    for (var _iterator21 = undefined[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
      var i = _step21.value;

      n += undefined[i] * Math.pow(10, undefined.length - i - 1);
    }
  } catch (err) {
    _didIteratorError21 = true;
    _iteratorError21 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion21 && _iterator21.return) {
        _iterator21.return();
      }
    } finally {
      if (_didIteratorError21) {
        throw _iteratorError21;
      }
    }
  }

  return n;
};

/**
 * @description Invert the matrix.
 * @this Array
 * @returns {?Array} Inverse
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.inv = function () {
  return undefined.isInvertible() ? undefined.dotProd(1 / undefined.det() * undefined.getAdjoint()) : null;
};

/**
 * @description Mix up the array.
 * @this Array
 * @returns {Array} Mixed array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.mix = function () {
  var randPos = maths.mixedRange(0, 1, undefined.length - 1, true),
      res = [];
  var _iteratorNormalCompletion22 = true;
  var _didIteratorError22 = false;
  var _iteratorError22 = undefined;

  try {
    for (var _iterator22 = undefined[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
      var i = _step22.value;
      res[i] = undefined[randPos[i]];
    }
  } catch (err) {
    _didIteratorError22 = true;
    _iteratorError22 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion22 && _iterator22.return) {
        _iterator22.return();
      }
    } finally {
      if (_didIteratorError22) {
        throw _iteratorError22;
      }
    }
  }

  return res;
};

/**
 * @description Mix the array a little bit.
 * @this Array
 * @returns {Array} Mixed array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.littleMix = function () {
  var res = [],
      inc = void 0;
  if (is2dArray(undefined)) {
    res = Copy(undefined).linearise();
    res = res.littleMix().toNcol(undefined.size()[1]).sanitise(getNativeType(undefined[0][0])); //Assuming all cells are of the same type
  } else {
    inc = undefined.getIncrement(0);
    var _iteratorNormalCompletion23 = true;
    var _didIteratorError23 = false;
    var _iteratorError23 = undefined;

    try {
      for (var _iterator23 = undefined[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
        var i = _step23.value;

        var rd = maths.randTo(inc);
        res.push(undefined[i]);
        if (i > 0 && rd === 0) {
          ;
          var _ref13 = [res[i - 1], res[i]];
          res[i] = _ref13[0];
          res[i - 1] = _ref13[1];
        } else if (i > 1 && rd === inc) {
          ;
          var _ref14 = [res[i - 2], res[i]];
          res[i] = _ref14[0];
          res[i - 2] = _ref14[1];
        }
      }
    } catch (err) {
      _didIteratorError23 = true;
      _iteratorError23 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion23 && _iterator23.return) {
          _iterator23.return();
        }
      } finally {
        if (_didIteratorError23) {
          throw _iteratorError23;
        }
      }
    }
  }
  return res;
};

/**
 * @description Unshift that adds element of an array instead of the array itself.
 * @this Array
 * @param {Array} arr Array used to prepend
 * @returns {Array} New array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.prepend = function (arr) {
  var _iteratorNormalCompletion24 = true;
  var _didIteratorError24 = false;
  var _iteratorError24 = undefined;

  try {
    for (var _iterator24 = arr[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
      var i = _step24.value;
      undefined.unshift(arr[i]);
    }
  } catch (err) {
    _didIteratorError24 = true;
    _iteratorError24 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion24 && _iterator24.return) {
        _iterator24.return();
      }
    } finally {
      if (_didIteratorError24) {
        throw _iteratorError24;
      }
    }
  }

  return undefined;
};

/**
 * @description List of unique elements of the array.
 * @this Array
 * @returns {Array} Array of unique elements
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.unique = function () {
  return undefined.filter(function (x) {
    return undefined.count(x) === 1;
  });
};

/**
 * @description N-D array to 1D array.
 * @param {boolean} [jointer=false] Jointer
 * @returns {Array} res Resulting 1D array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.to1d = function (jointer) {
  var res = Copy(undefined);
  var _iteratorNormalCompletion25 = true;
  var _didIteratorError25 = false;
  var _iteratorError25 = undefined;

  try {
    for (var _iterator25 = res[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
      var i = _step25.value;
      res[i] = res[i].join(jointer || '');
    }
  } catch (err) {
    _didIteratorError25 = true;
    _iteratorError25 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion25 && _iterator25.return) {
        _iterator25.return();
      }
    } finally {
      if (_didIteratorError25) {
        throw _iteratorError25;
      }
    }
  }

  return res;
};

/**
 * @description 1D array to N-D array.
 * @param {number} [n=2] Dimension
 * @this Array
 * @returns {Array} Resulting N-D array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toNd = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var size = maths.nthroot(undefined.length, n, 0),
      res = [],
      k = 0; //Size of the size^n
  for (var i = 0; i < size; i++) {
    res[i] = [];
    for (var j = 0; j < size; j++) {
      res[i][j] = undefined[k++];
    }
  }
  return res;
};

/**
 * @description 1D array to N-column array.
 * @param {number} [n=2] Number of columns
 * @this Array
 * @returns {Array} Resulting array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toNcol = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var res = [],
      k = 0;
  for (var i = 0; i < undefined.length / n; i++) {
    res[i] = [];
    for (var j = 0; j < n; j++) {
      res[i][j] = undefined[k++];
    }
  }
  return res;
};

/**
 * @description 1D array to N-row array.
 * @param {number} [n=2] Number of rows
 * @this Array
 * @returns {Array} Resulting array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toNrow = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var res = [],
      k = 0;
  for (var i = 0; i < n; i++) {
    res[i] = [];
    for (var j = 0; j < undefined.length / n; j++) {
      res[i][j] = undefined[k++];
    }
  }
  return res;
};

/**
 * @description Linear 1D array.
 * @this Array
 * @returns {Array} Linearised array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.linearise = function () {
  return undefined.toString().split(',');
};

/**
 * @description Ensure that all the elements are of the same length.
 * @param {NumberLike} [cr=' '] Filler
 * @returns {Array} Uniformed array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.uniform = function () {
  var cr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';

  var res = undefined,
      ml = res.maxLength();
  var _iteratorNormalCompletion26 = true;
  var _didIteratorError26 = false;
  var _iteratorError26 = undefined;

  try {
    for (var _iterator26 = res[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
      var i = _step26.value;

      while (res[i].length < ml) {
        isNativeType(res[i], 'Array') ? res[i].push(cr) : res[i] += cr;
      }
    }
  } catch (err) {
    _didIteratorError26 = true;
    _iteratorError26 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion26 && _iterator26.return) {
        _iterator26.return();
      }
    } finally {
      if (_didIteratorError26) {
        throw _iteratorError26;
      }
    }
  }

  return res;
};

/**
 * @description Zip the array.
 * @this Array
 * @returns {Array} Zipped array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.zip = function () {
  var res = [],
      j = void 0;
  var _iteratorNormalCompletion27 = true;
  var _didIteratorError27 = false;
  var _iteratorError27 = undefined;

  try {
    for (var _iterator27 = undefined[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
      var i = _step27.value;

      if (undefined[i] === undefined[i + 1]) {
        j = 1;
        while (undefined[i] === undefined[i + j]) {
          j++;
        }res.push(undefined[i] + '@' + j);
        i += j - 1;
      } else res.push(undefined[i]);
    }
  } catch (err) {
    _didIteratorError27 = true;
    _iteratorError27 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion27 && _iterator27.return) {
        _iterator27.return();
      }
    } finally {
      if (_didIteratorError27) {
        throw _iteratorError27;
      }
    }
  }

  return res.length < undefined.length ? res : undefined; //Make sure that the compressed array isn't longer than the initial one
};

/**
 * @description Unzip the array.
 * @param {boolean} [noPairs=false] Keep pairs or not ?
 * @this Array
 * @returns {Array} Unzipped array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.unzip = function () {
  var noPairs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var res = [];
  var _iteratorNormalCompletion28 = true;
  var _didIteratorError28 = false;
  var _iteratorError28 = undefined;

  try {
    for (var _iterator28 = undefined[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
      var i = _step28.value;

      if (/[\S\s](@)(\d+)/g.test(undefined[i])) res.push(undefined[i][0].repeat(undefined[i][undefined[i].indexOf('@') + 1]));else res.push(undefined[i]);
    }
  } catch (err) {
    _didIteratorError28 = true;
    _iteratorError28 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion28 && _iterator28.return) {
        _iterator28.return();
      }
    } finally {
      if (_didIteratorError28) {
        throw _iteratorError28;
      }
    }
  }

  return noPairs ? res.join('').split('') : res;
};

/**
 * @description Trim the array.
 * @param {string} side Side
 * @this Array
 * @returns {Array} res Trimed array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.trimAll = function (side) {
  var res = [];
  side = side ? side[0].toLowerCase() : '';
  var _iteratorNormalCompletion29 = true;
  var _didIteratorError29 = false;
  var _iteratorError29 = undefined;

  try {
    for (var _iterator29 = undefined[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
      var i = _step29.value;
      res[i] = side === 'l' ? undefined[i].trimLeft() : side === 'r' ? undefined[i].trimRight() : undefined[i].trim();
    }
  } catch (err) {
    _didIteratorError29 = true;
    _iteratorError29 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion29 && _iterator29.return) {
        _iterator29.return();
      }
    } finally {
      if (_didIteratorError29) {
        throw _iteratorError29;
      }
    }
  }

  return res;
};

/**
 * @description Sorted state check.
 * @this Array
 * @returns {boolean} Sorted or not
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.isSorted = function () {
  if (undefined[0] > undefined[1]) return false;
  for (var i = 1; i < undefined.length; i++) {
    if (undefined[i] > undefined[i + 1]) return false;
  }
  return true;
};

/**
 * @description Ensure that the element isn't pushed when it's already there.
 * @this Array
 * @param {*} obj Object
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.uniquePush = function (obj) {
  if (isNativeType(obj, 'Array')) {
    var _iteratorNormalCompletion30 = true;
    var _didIteratorError30 = false;
    var _iteratorError30 = undefined;

    try {
      for (var _iterator30 = obj[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
        var i = _step30.value;

        if (undefined.miss(obj[i])) undefined.push(obj[i]);
      }
    } catch (err) {
      _didIteratorError30 = true;
      _iteratorError30 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion30 && _iterator30.return) {
          _iterator30.return();
        }
      } finally {
        if (_didIteratorError30) {
          throw _iteratorError30;
        }
      }
    }
  } else undefined.push(obj);
};

/**
 * @description Neighbour check.
 * @param {Nums} y Row number
 * @param {Nums} x Column number
 * @returns {Array} Neighbours
 * @public
 * @since 1.0
 * @method
 * @throws {RangeError} y|x is too big
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.neighbour = function (y, x) {
  var n = [],
      seq = void 0;
  if (isNativeType(y, 'Array')) {
    x = parseInt(y[1]);
    y = parseInt(y[0]);
  } else {
    y = parseInt(y);
    x = parseInt(x);
  }
  if (y >= this.length) throw new RangeError('The y-coord is out of bounds');
  if (x >= this.maxLength()) throw new RangeError('The x-coord is out of bounds');
  if (is2dArray(this)) {
    seq = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
    var _iteratorNormalCompletion31 = true;
    var _didIteratorError31 = false;
    var _iteratorError31 = undefined;

    try {
      for (var _iterator31 = seq[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
        var i = _step31.value;

        try {
          if (!isNon(this[y + seq[i][0]][x + seq[i][1]])) n.push(this[y + seq[i][0]][x + seq[i][1]]);
        } catch (err) {
          say('Neighbour check: ' + err.message, 'error');
        }
      }
    } catch (err) {
      _didIteratorError31 = true;
      _iteratorError31 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion31 && _iterator31.return) {
          _iterator31.return();
        }
      } finally {
        if (_didIteratorError31) {
          throw _iteratorError31;
        }
      }
    }
  } else {
    try {
      n.push(this[y - 1]);
    } catch (err) {
      say('Neighbour check: ' + err.message, 'error');
    }
    try {
      n.push(this[y + 1]);
    } catch (err) {
      say('Neighbour check: ' + err.message, 'error');
    }
  }
  return n;
};

/**
 * @description Make sure all the cells are of the right type.
 * @param {string} type Type
 * @this Array
 * @returns {Array} Sanitised array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.sanitise = function (type) {
  var _iteratorNormalCompletion32 = true;
  var _didIteratorError32 = false;
  var _iteratorError32 = undefined;

  try {
    for (var _iterator32 = undefined[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
      var row = _step32.value;
      var _iteratorNormalCompletion33 = true;
      var _didIteratorError33 = false;
      var _iteratorError33 = undefined;

      try {
        for (var _iterator33 = row[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
          var cell = _step33.value;
          cell = misc.name2Type(type, cell);
        }
      } catch (err) {
        _didIteratorError33 = true;
        _iteratorError33 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion33 && _iterator33.return) {
            _iterator33.return();
          }
        } finally {
          if (_didIteratorError33) {
            throw _iteratorError33;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError32 = true;
    _iteratorError32 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion32 && _iterator32.return) {
        _iterator32.return();
      }
    } finally {
      if (_didIteratorError32) {
        throw _iteratorError32;
      }
    }
  }

  return undefined;
};

/**
 * @description Get a portion of the array.
 * @param {number} [denominator=2] How many parts (half by default)
 * @param {number} [numerator=1] Position of the part (1st half by default)
 * @returns {Array} Portion of the array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.portion = function () {
  var denominator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var numerator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return undefined.length % 2 === 0 ? undefined.get(numerator * Math.round(undefined.length) / denominator) : undefined.get(Math.floor(numerator * Math.floor(undefined.length) / denominator));
};

/**
 * @description Remove the first element <code>n</code> of the array (so not all values equal to n).
 * @param {*} n Element
 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
 * @returns {Array.<*>} Array without that first element n
 * @see external:Array.remove
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.removeFirst = function (n, preserveInitial) {
  return preserveInitial ? undefined.filter(function (x, i) {
    return x != n || i != undefined.indexOf(n);
  }) : undefined.splice(undefined.indexOf(n), 1);
};

/**
 * @description Remove the last element <code>n</code> of the array (so not all values equal to n).
 * @param {*} n Element
 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
 * @return {Array.<*>} Array without that last element n
 * @see external:Array.remove
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.removeLast = function (n, preserveInitial) {
  return preserveInitial ? undefined.filter(function (x, i) {
    return x != n || i != undefined.lastIndexOf(n);
  }) : undefined.splice(undefined.lastIndexOf(n), 1);
};

/**
 * @description Performs a binary search on the host array.<br />
 * Source: {@link http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/}
 * @param {*} searchElement The item to search for within the array.
 * @return {number} The index of the element which defaults to -1 when not found.
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 * @this Array
 */

Array.prototype.binaryIndexOf = function (searchElement) {
  var minIndex = 0,
      maxIndex = undefined.length - 1,
      currentIndex = void 0,
      currentElement = void 0,
      resultIndex = void 0;

  while (minIndex <= maxIndex) {
    resultIndex = currentIndex = minIndex + maxIndex >> 1;
    currentElement = undefined[currentIndex];

    if (currentElement < searchElement) minIndex = currentIndex + 1;else if (currentElement > searchElement) maxIndex = currentIndex - 1;else return currentIndex;
  }

  return ~maxIndex;
};

/**
 * @description Place an item at the right place (to not mess up the order).
 * @param {*} n Term to place
 * @returns {Array} Modified array
 * @this Array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 * @example
 * var arr = [0, 1, 2, 4];
 * arr.place(3); //arr = [0, 1, 2, 3, 4]
 */
Array.prototype.place = function (n) {
  return undefined.splice(Math.abs(undefined.binaryIndexOf(n)), 0, n);
};

/**
 * @description Place items of an array at the right places (to not mess up the order).
 * @param {Array} arr Array containing the terms to place
 * @returns {Array} Modified array
 * @this Array
 * @public
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 * @example
 * var arr = [0, 1, 2, 4, 8];
 * arr.multiPlace([3, 5, 6, 7, 9]); //arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
Array.prototype.multiPlace = function (arr) {
  var _iteratorNormalCompletion34 = true;
  var _didIteratorError34 = false;
  var _iteratorError34 = undefined;

  try {
    for (var _iterator34 = arr[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
      var i = _step34.value;
      undefined.place(arr[i]);
    }
  } catch (err) {
    _didIteratorError34 = true;
    _iteratorError34 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion34 && _iterator34.return) {
        _iterator34.return();
      }
    } finally {
      if (_didIteratorError34) {
        throw _iteratorError34;
      }
    }
  }

  return undefined;
};

/**
 * @description Check if the string contains a character.
 * @inheritdoc
 * @param {*} val Character
 * @returns {boolean} Containment check result
 * @this String
 * @public
 * @method
 * @since 1.0
 * @memberof String.prototype
 * @external String
 */
String.prototype.contains = Array.prototype.contains;

/**
 * @description Check if the string doesn't contains a character.
 * @inheritdoc
 * @param {*} val Character
 * @returns {boolean} Containment check result
 * @this String
 * @public
 * @method
 * @since 1.0
 * @memberof String.prototype
 * @external String
 */
String.prototype.miss = Array.prototype.miss;

/**
 * @description Get the last element of the string.
 * @inheritdoc
 * @param {*} [nval] New value of the last element
 * @this String
 * @returns {*} Last element
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.last = function (nval) {
  return undefined.split('').last(nval);
};

/**
 * @description Splice for strings.
 * @param {number} index Index of the splice
 * @param {number} count Number of elements of counted elements
 * @param {NumberLike} [add=''] Added numbers/characters
 * @returns {string} Spliced string
 * @this String
 * @public
 * @since 1.0
 * @public
 * @memberof String.prototype
 * @external String
 */
String.prototype.splice = function (index, count) {
  var add = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (index < 0) {
    index = undefined.length + index;
    if (index < 0) index = 0;
  }
  return undefined.slice(0, index) + add + undefined.slice(index + count);
};

/**
 * @description Remove the character <code>c</code> from the string.
 * @param {string} character Character
 * @this String
 * @returns {string} Resulting string
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.remove = function (character) {
  var str = undefined;
  if (isNativeType(character, 'Array')) {
    var _iteratorNormalCompletion35 = true;
    var _didIteratorError35 = false;
    var _iteratorError35 = undefined;

    try {
      for (var _iterator35 = character[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
        var i = _step35.value;
        str = str.remove(i);
      }
    } catch (err) {
      _didIteratorError35 = true;
      _iteratorError35 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion35 && _iterator35.return) {
          _iterator35.return();
        }
      } finally {
        if (_didIteratorError35) {
          throw _iteratorError35;
        }
      }
    }

    return str;
  } else {
    var v = str.split(character).map(function (x) {
      return x === character ? undefined : x;
    }).join('');
    return v.has(undefined) ? str.remove() : v;
  }
};

/**
 * @description A FP fix that preserve for Number like strings.
 * @param {NumberLike} [n=2] Number of decimals
 * @this String
 * @returns {string} Floating point number
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.toNDec = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return Number(undefined).toFixed(n);
};

/**
 * @description to N digits.
 * @param {number} [n=2] Number of digits
 * @this String
 * @returns {String} Resulting string
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.toNDigits = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var i = undefined;
  if (parseFloat(i) < Math.pow(10, n - 1)) {
    while (i.split('.')[0].length < n) {
      i = '0' + i;
    }
  }
  return i;
};

/**
 * @description Mix the string/
 * @param {string} separator Separation character
 * @param {string} jointer Joining character
 * @this String
 * @returns {string} Mixed string
 * @memberof String.prototype
 * @external String
 * @public
 * @since 1.0
 */
String.prototype.mix = function () {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var jointer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : separator;

  var randPos = maths.mixedRange(0, 1, undefined.length - 1),
      iStr = undefined.split(separator),
      fStr = [];
  for (var i = 0; i < undefined.length; i++) {
    fStr[i] = iStr[randPos[i]];
  }return fStr.join(jointer);
};

/**
 * @description Divide the string into n-sized chunks.
 * @this String
 * @param {number} n Number of chunks
 * @returns {string[]} Divided string
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.divide = function (n) {
  var res = new Array(Math.round(undefined.length / n)).fill(''),
      k = 0;
  for (var character = 0; character < res.length; character++) {
    for (var j = 0; j < n; j++) {
      character += undefined[k++];
    }
  }
  return res;
};

/**
 * @description Capitalize the first letter(s).
 * @param {boolean} [whole=false] Every words or just the first one
 * @this String
 * @returns {string} String
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.capitalize = function () {
  var whole = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var res = undefined.toString(); //Because it will return the String object rather than the actual string
  if (whole) {
    var str = res.split(' ');
    var _iteratorNormalCompletion36 = true;
    var _didIteratorError36 = false;
    var _iteratorError36 = undefined;

    try {
      for (var _iterator36 = str[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
        var character = _step36.value;
        character = character.capitalize();
      }
    } catch (err) {
      _didIteratorError36 = true;
      _iteratorError36 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion36 && _iterator36.return) {
          _iterator36.return();
        }
      } finally {
        if (_didIteratorError36) {
          throw _iteratorError36;
        }
      }
    }

    return str.join(' ');
  } else return undefined.charAt(0).toUpperCase() + undefined.slice(1);
};

/**
 * @description Ascii sum.
 * @this String
 * @returns {number} Ascii sum
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.sum = function () {
  var sum = 0;
  for (var i = 0; i < undefined.length; i++) {
    sum += undefined.charCodeAt(i);
  }return sum;
};

/**
 * @description Ascii product.
 * @this String
 * @returns {number} Ascii product
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.prod = function () {
  var prod = 1;
  for (var i = 0; i < undefined.length; i++) {
    prod *= undefined.charCodeAt(i);
  }return prod;
};

/**
 * @description Ascii mean.
 * @this String
 * @returns {number} Mean
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.mean = function () {
  return undefined.map(function (character) {
    return character.charCodeAt(0);
  }).mean(2);
};

/**
 * @description Normalise the string.
 * @this String
 * @returns {string} Normalised string
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.normal = function () {
  return undefined.toLowerCase().remove();
};

/**
 * @description Get the occurrences of each characters as well as their positions.
 * @type {Array.getOccurrences|*}
 * @returns {undefined}
 * @public
 * @since 1.0
 * @method
 * @see external:Array.prototype.getOccurrences
 * @inheritdoc
 * @memberof String.prototype
 * @external String
 */
String.prototype.getOccurrences = Array.prototype.getOccurrences;

/**
 * @description Get a portion of the string.
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this String
 * @returns {string} Resulting string
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 * @see module:dsa~get
 */
String.prototype.get = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments[1];
  return dsa.get(undefined, start, end);
};

/**
 * @description Zip/compress the string.
 * @this String
 * @returns {string} Zipped string
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.zip = function () {
  var res = '',
      j = void 0;
  for (var i = 0; i < undefined.length; i++) {
    if (undefined[i] === undefined[i + 1]) {
      j = 1;
      while (undefined[i] === undefined[i + j]) {
        j++;
      }res += undefined[i] + '@' + j;
      i += j - 1;
    } else res += undefined[i];
  }
  return res.length < undefined.length ? res : undefined; //Make sure that the compression doesn't end up making the string longer
};

/**
 * @description Unzip the string.<br />
 * Decompress the string (when being compressed using String.zip()) with(out) pairs.
 * @param {boolean} [noPairs=false] Pairs or not ?
 * @this String
 * @returns {string} Unzipped string
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.unzip = function (noPairs) {
  var res = '';
  for (var i = 0; i < undefined.length; i++) {
    if (/[\S\s](\@)(\d+)/g.test(undefined[i])) res += undefined[i][0].repeat(undefined[i][undefined[i].indexOf('@') + 1]);else res += undefined[i];
  }
  return noPairs ? res.split('').join('') : res;
};

/**
 * @description Chunk the string into substrings of words.
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this String
 * @returns {string} Chunked string
 * @public
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.chunk = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments[1];
  return undefined.split(' ').get(start, end).join(' ');
};

/**
 * @description Return the chunk that is the same at the beginning of both string.
 * @param {string} str String
 * @this String
 * @returns {string} Same string
 * @method
 * @public
 * @since 1.0
 * @memberof String.prototype
 * @external String
 */
String.prototype.sameFirst = function (str) {
  var sf = '',
      pos = -1;
  while (pos <= Math.min(undefined.length, str.length)) {
    pos++;
    if (undefined[pos] === str[pos]) sf += undefined[pos];else break;
  }
  return sf;
};

/**
 * @description Return the chunk that is the same at the end of both string.
 * @param {string} str String
 * @this String
 * @returns {string} Same string
 * @method
 * @public
 * @since 1.0
 * @memberof String.prototype
 * @external String
 */
String.prototype.sameLast = function (str) {
  var sl = '',
      pos = 1,
      minLen = Math.min(undefined.length, str.length);
  while (pos <= minLen) {
    if (undefined[undefined.length - pos] === str[str.length - pos]) sl = undefined[undefined.length - pos] + sl;else break;
    pos++;
  }
  return sl;
};

/**
 * @description String equivalent of Array.map.
 * @param {Function} cb Callback function
 * @param {string} [sep=''] Seperator/jointor
 * @return {string} Mapped string
 * @memberof String.prototype
 * @public
 * @since 1.0
 * @method
 * @external String
 * @this String
 */
String.prototype.map = function (cb) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return undefined.split(sep).map(cb).join(sep);
};

/**
 * @description Reverse a string/
 * @memberOf String.prototype
 * @param {string} [splitter=''] Splitting/joining string
 * @return {string} Reversed string
 * @method
 * @public
 * @since 1.0
 * @external String
 * @this String
 */
String.prototype.reverse = function () {
  var splitter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return undefined.split(splitter).reverse().join(splitter);
};

/**
 * @description Minify a string/code.
 * @param {boolean} [noComment=false] Remove HTML/CSS like comments
 * @param {boolean} [noSpace=false] Remove spaces
 * @method
 * @public
 * @since 1.0
 * @external String
 * @return {string} Minified version of the string/code
 */
String.prototype.minify = function () {
  var noComment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var noSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var min = noSpace ? undefined.trim().replace(/(\t|\n|\s)/gm, '') : undefined.trim().replace(/(\t|\n|\s{2,})/gm, '');
  return noComment ? min.replace(/(<!--(.*?)-->|\/\*+(.*?)\*+\/)/gm, '') : min;
};

/**
 * @description Get a portion of the string.
 * @inheritdoc
 * @param {number} [denominator=2] How many parts (halfs by default)
 * @param {number} [numerator=1] Position of the part (1st half by default)
 * @returns {String} Portion of the string
 * @this String
 * @method
 * @public
 * @since 1.0
 * @memberof String.prototype
 * @external String
 */
String.prototype.portion = function () {
  var denominator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var numerator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return undefined.split('').portion(denominator, numerator).join('');
};

/**
 * @description Counts how many times a word is present in the string.
 * @param {String} word Word to be counted
 * @param {String} [separation=' '] Separation character
 * @this String
 * @returns {number} Number of occurrences of the word in the string
 * @public
 * @since 1.0
 * @method
 * @inheritdoc
 * @memberof String.prototype
 * @external String
 */
String.prototype.countWord = function (word) {
  var separation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
  return undefined.split(separation).count(word);
};

/**
 * @description Check if the word is a character.
 * @this String
 * @returns {boolean} Is it a character ?
 * @public
 * @since 1.0
 * @method
 * @inheritdoc
 * @memberof String.prototype
 * @external String
 */
String.prototype.isChar = function () {
  return typeof undefined === 'string' && /^[A-Za-z0-9]$/.test(undefined);
};

/**
 * @description Turn characters into words.<br />
 * Inspired by {@link http://www.2ality.com/2015/03/es6-generators.html}
 * @this String
 * @returns {string[]} Tokens
 * @public
 * @since 1.0
 * @method
 * @inheritdoc
 * @memberof String.prototype
 * @external String
 */
String.prototype.tokenize = function () {
  var tokenizer = regeneratorRuntime.mark(function tokenizer() {
    var iterator, ch, word;
    return regeneratorRuntime.wrap(function tokenizer$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            iterator = this[Symbol.iterator]();
            ch = void 0;

          case 2:
            ch = dsa.getNextItem(iterator);

            if (!ch.isChar()) {
              _context.next = 8;
              break;
            }

            word = '';

            do {
              word += ch;
              ch = dsa.getNextItem(iterator);
            } while (ch.isChar());
            _context.next = 8;
            return word;

          case 8:
            if (ch !== data.END_OF_SEQUENCE) {
              _context.next = 2;
              break;
            }

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, tokenizer, this);
  });
  return [].concat(_toConsumableArray(tokenizer()));
};

/**
 * @description Length of the number.
 * @this Number
 * @returns {Nums} Length
 * @public
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.length = function () {
  if (String(undefined).has('.')) return [parseInt(String(undefined).split('.')[0].length), parseInt(String(undefined).split('.')[1].length)];
  var len = 0,
      x = undefined;
  while (Math.floor(x) != 0) {
    x /= 10;
    len++;
    console.log(x);
  }
  return len;
};

/**
 * @description A FP fixing that preserve the number format.<br />
 * A bit like .toFixed(n) and .toPrecision(n) but returning a double instead of a string
 * @param {number} [n=2] Number of decimals
 * @this Number
 * @returns {number} Floating point number
 * @public
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.toNDec = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var pow10s = Math.pow(10, n);
  return Math.round(pow10s * undefined) / pow10s;
};

/**
 * @description Keep a fixed amount of unit digits.
 * @param {number} [n=2] Number of digits
 * @returns {string} New number
 * @protected
 * @public
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.toNDigits = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return undefined.toString().toNDigits(n);
}; //It won't work on other types than strings.


/**
 * @description Sign of the number.
 * @param {boolean} str Symbols string representation ?
 * @returns {NumberLike} Sign
 * @public
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.sign = function (str) {
  return str ? undefined < 0 ? '-' : undefined > 0 ? '+' : '' : undefined < 0 ? -1 : undefined > 0 ? 1 : 0;
};

/**
 * @description Prime check.
 * @param {number} n Number to check in relation
 * @returns {boolean} Prime check result
 * @public
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.isPrime = function (n) {
  for (var i = 2; i < n; i++) {
    if (maths.primeCheck(i, n)) return false;
  }
  return true;
};

/**
 * @description Clean the number.
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Cleaned number
 * @public
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.clean = function () {
  var nbDec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  if (undefined > 0 && undefined[0] == '+') return nbDec ? undefined.slice(1, undefined.length).toNDec(nbDec) : undefined.slice(1, undefined.length);else if (undefined == '-') return undefined + 1;else if (undefined == '+') return 1;else return nbDec ? undefined.toNDec(nbDec) : undefined;
};

/**
 * @description Number to Number[].
 * @returns {number[]} Number array
 * @public
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.toArr = function () {
  var arr = new Array(undefined.length()),
      i = 0,
      n = undefined;
  while (n > 0) {
    arr[i] = n % 10;
    i++;
    n /= 10;
  }
  return arr;
};

/**
 * @description Type check. It only works for native types (treats custom ones as objects)
 * @param {*} obj Object
 * @param {string} type Type
 * @returns {boolean} Type check result
 * @public
 * @since 1.0
 * @function
 * @see module:essence~isCustomType
 * @see module:essence~getNativeType
 */
var isNativeType = exports.isNativeType = function isNativeType(obj, type) {
  return getNativeType(obj, true) === '[object ' + type + ']';
};

/**
 * @description Type check.
 * @param {*} obj Object
 * @param {string} type Type
 * @returns {boolean} Type check result
 * @public
 * @since 1.0
 * @function
 * @see module:essence~isCustomType
 * @see module:essence~isNativeType
 * @see module:essence~getType
 */
var isType = exports.isType = function isType(obj, type) {
  return getType(obj) === type;
};

/**
 * @description Custom type check.
 * @param {*} obj Object
 * @param {string} type Type
 * @returns {boolean} Custom type check result
 * @public
 * @since 1.0
 * @function
 * @see module:essence~isNativeType
 * @see module:essence~getCustomType
 */
var isCustomType = exports.isCustomType = function isCustomType(obj, type) {
  return getCustomType(obj) === type;
};

/**
 * @description Native type getter.
 * @param {*} obj Object
 * @param {boolean} [preserve=false] Preserve the [object type] format
 * @returns {string} Type
 * @public
 * @since 1.0
 * @function
 * @see module:essence~isNativeType
 * @see module:essence~getCustomType
 */
var getNativeType = exports.getNativeType = function getNativeType(obj) {
  var preserve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var type = Object.prototype.toString.call(obj);
  return preserve ? type : type.split(' ')[1].slice(0, type.split(' ')[1].length - 1);
};

/**
 * @description Custom type getter that can pick up some native types.
 * @param {*} obj Object
 * @param {boolean} [preserve=false] Preserve the format of strings like [object Element]
 * @returns {string} Custom type
 * @public
 * @since 1.0
 * @function
 * @see module:essence~isCustomType
 * @see module:essence~getNativeType
 */
var getCustomType = exports.getCustomType = function getCustomType(obj) {
  var preserve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  //Same as getNativeType but for custom types which won't work for native types
  var type = obj.toLocaleString();
  if (type.indexOf('[') === 0) return preserve ? type : type.split(' ')[1].slice(0, type.split(' ')[1].length - 1); //[object Type]
  else return type.split('(')[0].trim();
};

/**
 * @description Type getter.
 * @param {*} obj Object
 * @returns {string} Custom type
 * @public
 * @since 1.0
 * @function
 * @see module:essence~getCustomType
 * @see module:essence~getType
 * @see module:essence~isType
 */
var getType = exports.getType = function getType(obj) {
  var type = getNativeType(obj);
  if (type != 'Object') return type;
  var ctype = getCustomType(obj);
  return (/^[A-Z][A-Za-z]+$/.test(ctype) ? ctype : type
  );
};

/**
 * @summary 2D array check.
 * @description Check if an array has 2 dimensions (NxM matrix)
 * @param {Array} arr Object
 * @returns {boolean} 2D array check result
 * @public
 * @since 1.0
 * @function
 */
var is2dArray = exports.is2dArray = function is2dArray(arr) {
  if (isNativeType(arr, 'Array')) {
    var _iteratorNormalCompletion37 = true;
    var _didIteratorError37 = false;
    var _iteratorError37 = undefined;

    try {
      for (var _iterator37 = arr[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
        var row = _step37.value;

        if (isNativeType(row, 'Array')) return true;
      }
    } catch (err) {
      _didIteratorError37 = true;
      _iteratorError37 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion37 && _iterator37.return) {
          _iterator37.return();
        }
      } finally {
        if (_didIteratorError37) {
          throw _iteratorError37;
        }
      }
    }
  } else return false;
};

/**
 * @description Check if an array is singly-typed (one type of element present throughout the entire array).
 * @param {array} arr Array
 * @param {string} type Native/custom type
 * @returns {boolean} Single-type check result
 * @public
 * @since 1.0
 * @function
 */
var isTypedArray = exports.isTypedArray = function isTypedArray(arr, type) {
  return arr.every(function (item) {
    return isType(item, type);
  });
};

/**
 * @description Get the type of the array.
 * @param {array} arr Array
 * @returns {string} Array type
 * @public
 * @since 1.0
 * @function
 */
var getArrayType = exports.getArrayType = function getArrayType(arr) {
  var types = arr.map(function (item) {
    return getType(item);
  }),
      type = misc.rmDuplicates(types);
  return type.length > 1 ? 'Any' : type[0];
};

/**
 * @description Check if <code>val</code> is nothing/empty.
 * @param {*} val Value
 * @returns {boolean} Voidness/emptyness result
 * @public
 * @since 1.0
 * @function
 */
var isNon = exports.isNon = function isNon(val) {
  return val === false || val === undefined || val === null || val === '' || val.equals([]) || val.equals({});
};

/**
 * @description Check if a variable/object exist or not.
 * @param {*} obj Object/variable to check
 * @return {boolean} Existence result
 * @public
 * @since 1.0
 * @func
 * @example
 * let a = undefined, b, c = null;
 * exist(a); //true because: a in window === true
 * exist(b); //true because: b in window === true
 * exist(c); //true because: (typeof c !== 'undefined' && c !== undefined) === true
 * exist(d); //false
 */
var exist = exports.exist = function exist(obj) {
  /* eslint no-shadow-restricted-names: "off" */
  var undefined = void 0,
      t = void 0;
  try {
    //noinspection JSUnusedAssignment
    t = typeof obj !== 'undefined' || obj !== undefined || obj in window;
    /* eslint no-shadow-restricted-names: "error" */
  } catch (e) {
    t = false;
  }
  return t;
};

/**
 * @description Returns a copy of an element in order to do mutation-safe operations with it.
 * @param {*} obj Element
 * @returns {*} Copy of <code>el</code>
 * @public
 * @since 1.0
 * @function
 */
var Copy = exports.Copy = function Copy(obj) {
  if (isNativeType(obj, 'String') || isNativeType(obj, 'Number') || isNativeType(obj, 'Boolean')) return obj; //As they are immutable types
  else if (isNativeType(obj, 'Array')) return [].concat(_toConsumableArray(obj));else {
      var clone = {};
      for (var i in obj) {
        if (obj.has(i)) clone[i] = obj[i];
      }
      return clone;
    }
};

/**
 * @description Get the time (in the format: hh:mm:ss[.xxx]).
 * @param {boolean} [ms=false] Include milliseconds
 * @returns {string} Time
 * @public
 * @since 1.0
 * @function
 */
var getTime = exports.getTime = function getTime() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var d = new Date();
  return ms ? d.getHours().toNDigits() + ':' + d.getMinutes().toNDigits() + ':' + d.getSeconds().toNDigits() + '.' + d.getMilliseconds().toNDigits() : d.getHours().toNDigits() + ':' + d.getMinutes().toNDigits() + ':' + d.getSeconds().toNDigits();
};

/**
 * @description Get the date.
 * @param {boolean} [short=false] Shortness (end.g: 26May2016 instead of 26/05/2016
 * @returns {string} Date
 * @public
 * @since 1.0
 * @function
 */
var getDate = exports.getDate = function getDate() {
  var short = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      d = new Date();
  return short ? d.getDate().toNDigits() + m[d.getMonth()] + d.getUTCFullYear() : d.toLocaleDateString();
};

/**
 * @description Get the timestamp.
 * @param {boolean} [readable=false] Readable (dd/MM/yyyy hh:mm:ss.xxx) or not (ddMMM-hh-mm-ss)
 * @returns {string} Timestamp
 * @public
 * @since 1.0
 * @see module:essence~getDate
 * @see module:essence~getTime
 * @function
 */
var getTimestamp = exports.getTimestamp = function getTimestamp() {
  var readable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return readable ? getDate() + ' ' + getTime(true) : getDate(true) + '-' + getTime().replace(/:/g, '-');
};

/**
 * @description Date to textual format.
 * @param {Date} d Date
 * @returns {string} Textual format (in dd/mm/yyyy)
 * @see module:essence~txt2date
 * @function
 * @public
 * @since 1.0
 * @throws {Error} d isn't a Date
 */
var date2txt = exports.date2txt = function date2txt(d) {
  if (!isNativeType(d, 'Date')) throw new TypeError(d + ' is not a Date object');
  return d.getDate().toNDigits() + '/' + (d.getMonth() + 1).toNDigits() + '/' + d.getFullYear();
};

/**
 * @description Textual date (in dd/mm/yyyy) to Date.
 * @param {string} txt Textual date
 * @returns {Date} Date
 * @see module:essence~date2txt
 * @function
 * @public
 * @since 1.0
 */
var txt2date = exports.txt2date = function txt2date(txt) {
  var p = txt.split('/');
  return new Date(p[2], p[1] - 1, p[0]);
};

/**
 * @description Display the date and at time at a particular place
 * @param {string} [id] ID of the element to be used
 * @public
 * @since 1.0
 * @function
 */
var dateTime = exports.dateTime = function dateTime(id) {
  var date = new Date();
  var year = date.getFullYear(),
      month = date.getMonth();
  var months = data.MONTHS;
  var d = date.getDate(),
      day = date.getDay(),
      h = date.getHours();
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var tt = '',
      GMT = date.getTimezoneOffset(),
      m = void 0,
      s = void 0;
  if (h < 10) h = '0' + h;
  m = date.getMinutes();
  if (h > 12) {
    h -= 12;
    tt = 'PM';
  } else tt = 'AM';
  if (m < 10) m = '0' + m;
  s = date.getSeconds();
  if (s < 10) s = '0' + s;
  GMT = 'GMT' + (GMT >= 0 ? '+' : '-') + GMT;
  var result = 'We\'re ' + days[day] + ' ' + d + ' ' + months[month] + ' ' + year + ' and it\'s ' + h + ':' + m + ':' + s + ' ' + tt + ' ' + GMT;
  $e(id ? '#' + id : 'body').write(result);
  setTimeout('dateTime("' + id + '")', 1e3);
};

/**
 * @description Kinch's week day finder.
 * @param {string} d Date
 * @author Daniel "Kinch" Sheppard
 * @returns {string} Week day
 * @public
 * @since 1.0
 * @function
 */
var dayOfWeek = exports.dayOfWeek = function dayOfWeek(d) {
  var day = parseInt(d.split('/')[0]),
      m = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5],
      days = data.DAYS;
  var y = parseInt(d.split('/').last()) % 100 + Math.floor(d.split('/').last() / 4),
      c = Math.floor(d.split('/').last() / 100 % 4),
      cCode = void 0;
  if (c === 0) cCode = 6;else if (c === 1) cCode = 4;else if (c === 2) cCode = 2;else cCode = 0;
  return days[(day + m[parseInt(d.split('/')[1]) - 1] + y + cCode) % 7];
};

/**
 * @description Date to number.
 * @param {string} [d=getDate()] Date
 * @returns {number} Number
 * @see module:essence~num2date
 * @public
 * @since 1.0
 * @function
 */
var date2num = exports.date2num = function date2num() {
  var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDate();

  var p = d.split('/');
  return parseFloat(parseFloat(p[2] + '.' + p[1]).toNDec() + '0' + p[0]);
};

/**
 * @description Number to date.
 * @param {number} n Number
 * @returns {string} Date
 * @see module:essence~date2num
 * @public
 * @since 1.0
 * @function
 */
var num2date = exports.num2date = function num2date(n) {
  var p = n.toString().split('.');
  return p[1].get(3) + '/' + p[1].get(-3) + '/' + p[0];
};

/**
 * @description Date difference calculator.<br />
 * Source: {@link http://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html}
 * @param {Date|number} [from=new Date()] Starting date
 * @param {Date|number} to Ending date
 * @param {string} [part='d'] Part
 * @param {boolean} [round=false] Rounding flag
 * @returns {number} Difference
 * @function
 * @public
 * @since 1.0
 */
var dateDiff = exports.dateDiff = function dateDiff() {
  var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var to = arguments[1];
  var part = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'd';
  var round = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var divideBy = { //In ms
    y: 959230512e3, //Years
    m: 2628028800.0000005, //Months
    w: 6048e5, //Weeks
    d: 864e5, //Days
    h: 36e5, //Hours
    min: 6e4, //Minutes
    s: 1e3, //Seconds
    ms: 1 //Milliseconds
  };
  return round ? Math.round((to - from) / divideBy[part]) : (to - from) / divideBy[part];
};

/**
 * @description Date (days/weeks/months/years) to seconds.
 * @param {number} [d=0] Days
 * @param {number} [w=0] Weeks
 * @param {number} [m=0] Months
 * @param {number} [y=0] Years
 * @returns {number} Seconds
 * @function
 * @public
 * @since 1.0
 * @see module:essence~s2date
 * @see module:data~DAY_IN_SEC
 * @see module:data~MONTH_IN_DAY
 */
var date2s = exports.date2s = function date2s() {
  var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  return d * data.DAY_IN_SEC + w * 7 * data.DAY_IN_SEC + m * data.MONTH_IN_DAY * data.DAY_IN_SEC + y * 365 * data.MONTH_IN_DAY * data.DAY_IN_SEC;
};

/**
 * @description Seconds to days/weeks/months/years
 * @param {number} s Seconds
 * @param {string} [what='d'] Option
 * @returns {number} Result
 * @function
 * @public
 * @since 1.0
 * @see module:essence~date2s
 * @see module:data~DAY_IN_SEC
 * @see module:data~MONTH_IN_DAY
 */
var s2date = exports.s2date = function s2date(s) {
  var what = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'd';

  switch (what.toLowerCase()[0]) {
    case 'w':
      return s / (7 * data.DAY_IN_SEC); //Weeks
    case 'm':
      return s / (data.MONTH_IN_DAY * data.DAY_IN_SEC); //Months
    case 'y':
      return s / (365 * data.MONTH_IN_DAY * data.DAY_IN_SEC); //Years
    default:
      return s / data.DAY_IN_SEC; //Days
  }
};

/**
 * @description Generate a string.
 * @param {number} len Length
 * @param {Object} filter Filter (specific character, no uppercase/lowercase, cumulative/no (sensitive) repeat)
 * {
 *  name: 'specificChar/noUpperCase/noLowerCase/cumulativeRepeat/cumulativeSensitiveRepeat/noRepeat',
 *  character: *
 * }
 * @param {number} [stackLayer=0] Stack layer
 * @returns {string} Generated string
 * @since 1.0
 * @func
 */
var genStr = exports.genStr = function genStr(len, filter) {
  var stackLayer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var str = '',
      az = misc.asciiTable('a-z'),
      AZ = misc.asciiTable('A-Z'),
      zero9 = maths.range(9),
      commonChar = ['&', '~', '"', '#', '\'', '{', '[', '(', '-', '|', '`', '_', '\\', '^', '@', ')', ']', '+', '=', '}', '%', '*', '?', ',', ';', '.', '/', ':', '!', ' '],
      charlist = void 0;
  charlist = az.concat(AZ, zero9, commonChar);
  var c = '',
      i = 0;
  while (str.length < len) {
    c = charlist.rand();
    if (filter.name === 'specificChar') {
      //noinspection JSUnresolvedVariable
      while (c === filter.character) {
        c = charlist.rand();
      }
    } else if (filter.name === 'noUpperCase') {
      c = c.toLowerCase();
    } else if (filter.name === 'noLowerCase') {
      c = c.toUpperCase();
    } else if (filter.name === 'cumulativeRepeat') {
      while (c == str[i - 1]) {
        c = charlist.rand();
      }
    } else if (filter.name === 'cumulativeSensitiveRepeat') {
      while (c === str[i - 1]) {
        c = charlist.rand();
      }
    } else if (filter.name === 'noRepeat') {
      charlist.remove();
      c = charlist.rand();
    }
    str += c;
    i++;
  }
  if (str.length < len) str += charlist.rand();else if (str.length > len) str = str.slice(0, len + 1);
  if (str === '' && stackLayer < 3) genStr(len, filter);
  return str;
};

/**
 * @description Make a <code>len</code><sup><code>dim</code></sup> array.<br />
 * Similar to Arr.fill(new Array(...).fill(...))
 * @param {number} len Length
 * @param {number} dim Dimension
 * @param {*} [fill=false] Content to be used to fill
 * @returns {Array} Array
 * @since 1.0
 * @func
 * @throws {Error} Invalid/unsupported dimension
 */
var mkArray = exports.mkArray = function mkArray(len, dim) {
  var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var arr = [];
  if (dim === 1) {
    if (!fill) arr = new Array(len);else {
      for (var i = 0; i < len; i++) {
        arr[i] = fill;
      }
    }
  } else if (dim === 2) {
    if (!fill) {
      arr = new Array(len);
      for (var _i10 = 0; _i10 < len; _i10++) {
        arr[_i10] = new Array(len);
      }
    } else {
      for (var _i11 = 0; _i11 < len; _i11++) {
        arr[_i11] = new Array(len);
        for (var j = 0; j < len; j++) {
          arr[_i11][j] = fill;
        }
      }
    }
  } else if (dim === 3) {
    if (!fill) {
      arr = new Array(len);
      for (var _i12 = 0; _i12 < len; _i12++) {
        arr[_i12] = new Array(len);
        for (var _j3 = 0; _j3 < len; _j3++) {
          arr[_i12][_j3] = new Array(len);
        }
      }
    } else {
      for (var _i13 = 0; _i13 < len; _i13++) {
        arr[_i13] = new Array(len);
        for (var _j4 = 0; _j4 < len; _j4++) {
          arr[_i13][_j4] = new Array(len);
          for (var k = 0; k < len; k++) {
            arr[_i13][_j4][k] = fill;
          }
        }
      }
    }
  } else if (dim === 4) {
    if (!fill) {
      arr = new Array(len);
      for (var _i14 = 0; _i14 < len; _i14++) {
        arr[_i14] = new Array(len);
        for (var _j5 = 0; _j5 < len; _j5++) {
          arr[_i14][_j5] = new Array(len);
          for (var _k = 0; _k < len; _k++) {
            arr[_i14][_j5][_k] = new Array(len);
          }
        }
      }
    } else {
      for (var _i15 = 0; _i15 < len; _i15++) {
        arr[_i15] = new Array(len);
        for (var _j6 = 0; _j6 < len; _j6++) {
          arr[_i15][_j6] = new Array(len);
          for (var _k2 = 0; _k2 < len; _k2++) {
            arr[_i15][_j6][_k2] = new Array(len);
            for (var l = 0; l < len; l++) {
              arr[_i15][_j6][_k2][l] = fill;
            }
          }
        }
      }
    }
  } else throw new Error('Unvalid dimension. Only 1D-4D arrays can be made.');
  return arr;
};

/**
 * @description Make sure that $a and $b are of the same lengths and fill the empty spaces with $cr
 * @param {string|Array} a Element a
 * @param {string|Array} b Element b
 * @param {string} [cr=' '] Filling character
 * @returns {Array} Resized elements
 * @public
 * @since 1.0
 * @function
 * @throws {Error} a and b must be iterable
 */
var toSameLength = exports.toSameLength = function toSameLength(a, b) {
  var cr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';

  if (!a.isIterable() || !b.isIterable()) throw new Error('invalid length equality operation on non-iterable objects');
  if (a.length > b.length) {
    var typeB = isNativeType(b, 'String');
    /* eslint no-undef: "off" */
    for (var i = b.length; i < a.length; i++) {
      typeB ? b += cr : b.push(cr);
    }
  } else if (a.length < b.length) {
    var typeA = isNativeType(a, 'String');
    for (var _i16 = a.length; _i16 < b.length; _i16++) {
      typeA ? a += cr : a.push(cr);
    }
  }
  /* eslint no-undef: "error" */
  return [a, b];
};

/**
 * @description Look for an element in a matrix
 * @param {*} x Element to look for
 * @param {Array} mtx Matrix
 * @param {boolean} [toCoord=false] Coordinate representation
 * @returns {Nums} Position
 * @public
 * @since 1.0
 * @function
 */
var lookfor = exports.lookfor = function lookfor(x, mtx) {
  var toCoord = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  for (var i = 0; i < mtx.length; i++) {
    for (var j = 0; j < mtx[i].length; j++) {
      if (mtx[i][j] === x || mtx[i][j].equals(x)) return toCoord ? [j, i] : [i, j]; //i is the row number and j the column which oppose j being the x-coord and i the y-coord
    }
  }
  return -1;
};

/**
 * @description Same as keys() but returns an HTML table
 * @param {*} map Map
 * @param {boolean} [propOnly=false] Properties only
 * @returns {string} HTML table
 * @public
 * @since 1.0
 * @function
 */
var keyTable = exports.keyTable = function keyTable(map) {
  var propOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  //Same as above but in the form of the HTML table
  var header = map.has('name') ? map.name : map.has('title') ? map.title : '';
  var table = '<table cellspacing=0><caption>KeyTable <i>' + header + '</i></caption><tr><th>Key</th><th>Value</th></tr>';
  for (var key in map) {
    if (propOnly && map.has(key) || !propOnly) table += '<tr><td>' + key + '</td><td>' + map[key] + '</td></tr>';
  }
  return table + '</table>';
};

/**
 * @description Character to hexadecimal.
 * @param {string} c Character
 * @returns {string} Hexadecimal code
 * @public
 * @since 1.0
 * @function
 */
var char2hex = exports.char2hex = function char2hex(c) {
  return maths.conv(c.charCodeAt(0), 10, 16);
};

/**
 * @description Hexadecimal to character.
 * @param {NumberLike} h Hexadecimal code
 * @returns {string} Character
 * @public
 * @since 1.0
 * @function
 */
var hex2char = exports.hex2char = function hex2char(h) {
  return String.fromCharCode(maths.conv(h, 16));
};

/**
 * @description Character to binary.
 * @param {string} c Character
 * @returns {string} Binary code
 * @public
 * @since 1.0
 * @function
 */
var char2bin = exports.char2bin = function char2bin(c) {
  return maths.conv(c.charCodeAt(0), 10, 2);
};

/**
 * @description Binary to character.
 * @param {NumberLike} b Binary code
 * @returns {string} Character
 * @public
 * @since 1.0
 * @function
 */
var bin2char = exports.bin2char = function bin2char(b) {
  return String.fromCharCode(maths.conv(b, 2));
};

/**
 * @description Text to number converter.
 * @param {string} txt Text
 * @param {number} [base=10] Base
 * @returns {string} Converted text
 * @public
 * @since 1.0
 * @function
 */
var txt2num = exports.txt2num = function txt2num(txt) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var res = '';
  for (var i = 0; i < txt.length; i++) {
    res += maths.conv(txt.charCodeAt(i), 10, base) + ' ';
  }return res.trimRight();
};

/**
 * @description Number to text.
 * @param {NumberLike} num Number
 * @param {number} [base=10] Base
 * @returns {string} Converted number
 * @since 1.0
 * @func
 */
var num2txt = exports.num2txt = function num2txt(num) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var res = '';
  for (var i = 0; i < num.split(' ').length; i++) {
    res += String.fromCharCode(maths.conv(num.split(' ')[i], base));
  }return res;
};

/**
 * @description Time how long a callback took
 * @param {Function} cb Callback
 * @param {*} [params] Parameters
 * @param {string} [format='ms'] Format of the result (ms/s/min/d/...)
 * @returns {number} Time
 * @public
 * @since 1.0
 * @function
 */
var time = exports.time = function time(cb, format) {
  for (var _len3 = arguments.length, params = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    params[_key3 - 2] = arguments[_key3];
  }

  var t1 = new Date().getTime();
  cb.apply(undefined, params);
  var t2 = new Date().getTime();
  return format ? dateDiff(t1, t2, format) : t2 - t1;
};

/**
 * @description Pause the JS execution for a bit and place the callback (if specified) at the end of the execution queue (parsed by the browser which also includes the UI).
 * A neat wait of keeping the code passed in the parameter to be executed in order of execution (instead of being pushed at the end of the execution queue), is to pass a command/instruction instead of a function (with that command/instructions).
 * @param {Function} [cb=$f] Callback
 * @public
 * @since 1.0
 * @function
 */
var wait = exports.wait = function wait() {
  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $f;
  return setTimeout(cb, 0);
};

/**
 * @description Time how long an asynchronous callback took.
 * @param {Function} cb Callback
 * @param {*} [params] Parameters
 * @param {string} [format='ms'] Format of the result (ms/s/min/d/...)
 * @returns {number} Time
 * @public
 * @since 1.0
 * @function
 */
var asyncTime = exports.asyncTime = function asyncTime(cb, params, format) {
  var t1 = new Date().getTime();
  var action = cb.apply(undefined, _toConsumableArray(params));
  var promise = new Promise(function (resolve, reject) {
    action ? resolve(true) : reject('The action couldn\'t be completed');
  });
  promise.then(function () {
    var t2 = new Date().getTime();
    return format ? dateDiff(t1, t2, format) : t2 - t1;
  }, function (err) {
    return say(err, 'error');
  });
};
